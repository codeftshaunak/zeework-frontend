#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function migrateToastUsage(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace import statements
    const importReplacements = [
      {
        from: /import\s*{\s*toaster\s*}\s*from\s*["']@\/lib\/providers["'];?/g,
        to: 'import { toast } from "@/lib/toast";'
      },
      {
        from: /import\s*{\s*useToast\s*}\s*from\s*["']@chakra-ui\/react["'];?/g,
        to: 'import { useToast } from "@/lib/toast";'
      }
    ];

    importReplacements.forEach(replacement => {
      const newContent = content.replace(replacement.from, replacement.to);
      if (newContent !== content) {
        modified = true;
        content = newContent;
      }
    });

    // Replace toaster.create() calls
    const toasterReplacements = [
      // toaster.create({ title: "message", type: "success" })
      {
        from: /toaster\.create\(\s*{\s*title:\s*([^,}]+),?\s*type:\s*["']success["']\s*[^}]*}\s*\)/g,
        to: 'toast.success($1)'
      },
      // toaster.create({ title: "message", type: "error" })
      {
        from: /toaster\.create\(\s*{\s*title:\s*([^,}]+),?\s*type:\s*["']error["']\s*[^}]*}\s*\)/g,
        to: 'toast.error($1)'
      },
      // toaster.create({ title: "message", type: "warning" })
      {
        from: /toaster\.create\(\s*{\s*title:\s*([^,}]+),?\s*type:\s*["']warning["']\s*[^}]*}\s*\)/g,
        to: 'toast.warning($1)'
      },
      // toaster.create({ title: "message", type: "info" })
      {
        from: /toaster\.create\(\s*{\s*title:\s*([^,}]+),?\s*type:\s*["']info["']\s*[^}]*}\s*\)/g,
        to: 'toast.info($1)'
      },
      // toaster.create({ title: "message", status: "success" })
      {
        from: /toaster\.create\(\s*{\s*title:\s*([^,}]+),?\s*status:\s*["']success["']\s*[^}]*}\s*\)/g,
        to: 'toast.success($1)'
      },
      // toaster.create({ title: "message", status: "error" })
      {
        from: /toaster\.create\(\s*{\s*title:\s*([^,}]+),?\s*status:\s*["']error["']\s*[^}]*}\s*\)/g,
        to: 'toast.error($1)'
      },
      // toaster.create({ title: "message", status: "warning" })
      {
        from: /toaster\.create\(\s*{\s*title:\s*([^,}]+),?\s*status:\s*["']warning["']\s*[^}]*}\s*\)/g,
        to: 'toast.warning($1)'
      },
      // Generic toaster.create({ title: "message" })
      {
        from: /toaster\.create\(\s*{\s*title:\s*([^,}]+)\s*[^}]*}\s*\)/g,
        to: 'toast.default($1)'
      }
    ];

    toasterReplacements.forEach(replacement => {
      const newContent = content.replace(replacement.from, replacement.to);
      if (newContent !== content) {
        modified = true;
        content = newContent;
      }
    });

    // Replace useToast hook usage
    const hookReplacements = [
      // const toast = useToast(); -> const toast = useToast();
      // This already works with our implementation, no change needed

      // toast({ title: "message", status: "success" })
      {
        from: /(\w+)\(\s*{\s*title:\s*([^,}]+),?\s*status:\s*["']success["']\s*[^}]*}\s*\)/g,
        to: '$1.success($2)'
      },
      {
        from: /(\w+)\(\s*{\s*title:\s*([^,}]+),?\s*status:\s*["']error["']\s*[^}]*}\s*\)/g,
        to: '$1.error($2)'
      },
      {
        from: /(\w+)\(\s*{\s*title:\s*([^,}]+),?\s*status:\s*["']warning["']\s*[^}]*}\s*\)/g,
        to: '$1.warning($2)'
      },
      {
        from: /(\w+)\(\s*{\s*title:\s*([^,}]+),?\s*status:\s*["']info["']\s*[^}]*}\s*\)/g,
        to: '$1.info($2)'
      }
    ];

    // Apply hook replacements only if the variable name looks like a toast function
    hookReplacements.forEach(replacement => {
      // Only apply if it looks like toast usage (avoiding false positives)
      if (content.includes('useToast()') || content.includes('toast(')) {
        const newContent = content.replace(replacement.from, replacement.to);
        if (newContent !== content) {
          modified = true;
          content = newContent;
        }
      }
    });

    if (modified) {
      console.log(`Migrated toast usage in: ${filePath}`);
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

let migratedCount = 0;
for (const file of files) {
  if (migrateToastUsage(file)) {
    migratedCount++;
  }
}

console.log(`Migrated toast usage in ${migratedCount} files.`);