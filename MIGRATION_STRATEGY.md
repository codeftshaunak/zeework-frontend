# Chakra UI to Native HTML/Shadcn Migration Strategy

## Overview
This document outlines the systematic approach to migrate from Chakra UI to native HTML elements and shadcn/ui components while maintaining **exact visual consistency**.

## Current Status
- **Files with Chakra UI**: 146 files
- **Total Chakra Components**: ~3,156 component usages
- **RTK Query**: ✅ Set up with SSR/CSR best practices
- **shadcn/ui**: ✅ Configured and ready
- **Migration Utilities**: ✅ Created

## Migration Phases

### Phase 1: Foundation Setup ✅
- [x] RTK Query configuration with proper SSR/CSR handling
- [x] shadcn/ui setup with component configuration
- [x] Migration helper utilities and component mappings
- [x] Tailwind utility classes to match Chakra spacing/colors

### Phase 2: Core Component Migration (In Progress)
**Priority Order:**
1. **Layout Components** (Box, VStack, HStack, Stack, Flex, Center)
2. **Typography** (Text, Heading)
3. **Form Components** (Input, InputGroup, Button, Select)
4. **Complex Components** (Modal, Tabs, Accordion, etc.)

### Phase 3: API Migration
- Replace axios calls with RTK Query hooks
- Implement proper caching and invalidation
- Add optimistic updates where appropriate

## Component Migration Mapping

### Layout Components
```typescript
// Before (Chakra UI)
<Box p={4} bg="white" borderRadius="md">
  <VStack spacing={4} align="start">
    <Text fontSize="lg" fontWeight="bold">Title</Text>
  </VStack>
</Box>

// After (Native HTML + Tailwind)
<div className="p-4 bg-white rounded-md">
  <div className="flex flex-col space-y-4 items-start">
    <span className="text-lg font-bold">Title</span>
  </div>
</div>
```

### Form Components
```typescript
// Before (Chakra UI)
<InputGroup>
  <Input placeholder="Enter text" />
  <InputRightElement>
    <Button>Submit</Button>
  </InputRightElement>
</InputGroup>

// After (shadcn/ui)
<div className="relative">
  <Input placeholder="Enter text" />
  <Button className="absolute right-2 top-1/2 -translate-y-1/2">
    Submit
  </Button>
</div>
```

## Migration Tools

### 1. Component Mapping Utilities
Located in: `src/components/ui/migration-helpers.tsx`
- Drop-in replacements for common Chakra components
- Accepts Chakra props and converts to Tailwind classes
- Maintains exact visual consistency

### 2. Prop Conversion Utilities
Located in: `src/lib/utils.ts`
- `chakraPropsToTailwind()` function
- Automatic conversion of Chakra props to Tailwind classes
- Spacing, color, and layout prop mappings

### 3. RTK Query API Structure
Located in: `src/redux/api/`
- Modular API slice architecture
- Proper SSR/CSR handling
- Automatic caching and invalidation
- TypeScript support

## File-by-File Migration Strategy

### High Priority Files (Start Here)
1. `src/components/utils/Error/ErrorMsg.tsx` ✅ **COMPLETED**
2. `src/components/ui/` components (shared utilities)
3. `src/components/Header/index.tsx` (main navigation)
4. `src/components/pages/SignUp/index.tsx` (forms)

### Medium Priority
- Dashboard components
- Profile components
- Job-related components

### Low Priority
- Complex specialized components
- Admin/settings components

## Migration Process per File

### Step 1: Analysis
```bash
# Count Chakra components in file
grep -c "from \"@chakra-ui" file.tsx
```

### Step 2: Import Updates
```typescript
// Remove
import { Box, VStack, Text } from "@chakra-ui/react";

// Add
import { cn } from "@/lib/utils";
// or use migration helpers
import { Box, VStack, Text } from "@/components/ui/migration-helpers";
```

### Step 3: Component Conversion
Use either:
1. **Direct conversion** to native HTML + Tailwind
2. **Migration helpers** for gradual transition
3. **shadcn/ui components** for complex UI elements

### Step 4: Testing
- Visual regression testing
- Functionality testing
- Responsive behavior verification

## RTK Query Migration

### API Structure
```typescript
// Before (axios)
const { data } = await getUsers();

// After (RTK Query)
const { data, isLoading, error } = useGetUsersQuery();
```

### SSR/CSR Patterns
```typescript
// SSR data fetching
export async function getServerSideProps() {
  const store = makeStore();
  await store.dispatch(api.endpoints.getUsers.initiate());
  return {
    props: {
      initialState: store.getState(),
    },
  };
}
```

## Design Consistency Checklist

### Visual Elements
- [ ] Spacing matches exactly (padding, margins)
- [ ] Colors match brand guidelines
- [ ] Typography scales correctly
- [ ] Border radii and shadows consistent
- [ ] Responsive behavior maintained

### Interactions
- [ ] Hover states preserved
- [ ] Focus states accessible
- [ ] Animation transitions smooth
- [ ] Form validation styling consistent

## Performance Considerations

### Bundle Size Reduction
- Remove Chakra UI dependencies gradually
- Tree-shake unused components
- Use native HTML where possible

### Runtime Performance
- RTK Query caching reduces API calls
- Native HTML elements are lighter
- Tailwind CSS is more efficient than emotion/styled

## Testing Strategy

### Automated Tests
1. **Visual Regression**: Screenshot comparisons
2. **Unit Tests**: Component behavior
3. **Integration Tests**: API interactions
4. **E2E Tests**: User workflows

### Manual Testing
1. **Browser Testing**: Chrome, Firefox, Safari
2. **Device Testing**: Mobile, tablet, desktop
3. **Accessibility Testing**: Screen readers, keyboard navigation

## Rollback Plan

### Safety Measures
1. **Feature Flags**: Enable/disable new components
2. **Gradual Rollout**: Page-by-page migration
3. **Monitoring**: Error tracking and performance metrics
4. **Quick Revert**: Keep Chakra imports as fallback

## Timeline Estimate

### Phase 1: Foundation (Completed)
- Duration: 2-3 days
- Status: ✅ Complete

### Phase 2: Core Migration
- Duration: 2-3 weeks
- High-traffic components first
- 5-10 files per day target

### Phase 3: Complete Migration
- Duration: 4-6 weeks total
- Include API migration
- Full testing and optimization

## Success Metrics

### Technical Metrics
- Bundle size reduction: Target 20-30% smaller
- Performance score improvement
- Reduced dependency count
- Zero visual regressions

### Development Metrics
- Faster build times
- Improved TypeScript support
- Better IDE autocomplete
- Reduced maintenance overhead

## Next Steps

1. **Start with high-priority files** listed above
2. **Use migration helpers** for gradual transition
3. **Test thoroughly** at each step
4. **Monitor performance** and user feedback
5. **Document any issues** and solutions

---

**Note**: This migration maintains 100% visual consistency while modernizing the tech stack. The gradual approach ensures zero downtime and minimal risk.