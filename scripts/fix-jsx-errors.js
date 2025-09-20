#!/usr/bin/env node

/**
 * JSX Error Detection and Auto-Fix Script
 * Scans .tsx files for common JSX parsing errors and provides fixes
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class JSXErrorFixer {
  constructor() {
    this.errors = [];
    this.fixes = [];
    this.patterns = {
      // Common JSX parsing errors
      malformedButton: /onClick=\(\(\)\s*=\s*className="[^"]*">\s*([^}]*)\}/g,
      unclosedTags: /<([a-zA-Z][a-zA-Z0-9]*)[^>]*>(?![^<]*<\/\1>)[^<]*$/gm,
      missingImports: {
        Box: /\<Box\s/g,
        HStack: /\<HStack\s/g,
        VStack: /\<VStack\s/g,
        Button: /\<Button\s/g,
        Text: /\<Text\s/g,
        Avatar: /\<Avatar\s/g
      },
      mixedClosingTags: /<([A-Z][a-zA-Z0-9]*)[^>]*>[\s\S]*?<\/([a-z]+)>/g,
      invalidJSX: /\{\s*[^}]*\s*=\s*className=/g,
      missingComma: /\}\),\s*([a-zA-Z_$][a-zA-Z0-9_$]*\()/g
    };
  }

  async scanFiles(pattern = 'src/**/*.tsx') {
    const files = glob.sync(pattern, {
      ignore: ['node_modules/**', 'dist/**', 'build/**']
    });

    console.log(`🔍 Scanning ${files.length} TSX files for JSX errors...\n`);

    for (const file of files) {
      await this.analyzeFile(file);
    }

    this.generateReport();
    return this.errors;
  }

  async analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      // Check for malformed button onClick syntax
      this.checkMalformedButtons(content, filePath, lines);

      // Check for missing imports
      this.checkMissingImports(content, filePath, lines);

      // Check for unclosed tags
      this.checkUnclosedTags(content, filePath, lines);

      // Check for mixed case closing tags
      this.checkMixedClosingTags(content, filePath, lines);

      // Check for invalid JSX syntax
      this.checkInvalidJSX(content, filePath, lines);

      // Check for missing commas in function calls
      this.checkMissingCommas(content, filePath, lines);

    } catch (error) {
      console.error(`❌ Error reading file ${filePath}:`, error.message);
    }
  }

  checkMalformedButtons(content, filePath, lines) {
    const matches = [...content.matchAll(this.patterns.malformedButton)];
    matches.forEach(match => {
      const lineNumber = this.getLineNumber(content, match.index);
      this.errors.push({
        type: 'MALFORMED_BUTTON',
        file: filePath,
        line: lineNumber,
        content: lines[lineNumber - 1]?.trim(),
        fix: 'Replace malformed onClick syntax with proper JSX syntax'
      });
    });
  }

  checkMissingImports(content, filePath, lines) {
    const imports = content.match(/import\s+\{[^}]*\}\s+from\s+['"][^'"]*['"]/g) || [];
    const allImports = imports.join(' ');

    Object.entries(this.patterns.missingImports).forEach(([component, pattern]) => {
      if (pattern.test(content) && !allImports.includes(component)) {
        this.errors.push({
          type: 'MISSING_IMPORT',
          file: filePath,
          line: 1,
          component,
          fix: `Add import for ${component} component`
        });
      }
    });
  }

  checkUnclosedTags(content, filePath, lines) {
    // This is a simplified check - in practice, you'd want a proper JSX parser
    const openTags = content.match(/<[A-Z][a-zA-Z0-9]*[^>]*(?<!\/)>/g) || [];
    const closeTags = content.match(/<\/[A-Z][a-zA-Z0-9]*>/g) || [];

    if (openTags.length !== closeTags.length) {
      this.errors.push({
        type: 'UNMATCHED_TAGS',
        file: filePath,
        line: 'Multiple',
        fix: 'Check for unmatched opening/closing tags'
      });
    }
  }

  checkMixedClosingTags(content, filePath, lines) {
    const matches = [...content.matchAll(this.patterns.mixedClosingTags)];
    matches.forEach(match => {
      if (match[1] !== match[2] && match[1].toLowerCase() === match[2]) {
        const lineNumber = this.getLineNumber(content, match.index);
        this.errors.push({
          type: 'MIXED_CASE_TAGS',
          file: filePath,
          line: lineNumber,
          content: lines[lineNumber - 1]?.trim(),
          fix: `Change </${match[2]}> to </${match[1]}>`
        });
      }
    });
  }

  checkInvalidJSX(content, filePath, lines) {
    const matches = [...content.matchAll(this.patterns.invalidJSX)];
    matches.forEach(match => {
      const lineNumber = this.getLineNumber(content, match.index);
      this.errors.push({
        type: 'INVALID_JSX_SYNTAX',
        file: filePath,
        line: lineNumber,
        content: lines[lineNumber - 1]?.trim(),
        fix: 'Fix invalid JSX syntax - separate props from expressions'
      });
    });
  }

  checkMissingCommas(content, filePath, lines) {
    const matches = [...content.matchAll(this.patterns.missingComma)];
    matches.forEach(match => {
      const lineNumber = this.getLineNumber(content, match.index);
      this.errors.push({
        type: 'MISSING_COMMA',
        file: filePath,
        line: lineNumber,
        content: lines[lineNumber - 1]?.trim(),
        fix: 'Add comma between function calls'
      });
    });
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  generateReport() {
    console.log(`\n📊 JSX Error Report\n${'='.repeat(50)}`);

    if (this.errors.length === 0) {
      console.log('✅ No JSX errors found!');
      return;
    }

    const errorsByType = this.errors.reduce((acc, error) => {
      acc[error.type] = (acc[error.type] || 0) + 1;
      return acc;
    }, {});

    console.log(`\n📈 Error Summary:`);
    Object.entries(errorsByType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} errors`);
    });

    console.log(`\n🔍 Detailed Errors:\n`);
    this.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.type}`);
      console.log(`   📁 File: ${error.file}`);
      console.log(`   📍 Line: ${error.line}`);
      if (error.content) {
        console.log(`   📝 Content: ${error.content}`);
      }
      console.log(`   🔧 Fix: ${error.fix}\n`);
    });
  }

  async autoFix(filePath, dryRun = true) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      // Fix malformed buttons
      content = content.replace(
        this.patterns.malformedButton,
        (match, funcCall) => {
          modified = true;
          return `onClick={() => ${funcCall.trim()}}`;
        }
      );

      // Fix mixed case closing tags
      content = content.replace(
        /<([A-Z][a-zA-Z0-9]*)[^>]*>([\s\S]*?)<\/([a-z]+)>/g,
        (match, openTag, content, closeTag) => {
          if (openTag.toLowerCase() === closeTag) {
            modified = true;
            return match.replace(`</${closeTag}>`, `</${openTag}>`);
          }
          return match;
        }
      );

      if (modified && !dryRun) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed: ${filePath}`);
      } else if (modified) {
        console.log(`🔍 Would fix: ${filePath}`);
      }

      return modified;
    } catch (error) {
      console.error(`❌ Error fixing file ${filePath}:`, error.message);
      return false;
    }
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const pattern = args[1] || 'src/**/*.tsx';

  const fixer = new JSXErrorFixer();

  switch (command) {
    case 'scan':
      await fixer.scanFiles(pattern);
      break;

    case 'fix':
      const dryRun = !args.includes('--apply');
      const errors = await fixer.scanFiles(pattern);

      if (errors.length > 0) {
        console.log(`\n🔧 ${dryRun ? 'Dry run' : 'Applying'} fixes...\n`);

        const filesToFix = [...new Set(errors.map(e => e.file))];
        for (const file of filesToFix) {
          await fixer.autoFix(file, dryRun);
        }

        if (dryRun) {
          console.log('\n💡 Add --apply flag to actually apply fixes');
        }
      }
      break;

    default:
      console.log(`
🔧 JSX Error Fixer

Usage:
  node scripts/fix-jsx-errors.js scan [pattern]     - Scan for errors
  node scripts/fix-jsx-errors.js fix [pattern]      - Preview fixes (dry run)
  node scripts/fix-jsx-errors.js fix [pattern] --apply - Apply fixes

Examples:
  node scripts/fix-jsx-errors.js scan
  node scripts/fix-jsx-errors.js scan "src/components/**/*.tsx"
  node scripts/fix-jsx-errors.js fix --apply
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = JSXErrorFixer;