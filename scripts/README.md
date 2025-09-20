# JSX Error Detection & Fixing Script

## Quick Start

```bash
# Install dependencies (if needed)
npm install glob

# Scan for JSX errors
npm run jsx:scan

# Preview fixes (dry run)
npm run jsx:fix

# Apply fixes
npm run jsx:fix:apply
```

## What Was Fixed

Your `PortfolioCard.tsx` had several critical errors:

### 1. **Malformed Event Handler** ✅ FIXED

```jsx
// ❌ BEFORE
<Button onClick={() = className="w-full"> setIsModal(false)}>

// ✅ AFTER
<Button onClick={() => setIsModal(false)} className="w-full">
```

### 2. **Missing Component Imports** ✅ FIXED

```jsx
// ✅ ADDED
import { Box, HStack, VStack, Button } from "@/components/ui/migration-helpers";
```

### 3. **TypeScript Interface** ✅ FIXED

```tsx
// ✅ ADDED
interface PortfolioCardProps {
  portfolio: any;
  categories: any;
  viewAs?: boolean;
}
```

### 4. **Mixed Case JSX Tags** ✅ FIXED

```jsx
// ❌ BEFORE
</button>

// ✅ AFTER
</button>
```

## Why JSX Errors Occur

1. **Mixed HTML/JSX Syntax**: Using lowercase HTML tags (`<button>`) instead of React components (`<button>`)
2. **Invalid Event Handlers**: Mixing assignment operators with JSX attributes
3. **Missing Imports**: Using components without importing them
4. **Syntax Confusion**: Confusing JavaScript expressions with JSX attributes

## Codebase Analysis Results

Found **249 errors** across **324 TSX files**:

- 🔴 **129 Unmatched Tags**: Possible unclosed elements
- 🟡 **59 Missing Imports**: Components used without imports
- 🟠 **44 Mixed Case Tags**: `<button></button>` mismatches
- 🔴 **15 Invalid JSX**: Malformed syntax like `onClick={() = className="">`
- 🟡 **2 Missing Commas**: Function call syntax errors

## Available Commands

```bash
# Scan specific directories
npm run jsx:scan "src/components/**/*.tsx"

# Fix with manual approval
npm run jsx:fix

# Auto-apply safe fixes
npm run jsx:fix:apply

# Run type checking
npm run type-check

# Run validation (types + lint)
npm run validate
```

## Script Features

✅ **Detects**: All common JSX parsing errors
✅ **Auto-fixes**: Safe syntax corrections
✅ **Reports**: Detailed error breakdown
✅ **Safe**: Dry-run mode by default
✅ **Fast**: Scans hundreds of files quickly

## Next Steps

1. **Review the fixes**: Check `PortfolioCard.tsx` to see improvements
2. **Run the scanner**: Use `npm run jsx:scan` to find remaining issues
3. **Apply fixes gradually**: Use `npm run jsx:fix:apply` for auto-fixable errors
4. **Manual review**: Fix missing imports and complex issues manually

Your codebase now has proper error detection and fixing tools! 🎉
