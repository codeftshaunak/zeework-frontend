#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixTypeScriptProps(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix Avatar props
    const avatarFixes = [
      { from: /marginTop=\{?"([^"]*)"?\}/g, to: 'className="mt-[$1]"' },
      { from: /marginRight=\{?"([^"]*)"?\}/g, to: 'className="mr-[$1]"' },
      { from: /marginBottom=\{?"([^"]*)"?\}/g, to: 'className="mb-[$1]"' },
      { from: /marginLeft=\{?"([^"]*)"?\}/g, to: 'className="ml-[$1]"' },
      { from: /margin=\{?"([^"]*)"?\}/g, to: 'className="m-[$1]"' },
    ];

    // Fix div/HTML element props that should be className
    const htmlElementFixes = [
      { from: /(\<div[^>]*)\s+display=\{?"([^"]*)"?\}/g, to: '$1 className="$2"' },
      { from: /(\<div[^>]*)\s+justifyContent=\{?"([^"]*)"?\}/g, to: '$1 className="justify-$2"' },
      { from: /(\<div[^>]*)\s+alignItems=\{?"([^"]*)"?\}/g, to: '$1 className="items-$2"' },
      { from: /(\<div[^>]*)\s+flexDirection=\{?"([^"]*)"?\}/g, to: '$1 className="flex-$2"' },
      { from: /(\<div[^>]*)\s+width=\{?"([^"]*)"?\}/g, to: '$1 className="w-[$2]"' },
      { from: /(\<div[^>]*)\s+height=\{?"([^"]*)"?\}/g, to: '$1 className="h-[$2]"' },
      { from: /(\<div[^>]*)\s+padding=\{?"([^"]*)"?\}/g, to: '$1 className="p-[$2]"' },
      { from: /(\<div[^>]*)\s+paddingX=\{?"([^"]*)"?\}/g, to: '$1 className="px-[$2]"' },
      { from: /(\<div[^>]*)\s+paddingY=\{?"([^"]*)"?\}/g, to: '$1 className="py-[$2]"' },
      { from: /(\<div[^>]*)\s+margin=\{?"([^"]*)"?\}/g, to: '$1 className="m-[$2]"' },
      { from: /(\<div[^>]*)\s+marginX=\{?"([^"]*)"?\}/g, to: '$1 className="mx-[$2]"' },
      { from: /(\<div[^>]*)\s+marginY=\{?"([^"]*)"?\}/g, to: '$1 className="my-[$2]"' },
      { from: /(\<div[^>]*)\s+bg=\{?"([^"]*)"?\}/g, to: '$1 className="bg-$2"' },
      { from: /(\<div[^>]*)\s+bgColor=\{?"([^"]*)"?\}/g, to: '$1 className="bg-$2"' },
      { from: /(\<div[^>]*)\s+borderRadius=\{?"([^"]*)"?\}/g, to: '$1 className="rounded-[$2]"' },
      { from: /(\<div[^>]*)\s+border=\{?"([^"]*)"?\}/g, to: '$1 className="border"' },
      { from: /(\<div[^>]*)\s+textAlign=\{?"([^"]*)"?\}/g, to: '$1 className="text-$2"' },
      { from: /(\<div[^>]*)\s+fontSize=\{?"([^"]*)"?\}/g, to: '$1 className="text-$2"' },
      { from: /(\<div[^>]*)\s+fontWeight=\{?"([^"]*)"?\}/g, to: '$1 className="font-$2"' },
      { from: /(\<div[^>]*)\s+color=\{?"([^"]*)"?\}/g, to: '$1 className="text-$2"' },
    ];

    // Fix Box component props (should already be handled by migration helpers, but just in case)
    const boxFixes = [
      { from: /(\<Box[^>]*)\s+marginTop=\{?"([^"]*)"?\}/g, to: '$1 mt="$2"' },
      { from: /(\<Box[^>]*)\s+marginRight=\{?"([^"]*)"?\}/g, to: '$1 mr="$2"' },
      { from: /(\<Box[^>]*)\s+marginBottom=\{?"([^"]*)"?\}/g, to: '$1 mb="$2"' },
      { from: /(\<Box[^>]*)\s+marginLeft=\{?"([^"]*)"?\}/g, to: '$1 ml="$2"' },
    ];

    // Fix Text component props
    const textFixes = [
      { from: /(\<Text[^>]*)\s+marginTop=\{?"([^"]*)"?\}/g, to: '$1 className="mt-[$2]"' },
      { from: /(\<Text[^>]*)\s+marginRight=\{?"([^"]*)"?\}/g, to: '$1 className="mr-[$2]"' },
      { from: /(\<Text[^>]*)\s+marginBottom=\{?"([^"]*)"?\}/g, to: '$1 className="mb-[$2]"' },
      { from: /(\<Text[^>]*)\s+marginLeft=\{?"([^"]*)"?\}/g, to: '$1 className="ml-[$2]"' },
      { from: /(\<Text[^>]*)\s+textAlign=\{?"([^"]*)"?\}/g, to: '$1 className="text-$2"' },
      { from: /(\<Text[^>]*)\s+overflow=\{?"([^"]*)"?\}/g, to: '$1 className="overflow-$2"' },
      { from: /(\<Text[^>]*)\s+my=\{?"([^"]*)"?\}/g, to: '$1 className="my-$2"' },
      { from: /(\<Text[^>]*)\s+mt=\{?"([^"]*)"?\}/g, to: '$1 className="mt-$2"' },
    ];

    // Fix VStack component props
    const vstackFixes = [
      { from: /(\<VStack[^>]*)\s+marginTop=\{?"([^"]*)"?\}/g, to: '$1 className="mt-[$2]"' },
      { from: /(\<VStack[^>]*)\s+paddingY=\{?"([^"]*)"?\}/g, to: '$1 className="py-[$2]"' },
      { from: /(\<VStack[^>]*)\s+lineHeight=\{?"([^"]*)"?\}/g, to: '$1 className="leading-[$2]"' },
      { from: /(\<VStack[^>]*)\s+width=\{?"([^"]*)"?\}/g, to: '$1 w="$2"' },
      { from: /(\<VStack[^>]*)\s+bgColor=\{?"([^"]*)"?\}/g, to: '$1 className="bg-$2"' },
      { from: /(\<VStack[^>]*)\s+justifyContent=\{?"([^"]*)"?\}/g, to: '$1 className="justify-$2"' },
      { from: /(\<VStack[^>]*)\s+padding=\{([^}]*)\}/g, to: '$1 p="$2"' },
    ];

    // Combine all fixes
    const allFixes = [...avatarFixes, ...htmlElementFixes, ...boxFixes, ...textFixes, ...vstackFixes];

    allFixes.forEach(fix => {
      const newContent = content.replace(fix.from, fix.to);
      if (newContent !== content) {
        modified = true;
        content = newContent;
      }
    });

    // Fix specific common value mappings
    const valueMappings = [
      { from: /className="justify-space-between"/g, to: 'className="justify-between"' },
      { from: /className="items-center"/g, to: 'className="items-center"' },
      { from: /className="text-center"/g, to: 'className="text-center"' },
      { from: /className="bg-white"/g, to: 'className="bg-white"' },
      { from: /className="w-\[300px\]"/g, to: 'className="w-[300px]"' },
      { from: /className="w-\[full\]"/g, to: 'className="w-full"' },
      { from: /className="overflow-hidden"/g, to: 'className="overflow-hidden"' },
      // Fix duplicate classNames that might be created
      { from: /className="([^"]*)" className="([^"]*)"/g, to: 'className="$1 $2"' },
      // Fix margin/padding values
      { from: /className="mt-\[10px\]"/g, to: 'className="mt-[10px]"' },
      { from: /className="py-\[25px\]"/g, to: 'className="py-[25px]"' },
    ];

    valueMappings.forEach(mapping => {
      const newContent = content.replace(mapping.from, mapping.to);
      if (newContent !== content) {
        modified = true;
        content = newContent;
      }
    });

    // Clean up any remaining invalid HTML attributes on div elements
    const invalidDivProps = [
      'textAlign', 'fontSize', 'fontWeight', 'color', 'bg', 'bgColor',
      'padding', 'paddingX', 'paddingY', 'margin', 'marginX', 'marginY',
      'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
      'display', 'justifyContent', 'alignItems', 'flexDirection',
      'borderRadius', 'lineHeight'
    ];

    invalidDivProps.forEach(prop => {
      const regex = new RegExp(`(\\<div[^>]*)\\s+${prop}=\\{?"[^"]*"?\\}`, 'g');
      const newContent = content.replace(regex, '$1');
      if (newContent !== content) {
        modified = true;
        content = newContent;
      }
    });

    if (modified) {
      console.log(`Fixed TypeScript props in: ${filePath}`);
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function findTsxFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && item !== 'node_modules' && item !== '.git' && item !== '.next') {
      files = files.concat(findTsxFiles(fullPath));
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts')) && !item.endsWith('.bak')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Main execution
const srcDir = path.join(__dirname, 'src');
const files = findTsxFiles(srcDir);

let fixedCount = 0;
for (const file of files) {
  if (fixTypeScriptProps(file)) {
    fixedCount++;
  }
}

console.log(`Fixed TypeScript props in ${fixedCount} files.`);