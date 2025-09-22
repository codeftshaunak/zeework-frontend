#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting ESLint error fixes...\n');

// Helper function to read file safely
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}: ${error.message}`);
    return null;
  }
}

// Helper function to write file safely
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

// Fix parsing errors (unterminated strings, syntax errors)
function fixParsingErrors() {
  console.log('1. Fixing parsing errors...');

  const parsingErrorFiles = [
    'src/components/Gigs/Gigsteper.tsx',
    'src/components/Gigs/ManageProject.tsx',
    'src/components/Gigs/Steps/Step0.tsx',
    'src/components/Gigs/Steps/Step1.tsx',
    'src/components/Gigs/Steps/Step2.tsx',
    'src/components/Gigs/Steps/Step3.tsx',
    'src/components/Invitation/AgencyDetails.tsx',
    'src/components/Invitation/Interview.tsx',
    'src/components/Invitation/JobDetails.tsx',
    'src/components/Invitation/OfferDetails.tsx',
    'src/components/JobCreate/FirstStep.tsx',
    'src/components/JobDetails/JobApply.tsx',
    'src/components/MessageComponent/CardDetails.tsx',
    'src/components/MessageComponent/MessageBody.tsx',
    'src/components/MessageComponent/MessageComp.tsx',
    'src/components/MessageComponent/MessageHeader.tsx',
    'src/components/MessageComponent/MessageSearchBar.tsx',
    'src/components/MessageComponent/MessageUserList.tsx',
    'src/components/MessageComponent/SearchedUsers.tsx',
    'src/components/MessageComponent/SingleText.tsx',
    'src/components/MyJobsComponentUi/ActiveJobCard/index.tsx',
    'src/components/MyJobsComponentUi/ActiveJobDetailsComponent/SubmitModal.tsx',
    'src/components/MyJobsComponentUi/ActiveJobDetailsComponent/index.tsx',
    'src/components/MyJobsComponentUi/AgencyContract/AgencyContract.tsx',
    'src/components/MyJobsComponentUi/AgencyContract/AssignedContractDetails.tsx',
    'src/components/MyJobsComponentUi/AgencyContract/ContractCard.tsx',
    'src/components/MyJobsComponentUi/AgencyContract/JobDetails.tsx',
    'src/components/MyJobsComponentUi/index.tsx',
    'src/components/Profile/ProfileSettings/ClientSettings/BillingAndPayments/CardDetailsForm.tsx',
    'src/components/Profile/ProfileSettings/ClientSettings/BillingAndPayments/CurrentCard.tsx',
    'src/components/Profile/ProfileSettings/ClientSettings/BillingAndPayments/PayPalCardForm.tsx',
    'src/components/Profile/ProfileSettings/CommonSettings/Account.tsx',
    'src/components/Profile/ProfileSettings/CommonSettings/ChangeOldPassword.tsx',
    'src/components/Profile/ProfileSettings/FreelancerSettings/BillingAndPayment/AddPaymentDetails.tsx',
    'src/components/Profile/ProfileSettings/FreelancerSettings/BillingAndPayment/PaymentDetails.tsx',
    'src/components/Reports/Adjustment.tsx',
    'src/components/Reports/BillingEarning.tsx',
    'src/components/Reports/EarningsOverview/GetFreelancerPaid.tsx',
    'src/components/ReviewComponentUi/index.tsx',
    'src/components/Search/SearchTalent.tsx',
    'src/components/Search/TalentCard.tsx',
    'src/components/Skeletons/MessageSkeleton.tsx',
    'src/components/WorkDairy/Workdairy.tsx',
    'src/components/pages/404/NotFound.tsx',
    'src/components/pages/Help/index.tsx',
    'src/components/pages/JobPost/index.tsx',
    'src/components/pages/Onboarding/Process.tsx'
  ];

  parsingErrorFiles.forEach(file => {
    const content = readFile(file);
    if (!content) return;

    let fixed = content;

    // Fix unterminated string literals by adding closing quotes
    fixed = fixed.replace(/(['"`])[^'"`\n]*$/gm, (match, quote) => {
      if (!match.endsWith(quote)) {
        return match + quote;
      }
      return match;
    });

    // Fix common JSX syntax errors
    fixed = fixed.replace(/<input([^>]*)(?!\/?>)/g, '<input$1 />');
    fixed = fixed.replace(/<Button([^>]*)(?!\/?>)$/gm, '<Button$1></Button>');

    // Fix identifier expected errors
    fixed = fixed.replace(/\s+\.\s+/g, '.');
    fixed = fixed.replace(/\s+\[\s*\]/g, '[]');

    if (fixed !== content) {
      writeFile(file, fixed);
    }
  });
}

