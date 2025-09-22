const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function fixImports() {
  try {
    // Find all TypeScript React files
    const output = execSync(`find src -name "*.tsx" -o -name "*.ts"`, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(file => file);

    console.log(`Found ${files.length} TypeScript files to process`);

    let totalFixed = 0;
    files.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Fix .ts imports
        if (content.includes('.ts"') || content.includes(".ts'")) {
          content = content.replace(/from\s+["']([^"']+)\.ts["']/g, 'from "$1"');
          modified = true;
        }

        // Fix .tsx imports
        if (content.includes('.tsx"') || content.includes(".tsx'")) {
          content = content.replace(/from\s+["']([^"']+)\.tsx["']/g, 'from "$1"');
          modified = true;
        }

        if (modified) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`✓ Fixed imports in ${file}`);
          totalFixed++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    });

    console.log(`\nFixed imports in ${totalFixed} files`);
  } catch (error) {
    console.error('Error finding files:', error.message);
  }
}

fixImports();