#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function convertToPureTailwind(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Mapping of Chakra/CSS props to Tailwind classes
    const propToTailwindMap = {
      // Font sizes
      'fontSize="0.8rem"': 'text-xs',
      'fontSize="0.9rem"': 'text-sm',
      'fontSize="1rem"': 'text-base',
      'fontSize="1.2rem"': 'text-xl',
      'fontSize="1.4rem"': 'text-2xl',
      'fontSize="1.5rem"': 'text-2xl',
      'fontSize="1.6rem"': 'text-3xl',
      'fontSize="2rem"': 'text-4xl',
      'fontSize="lg"': 'text-lg',
      'fontSize="xl"': 'text-xl',
      'fontSize="2xl"': 'text-2xl',
      'fontSize="md"': 'text-base',
      'fontSize="sm"': 'text-sm',
      'fontSize="xs"': 'text-xs',

      // Font weights
      'fontWeight="400"': 'font-normal',
      'fontWeight="500"': 'font-medium',
      'fontWeight="600"': 'font-semibold',
      'fontWeight="700"': 'font-bold',
      'fontWeight="800"': 'font-extrabold',
      'fontWeight="semibold"': 'font-semibold',
      'fontWeight="medium"': 'font-medium',
      'fontWeight="bold"': 'font-bold',
      'fontWeight="normal"': 'font-normal',

      // Text alignment
      'textAlign="center"': 'text-center',
      'textAlign="left"': 'text-left',
      'textAlign="right"': 'text-right',
      'textAlign="justify"': 'text-justify',

      // Overflow
      'overflow="hidden"': 'overflow-hidden',
      'overflow="visible"': 'overflow-visible',
      'overflow="scroll"': 'overflow-scroll',
      'overflow="auto"': 'overflow-auto',

      // Display
      'display="flex"': 'flex',
      'display="block"': 'block',
      'display="inline"': 'inline',
      'display="inline-block"': 'inline-block',
      'display="none"': 'hidden',

      // Justify content
      'justifyContent="center"': 'justify-center',
      'justifyContent="start"': 'justify-start',
      'justifyContent="end"': 'justify-end',
      'justifyContent="between"': 'justify-between',
      'justifyContent="around"': 'justify-around',
      'justifyContent="evenly"': 'justify-evenly',
      'justifyContent="space-between"': 'justify-between',

      // Align items
      'alignItems="center"': 'items-center',
      'alignItems="start"': 'items-start',
      'alignItems="end"': 'items-end',
      'alignItems="stretch"': 'items-stretch',
      'alignItems="baseline"': 'items-baseline',

      // Width
      'width="100%"': 'w-full',
      'width="full"': 'w-full',
      'width="50%"': 'w-1/2',
      'width="25%"': 'w-1/4',
      'width="75%"': 'w-3/4',
      'width="auto"': 'w-auto',
      'w="full"': 'w-full',
      'w="100%"': 'w-full',
      'w="50%"': 'w-1/2',
      'w="auto"': 'w-auto',

      // Height
      'height="100%"': 'h-full',
      'height="full"': 'h-full',
      'height="auto"': 'h-auto',
      'height="2rem"': 'h-8',
      'height="10rem"': 'h-40',
      'h="full"': 'h-full',
      'h="100%"': 'h-full',
      'h="auto"': 'h-auto',

      // Margins
      'mt="1"': 'mt-1',
      'mt="2"': 'mt-2',
      'mt="3"': 'mt-3',
      'mt="4"': 'mt-4',
      'mt="5"': 'mt-5',
      'mb="1"': 'mb-1',
      'mb="2"': 'mb-2',
      'mb="3"': 'mb-3',
      'mb="4"': 'mb-4',
      'mb="5"': 'mb-5',
      'my="1"': 'my-1',
      'my="2"': 'my-2',
      'my="3"': 'my-3',
      'my="4"': 'my-4',
      'my="5"': 'my-5',

      // Padding
      'p="1"': 'p-1',
      'p="2"': 'p-2',
      'p="3"': 'p-3',
      'p="4"': 'p-4',
      'p="5"': 'p-5',
      'px="1"': 'px-1',
      'px="2"': 'px-2',
      'px="3"': 'px-3',
      'px="4"': 'px-4',
      'px="5"': 'px-5',
      'py="1"': 'py-1',
      'py="2"': 'py-2',
      'py="3"': 'py-3',
      'py="4"': 'py-4',
      'py="5"': 'py-5',

      // Background colors
      'bg="white"': 'bg-white',
      'bg="black"': 'bg-black',
      'bg="gray.100"': 'bg-gray-100',
      'bg="gray.200"': 'bg-gray-200',
      'bg="red.500"': 'bg-red-500',
      'bg="blue.500"': 'bg-blue-500',
      'bg="green.500"': 'bg-green-500',
      'bgColor="white"': 'bg-white',
      'bgColor="black"': 'bg-black',

      // Border radius
      'borderRadius="md"': 'rounded-md',
      'borderRadius="lg"': 'rounded-lg',
      'borderRadius="xl"': 'rounded-xl',
      'borderRadius="full"': 'rounded-full',
      'borderRadius="none"': 'rounded-none',
      'borderRadius="sm"': 'rounded-sm',
      'rounded="md"': 'rounded-md',
      'rounded="lg"': 'rounded-lg',
      'rounded="xl"': 'rounded-xl',
      'rounded="full"': 'rounded-full',

      // Colors
      'color="white"': 'text-white',
      'color="black"': 'text-black',
      'color="gray.500"': 'text-gray-500',
      'color="red.500"': 'text-red-500',
      'color="blue.500"': 'text-blue-500',
      'color="green.500"': 'text-green-500',

      // Cursor
      'cursor="pointer"': 'cursor-pointer',
      'cursor="default"': 'cursor-default',
      'cursor="not-allowed"': 'cursor-not-allowed',

      // Position
      'position="relative"': 'relative',
      'position="absolute"': 'absolute',
      'position="fixed"': 'fixed',
      'position="sticky"': 'sticky',

      // Border
      'border="1px solid #DFDFDF"': 'border border-gray-300',
      'border="1px solid var(--bordersecondary)"': 'border border-gray-200',
      'border="0.1px solid var(--bordersecondary)"': 'border border-gray-200',

      // Text transform
      'textTransform="capitalize"': 'capitalize',
      'textTransform="uppercase"': 'uppercase',
      'textTransform="lowercase"': 'lowercase',

      // Line height
      'lineHeight="20px"': 'leading-5',
      'lineHeight="24px"': 'leading-6',
      'lineHeight="normal"': 'leading-normal',

      // Variants (for Button components)
      'variant="outline"': '',
      'variant="solid"': '',
      'variant="ghost"': '',
      'variant="simple"': '',

      // Size props
      'size="sm"': '',
      'size="md"': '',
      'size="lg"': '',
      'size="xl"': '',

      // Color schemes
      'colorScheme="primary"': '',
      'colorScheme="red"': '',
      'colorScheme="blue"': '',
      'colorScheme="green"': '',
    };

    // Function to extract existing className and merge with new classes
    function mergeWithClassName(match, existingProps, newTailwindClass) {
      // Find existing className in the match
      const classNameMatch = match.match(/className="([^"]*)"/);
      const existingClasses = classNameMatch ? classNameMatch[1] : '';

      // Remove the prop we're replacing and className temporarily
      let cleanedMatch = match;
      Object.keys(propToTailwindMap).forEach(prop => {
        const regex = new RegExp(`\\s+${prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
        cleanedMatch = cleanedMatch.replace(regex, '');
      });

      // Remove existing className
      cleanedMatch = cleanedMatch.replace(/\s+className="[^"]*"/, '');

      // Combine all classes
      const allClasses = [existingClasses, newTailwindClass].filter(c => c.trim()).join(' ');
      const uniqueClasses = [...new Set(allClasses.split(' ').filter(c => c.trim()))].join(' ');

      // Return the cleaned match with new className
      return cleanedMatch.replace(/(\w+)(\s*=\s*{[^}]*}|\s*[^>]*?)>/, `$1 className="${uniqueClasses}">`)
        .replace(/className="\s*"/, 'className=""')
        .replace(/\s+className=""/, '');
    }

    // Process each element type (Text, span, div, etc.)
    const elementTypes = ['Text', 'span', 'div', 'Button', 'Box', 'VStack', 'HStack', 'Flex'];

    elementTypes.forEach(elementType => {
      // Create regex to match the element with any combination of props
      const elementRegex = new RegExp(`<${elementType}([^>]*?)>`, 'g');

      content = content.replace(elementRegex, (match) => {
        let modifiedMatch = match;
        let tailwindClasses = [];
        let hasChanges = false;

        // Check for each prop and collect corresponding Tailwind classes
        Object.entries(propToTailwindMap).forEach(([prop, tailwindClass]) => {
          if (modifiedMatch.includes(prop)) {
            if (tailwindClass) { // Only add non-empty classes
              tailwindClasses.push(tailwindClass);
            }
            // Remove the prop from the match
            const propRegex = new RegExp(`\\s+${prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
            modifiedMatch = modifiedMatch.replace(propRegex, '');
            hasChanges = true;
          }
        });

        if (hasChanges) {
          // Get existing className
          const classNameMatch = modifiedMatch.match(/className="([^"]*)"/);
          const existingClasses = classNameMatch ? classNameMatch[1] : '';

          // Combine all classes
          const allClasses = [existingClasses, ...tailwindClasses].filter(c => c.trim()).join(' ');
          const uniqueClasses = [...new Set(allClasses.split(' ').filter(c => c.trim()))].join(' ');

          // Remove existing className and add the new one
          modifiedMatch = modifiedMatch.replace(/\s+className="[^"]*"/, '');
          if (uniqueClasses) {
            modifiedMatch = modifiedMatch.replace(/(<\w+[^>]*?)>/, `$1 className="${uniqueClasses}">`);
          }

          modified = true;
        }

        return modifiedMatch;
      });
    });

    // Additional cleanup - remove any remaining standalone invalid props
    const invalidProps = [
      'fontSize', 'fontWeight', 'textAlign', 'overflow', 'display',
      'justifyContent', 'alignItems', 'width', 'height', 'color',
      'bg', 'bgColor', 'borderRadius', 'rounded', 'textTransform',
      'lineHeight', 'cursor', 'position', 'border'
    ];

    invalidProps.forEach(prop => {
      const regex = new RegExp(`\\s+${prop}=(?:"[^"]*"|{[^}]*})`, 'g');
      const newContent = content.replace(regex, '');
      if (newContent !== content) {
        modified = true;
        content = newContent;
      }
    });

    if (modified) {
      console.log(`Converted to pure Tailwind: ${filePath}`);
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

let convertedCount = 0;
for (const file of files) {
  if (convertToPureTailwind(file)) {
    convertedCount++;
  }
}

console.log(`Converted ${convertedCount} files to pure Tailwind classes.`);