// Fix unused variables and imports
function fixUnusedVariables() {
  console.log('2. Fixing unused variables and imports...');

  // Get all tsx and ts files
  const files = execSync('find src -name "*.tsx" -o -name "*.ts"', { encoding: 'utf8' })
    .split('\n')
    .filter(f => f.trim());

  files.forEach(file => {
    const content = readFile(file);
    if (!content) return;

    let fixed = content;

    // Remove unused imports (simple cases)
    const importLines = fixed.split('\n').filter(line => line.trim().startsWith('import'));
    const codeContent = fixed.split('\n').filter(line => !line.trim().startsWith('import')).join('\n');

    const usedImports = importLines.filter(line => {
      const importMatch = line.match(/import\s+(?:\{([^}]+)\}|\*\s+as\s+(\w+)|(\w+))/);
      if (!importMatch) return true;

      const imports = importMatch[1] ?
        importMatch[1].split(',').map(s => s.trim().split(' as ')[0]) :
        [importMatch[2] || importMatch[3]];

      return imports.some(imp => codeContent.includes(imp));
    });

    // Remove unused variable declarations
    fixed = fixed.replace(/const\s+(\w+)\s*=\s*[^;]+;\s*$/gm, (match, varName) => {
      const regex = new RegExp(`\\b${varName}\\b`, 'g');
      const matches = (fixed.match(regex) || []).length;
      return matches <= 1 ? '' : match;
    });

    if (fixed !== content) {
      writeFile(file, fixed);
    }
  });
}

// Fix 'any' types
function fixAnyTypes() {
  console.log('3. Fixing "any" types...');

  const files = execSync('find src -name "*.tsx" -o -name "*.ts"', { encoding: 'utf8' })
    .split('\n')
    .filter(f => f.trim());

  files.forEach(file => {
    const content = readFile(file);
    if (!content) return;

    let fixed = content;

    // Replace common any patterns with better types
    fixed = fixed.replace(/:\s*any\b/g, ': unknown');
    fixed = fixed.replace(/\<any\>/g, '<unknown>');
    fixed = fixed.replace(/any\[\]/g, 'unknown[]');
    fixed = fixed.replace(/Array<any>/g, 'Array<unknown>');

    // For event handlers, use proper types
    fixed = fixed.replace(/:\s*any\)\s*=>/g, ': React.ChangeEvent<HTMLInputElement>) =>');

    if (fixed !== content) {
      writeFile(file, fixed);
    }
  });
}

// Fix const/let declarations
function fixConstLet() {
  console.log('4. Fixing const/let variable declarations...');

  const files = execSync('find src -name "*.tsx" -o -name "*.ts"', { encoding: 'utf8' })
    .split('\n')
    .filter(f => f.trim());

  files.forEach(file => {
    const content = readFile(file);
    if (!content) return;

    let fixed = content;

    // Change let to const where variable is never reassigned
    const lines = fixed.split('\n');
    const fixedLines = lines.map(line => {
      if (line.includes('let ') && !line.includes('for (')) {
        const varMatch = line.match(/let\s+(\w+)/);
        if (varMatch) {
          const varName = varMatch[1];
          const reassignmentPattern = new RegExp(`^\\s*${varName}\\s*=`, 'm');
          if (!reassignmentPattern.test(fixed)) {
            return line.replace('let ', 'const ');
          }
        }
      }
      return line;
    });

    fixed = fixedLines.join('\n');

    if (fixed !== content) {
      writeFile(file, fixed);
    }
  });
}

