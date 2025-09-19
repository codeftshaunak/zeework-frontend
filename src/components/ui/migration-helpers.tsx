import React from 'react';
import { cn, chakraPropsToTailwind } from '@/lib/utils';

// Migration helpers to replace Chakra UI components with native HTML
// These components accept Chakra-style props and convert them to Tailwind classes

// Box -> div
interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  // Chakra props
  p?: number | string;
  px?: number | string;
  py?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  m?: number | string;
  mx?: number | string;
  my?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  w?: string;
  h?: string;
  width?: string;
  height?: string;
  bg?: string;
  color?: string;
  borderRadius?: string;
  rounded?: string;
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: number | string;
  border?: string;
  borderColor?: string;
  borderBottom?: string;
  boxShadow?: string;
  bgColor?: string;
  paddingY?: number | string;
  paddingX?: number | string;
  marginY?: number | string;
  marginX?: number | string;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  margin?: string;
  children?: React.ReactNode;
}

export const Box: React.FC<BoxProps> = ({
  children,
  className,
  p, px, py, pt, pb, pl, pr,
  m, mx, my, mt, mb, ml, mr,
  w, h, width, height,
  bg, bgColor, color,
  borderRadius, rounded,
  display, justifyContent, alignItems,
  gap, border, borderColor, borderBottom, boxShadow,
  paddingY, paddingX, marginY, marginX,
  marginTop, marginBottom, marginLeft, marginRight, margin,
  ...props
}) => {
  const chakraProps = {
    p, px, py: py || paddingY, pt, pb, pl, pr: pr || paddingX,
    m: m || margin, mx: mx || marginX, my: my || marginY,
    mt: mt || marginTop, mb: mb || marginBottom,
    ml: ml || marginLeft, mr: mr || marginRight,
    w: w || width, h: h || height,
    bg: bg || bgColor, color,
    borderRadius, rounded,
    display, justifyContent, alignItems,
    gap, border, borderColor, boxShadow
  };

  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  return (
    <div
      className={cn(tailwindClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
};

// VStack -> flex flex-col
interface VStackProps extends BoxProps {
  spacing?: number | string;
  align?: string;
}

export const VStack: React.FC<VStackProps> = ({
  children,
  className,
  spacing,
  align,
  alignItems,
  ...props
}) => {
  const alignClass = align === 'start' ? 'items-start' :
                    align === 'end' ? 'items-end' :
                    align === 'center' ? 'items-center' :
                    alignItems ? `items-${alignItems}` : '';

  const spacingClass = spacing ? `space-y-${spacing}` : '';

  return (
    <Box
      className={cn('flex flex-col', alignClass, spacingClass, className)}
      {...props}
    >
      {children}
    </Box>
  );
};

// HStack -> flex flex-row
interface HStackProps extends BoxProps {
  spacing?: number | string;
  align?: string;
}

export const HStack: React.FC<HStackProps> = ({
  children,
  className,
  spacing,
  align,
  alignItems,
  ...props
}) => {
  const alignClass = align === 'start' ? 'items-start' :
                    align === 'end' ? 'items-end' :
                    align === 'center' ? 'items-center' :
                    alignItems ? `items-${alignItems}` : 'items-center';

  const spacingClass = spacing ? `space-x-${spacing}` : '';

  return (
    <Box
      className={cn('flex flex-row', alignClass, spacingClass, className)}
      {...props}
    >
      {children}
    </Box>
  );
};

// Stack -> flex
interface StackProps extends BoxProps {
  direction?: 'row' | 'column';
  spacing?: number | string;
  align?: string;
}

export const Stack: React.FC<StackProps> = ({
  children,
  className,
  direction = 'column',
  spacing,
  align,
  alignItems,
  ...props
}) => {
  const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';
  const alignClass = align === 'start' ? 'items-start' :
                    align === 'end' ? 'items-end' :
                    align === 'center' ? 'items-center' :
                    alignItems ? `items-${alignItems}` : '';

  const spacingClass = spacing ?
    (direction === 'row' ? `space-x-${spacing}` : `space-y-${spacing}`) : '';

  return (
    <Box
      className={cn('flex', directionClass, alignClass, spacingClass, className)}
      {...props}
    >
      {children}
    </Box>
  );
};

// Flex -> flex
interface FlexProps extends BoxProps {
  direction?: 'row' | 'column';
  wrap?: 'wrap' | 'nowrap';
}

export const Flex: React.FC<FlexProps> = ({
  children,
  className,
  direction,
  wrap,
  ...props
}) => {
  const directionClass = direction === 'column' ? 'flex-col' : 'flex-row';
  const wrapClass = wrap === 'wrap' ? 'flex-wrap' : wrap === 'nowrap' ? 'flex-nowrap' : '';

  return (
    <Box
      className={cn('flex', directionClass, wrapClass, className)}
      {...props}
    >
      {children}
    </Box>
  );
};

// Text -> span/p
interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: 'span' | 'p' | 'div';
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
  marginBottom?: string;
  children?: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  children,
  className,
  as = 'span',
  fontSize,
  fontWeight,
  color,
  textAlign,
  marginBottom,
  ...props
}) => {
  const Component = as;

  const textClasses = cn(
    fontSize ? `text-${fontSize}` : 'text-base',
    fontWeight ? `font-${fontWeight}` : '',
    color ? `text-${color}` : '',
    textAlign ? `text-${textAlign}` : '',
    marginBottom ? `mb-${marginBottom}` : '',
    className
  );

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
};

// Center -> flex items-center justify-center
interface CenterProps extends BoxProps {}

export const Center: React.FC<CenterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Box
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      {children}
    </Box>
  );
};

