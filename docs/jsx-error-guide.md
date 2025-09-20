# JSX Error Prevention & Fixing Guide

## Understanding the Original Error

The error you encountered:

```jsx
// ❌ BROKEN
<button type="button" className="btn-primary">
  Update
</button>

// Error: Expected '</', got 'jsx text'
```

This occurs because of **mixed HTML and JSX syntax**. In JSX:

- Component names must be PascalCase (`Button`, not `button`)
- Props follow camelCase (`className`, not `class`)
- Components must be properly imported

## Common JSX Parsing Errors & Fixes

### 1. **Malformed Event Handlers**

```jsx
// ❌ BROKEN
<Button onClick={() = className="w-full"> setModal(false)}>

// ✅ FIXED
<Button
  onClick={() => setModal(false)}
  className="w-full"
>
```

**Why it fails:** Mixing assignment operator `=` with JSX attributes.

### 2. **Missing Component Imports**

```jsx
// ❌ BROKEN - Using without import
<button>Click me</button>;

// ✅ FIXED - Import first
import { Button } from "@/components/ui/migration-helpers";
<button>Click me</button>;
```

### 3. **Mixed Case Closing Tags**

```jsx
// ❌ BROKEN
<button>Submit</button>

// ✅ FIXED
<button>Submit</button>
```

### 4. **Unclosed JSX Elements**

```jsx
// ❌ BROKEN
<div className="container">
  <p>Content
</div>

// ✅ FIXED
<div className="container">
  <p>Content</p>
</div>
```

### 5. **Invalid JSX Expression Syntax**

```jsx
// ❌ BROKEN
{someFunction() = className="test"}

// ✅ FIXED
{someFunction()}
className="test"
```

### 6. **Missing Commas in Function Calls**

```jsx
// ❌ BROKEN
reset({ ...data });
setIsModal(true);

// ✅ FIXED
reset({ ...data });
setIsModal(true);
```

## TypeScript Interface Requirements

Always define proper interfaces for components:

```tsx
// ✅ GOOD
interface PortfolioCardProps {
  portfolio: Portfolio;
  categories: Category[];
  viewAs?: boolean;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  portfolio,
  categories,
  viewAs,
}) => {
  // component logic
};
```

## General Rules for Valid JSX

### 1. **Component Naming**

- ✅ PascalCase: `<button>`, `<MyComponent>`
- ❌ lowercase: `<button>`, `<mycomponent>`

### 2. **Attribute Naming**

- ✅ camelCase: `className`, `onClick`, `onChange`
- ❌ kebab-case: `class`, `onclick`, `on-change`

### 3. **Event Handlers**

```jsx
// ✅ CORRECT
onClick={() => handleClick()}
onClick={handleClick}
onClick={(e) => handleClick(e)}

// ❌ INCORRECT
onClick="handleClick()"
onClick={() = handleClick()}
```

### 4. **Self-Closing Tags**

```jsx
// ✅ CORRECT
<img src="..." alt="..." />
<br />
<hr />

// ❌ INCORRECT
<img src="..." alt="...">
<br>
```

### 5. **Conditional Rendering**

```jsx
// ✅ CORRECT
{isVisible && <Component />}
{isVisible ? <ComponentA /> : <ComponentB />}

// ❌ INCORRECT
{isVisible && <Component>}
{isVisible ? <ComponentA> : <ComponentB>}
```

## Step-by-Step Fix Process

### Step 1: Run Automated Scanner

```bash
# Install dependencies if needed
npm install glob

# Scan for errors
npm run jsx:scan

# Preview fixes
npm run jsx:fix

# Apply fixes
npm run jsx:fix:apply
```

### Step 2: Manual Review

1. Check TypeScript errors: `npm run type-check`
2. Run linter: `npm run lint`
3. Test components: `npm run test`

### Step 3: Component-Specific Fixes

#### For Each Error Type:

**Missing Imports:**

```tsx
// Add to top of file
import {
  Button,
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
} from "@/components/ui/migration-helpers";
```

**Interface Definition:**

```tsx
interface ComponentProps {
  prop1: Type1;
  prop2?: Type2; // Optional props
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
};
```

**Event Handler Fixes:**

```tsx
// Before fix
onClick={() = setModal(false)}

// After fix
onClick={() => setModal(false)}
```

## Automated Scanning & Fixing

### Usage Examples

```bash
# Basic scan
node scripts/fix-jsx-errors.js scan

# Scan specific directory
node scripts/fix-jsx-errors.js scan "src/components/**/*.tsx"

# Preview all fixes
node scripts/fix-jsx-errors.js fix

# Apply fixes to specific files
node scripts/fix-jsx-errors.js fix "src/components/Profile/**/*.tsx" --apply

# Scan entire codebase
node scripts/fix-jsx-errors.js scan "src/**/*.tsx"
```

### What the Script Detects

1. **Malformed Button Syntax**: `onClick={() = className="...">`
2. **Missing Imports**: Components used without imports
3. **Unclosed Tags**: Mismatched opening/closing tags
4. **Mixed Case Tags**: `<button></button>`
5. **Invalid JSX**: Malformed expressions
6. **Missing Commas**: In function call sequences

### What the Script Fixes Automatically

- ✅ Malformed event handlers
- ✅ Mixed case closing tags
- ✅ Basic syntax errors

### What Requires Manual Fix

- ❌ Missing imports (detected but not auto-fixed)
- ❌ Complex logical errors
- ❌ TypeScript interface definitions

## VSCode Extensions for Prevention

Install these extensions to prevent JSX errors:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## ESLint Rules for JSX

Add to your `.eslintrc.js`:

```javascript
module.exports = {
  extends: ["next/core-web-vitals", "@typescript-eslint/recommended"],
  rules: {
    "react/jsx-closing-tag-location": "error",
    "react/jsx-closing-bracket-location": "error",
    "react/jsx-tag-spacing": "error",
    "react/jsx-no-undef": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
```

## Prettier Configuration

`.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "jsxSingleQuote": false,
  "bracketSpacing": true,
  "jsxBracketSameLine": false
}
```

## Quick Reference Checklist

Before committing JSX code:

- [ ] All components properly imported
- [ ] Component names in PascalCase
- [ ] Props in camelCase
- [ ] Event handlers properly formatted
- [ ] All tags properly closed
- [ ] TypeScript interfaces defined
- [ ] No console errors in browser
- [ ] Linter passes without errors
- [ ] Components render correctly

## Emergency Fix Commands

If you have widespread JSX errors:

```bash
# 1. Quick scan and fix
npm run jsx:fix:apply

# 2. Fix TypeScript errors
npm run type-check

# 3. Fix linting errors
npm run lint -- --fix

# 4. Format code
npm run format

# 5. Final verification
npm run build
```

This comprehensive approach will help you identify, fix, and prevent JSX parsing errors across your entire Next.js + TypeScript codebase.
