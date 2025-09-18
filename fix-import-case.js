const fs = require('fs');
const { execSync } = require('child_process');

function fixImportCases() {
  try {
    // Find all TSX and TS files
    const output = execSync(`find src -name "*.tsx" -o -name "*.ts"`, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(file => file);

    console.log(`Found ${files.length} files to process`);

    let totalFixed = 0;
    files.forEach(file => {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Fix common case issues for Components
        content = content.replace(/from ["']\.\.\/\.\.\/Components\//g, 'from "../../components/');
        content = content.replace(/from ["']\.\.\/Components\//g, 'from "../components/');
        content = content.replace(/from ["']\.\/Components\//g, 'from "./components/');
        content = content.replace(/from ["']Components\//g, 'from "components/');
        content = content.replace(/from ["']\.\.\/\.\.\/\.\.\/Components\//g, 'from "../../../components/');

        // Fix common case issues for Contexts
        content = content.replace(/from ["']\.\.\/\.\.\/Contexts\//g, 'from "../../contexts/');
        content = content.replace(/from ["']\.\.\/Contexts\//g, 'from "../contexts/');
        content = content.replace(/from ["']\.\/Contexts\//g, 'from "./contexts/');
        content = content.replace(/from ["']Contexts\//g, 'from "contexts/');
        content = content.replace(/from ["']\.\.\/\.\.\/\.\.\/Contexts\//g, 'from "../../../contexts/');

        // Fix other common directory case issues
        content = content.replace(/from ["']\.\.\/\.\.\/Redux\//g, 'from "../../redux/');
        content = content.replace(/from ["']\.\.\/Redux\//g, 'from "../redux/');
        content = content.replace(/from ["']\.\/Redux\//g, 'from "./redux/');
        content = content.replace(/from ["']Redux\//g, 'from "redux/');

        content = content.replace(/from ["']\.\.\/\.\.\/Helpers\//g, 'from "../../helpers/');
        content = content.replace(/from ["']\.\.\/Helpers\//g, 'from "../helpers/');
        content = content.replace(/from ["']\.\/Helpers\//g, 'from "./helpers/');
        content = content.replace(/from ["']Helpers\//g, 'from "helpers/');

        // Fix Layouts directory case issues
        content = content.replace(/from ["']\.\.\/\.\.\/Layouts\//g, 'from "../../components/Layouts/');
        content = content.replace(/from ["']\.\.\/Layouts\//g, 'from "../Layouts/');
        content = content.replace(/from ["']\.\/Layouts\//g, 'from "./Layouts/');
        content = content.replace(/from ["']Layouts\//g, 'from "Layouts/');

        // Fix Schema directory case issues
        content = content.replace(/from ["']\.\.\/\.\.\/Schema\//g, 'from "../../schemas/');
        content = content.replace(/from ["']\.\.\/Schema\//g, 'from "../schemas/');
        content = content.replace(/from ["']\.\/Schema\//g, 'from "./schemas/');
        content = content.replace(/from ["']Schema\//g, 'from "schemas/');

        if (content !== originalContent) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`✓ Fixed import cases in ${file}`);
          totalFixed++;
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    });

    console.log(`\nFixed import cases in ${totalFixed} files`);
  } catch (error) {
    console.error('Error finding files:', error.message);
  }
}

fixImportCases();