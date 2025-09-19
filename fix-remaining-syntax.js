#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixRemainingSyntax(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    const fixes = [
      // Fix duplicate className attributes
      { from: /className="([^"]*)" className="([^"]*)"/g, to: 'className="$1 $2"' },

      // Fix mixed props with display, width, etc.
      { from: /display=\{\{\s*lg:\s*"flex"\s*\}\}/g, to: 'className="lg:flex"' },
      { from: /width=\{"95%"\}/g, to: 'className="w-[95%]"' },
      { from: /paddingY=\{"20px"\}/g, to: 'className="py-[20px]"' },
      { from: /padding=\{"20px"\}/g, to: 'className="p-[20px]"' },
      { from: /marginTop=\{"10px"\}/g, to: 'className="mt-[10px]"' },
      { from: /justifyContent=\{"space-between"\}/g, to: 'className="justify-between"' },
      { from: /alignItems=\{"center"\}/g, to: 'className="items-center"' },

      // Fix broken JSX tag closures
      { from: /(\w+)=\{[^}]*\}>\s*(\w+)=\{/g, to: '$1={...} className="..." $2={' },

      // Clean up malformed attributes
      { from: /\s+border=\{[^}]*\}\s+width=\{[^}]*\}/g, to: ' className="border w-full"' },
      { from: /\s+borderRadius=\{[^}]*\}/g, to: ' className="rounded"' },
    ];

    fixes.forEach(fix => {
      const newContent = content.replace(fix.from, fix.to);
      if (newContent !== content) {
        modified = true;
        content = newContent;
      }
    });

    if (modified) {
      console.log(`Fixed remaining syntax errors in: ${filePath}`);
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

let fixedCount = 0;
for (const file of files) {
  if (fixRemainingSyntax(file)) {
    fixedCount++;
  }
}

console.log(`Fixed remaining syntax errors in ${fixedCount} files.`);