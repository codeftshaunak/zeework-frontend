const fs = require('fs');
const { execSync } = require('child_process');

function fixAllComponentImports() {
  try {
    // Find all TSX and TS files
    const output = execSync(`find src -name "*.tsx" -o -name "*.ts"`, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(file => file);

    console.log(`Found ${files.length} files to process for component import fixes`);

    let totalFixed = 0;
    files.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Fix common component import path patterns for pages directory
        if (file.includes('src/components/pages/')) {
          // From pages directory, components are at ../../[ComponentName]
          content = content.replace(/from ["']\.\.\/\.\.\/components\/([^"']+)["']/g, 'from "../../$1"');
        }

        // Fix other common patterns
        content = content.replace(/from ["']\.\.\/components\/([^"']+)["']/g, 'from "../$1"');
        content = content.replace(/from ["']\.\/components\/([^"']+)["']/g, 'from "./$1"');
        content = content.replace(/from ["']components\/([^"']+)["']/g, 'from "$1"');

        if (content !== originalContent) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`✓ Fixed component imports in ${file}`);
          totalFixed++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    });

    console.log(`\nFixed component imports in ${totalFixed} files`);
  } catch (error) {
    console.error('Error finding files:', error.message);
  }
}

fixAllComponentImports();