// Input -> input with Chakra-like styling
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  w?: string;
  h?: string;
  pl?: number | string;
  pr?: number | string;
  py?: number | string;
  px?: number | string;
  border?: string;
  borderColor?: string;
  rounded?: string;
  borderRadius?: string;
  fontSize?: string;
  bg?: string;
  color?: string;
}

export const Input: React.FC<InputProps> = ({
  className,
  w, h, pl, pr, py, px,
  border, borderColor, rounded, borderRadius,
  fontSize, bg, color,
  ...props
}) => {
  const chakraProps = {
    w, h, pl, pr, py, px,
    border, borderColor, rounded: rounded || borderRadius,
    fontSize, bg, color
  };

  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  const inputClasses = cn(
    // Base input styling to match Chakra Input
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    tailwindClasses,
    className
  );

  return (
    <input
      className={inputClasses}
      {...props}
    />
  );
};

// Avatar -> img with avatar styling
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  round?: string;
  marginRight?: string;
  border?: string;
  children?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  round,
  marginRight,
  border,
  className,
  children,
  ...props
}) => {
  const sizeClasses = {
    'sm': 'w-8 h-8 text-sm',
    'md': 'w-12 h-12 text-base',
    'lg': 'w-16 h-16 text-lg',
    'xl': 'w-20 h-20 text-xl',
    '2xl': 'w-24 h-24 text-2xl'
  };

  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';

  const avatarClasses = cn(
    'relative inline-flex items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600',
    sizeClasses[size],
    round ? `rounded-[${round}]` : 'rounded-full',
    marginRight ? `mr-[${marginRight}]` : '',
    border ? `border border-[${border.replace('1px solid ', '')}]` : '',
    className
  );

  return (
    <div className={avatarClasses} {...props}>
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover rounded-inherit"
        />
      ) : (
        <span>{initials}</span>
      )}
      {children}
    </div>
  );
};

// AvatarBadge -> positioned badge on avatar
interface AvatarBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  bg?: string;
  boxSize?: string;
  border?: string;
  left?: number;
  top?: number;
}

export const AvatarBadge: React.FC<AvatarBadgeProps> = ({
  bg,
  boxSize,
  border,
  left,
  top,
  className,
  ...props
}) => {
  const badgeClasses = cn(
    'absolute rounded-full',
    bg?.includes('green') ? 'bg-green-500' : bg?.includes('gray') ? 'bg-gray-300' : `bg-${bg}`,
    boxSize ? `w-[${boxSize}] h-[${boxSize}]` : 'w-3 h-3',
    border ? `border-[${border.replace('3.5px solid ', '').replace('white', '#ffffff')}] border-[3.5px]` : '',
    className
  );

  const style = {
    left: left ? `${left * 0.25}rem` : undefined,
    top: top ? `${top * 0.25}rem` : undefined,
  };

  return (
    <div
      className={badgeClasses}
      style={style}
      {...props}
    />
  );
};

