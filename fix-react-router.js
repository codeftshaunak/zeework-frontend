const fs = require('fs');
const { execSync } = require('child_process');

function fixReactRouter() {
  try {
    // Find all TSX and TS files
    const output = execSync(`find src -name "*.tsx" -o -name "*.ts"`, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(file => file);

    console.log(`Found ${files.length} files to process for React Router replacements`);

    let totalFixed = 0;
    files.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Replace React Router imports with Next.js equivalents
        content = content.replace(/import\s*{\s*([^}]*useNavigate[^}]*)\s*}\s*from\s*["']react-router[-dom]*["']/g,
          'import { useRouter } from "next/navigation"');

        content = content.replace(/import\s*{\s*([^}]*useLocation[^}]*)\s*}\s*from\s*["']react-router[-dom]*["']/g,
          'import { usePathname, useSearchParams } from "next/navigation"');

        // Replace specific React Router hooks
        content = content.replace(/useNavigate\(\)/g, 'useRouter()');
        content = content.replace(/navigate\(/g, 'router.push(');
        content = content.replace(/const\s+navigate\s*=\s*useRouter\(\)/g, 'const router = useRouter()');

        // Replace useLocation usage
        content = content.replace(/useLocation\(\)/g, 'usePathname()');
        content = content.replace(/const\s+location\s*=\s*usePathname\(\)/g, 'const pathname = usePathname()');
        content = content.replace(/location\.pathname/g, 'pathname');

        // Replace react-router-dom Link with Next.js Link
        content = content.replace(/import\s*{\s*([^}]*Link[^}]*)\s*}\s*from\s*["']react-router-dom["']/g,
          'import Link from "next/link"');

        if (content !== originalContent) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`✓ Fixed React Router imports in ${file}`);
          totalFixed++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    });

    console.log(`\nFixed React Router imports in ${totalFixed} files`);
  } catch (error) {
    console.error('Error finding files:', error.message);
  }
}

fixReactRouter();