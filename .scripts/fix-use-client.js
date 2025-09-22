#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixUseClientDirective(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if file has "use client" directive after imports
    if (content.includes('"use client"') || content.includes("'use client'")) {
      const lines = content.split('\n');
      let useClientIndex = -1;
      let firstImportIndex = -1;

      // Find the "use client" directive and first import
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if ((line === '"use client";' || line === "'use client';") && useClientIndex === -1) {
          useClientIndex = i;
        }
        if (line.startsWith('import ') && firstImportIndex === -1) {
          firstImportIndex = i;
        }
      }

      // If "use client" is found after imports, move it to the top
      if (useClientIndex > 0 && firstImportIndex >= 0 && useClientIndex > firstImportIndex) {
        console.log(`Fixing ${filePath}`);

        // Remove the "use client" line from its current position
        const useClientLine = lines[useClientIndex];
        lines.splice(useClientIndex, 1);

        // Add it at the beginning
        lines.unshift(useClientLine);
        lines.unshift(''); // Add empty line after "use client"

        // Write back to file
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        return true;
      }
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
  if (fixUseClientDirective(file)) {
    fixedCount++;
  }
}

console.log(`Fixed ${fixedCount} files with "use client" directive placement issues.`);