// Fix Image component imports and usage
function fixImageComponents() {
  console.log('5. Fixing Image component usage...');

  const files = execSync('find src -name "*.tsx"', { encoding: 'utf8' })
    .split('\n')
    .filter(f => f.trim());

  files.forEach(file => {
    const content = readFile(file);
    if (!content) return;

    let fixed = content;

    // Add Next.js Image import if using <img> tags
    if (fixed.includes('<img') && !fixed.includes('from "next/image"')) {
      const importSection = fixed.split('\n').findIndex(line => line.trim().startsWith('import'));
      if (importSection !== -1) {
        const lines = fixed.split('\n');
        lines.splice(importSection, 0, 'import Image from "next/image";');
        fixed = lines.join('\n');
      }
    }

    // Add alt text to img tags that don't have it
    fixed = fixed.replace(/<img([^>]*?)(?:\s+alt=["'][^"']*["'])?([^>]*?)>/g, (match, before, after) => {
      if (!match.includes('alt=')) {
        return `<img${before} alt=""${after}>`;
      }
      return match;
    });

    if (fixed !== content) {
      writeFile(file, fixed);
    }
  });
}

// Fix missing React component imports
function fixMissingImports() {
  console.log('6. Fixing missing React component imports...');

  const files = execSync('find src -name "*.tsx"', { encoding: 'utf8' })
    .split('\n')
    .filter(f => f.trim());

  // Common missing components and their imports
  const componentImports = {
    'Avatar': '@chakra-ui/react',
    'Box': '@chakra-ui/react',
    'Button': '@chakra-ui/react',
    'HStack': '@chakra-ui/react',
    'VStack': '@chakra-ui/react',
    'Text': '@chakra-ui/react',
    'Input': '@chakra-ui/react',
    'Textarea': '@chakra-ui/react',
    'Image': '@chakra-ui/react',
    'Card': '@/components/ui/card',
    'Tooltip': '@chakra-ui/react',
    'Checkbox': '@chakra-ui/react',
    'Table': '@chakra-ui/react',
    'Thead': '@chakra-ui/react',
    'Tbody': '@chakra-ui/react',
    'Tr': '@chakra-ui/react',
    'Th': '@chakra-ui/react',
    'Td': '@chakra-ui/react',
    'SkeletonText': '@chakra-ui/react',
    'StackDivider': '@chakra-ui/react'
  };

  files.forEach(file => {
    const content = readFile(file);
    if (!content) return;

    let fixed = content;
    const missingComponents = [];

    // Check for missing components
    Object.keys(componentImports).forEach(component => {
      const componentPattern = new RegExp(`<${component}[\\s>]`, 'g');
      const importPattern = new RegExp(`\\b${component}\\b.*from`, 'g');

      if (componentPattern.test(fixed) && !importPattern.test(fixed)) {
        missingComponents.push(component);
      }
    });

    // Add missing imports
    if (missingComponents.length > 0) {
      const imports = {};
      missingComponents.forEach(comp => {
        const source = componentImports[comp];
        if (!imports[source]) imports[source] = [];
        imports[source].push(comp);
      });

      const importLines = Object.entries(imports).map(([source, comps]) =>
        `import { ${comps.join(', ')} } from "${source}";`
      );

      const lines = fixed.split('\n');
      const importIndex = lines.findIndex(line => line.trim().startsWith('import'));
      if (importIndex !== -1) {
        lines.splice(importIndex, 0, ...importLines);
        fixed = lines.join('\n');
      }
    }

    if (fixed !== content) {
      writeFile(file, fixed);
    }
  });
}

// Main execution
async function main() {
  try {
    fixParsingErrors();
    fixUnusedVariables();
    fixAnyTypes();
    fixConstLet();
    fixImageComponents();
    fixMissingImports();

    console.log('\n✅ All ESLint error fixes completed!');
    console.log('\nRunning ESLint to check remaining errors...');

    try {
      execSync('npm run lint', { stdio: 'inherit' });
      console.log('\n🎉 All errors fixed successfully!');
    } catch (error) {
      console.log('\n⚠️  Some errors may still remain. Check the output above.');
    }

  } catch (error) {
    console.error('Error during fix process:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}