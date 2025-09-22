#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Migration mappings
const componentMappings = {
  // Import replacements
  "from '@chakra-ui/react'": "from '@/components/ui/migration-helpers'",

  // Component props mappings
  'alignItems="start"': 'align="start"',
  'alignItems="left"': 'align="start"',
  'alignItems="center"': 'align="center"',
  'alignItems="end"': 'align="end"',
  'alignItems={"start"}': 'align="start"',
  'alignItems={"left"}': 'align="start"',
  'alignItems={"center"}': 'align="center"',
  'alignItems={"end"}': 'align="end"',

  'width="full"': 'w="full"',
  'width="90%"': 'w="90%"',
  'width={"full"}': 'w="full"',
  'width={"90%"}': 'w="90%"',

  'fontSize="1.5rem"': 'fontSize="2xl"',
  'fontSize="1.2rem"': 'fontSize="xl"',
  'fontSize={"1.5rem"}': 'fontSize="2xl"',
  'fontSize={"1.2rem"}': 'fontSize="xl"',

  'fontWeight="600"': 'fontWeight="semibold"',
  'fontWeight="500"': 'fontWeight="medium"',
  'fontWeight={"600"}': 'fontWeight="semibold"',
  'fontWeight={"500"}': 'fontWeight="medium"',

  'padding="0.7rem 1rem"': 'p="4"',
  'padding={"0.7rem 1rem"}': 'p="4"',

  'justifyContent={\'space-between\'}': 'justifyContent="space-between"',
  'display={\'flex\'}': 'className="flex"',

  // Clean up props with curly braces to simple strings
  'borderRadius={"10px"}': 'borderRadius="10px"',
  'border={"1px solid #DFDFDF"}': 'border="1px solid #DFDFDF"',
  'color={"#000"}': 'color="#000"',
  'bg={"#fff"}': 'bg="#fff"',
};

// Function to migrate a single file
function migrateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Skip files that don't import from chakra-ui
    if (!content.includes('@chakra-ui')) {
      return false;
    }

    console.log(`Migrating: ${filePath}`);

    // Apply mappings
    for (const [oldPattern, newPattern] of Object.entries(componentMappings)) {
      if (content.includes(oldPattern)) {
        content = content.replace(new RegExp(oldPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPattern);
        modified = true;
      }
    }

    // Special handling for img tags to add proper className
    const imgRegex = /<img\s+src='([^']+)'\s+width="(\d+)px"\s+borderRadius="([^"]+)"\s*\/>/g;
    content = content.replace(imgRegex, (match, src, width, borderRadius) => {
      modified = true;
      return `<img src='${src}' className="w-[${width}px] h-[${width}px] rounded-${borderRadius === '50%' ? 'full' : borderRadius} object-cover" />`;
    });

    // Remove unused Image import from chakra-ui
    content = content.replace(/, Image(?=\s*})/g, '');
    content = content.replace(/{\s*Image\s*,\s*/g, '{');
    content = content.replace(/,\s*Image\s*}/g, '}');

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error migrating ${filePath}:`, error.message);
    return false;
  }
}

// Function to find all tsx/ts files
function findFiles(dir, extensions = ['.tsx', '.ts']) {
  let files = [];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and .git directories
      if (item !== 'node_modules' && item !== '.git' && item !== '.next') {
        files = files.concat(findFiles(fullPath, extensions));
      }
    } else if (stat.isFile()) {
      const ext = path.extname(item);
      if (extensions.includes(ext) && !item.endsWith('.bak')) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

// Main migration function
function migrate() {
  console.log('Starting Chakra UI to Tailwind migration...\n');

  const srcDir = path.join(__dirname, 'src');
  const files = findFiles(srcDir);

  let migratedCount = 0;
  let totalFiles = 0;

  for (const file of files) {
    totalFiles++;
    if (migrateFile(file)) {
      migratedCount++;
    }
  }

  console.log(`\nMigration complete!`);
  console.log(`Files processed: ${totalFiles}`);
  console.log(`Files migrated: ${migratedCount}`);
}

// Run migration
if (require.main === module) {
  migrate();
}

module.exports = { migrateFile, findFiles, migrate };