// Button -> button with Chakra-like styling
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: string;
  size?: 'sm' | 'md' | 'lg';
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
  border?: string;
  _hover?: Record<string, any>;
  px?: number | string;
  py?: number | string;
  w?: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  colorScheme,
  size = 'md',
  backgroundColor,
  color,
  borderRadius,
  border,
  _hover,
  px, py, w,
  isLoading,
  ...props
}) => {
  const sizeClasses = {
    'sm': 'h-8 px-3 text-sm',
    'md': 'h-10 px-4 py-2',
    'lg': 'h-11 px-8'
  };

  const colorSchemeClasses = {
    'primary': 'bg-primary text-primary-foreground hover:bg-primary/90'
  };

  const chakraProps = { px, py, w };
  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  const buttonClasses = cn(
    // Base button styling
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background',
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    sizeClasses[size],
    colorScheme ? colorSchemeClasses[colorScheme] : '',
    borderRadius ? `rounded-[${borderRadius}]` : '',
    tailwindClasses,
    className
  );

  const style = {
    backgroundColor: backgroundColor,
    color: color,
    border: border,
  };

  return (
    <button
      className={buttonClasses}
      style={style}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

// Heading -> h1,h2,h3,etc with Chakra-like styling
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  textAlign?: string;
  mt?: number | string;
  mb?: number | string;
  children?: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  className,
  as = 'h2',
  fontSize,
  color,
  fontWeight,
  textAlign,
  mt,
  mb,
  ...props
}) => {
  const Component = as;

  const chakraProps = { mt, mb };
  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  const headingClasses = cn(
    'font-semibold leading-tight',
    fontSize === '6xl' ? 'text-6xl' : fontSize ? `text-${fontSize}` : 'text-2xl',
    color ? (color === 'white' ? 'text-white' : `text-${color}`) : '',
    fontWeight ? `font-${fontWeight}` : '',
    textAlign ? `text-${textAlign}` : '',
    tailwindClasses,
    className
  );

  return (
    <Component className={headingClasses} {...props}>
      {children}
    </Component>
  );
};

// Link -> anchor with Chakra-like styling
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: any;
  to?: string;
  color?: string;
  textDecoration?: string;
  children?: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({
  children,
  className,
  as: Component = 'a',
  to,
  color,
  textDecoration,
  ...props
}) => {
  const linkClasses = cn(
    'cursor-pointer',
    color ? (color === 'white' ? 'text-white' : `text-${color}`) : 'text-blue-600 hover:text-blue-800',
    textDecoration === 'none' ? 'no-underline' : 'underline',
    className
  );

  const linkProps = Component === 'a' ? { href: to, ...props } : { to, ...props };

  return (
    <Component className={linkClasses} {...linkProps}>
      {children}
    </Component>
  );
};

// SkeletonText -> skeleton loading animation
interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  noOfLines?: number;
  spacing?: string;
  skeletonHeight?: string;
  startColor?: string;
  endColor?: string;
  mt?: string;
  marginTop?: number | string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  noOfLines = 3,
  spacing = '4',
  skeletonHeight = '4',
  startColor = 'gray.200',
  endColor = 'gray.300',
  mt,
  marginTop,
  className,
  ...props
}) => {
  const lines = Array.from({ length: noOfLines }, (_, i) => i);

  const skeletonClasses = cn(
    'animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded',
    `h-${skeletonHeight}`,
    mt ? `mt-${mt}` : '',
    marginTop ? `mt-${marginTop}` : '',
    className
  );

  return (
    <div className={cn('space-y-' + spacing)} {...props}>
      {lines.map((line) => (
        <div
          key={line}
          className={skeletonClasses}
          style={{
            width: line === lines.length - 1 ? '75%' : '100%'
          }}
        />
      ))}
    </div>
  );
};

