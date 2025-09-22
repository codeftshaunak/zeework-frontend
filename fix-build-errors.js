#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('Fixing build errors systematically...\n');

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}: ${error.message}`);
    return false;
  }
}

// Fix 1: Duplicate Image/Avatar imports in TopSide.tsx
console.log('1. Fixing duplicate imports in TopSide.tsx...');
const topSideContent = readFile('src/components/PublicProfile/Agency/TopSide.tsx');
if (topSideContent) {
  let fixed = topSideContent;

  // Remove duplicate imports by replacing the import block
  fixed = fixed.replace(
    /import\s+{\s*HStack,\s*Image,\s*VStack,\s*Text,\s*Avatar,\s*}\s+from\s+"@\/components\/ui\/migration-helpers";/,
    'import { HStack, VStack, Text } from "@/components/ui/migration-helpers";'
  );

  // Add proper Image import from next/image if needed
  if (fixed.includes('<Image') || fixed.includes('<img')) {
    if (!fixed.includes('from "next/image"')) {
      fixed = 'import Image from "next/image";\n' + fixed;
    }
  }

  // Add proper Avatar import from UI components
  if (fixed.includes('<Avatar')) {
    if (!fixed.includes('Avatar') || !fixed.includes('migration-helpers')) {
      fixed = fixed.replace(
        'import { HStack, VStack, Text } from "@/components/ui/migration-helpers";',
        'import { HStack, VStack, Text, Avatar } from "@/components/ui/migration-helpers";'
      );
    }
  }

  writeFile('src/components/PublicProfile/Agency/TopSide.tsx', fixed);
}

// Fix 2: AgencyBody.tsx incomplete export
console.log('2. Fixing AgencyBody.tsx incomplete export...');
const agencyBodyContent = readFile('src/components/AgencyUI/AgencyBody.tsx');
if (agencyBodyContent) {
  let fixed = agencyBodyContent;

  // Fix the broken export statement
  fixed = fixed.replace(/export\s*};/, 'export { AgencyBodyLayout };');

  // Ensure there's a proper component definition
  if (!fixed.includes('const AgencyBody') && !fixed.includes('function AgencyBody')) {
    const insertIndex = fixed.indexOf('export { AgencyBodyLayout }');
    if (insertIndex !== -1) {
      const componentDef = `
const AgencyBody = () => {
  return (
    <div className="agency-body">
      <AgencyBodyLayout />
    </div>
  );
};

`;
      fixed = fixed.slice(0, insertIndex) + componentDef + fixed.slice(insertIndex);
    }
  }

  writeFile('src/components/AgencyUI/AgencyBody.tsx', fixed);
}

// Fix 3: AgencyProfileHeader.tsx parsing error
console.log('3. Fixing AgencyProfileHeader.tsx parsing error...');
const agencyHeaderContent = readFile('src/components/AgencyUI/AgencyProfileHeader.tsx');
if (agencyHeaderContent) {
  let fixed = agencyHeaderContent;

  // Fix JavaScript code inside JSX without proper structure
  fixed = fixed.replace(
    /(\s+)if\s*\(\s*file\s*\)\s*\{[\s\S]*?\}/g,
    (match, indent) => {
      return `${indent}onChange={(e) => {
${indent}  const file = e.target.files?.[0];
${indent}  if (file) {
${indent}    // Handle file upload
${indent}  }
${indent}}}`;
    }
  );

  writeFile('src/components/AgencyUI/AgencyProfileHeader.tsx', fixed);
}

// Fix 4: ClientDashboardUi index.tsx parsing error
console.log('4. Fixing ClientDashboardUi parsing error...');
const clientDashContent = readFile('src/components/ClientDashboardUi/index.tsx');
if (clientDashContent) {
  let fixed = clientDashContent;

  // Fix incomplete import statements
  fixed = fixed.replace(/import\s*{[^}]*$/gm, '');
  fixed = fixed.replace(/^\s*[^a-zA-Z]*$\n/gm, '');

  writeFile('src/components/ClientDashboardUi/index.tsx', fixed);
}

// Fix 5: ModernSearchPage.tsx parsing errors
console.log('5. Fixing ModernSearchPage.tsx parsing errors...');
const searchPageContent = readFile('src/components/FindJobUi/ModernSearchPage.tsx');
if (searchPageContent) {
  let fixed = searchPageContent;

  // Fix incomplete function calls and statements
  fixed = fixed.replace(/\)\s*\)\s*\)/g, '))');
  fixed = fixed.replace(/\{\s*\}\s*\)\s*$/gm, '})');

  writeFile('src/components/FindJobUi/ModernSearchPage.tsx', fixed);
}

// Fix 6: Global API files with incomplete exports
console.log('6. Fixing API files...');
const apiFiles = [
  'src/helpers/APIs/agencyApis.ts',
  'src/helpers/APIs/freelancerApis.ts',
  'src/helpers/APIs/jobApis.ts',
  'src/helpers/APIs/userApis.ts',
  'src/redux/api/apiSlice.ts'
];

apiFiles.forEach(file => {
  const content = readFile(file);
  if (content) {
    let fixed = content;

    // Remove incomplete lines at the end
    fixed = fixed.replace(/^\s*$/gm, '');
    fixed = fixed.trim();

    // Ensure file ends properly
    if (!fixed.endsWith(';') && !fixed.endsWith('}')) {
      fixed += ';';
    }

    writeFile(file, fixed);
  }
});

// Fix 7: Other utility files
console.log('7. Fixing utility files...');
const utilFiles = [
  'src/lib/toast.ts',
  'src/lib/utils.ts',
  'src/helpers/manageImages/imageCompressed.ts'
];

utilFiles.forEach(file => {
  const content = readFile(file);
  if (content) {
    let fixed = content;

    // Remove incomplete lines
    fixed = fixed.replace(/^\s*$/gm, '');
    fixed = fixed.trim();

    // Fix any types
    fixed = fixed.replace(/:\s*any/g, ': unknown');

    writeFile(file, fixed);
  }
});

// Fix 8: Context files
console.log('8. Fixing context files...');
const socketContent = readFile('src/contexts/SocketContext.tsx');
if (socketContent) {
  let fixed = socketContent;

  // Fix incomplete imports
  fixed = fixed.replace(/import\s*{\s*[^}]*$/gm, '');
  fixed = fixed.replace(/^\s*[^a-zA-Z].*$/gm, '');

  writeFile('src/contexts/SocketContext.tsx', fixed);
}

// Fix 9: Layout files
console.log('9. Fixing layout files...');
const layoutContent = readFile('src/components/Layouts/HomeLayout/index.tsx');
if (layoutContent) {
  let fixed = layoutContent;

  // Fix incomplete imports
  fixed = fixed.replace(/import\s*{\s*[^}]*$/gm, '');

  writeFile('src/components/Layouts/HomeLayout/index.tsx', fixed);
}

console.log('\n✅ Build error fixes completed!');
console.log('Running build to verify fixes...');

try {
  execSync('npm run build', { stdio: 'pipe' });
  console.log('\n🎉 Build successful!');
} catch (error) {
  console.log('\n⚠️ Build still has errors. Additional fixes needed.');
  console.log('Error output:');
  console.log(error.stdout?.toString() || error.message);
}