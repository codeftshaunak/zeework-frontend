#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function finalTailwindCleanup(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix malformed JSX where className got mixed into onClick
    const fixMalformedJSX = [
      // Fix onClick={() = className="..." > setIsModal(false)}
      {
        from: /onClick=\{.*?\} = className="[^"]*">\s*([^}]*)\}/g,
        to: 'onClick={() => $1}'
      },
      // Fix spinner={<BtnSpinner / className="...">}
      {
        from: /spinner=\{<BtnSpinner\s*\/\s*className="[^"]*">\}/g,
        to: 'spinner={<BtnSpinner />}'
      },
      // Fix broken tag closures like <div className="...">
      {
        from: /<div\s+className="([^"]*)"[^>]*>\s*className="([^"]*)"/g,
        to: '<div className="$1 $2"'
      },
      // Fix duplicate classNames
      {
        from: /className="([^"]*)" className="([^"]*)"/g,
        to: 'className="$1 $2"'
      },
      // Fix broken SVG elements
      {
        from: /<svg([^>]*?) width="30px" height="30px"/g,
        to: '<svg$1 className="w-[30px] h-[30px]"'
      },
      // Fix align= attributes
      {
        from: /align="([^"]*)"/g,
        to: ''
      },
      // Fix standalone mb="..." attributes
      {
        from: /\s+mb="[^"]*"/g,
        to: ''
      },
      // Fix broken div tags like <divstart"
      {
        from: /<div([a-zA-Z]+)"([^"]*)"([^>]*)>/g,
        to: '<div className="$2"$3>'
      },
      // Fix broken tag structures
      {
        from: /<(\w+)([^>]*?) className="([^"]*)"([^>]*?) className="([^"]*)"/g,
        to: '<$1$2 className="$3 $5"$4'
      }
    ];

    fixMalformedJSX.forEach(fix => {
      const newContent = content.replace(fix.from, fix.to);
      if (newContent !== content) {
        modified = true;
        content = newContent;
      }
    });

    // Clean up empty className attributes
    content = content.replace(/className=""\s*/g, '');

    // Clean up multiple spaces in className
    content = content.replace(/className="([^"]*)"/g, (match, classes) => {
      const cleanedClasses = classes.split(/\s+/).filter(c => c.trim()).join(' ');
      return cleanedClasses ? `className="${cleanedClasses}"` : '';
    });

    // Remove any remaining invalid props on standard HTML elements
    const htmlElements = ['div', 'span', 'button', 'input', 'textarea', 'img', 'svg', 'path'];
    const invalidHTMLProps = [
      'fontSize', 'fontWeight', 'textAlign', 'textTransform', 'lineHeight',
      'overflow', 'justifyContent', 'alignItems', 'flexDirection', 'gap',
      'bg', 'bgColor', 'borderRadius', 'rounded', 'cursor', 'display',
      'position', 'border', 'margin', 'padding', 'width', 'height',
      'color', 'variant', 'size', 'colorScheme', 'mb', 'mt', 'my', 'mx',
      'px', 'py', 'p', 'w', 'h'
    ];

    htmlElements.forEach(element => {
      invalidHTMLProps.forEach(prop => {
        // Remove invalid props from HTML elements
        const regex = new RegExp(`(<${element}[^>]*?)\\s+${prop}=(?:"[^"]*"|{[^}]*})`, 'g');
        const newContent = content.replace(regex, '$1');
        if (newContent !== content) {
          modified = true;
          content = newContent;
        }
      });
    });

    // Fix specific broken components
    const componentFixes = [
      // Fix Button components with invalid props still present
      {
        from: /(<Button[^>]*?)colorScheme="[^"]*"/g,
        to: '$1'
      },
      {
        from: /(<Button[^>]*?)variant="[^"]*"/g,
        to: '$1'
      },
      {
        from: /(<Button[^>]*?)size="[^"]*"/g,
        to: '$1'
      },
      // Fix broken table structure
      {
        from: /<\/Button>/g,
        to: '</button>'
      }
    ];

    componentFixes.forEach(fix => {
      const newContent = content.replace(fix.from, fix.to);
      if (newContent !== content) {
        modified = true;
        content = newContent;
      }
    });

    if (modified) {
      console.log(`Final Tailwind cleanup applied to: ${filePath}`);
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function findTsxFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && item !== 'node_modules' && item !== '.git' && item !== '.next') {
      files = files.concat(findTsxFiles(fullPath));
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts')) && !item.endsWith('.bak')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Main execution
const srcDir = path.join(__dirname, 'src');
const files = findTsxFiles(srcDir);

let cleanedCount = 0;
for (const file of files) {
  if (finalTailwindCleanup(file)) {
    cleanedCount++;
  }
}

console.log(`Applied final Tailwind cleanup to ${cleanedCount} files.`);