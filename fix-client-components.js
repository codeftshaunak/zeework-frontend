const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all TypeScript React files that use hooks but don't have "use client"
function findFilesToFix() {
  try {
    const output = execSync(`grep -r "useState\\|useEffect\\|useRef\\|useCallback\\|useMemo\\|useReducer" src/components --include="*.tsx" | grep -v "use client" | cut -d: -f1 | sort | uniq`, { encoding: 'utf8' });
    return output.trim().split('\n').filter(file => file && fs.existsSync(file));
  } catch (error) {
    return [];
  }
}

// Add "use client" directive to a file
function addUseClientDirective(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if already has "use client"
    if (content.includes('"use client"') || content.includes("'use client'")) {
      return false;
    }

    // Add "use client" at the beginning
    const newContent = '"use client";\n\n' + content;
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
const filesToFix = findFilesToFix();
console.log(`Found ${filesToFix.length} files that need "use client" directive`);

let fixedCount = 0;
filesToFix.forEach(file => {
  if (addUseClientDirective(file)) {
    console.log(`✓ Added "use client" to ${file}`);
    fixedCount++;
  } else {
    console.log(`- Skipped ${file} (already has directive or error)`);
  }
});

console.log(`\nFixed ${fixedCount} out of ${filesToFix.length} files`);