const fs = require('fs');
const { execSync } = require('child_process');

function fixAppRouterImports() {
  try {
    // Find all page.tsx files in the app directory
    const output = execSync(`find src/app -name "page.tsx"`, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(file => file);

    console.log(`Found ${files.length} App Router page files to process`);

    let totalFixed = 0;
    files.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Fix common patterns where pages try to import specific component names
        // Instead, import from the directory which should have an index.tsx
        content = content.replace(/from ["']\.\.\/\.\.\/components\/([^"']+)\/\w+["']/g, 'from "../../components/$1"');

        // Fix absolute component path issues
        content = content.replace(/from ["']\.\.\/\.\.\/components\/([^"']+)\/index["']/g, 'from "../../components/$1"');

        if (content !== originalContent) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`✓ Fixed App Router imports in ${file}`);
          totalFixed++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    });

    console.log(`\nFixed App Router imports in ${totalFixed} files`);
  } catch (error) {
    console.error('Error finding files:', error.message);
  }
}

fixAppRouterImports();