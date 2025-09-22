const fs = require('fs');
const { execSync } = require('child_process');

function addUseClientToPages() {
  try {
    // Find all TSX files in pages directory
    const output = execSync(`find src/components/pages -name "*.tsx"`, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(file => file);

    console.log(`Found ${files.length} page files to process`);

    let totalFixed = 0;
    files.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');

        // Check if already has "use client"
        if (!content.includes('"use client"') && !content.includes("'use client'")) {
          // Add "use client" at the beginning
          content = '"use client";\n\n' + content;
          fs.writeFileSync(file, content, 'utf8');
          console.log(`✓ Added "use client" to ${file}`);
          totalFixed++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    });

    console.log(`\nAdded "use client" to ${totalFixed} page files`);
  } catch (error) {
    console.error('Error finding files:', error.message);
  }
}

addUseClientToPages();