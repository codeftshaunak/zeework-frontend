const fs = require('fs');
const { execSync } = require('child_process');

function fixChakraForms() {
  try {
    // Find all TSX and TS files
    const output = execSync(`find src -name "*.tsx" -o -name "*.ts"`, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(file => file);

    console.log(`Found ${files.length} files to process for Chakra UI form fixes`);

    let totalFixed = 0;
    files.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Remove FormControl and FormLabel from imports
        content = content.replace(/,\s*FormControl/g, '');
        content = content.replace(/FormControl,\s*/g, '');
        content = content.replace(/,\s*FormLabel/g, '');
        content = content.replace(/FormLabel,\s*/g, '');

        // Fix usage in JSX - replace FormControl with Box
        content = content.replace(/<FormControl([^>]*)>/g, '<Box$1>');
        content = content.replace(/<\/FormControl>/g, '</Box>');

        // Fix usage in JSX - replace FormLabel with Text
        content = content.replace(/<FormLabel([^>]*)>/g, '<Text$1 mb={2}>');
        content = content.replace(/<\/FormLabel>/g, '</Text>');

        if (content !== originalContent) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`✓ Fixed Chakra UI form components in ${file}`);
          totalFixed++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    });

    console.log(`\nFixed Chakra UI form components in ${totalFixed} files`);
  } catch (error) {
    console.error('Error finding files:', error.message);
  }
}

fixChakraForms();