import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Chakra UI to Tailwind utility mappings to maintain exact visual consistency
export const chakraToTailwind = {
  // Spacing utilities to match Chakra's spacing scale
  spacing: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem",  // 8px
    3: "0.75rem", // 12px
    4: "1rem",    // 16px
    5: "1.25rem", // 20px
    6: "1.5rem",  // 24px
    7: "1.75rem", // 28px
    8: "2rem",    // 32px
    9: "2.25rem", // 36px
    10: "2.5rem", // 40px
    12: "3rem",   // 48px
    16: "4rem",   // 64px
    20: "5rem",   // 80px
    24: "6rem",   // 96px
  },

  // Color mappings from your current Chakra theme
  colors: {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
    "gray.100": "text-gray-100",
    "gray.200": "text-gray-200",
    "gray.300": "text-gray-300",
    "gray.400": "text-gray-400",
    "gray.500": "text-gray-500",
    "green.200": "text-green-200",
    "green.600": "text-green-600",
  },

  // Layout mappings
  layout: {
    // Box -> div with specific classes
    Box: "block",
    VStack: "flex flex-col",
    HStack: "flex flex-row items-center",
    Stack: "flex",
    Flex: "flex",
    Center: "flex items-center justify-center",
    Container: "container mx-auto",
  },

  // Typography mappings
  typography: {
    Text: "text-base",
    Heading: "font-semibold",
  },

  // Form mappings
  forms: {
    Input: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    Button: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  }
};

// Convert Chakra props to Tailwind classes
export function chakraPropsToTailwind(props: Record<string, any>): string {
  const classes: string[] = [];

  // Handle common Chakra props
  if (props.p) classes.push(`p-${props.p}`);
  if (props.px) classes.push(`px-${props.px}`);
  if (props.py) classes.push(`py-${props.py}`);
  if (props.pt) classes.push(`pt-${props.pt}`);
  if (props.pb) classes.push(`pb-${props.pb}`);
  if (props.pl) classes.push(`pl-${props.pl}`);
  if (props.pr) classes.push(`pr-${props.pr}`);

  if (props.m || props.margin) classes.push(`m-${props.m || props.margin}`);
  if (props.mx) classes.push(`mx-${props.mx}`);
  if (props.my) classes.push(`my-${props.my}`);
  if (props.mt || props.marginTop) classes.push(`mt-${props.mt || props.marginTop}`);
  if (props.mb || props.marginBottom) classes.push(`mb-${props.mb || props.marginBottom}`);
  if (props.ml || props.marginLeft) classes.push(`ml-${props.ml || props.marginLeft}`);
  if (props.mr || props.marginRight) classes.push(`mr-${props.mr || props.marginRight}`);

  if (props.w) classes.push(`w-${props.w}`);
  if (props.h) classes.push(`h-${props.h}`);
  if (props.width) classes.push(`w-${props.width}`);
  if (props.height) classes.push(`h-${props.height}`);

  if (props.bg) classes.push(`bg-${props.bg}`);
  if (props.color) classes.push(`text-${props.color}`);

  if (props.borderRadius) classes.push(`rounded-${props.borderRadius}`);
  if (props.rounded) classes.push(`rounded-${props.rounded}`);

  if (props.display) {
    switch (props.display) {
      case 'flex': classes.push('flex'); break;
      case 'block': classes.push('block'); break;
      case 'inline': classes.push('inline'); break;
      case 'inline-block': classes.push('inline-block'); break;
      case 'grid': classes.push('grid'); break;
      case 'none': classes.push('hidden'); break;
    }
  }

  if (props.justifyContent) {
    switch (props.justifyContent) {
      case 'center': classes.push('justify-center'); break;
      case 'flex-start': classes.push('justify-start'); break;
      case 'flex-end': classes.push('justify-end'); break;
      case 'space-between': classes.push('justify-between'); break;
      case 'space-around': classes.push('justify-around'); break;
      case 'space-evenly': classes.push('justify-evenly'); break;
    }
  }

  if (props.alignItems) {
    switch (props.alignItems) {
      case 'center': classes.push('items-center'); break;
      case 'flex-start': classes.push('items-start'); break;
      case 'flex-end': classes.push('items-end'); break;
      case 'stretch': classes.push('items-stretch'); break;
      case 'baseline': classes.push('items-baseline'); break;
    }
  }

  if (props.gap) classes.push(`gap-${props.gap}`);
  if (props.borderBottom) classes.push(`border-b`);
  if (props.border) {
    if (props.border === '1px') classes.push('border');
    else classes.push(`border-[${props.border}]`);
  }
  if (props.borderColor) {
    if (props.borderColor.includes('gray.')) {
      const grayLevel = props.borderColor.split('.')[1];
      classes.push(`border-gray-${grayLevel}`);
    } else {
      classes.push(`border-${props.borderColor}`);
    }
  }

  return classes.join(' ');
}