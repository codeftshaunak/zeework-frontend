#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function finalCleanup(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix all duplicate className attributes
    const classNamePattern = /className="([^"]*)"(\s+className="([^"]*)")+/g;
    content = content.replace(classNamePattern, (match, firstClass, ...rest) => {
      // Extract all className values
      const allClasses = [firstClass];
      const classNameMatches = match.match(/className="([^"]*)"/g);

      classNameMatches.slice(1).forEach(cls => {
        const classValue = cls.match(/className="([^"]*)"/)[1];
        if (classValue) allClasses.push(classValue);
      });

      // Combine all unique classes
      const uniqueClasses = [...new Set(allClasses.join(' ').split(' ').filter(c => c.trim()))];
      modified = true;
      return `className="${uniqueClasses.join(' ')}"`;
    });

    // Fix any remaining invalid HTML attributes on divs and spans
    const invalidHtmlProps = [
      'alignItems', 'justifyContent', 'display', 'textAlign', 'fontSize',
      'fontWeight', 'color', 'bg', 'bgColor', 'border', 'borderRadius',
      'padding', 'paddingX', 'paddingY', 'margin', 'marginX', 'marginY',
      'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
      'width', 'height', 'lineHeight', 'textTransform', 'rounded'
    ];

    invalidHtmlProps.forEach(prop => {
      const divRegex = new RegExp(`(<div[^>]*)\\s+${prop}="[^"]*"`, 'g');
      const spanRegex = new RegExp(`(<span[^>]*)\\s+${prop}="[^"]*"`, 'g');

      const newDivContent = content.replace(divRegex, '$1');
      const newSpanContent = newDivContent.replace(spanRegex, '$1');

      if (newSpanContent !== content) {
        modified = true;
        content = newSpanContent;
      }
    });

    // Clean up any leftover curly braces in attribute values
    const curlyBracePattern = /(\w+)=\{?"([^"]*)"?\}/g;
    content = content.replace(curlyBracePattern, (match, attr, value) => {
      // Skip if it's a valid JSX expression that should have curly braces
      if (['onClick', 'onChange', 'onSubmit', 'ref', 'key', 'value', 'checked', 'disabled', 'required'].includes(attr)) {
        return match;
      }

      // For simple string values, remove curly braces
      if (!value.includes('{') && !value.includes('}') && !value.includes('(') && !value.includes(')')) {
        modified = true;
        return `${attr}="${value}"`;
      }

      return match;
    });

    if (modified) {
      console.log(`Final cleanup applied to: ${filePath}`);
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
  if (finalCleanup(file)) {
    cleanedCount++;
  }
}

console.log(`Applied final cleanup to ${cleanedCount} files.`);