#!/usr/bin/env node

/**
 * Batch fix script for Profile folder components
 * Fixes common JSX and TypeScript issues in Profile components
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

class ProfileComponentFixer {
  constructor() {
    this.fixedFiles = [];
    this.errors = [];
  }

  async fixAllProfileComponents() {
    console.log("🔧 Starting Profile Components Batch Fix...\n");

    // Get all tsx files in Profile folder
    const files = glob.sync("src/components/Profile/**/*.tsx");

    console.log(`Found ${files.length} TypeScript React files to process\n`);

    for (const file of files) {
      try {
        const fixed = await this.fixFile(file);
        if (fixed) {
          this.fixedFiles.push(file);
          console.log(`✅ Fixed: ${file}`);
        }
      } catch (error) {
        this.errors.push({ file, error: error.message });
        console.log(`❌ Error in: ${file} - ${error.message}`);
      }
    }

    this.generateReport();
  }

  async fixFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;
    const originalContent = content;

    // 1. Fix mixed case button closing tags
    if (content.includes("</button>")) {
      content = content.replace(/<\/button>/g, "</button>");
      modified = true;
    }

    // 2. Fix malformed onClick syntax
    const malformedOnClick =
      /onClick=\(\(\)\s*=\s*className="[^"]*">\s*([^}]*)\}/g;
    if (malformedOnClick.test(content)) {
      content = content.replace(
        /onClick=\(\(\)\s*=\s*className="([^"]*)"\>\s*([^}]*)\}/g,
        (match, className, funcCall) => {
          return `onClick={() => ${funcCall.trim()}}\n            className="${className}"`;
        }
      );
      modified = true;
    }

    // 3. Fix missing comma in function calls
    if (content.includes("setData({}), setIsModal(false)")) {
      content = content.replace(
        /setData\(\{\}\),\s*setIsModal\(false\);/g,
        "setData({});\n        setIsModal(false);"
      );
      modified = true;
    }

    if (content.includes("), setIsModal(true)")) {
      content = content.replace(
        /\}\),\s*setIsModal\(true\);/g,
        "});\n                  setIsModal(true);"
      );
      modified = true;
    }

    // 4. Add missing component imports where needed
    const needsButtonImport =
      content.includes("<Button") &&
      !content.includes("import") &&
      !content.includes("Button");
    const needsAvatarImport =
      content.includes("<Avatar") &&
      !content.includes("Avatar") &&
      !content.includes("import");
    const needsHStackImport =
      content.includes("<HStack") &&
      !content.includes("HStack") &&
      !content.includes("import");
    const needsVStackImport =
      content.includes("<VStack") &&
      !content.includes("VStack") &&
      !content.includes("import");
    const needsBoxImport =
      content.includes("<Box") &&
      !content.includes("Box") &&
      !content.includes("import");

    if (
      needsButtonImport ||
      needsAvatarImport ||
      needsHStackImport ||
      needsVStackImport ||
      needsBoxImport
    ) {
      const imports = [];
      if (needsButtonImport) imports.push("Button");
      if (needsAvatarImport) imports.push("Avatar");
      if (needsHStackImport) imports.push("HStack");
      if (needsVStackImport) imports.push("VStack");
      if (needsBoxImport) imports.push("Box");

      const importStatement = `import { ${imports.join(", ")} } from "@/components/ui/migration-helpers";\n`;

      // Add import after the last import statement
      const lastImportMatch = content.match(/^import .* from .*$/gm);
      if (lastImportMatch) {
        const lastImport = lastImportMatch[lastImportMatch.length - 1];
        content = content.replace(
          lastImport,
          lastImport + "\n" + importStatement
        );
        modified = true;
      }
    }

    // 5. Fix basic TypeScript interface issues for untyped components
    const untypedComponent =
      /const\s+(\w+)\s*=\s*\(\s*\{\s*([^}]+)\s*\}\s*\)\s*=>/;
    const match = content.match(untypedComponent);

    if (
      match &&
      !content.includes("interface") &&
      !content.includes("React.FC")
    ) {
      const componentName = match[1];
      const props = match[2].split(",").map((p) => p.trim());

      const interfaceName = `${componentName}Props`;
      const interfaceProps = props.map((prop) => `  ${prop}: any;`).join("\n");

      const interfaceDeclaration = `interface ${interfaceName} {\n${interfaceProps}\n}\n\n`;
      const typedComponent = `const ${componentName}: React.FC<${interfaceName}> = ({ ${props.join(", ")} }) =>`;

      content = content.replace(
        match[0],
        interfaceDeclaration + typedComponent
      );
      modified = true;
    }

    // 6. Fix unsupported Button props
    content = content.replace(/isLoading=\{[^}]*\}/g, "disabled={isLoading}");
    content = content.replace(/loadingText="[^"]*"/g, "");
    content = content.replace(/spinner=\{[^}]*\}/g, "");
    content = content.replace(/paddingX=\{?\d+\}?/g, 'className="px-4"');

    // Save file if modified
    if (modified) {
      fs.writeFileSync(filePath, content, "utf8");
      return true;
    }

    return false;
  }

  generateReport() {
    console.log("\n📊 Profile Components Fix Report");
    console.log("=".repeat(50));

    console.log(`\n✅ Successfully fixed: ${this.fixedFiles.length} files`);
    this.fixedFiles.forEach((file) => console.log(`   - ${file}`));

    if (this.errors.length > 0) {
      console.log(`\n❌ Errors encountered: ${this.errors.length} files`);
      this.errors.forEach(({ file, error }) =>
        console.log(`   - ${file}: ${error}`)
      );
    }

    console.log("\n🎯 Next steps:");
    console.log("   1. Run: npm run type-check");
    console.log("   2. Run: npm run lint");
    console.log("   3. Test components manually");
    console.log("   4. Run: npm run build");
  }
}

// Run the fixer
const fixer = new ProfileComponentFixer();
fixer.fixAllProfileComponents().catch(console.error);
