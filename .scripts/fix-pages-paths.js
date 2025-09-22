const fs = require('fs');
const { execSync } = require('child_process');

function fixPagesPaths() {
  try {
    // Find all TSX files in the pages directory
    const output = execSync(`find src/components/pages -name "*.tsx"`, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(file => file);

    console.log(`Found ${files.length} page files to process for path fixes`);

    let totalFixed = 0;
    files.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // From pages directory, need to go up 3 levels to get to src, then into the right directory
        // Example: src/components/pages/Login/index.tsx -> src/contexts/
        // Path should be: ../../../contexts/ not ../../contexts/

        // Fix contexts paths
        content = content.replace(/from ["']\.\.\/\.\.\/contexts\//g, 'from "../../../contexts/');

        // Fix helpers paths
        content = content.replace(/from ["']\.\.\/\.\.\/helpers\//g, 'from "../../../helpers/');

        // Fix hooks paths
        content = content.replace(/from ["']\.\.\/\.\.\/hooks\//g, 'from "../../../hooks/');

        // Fix redux paths
        content = content.replace(/from ["']\.\.\/\.\.\/redux\//g, 'from "../../../redux/');

        // Fix schemas paths
        content = content.replace(/from ["']\.\.\/\.\.\/schemas\//g, 'from "../../../schemas/');

        if (content !== originalContent) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`✓ Fixed paths in ${file}`);
          totalFixed++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    });

    console.log(`\nFixed paths in ${totalFixed} files`);
  } catch (error) {
    console.error('Error finding files:', error.message);
  }
}

fixPagesPaths();