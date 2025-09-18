const fs = require('fs');
const { execSync } = require('child_process');

function fixDuplicateVars() {
  try {
    // Find all TSX and TS files
    const output = execSync(`find src -name "*.tsx" -o -name "*.ts"`, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(file => file);

    console.log(`Found ${files.length} files to process for duplicate variable fixes`);

    let totalFixed = 0;
    files.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Fix duplicate pathname declarations
        content = content.replace(/const pathname = usePathname\(\);\s*const pathname = pathname/g, 'const pathname = usePathname();');

        // Fix incomplete router declarations
        content = content.replace(/const router = useRouter\(\);\s*const router = router/g, 'const router = useRouter();');

        // Fix bad Next.js navigation imports
        content = content.replace(/import { useLocation, useNavigate } from "next\/navigation"/g, 'import { useRouter, usePathname } from "next/navigation"');

        // Remove lingering React Router references
        content = content.replace(/location\.pathname/g, 'pathname');

        if (content !== originalContent) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`✓ Fixed duplicate variables in ${file}`);
          totalFixed++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    });

    console.log(`\nFixed duplicate variables in ${totalFixed} files`);
  } catch (error) {
    console.error('Error finding files:', error.message);
  }
}

fixDuplicateVars();