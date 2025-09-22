#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Running final build fixes...');

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
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error writing ${filePath}: ${error.message}`);
    return false;
  }
}

// Fix remaining incomplete if statements and JSX issues
const filesToFix = [
  'src/components/AgencyUI/AgencyProfileHeader.tsx',
  'src/components/Profile/ClientProfilePage.tsx',
  'src/components/JobDetails/JobDetails.tsx',
  'src/helpers/manageImages/imageCompressed.ts',
  'src/redux/api/apiSlice.ts',
  'src/schemas/agency-profile-schema.ts'
];

filesToFix.forEach(file => {
  console.log(`Fixing ${file}...`);
  let content = readFile(file);
  if (content) {
    // Fix incomplete if statements
    content = content.replace(/\/\/ TODO: Fix incomplete if statement\s*\n\s*([^}]*)\}/g,
      'if (code === 200) {\n          $1\n        }');

    // Fix incomplete export statements
    content = content.replace(/^export\s*$/gm, '');

    // Fix incomplete JSX
    content = content.replace(/\{\s*\}\s*\)/g, '{})}');

    // Fix missing function parameters
    content = content.replace(/compressImageToWebP\(\s*\n/g, 'compressImageToWebP(file)\n');

    // Fix incomplete variable declarations
    content = content.replace(/const\s+\w+\s*=\s*\n\s*const/g,
      (match) => match.replace('=\s*\n\s*const', '= undefined;\n      const'));

    writeFile(file, content);
  }
});

// Fix specific ViewFreelancerProfile issues
console.log('Fixing ViewFreelancerProfile...');
const viewProfilePath = 'src/components/PublicProfile/Freelancer/ViewFreelancerProfile.tsx';
let viewProfileContent = readFile(viewProfilePath);
if (viewProfileContent) {
  // Fix incomplete JSX patterns
  viewProfileContent = viewProfileContent.replace(/\}\)\s*\n\s*\}?\)\s*$/gm, '})\n                  )}\n                </div>');
  writeFile(viewProfilePath, viewProfileContent);
}

// Clean up any remaining syntax issues
const allFiles = [
  'src/components/pages/Login/index.tsx',
  'src/components/pages/SignUp/index.tsx',
  'src/lib/providers.tsx',
  'src/components/Layouts/HomeLayout/index.tsx'
];

allFiles.forEach(file => {
  let content = readFile(file);
  if (content) {
    // Remove any remaining orphaned exports
    content = content.replace(/^\s*export\s*;\s*$/gm, '');
    content = content.replace(/^\s*export\s*export\s*/gm, 'export ');

    // Fix any remaining incomplete statements
    content = content.replace(/\n\s*\n\s*\n+/g, '\n\n');
    content = content.trim();

    writeFile(file, content);
  }
});

console.log('✨ Final build fixes completed!');