// Tooltip -> tooltip with positioning
interface TooltipProps {
  children: React.ReactNode;
  label: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  hasArrow?: boolean;
  bg?: string;
  color?: string;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  label,
  placement = 'top',
  hasArrow = false,
  bg = 'gray.700',
  color = 'white',
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const tooltipClasses = cn(
    'absolute z-50 px-2 py-1 text-sm rounded shadow-lg pointer-events-none transition-opacity duration-200',
    bg === 'gray.700' ? 'bg-gray-700' : bg === 'gray.500' ? 'bg-gray-500' : `bg-${bg}`,
    color === 'white' ? 'text-white' : `text-${color}`,
    placement === 'top' && 'bottom-full mb-2 left-1/2 transform -translate-x-1/2',
    placement === 'bottom' && 'top-full mt-2 left-1/2 transform -translate-x-1/2',
    placement === 'left' && 'right-full mr-2 top-1/2 transform -translate-y-1/2',
    placement === 'right' && 'left-full ml-2 top-1/2 transform -translate-y-1/2',
    isVisible ? 'opacity-100' : 'opacity-0',
    className
  );

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div className={tooltipClasses}>
        {label}
        {hasArrow && (
          <div
            className={cn(
              'absolute w-2 h-2 transform rotate-45',
              bg === 'gray.700' ? 'bg-gray-700' : bg === 'gray.500' ? 'bg-gray-500' : `bg-${bg}`,
              placement === 'top' && 'top-full left-1/2 -translate-x-1/2 -mt-1',
              placement === 'bottom' && 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
              placement === 'left' && 'left-full top-1/2 -translate-y-1/2 -ml-1',
              placement === 'right' && 'right-full top-1/2 -translate-y-1/2 -mr-1'
            )}
          />
        )}
      </div>
    </div>
  );
};

// Image -> img with Chakra-like styling
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  w?: string;
  h?: string;
  borderRadius?: string;
  objectFit?: string;
  fallbackSrc?: string;
}

export const Image: React.FC<ImageProps> = ({
  className,
  w,
  h,
  borderRadius,
  objectFit,
  fallbackSrc,
  src,
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const chakraProps = { w, h };
  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  const imageClasses = cn(
    objectFit === 'cover' ? 'object-cover' : objectFit === 'contain' ? 'object-contain' : '',
    borderRadius ? `rounded-[${borderRadius}]` : '',
    tailwindClasses,
    className
  );

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={imageClasses}
      onError={handleError}
      {...props}
    />
  );
};

// RadioGroup Components
interface RadioGroupRootProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  colorScheme?: string;
  className?: string;
  marginTop?: string;
  marginLeft?: number;
}

interface RadioGroupContextType {
  value?: string;
  onChange: (value: string) => void;
}

interface RadioGroupItemContextType {
  value: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(null);
const RadioGroupItemContext = React.createContext<RadioGroupItemContextType | null>(null);

const RadioGroupRoot: React.FC<RadioGroupRootProps> = ({
  children,
  value,
  defaultValue,
  onValueChange,
  colorScheme,
  className,
  marginTop,
  marginLeft,
  ...props
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const chakraProps = { marginTop, marginLeft };
  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange }}>
      <div className={cn('space-y-2', tailwindClasses, className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

interface RadioGroupItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  children,
  value,
  className,
  ...props
}) => {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroup.Item must be used within RadioGroup.Root');
  }

  return (
    <RadioGroupItemContext.Provider value={{ value }}>
      <div
        className={cn('flex items-center space-x-2 cursor-pointer', className)}
        onClick={() => context.onChange(value)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupItemContext.Provider>
  );
};

interface RadioGroupItemIndicatorProps {
  className?: string;
}

const RadioGroupItemIndicator: React.FC<RadioGroupItemIndicatorProps> = ({
  className,
  ...props
}) => {
  const context = React.useContext(RadioGroupContext);
  const itemContext = React.useContext(RadioGroupItemContext);

  if (!context || !itemContext) {
    throw new Error('RadioGroup.ItemIndicator must be used within RadioGroup.Item');
  }

  const isSelected = context.value === itemContext.value;

  return (
    <div
      className={cn(
        'w-4 h-4 border-2 rounded-full flex items-center justify-center',
        isSelected ? 'border-blue-500' : 'border-gray-300',
        className
      )}
      {...props}
    >
      {isSelected && (
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
      )}
    </div>
  );
};

interface RadioGroupItemTextProps {
  children: React.ReactNode;
  className?: string;
}

const RadioGroupItemText: React.FC<RadioGroupItemTextProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <span className={cn('text-sm font-medium text-gray-900', className)} {...props}>
      {children}
    </span>
  );
};

const RadioGroupItemHiddenInput: React.FC = () => {
  return <input type="radio" className="sr-only" />;
};

// Export RadioGroup as compound component
export const RadioGroup = {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
  ItemIndicator: RadioGroupItemIndicator,
  ItemText: RadioGroupItemText,
  ItemHiddenInput: RadioGroupItemHiddenInput,
};