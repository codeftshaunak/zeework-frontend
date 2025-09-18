const fs = require('fs');
const { execSync } = require('child_process');

function fixAppRouterSmart() {
  try {
    // Find all page.tsx files in the app directory
    const output = execSync(`find src/app -name "page.tsx"`, { encoding: 'utf8' });
    const appPages = output.trim().split('\n').filter(file => file);

    console.log(`Found ${appPages.length} App Router page files to process`);

    const componentMapping = {
      'login': 'Login',
      'signup': 'SignUp',
      'onboarding': 'Onboarding',
      'marketplace': 'Marketplace',
      'find-job': '{ AllJobs }',
      'client-dashboard': 'ClientDashboard',
      'agency': 'Agency',
      'profile': 'Profile',
      'message': 'Message',
      'reports': 'Reports',
      'downloads': 'Downloads',
      'help': 'Help',
      'contract': 'Contract',
      'time-tracker': 'TimeTracker',
      'billing-and-payments': 'BillingAndPayments',
      'my-jobs': 'MyJobs',
      'search-freelancers': 'SearchFreelancers',
      'hire-freelancer': 'HireFreelancer',
      'gig-purchases-invitation': 'GigPurchasesInvitation',
      'invitation': 'Invitation',
      'job-post': 'JobPost',
      'review': 'Review',
      'contract-details': 'ContractDetails',
      'apply-job': 'ApplyJob',
      'success': 'Success',
      'assigned-job-details': 'AssignedJobDetails',
      'complete-job-details': 'CompleteJobDetails',
      'searched-marketplace': 'SearchedMarketplace',
      'agency-contract-assign': 'AgencyContractAssign',
      'client-job-post-view': 'ClientJobPostView',
      'search-freelancer': 'SearchFreelancer',
      'forget-password': 'ForgetPassword'
    };

    let totalFixed = 0;
    appPages.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Extract route name from file path
        const routeMatch = file.match(/src\/app\/([^\/]+)\/page\.tsx$/);
        if (routeMatch) {
          const routeName = routeMatch[1];
          const componentImport = componentMapping[routeName];

          if (componentImport) {
            // Check if it's a named export (contains braces)
            if (componentImport.includes('{')) {
              content = content.replace(/import\s+\w+\s+from\s+["'][^"']+["'];/, `import ${componentImport} from "../../components/pages/${routeName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}";`);
              // Fix the component usage in return statement
              const componentName = componentImport.replace(/[{}]/g, '').trim();
              content = content.replace(/return\s+<\w+\s*\/>;/, `return <${componentName} />;`);
            } else {
              content = content.replace(/import\s+\w+\s+from\s+["'][^"']+["'];/, `import ${componentImport} from "../../components/pages/${routeName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}";`);
              content = content.replace(/return\s+<\w+\s*\/>;/, `return <${componentImport} />;`);
            }
          }
        }

        if (content !== originalContent) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`✓ Fixed App Router imports in ${file}`);
          totalFixed++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    });

    console.log(`\nFixed App Router imports in ${totalFixed} files`);
  } catch (error) {
    console.error('Error finding files:', error.message);
  }
}

fixAppRouterSmart();