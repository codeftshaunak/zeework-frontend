#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixSyntaxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix malformed className with mixed Chakra props
    const patterns = [
      // Fix className="text width={"100%"}" patterns
      {
        regex: /className="([^"]*)\s+width=\{"([^"]+)"\}"/g,
        replacement: 'className="$1 w-[$2]"'
      },
      // Fix className="text position={"relative"}" patterns
      {
        regex: /className="([^"]*)\s+position=\{"([^"]+)"\}"/g,
        replacement: 'className="$1 relative"'
      },
      // Fix unterminated className strings like className="flex flex-col (newline)
      {
        regex: /className="([^"]*)\n(\s*[a-zA-Z]+=")/g,
        replacement: 'className="$1"\n$2'
      },
      // Fix mixed props in className
      {
        regex: /className="([^"]*)\s+(justifyContent|alignItems|width|height|border|borderRadius|gap)=\{?"([^"]+)"\}?"/g,
        replacement: (match, className, prop, value) => {
          const tailwindMap = {
            'justifyContent': {
              'center': 'justify-center',
              'start': 'justify-start',
              'left': 'justify-start',
              'space-between': 'justify-between'
            },
            'alignItems': {
              'center': 'items-center',
              'start': 'items-start'
            },
            'width': {
              '100%': 'w-full',
              'full': 'w-full'
            },
            'gap': {
              '10': 'gap-10'
            }
          };

          const tailwindClass = tailwindMap[prop]?.[value] || `${prop}-[${value}]`;
          return `className="${className} ${tailwindClass}"`;
        }
      }
    ];

    patterns.forEach(pattern => {
      if (typeof pattern.replacement === 'function') {
        content = content.replace(pattern.regex, pattern.replacement);
      } else {
        const newContent = content.replace(pattern.regex, pattern.replacement);
        if (newContent !== content) {
          modified = true;
          content = newContent;
        }
      }
    });

    // Fix specific syntax issues
    const specificFixes = [
      // Fix width={"100%"} standalone
      { from: /width=\{"100%"\}/g, to: 'className="w-full"' },
      { from: /width=\{"full"\}/g, to: 'className="w-full"' },
      { from: /position=\{"relative"\}/g, to: 'className="relative"' },

      // Fix broken JSX structures
      { from: /className="([^"]*)\s*border=\{[^}]*\}\s*width=\{[^}]*\}\s*borderRadius=\{[^}]*\}\s*justifyContent=\{[^}]*\}/g,
        to: 'className="$1 border w-full rounded justify-start"' },
    ];

    specificFixes.forEach(fix => {
      const newContent = content.replace(fix.from, fix.to);
      if (newContent !== content) {
        modified = true;
        content = newContent;
      }
    });

    if (modified) {
      console.log(`Fixed syntax errors in: ${filePath}`);
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
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
      files.push(fullPath);
    }
  }

  return files;
}

// Main execution
const srcDir = path.join(__dirname, 'src');
const files = findTsxFiles(srcDir);

let fixedCount = 0;
for (const file of files) {
  if (fixSyntaxErrors(file)) {
    fixedCount++;
  }
}

console.log(`Fixed syntax errors in ${fixedCount} files.`);