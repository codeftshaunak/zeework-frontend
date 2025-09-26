import React from "react";
import { cn, chakraPropsToTailwind } from "@/lib/utils";

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
  fontWeight?: string;
  fontSize?: string;
  padding?: string;
  cursor?: string;
  transition?: string;
  _hover?: Record<string, any>;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Box: React.FC<BoxProps> = ({
  children,
  className,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  w,
  h,
  width,
  height,
  bg,
  bgColor,
  color,
  borderRadius,
  rounded,
  display,
  justifyContent,
  alignItems,
  gap,
  border,
  borderColor,
  borderBottom,
  boxShadow,
  paddingY,
  paddingX,
  marginY,
  marginX,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  margin,
  fontWeight,
  fontSize,
  padding,
  cursor,
  transition,
  _hover,
  onClick,
  ...props
}) => {
  const chakraProps = {
    p,
    px,
    py: py || paddingY,
    pt,
    pb,
    pl,
    pr: pr || paddingX,
    m: m || margin,
    mx: mx || marginX,
    my: my || marginY,
    mt: mt || marginTop,
    mb: mb || marginBottom,
    ml: ml || marginLeft,
    mr: mr || marginRight,
    w: w || width,
    h: h || height,
    bg: bg || bgColor,
    color,
    borderRadius,
    rounded,
    display,
    justifyContent,
    alignItems,
    gap,
    border,
    borderColor,
    boxShadow,
  };

  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  return (
    <div className={cn(tailwindClasses, className)} {...props}>
      {children}
    </div>
  );
};

// VStack -> flex flex-col
interface VStackProps extends Omit<BoxProps, "padding"> {
  spacing?: number | string;
  align?: string;
  marginTop?: string;
  paddingY?: string;
  lineHeight?: string;
  bgColor?: string;
  justifyContent?: string;
  padding?: number | string;
}

export const VStack: React.FC<VStackProps> = ({
  children,
  className,
  spacing,
  align,
  alignItems,
  marginTop,
  paddingY,
  lineHeight,
  bgColor,
  justifyContent,
  padding,
  ...props
}) => {
  const alignClass =
    align === "start"
      ? "items-start"
      : align === "end"
        ? "items-end"
        : align === "center"
          ? "items-center"
          : alignItems
            ? `items-${alignItems}`
            : "";

  const spacingClass = spacing ? `space-y-${spacing}` : "";

  const chakraProps = { marginTop, paddingY, padding, bgColor, justifyContent };
  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  return (
    <Box
      className={cn(
        "flex flex-col",
        alignClass,
        spacingClass,
        lineHeight ? `leading-[${lineHeight}]` : "",
        tailwindClasses,
        className
      )}
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
  const alignClass =
    align === "start"
      ? "items-start"
      : align === "end"
        ? "items-end"
        : align === "center"
          ? "items-center"
          : alignItems
            ? `items-${alignItems}`
            : "items-center";

  const spacingClass = spacing ? `space-x-${spacing}` : "";

  return (
    <Box
      className={cn("flex flex-row", alignClass, spacingClass, className)}
      {...props}
    >
      {children}
    </Box>
  );
};

// Stack -> flex
interface StackProps extends BoxProps {
  direction?: "row" | "column";
  spacing?: number | string;
  align?: string;
}

export const Stack: React.FC<StackProps> = ({
  children,
  className,
  direction = "column",
  spacing,
  align,
  alignItems,
  ...props
}) => {
  const directionClass = direction === "row" ? "flex-row" : "flex-col";
  const alignClass =
    align === "start"
      ? "items-start"
      : align === "end"
        ? "items-end"
        : align === "center"
          ? "items-center"
          : alignItems
            ? `items-${alignItems}`
            : "";

  const spacingClass = spacing
    ? direction === "row"
      ? `space-x-${spacing}`
      : `space-y-${spacing}`
    : "";

  return (
    <Box
      className={cn(
        "flex",
        directionClass,
        alignClass,
        spacingClass,
        className
      )}
      {...props}
    >
      {children}
    </Box>
  );
};

// Flex -> flex
interface FlexProps extends BoxProps {
  direction?: "row" | "column";
  wrap?: "wrap" | "nowrap";
}

export const Flex: React.FC<FlexProps> = ({
  children,
  className,
  direction,
  wrap,
  ...props
}) => {
  const directionClass = direction === "column" ? "flex-col" : "flex-row";
  const wrapClass =
    wrap === "wrap" ? "flex-wrap" : wrap === "nowrap" ? "flex-nowrap" : "";

  return (
    <Box
      className={cn("flex", directionClass, wrapClass, className)}
      {...props}
    >
      {children}
    </Box>
  );
};

// Text -> span/p
interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "p" | "div";
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
  marginBottom?: string;
  mb?: string;
  w?: string;
  width?: string;
  children?: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  children,
  className,
  as = "span",
  fontSize,
  fontWeight,
  color,
  textAlign,
  marginBottom,
  mb,
  w,
  width,
  ...props
}) => {
  const Component = as;

  const chakraProps = { w: w || width, mb: marginBottom || mb };
  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  const textClasses = cn(
    fontSize === "2xl"
      ? "text-2xl"
      : fontSize === "xl"
        ? "text-xl"
        : fontSize
          ? `text-${fontSize}`
          : "text-base",
    fontWeight === "semibold"
      ? "font-semibold"
      : fontWeight === "medium"
        ? "font-medium"
        : fontWeight
          ? `font-${fontWeight}`
          : "",
    color ? `text-${color}` : "",
    textAlign ? `text-${textAlign}` : "",
    tailwindClasses,
    className
  );

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
};

// Center -> flex items-center justify-center
export const Center: React.FC<BoxProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Box
      className={cn("flex items-center justify-center", className)}
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
  bgColor?: string;
  color?: string;
  height?: string;
  paddingLeft?: string;
}

export const Input: React.FC<InputProps> = ({
  className,
  w,
  h,
  pl,
  pr,
  py,
  px,
  border,
  borderColor,
  rounded,
  borderRadius,
  fontSize,
  bg,
  bgColor,
  color,
  height,
  paddingLeft,
  ...props
}) => {
  const chakraProps = {
    w,
    h: h || height,
    pl: pl || paddingLeft,
    pr,
    py,
    px,
    border,
    borderColor,
    rounded: rounded || borderRadius,
    fontSize,
    bg: bg || bgColor,
    color,
  };

  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  const inputClasses = cn(
    // Base input styling to match Chakra Input
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    tailwindClasses,
    className
  );

  return <input className={inputClasses} {...props} />;
};

// Avatar -> img with avatar styling
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  boxSize?: string;
  round?: string;
  marginRight?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  margin?: string;
  border?: string;
  children?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = "md",
  boxSize,
  round,
  marginRight,
  marginTop,
  marginBottom,
  marginLeft,
  margin,
  border,
  className,
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-20 h-20 text-xl",
    "2xl": "w-24 h-24 text-2xl",
  };

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const chakraProps = {
    marginRight,
    marginTop,
    marginBottom,
    marginLeft,
    margin,
  };
  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  const avatarClasses = cn(
    "relative inline-flex items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600",
    boxSize ? `w-[${boxSize}] h-[${boxSize}]` : sizeClasses[size],
    round ? `rounded-[${round}]` : "rounded-full",
    border ? `border border-[${border.replace("1px solid ", "")}]` : "",
    tailwindClasses,
    className
  );

  return (
    <div className={avatarClasses} {...props}>
      {src ? (
        <img
          src={src}
          alt={name}
          className="object-cover w-full h-full rounded-inherit"
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
    "absolute rounded-full",
    bg?.includes("green")
      ? "bg-green-500"
      : bg?.includes("gray")
        ? "bg-gray-300"
        : `bg-${bg}`,
    boxSize ? `w-[${boxSize}] h-[${boxSize}]` : "w-3 h-3",
    border
      ? `border-[${border.replace("3.5px solid ", "").replace("white", "#ffffff")}] border-[3.5px]`
      : "",
    className
  );

  const style = {
    left: left ? `${left * 0.25}rem` : undefined,
    top: top ? `${top * 0.25}rem` : undefined,
  };

  return <div className={badgeClasses} style={style} {...props} />;
};

// Button -> button with Chakra-like styling
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorScheme?: string;
  variant?: string;
  size?: "sm" | "md" | "lg";
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
  border?: string;
  _hover?: Record<string, any>;
  px?: number | string;
  py?: number | string;
  w?: string;
  width?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  bgColor?: string;
  bg?: string;
  rounded?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  colorScheme,
  variant,
  size = "md",
  backgroundColor,
  color,
  borderRadius,
  border,
  _hover,
  px,
  py,
  w,
  width,
  isLoading,
  isDisabled,
  bgColor,
  bg,
  rounded,
  ...props
}) => {
  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8",
  };

  const colorSchemeClasses: Record<string, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  };

  const chakraProps = {
    px,
    py,
    w: w || width,
    bg: backgroundColor || bgColor || bg,
    borderRadius: borderRadius || rounded,
  };
  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  const buttonClasses = cn(
    // Base button styling
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background",
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    sizeClasses[size],
    colorScheme ? colorSchemeClasses[colorScheme] : "",
    borderRadius || rounded ? `rounded-[${borderRadius || rounded}]` : "",
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
      {isLoading ? "Loading..." : children}
    </button>
  );
};

// Heading -> h1,h2,h3,etc with Chakra-like styling
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
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
  as = "h2",
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
    "font-semibold leading-tight",
    fontSize === "6xl"
      ? "text-6xl"
      : fontSize
        ? `text-${fontSize}`
        : "text-2xl",
    color ? (color === "white" ? "text-white" : `text-${color}`) : "",
    fontWeight ? `font-${fontWeight}` : "",
    textAlign ? `text-${textAlign}` : "",
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
  as: Component = "a",
  to,
  color,
  textDecoration,
  ...props
}) => {
  const linkClasses = cn(
    "cursor-pointer",
    color
      ? color === "white"
        ? "text-white"
        : `text-${color}`
      : "text-blue-600 hover:text-blue-800",
    textDecoration === "none" ? "no-underline" : "underline",
    className
  );

  const linkProps =
    Component === "a" ? { href: to, ...props } : { to, ...props };

  return (
    <Component className={linkClasses} {...linkProps}>
      {children}
    </Component>
  );
};

// Skeleton -> skeleton loading wrapper
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoaded?: boolean;
  startColor?: string;
  endColor?: string;
  children?: React.ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  isLoaded = false,
  startColor = "gray.100",
  endColor = "gray.200", 
  children,
  className,
  ...props
}) => {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded",
        className
      )}
      {...props}
    >
      {children}
    </div>
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
  spacing = "4",
  skeletonHeight = "4",
  startColor = "gray.200",
  endColor = "gray.300",
  mt,
  marginTop,
  className,
  ...props
}) => {
  const lines = Array.from({ length: noOfLines }, (_, i) => i);

  const skeletonClasses = cn(
    "animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded",
    `h-${skeletonHeight}`,
    mt ? `mt-${mt}` : "",
    marginTop ? `mt-${marginTop}` : "",
    className
  );

  return (
    <div className={cn("space-y-" + spacing)} {...props}>
      {lines.map((line) => (
        <div
          key={line}
          className={skeletonClasses}
          style={{
            width: line === lines.length - 1 ? "75%" : "100%",
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
  placement?: "top" | "bottom" | "left" | "right";
  hasArrow?: boolean;
  bg?: string;
  color?: string;
  className?: string;
  isDisabled?: boolean;
}

export const Checkbox: React.FC = ({
  children,
  size = "md",
  colorScheme = "green",
  ...props
}: any) => {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        style={{
          width: size === "md" ? "16px" : "14px",
          height: size === "md" ? "16px" : "14px",
          accentColor: colorScheme === "green" ? "#38A169" : "#3182CE",
        }}
        {...props}
      />
      <span style={{ fontSize: "14px" }}>{children}</span>
    </label>
  );
};

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  label,
  placement = "top",
  hasArrow = false,
  bg = "gray.700",
  color = "white",
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const tooltipClasses = cn(
    "absolute z-50 px-2 py-1 text-sm rounded shadow-lg pointer-events-none transition-opacity duration-200",
    bg === "gray.700"
      ? "bg-gray-700"
      : bg === "gray.500"
        ? "bg-gray-500"
        : `bg-${bg}`,
    color === "white" ? "text-white" : `text-${color}`,
    placement === "top" &&
      "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    placement === "bottom" &&
      "top-full mt-2 left-1/2 transform -translate-x-1/2",
    placement === "left" &&
      "right-full mr-2 top-1/2 transform -translate-y-1/2",
    placement === "right" &&
      "left-full ml-2 top-1/2 transform -translate-y-1/2",
    isVisible ? "opacity-100" : "opacity-0",
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
              "absolute w-2 h-2 transform rotate-45",
              bg === "gray.700"
                ? "bg-gray-700"
                : bg === "gray.500"
                  ? "bg-gray-500"
                  : `bg-${bg}`,
              placement === "top" && "top-full left-1/2 -translate-x-1/2 -mt-1",
              placement === "bottom" &&
                "bottom-full left-1/2 -translate-x-1/2 -mb-1",
              placement === "left" &&
                "left-full top-1/2 -translate-y-1/2 -ml-1",
              placement === "right" &&
                "right-full top-1/2 -translate-y-1/2 -mr-1"
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
    objectFit === "cover"
      ? "object-cover"
      : objectFit === "contain"
        ? "object-contain"
        : "",
    borderRadius ? `rounded-[${borderRadius}]` : "",
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
  colorPalette?: string;
}

interface RadioGroupContextType {
  value?: string;
  onChange: (value: string) => void;
}

interface RadioGroupItemContextType {
  value: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(
  null
);
const RadioGroupItemContext =
  React.createContext<RadioGroupItemContextType | null>(null);

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
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
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
    <RadioGroupContext.Provider
      value={{ value: currentValue, onChange: handleChange }}
    >
      <div className={cn("space-y-2", tailwindClasses, className)} {...props}>
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
    throw new Error("RadioGroup.Item must be used within RadioGroup.Root");
  }

  return (
    <RadioGroupItemContext.Provider value={{ value }}>
      <div
        className={cn("flex items-center space-x-2 cursor-pointer", className)}
        onClick={() => context.onChange(value)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupItemContext.Provider>
  );
};

interface StackDividerItemProps {
  className?: string;
}

export const StackDivider: React.FC<StackDividerItemProps> = ({
  className
}) => {
  return (
    <div  className={cn("border-t border-gray-200", className)} />
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
    throw new Error(
      "RadioGroup.ItemIndicator must be used within RadioGroup.Item"
    );
  }

  const isSelected = context.value === itemContext.value;

  return (
    <div
      className={cn(
        "w-4 h-4 border-2 rounded-full flex items-center justify-center",
        isSelected ? "border-blue-500" : "border-gray-300",
        className
      )}
      {...props}
    >
      {isSelected && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
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
    <span
      className={cn("text-sm font-medium text-gray-900", className)}
      {...props}
    >
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

// Accordion Components
interface AccordionRootProps {
  children: React.ReactNode;
  defaultValue?: string[];
  multiple?: boolean;
  className?: string;
}

interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (value: string) => void;
  multiple: boolean;
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);

const AccordionRoot: React.FC<AccordionRootProps> = ({
  children,
  defaultValue = [],
  multiple = false,
  className,
  ...props
}) => {
  const [openItems, setOpenItems] = React.useState(new Set(defaultValue));

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        if (!multiple) {
          newSet.clear();
        }
        newSet.add(value);
      }
      return newSet;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, multiple }}>
      <div className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

const AccordionItemContext = React.createContext<{
  value: string;
  isOpen: boolean;
} | null>(null);

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  value,
  className,
  ...props
}) => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionItem must be used within AccordionRoot");
  }

  const isOpen = context.openItems.has(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={className} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

interface AccordionItemTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  _hover?: Record<string, any>;
  px?: number;
}

const AccordionItemTrigger: React.FC<AccordionItemTriggerProps> = ({
  children,
  className,
  _hover,
  px,
  onClick,
  ...props
}) => {
  const accordionContext = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error("AccordionItemTrigger must be used within AccordionItem");
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    accordionContext.toggleItem(itemContext.value);
    onClick?.(e);
  };

  const triggerClasses = cn(
    "flex w-full items-center justify-between text-left",
    px !== undefined ? `px-${px}` : "",
    className
  );

  return (
    <button className={triggerClasses} onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

interface AccordionItemContentProps {
  children: React.ReactNode;
  className?: string;
  pb?: number;
  px?: number;
}

const AccordionItemContent: React.FC<AccordionItemContentProps> = ({
  children,
  className,
  pb,
  px,
  ...props
}) => {
  const itemContext = React.useContext(AccordionItemContext);

  if (!itemContext) {
    throw new Error("AccordionItemContent must be used within AccordionItem");
  }

  const contentClasses = cn(
    "overflow-hidden transition-all duration-200",
    pb !== undefined ? `pb-${pb}` : "",
    px !== undefined ? `px-${px}` : "",
    className
  );

  if (!itemContext.isOpen) {
    return null;
  }

  return (
    <div className={contentClasses} {...props}>
      {children}
    </div>
  );
};

// Export Accordion as compound component
export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  ItemTrigger: AccordionItemTrigger,
  ItemContent: AccordionItemContent,
};

// Slider Components
interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  colorScheme?: string;
}

interface SliderContextType {
  value: number[];
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number[]) => void;
}

const SliderContext = React.createContext<SliderContextType | null>(null);

export const Slider: React.FC<SliderProps> = ({
  children,
  className,
  value,
  defaultValue = [0],
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  ...props
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: number[]) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <SliderContext.Provider
      value={{ value: currentValue, min, max, step, onValueChange: handleChange }}
    >
      <div className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </SliderContext.Provider>
  );
};

export const SliderTrack: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-2 bg-gray-200 rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const SliderFilledTrack: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const context = React.useContext(SliderContext);
  if (!context) {
    throw new Error("SliderFilledTrack must be used within Slider");
  }

  const percentage = ((context.value[0] - context.min) / (context.max - context.min)) * 100;

  return (
    <div
      className={cn("absolute h-full bg-blue-500 rounded-full", className)}
      style={{ width: `${percentage}%` }}
      {...props}
    />
  );
};

export const SliderThumb: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const context = React.useContext(SliderContext);
  if (!context) {
    throw new Error("SliderThumb must be used within Slider");
  }

  const percentage = ((context.value[0] - context.min) / (context.max - context.min)) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).parentElement?.getBoundingClientRect();
      if (!rect) return;

      const x = moveEvent.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const newValue = context.min + (percentage / 100) * (context.max - context.min);
      const steppedValue = Math.round(newValue / context.step) * context.step;

      context.onValueChange([steppedValue]);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={cn(
        "absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer transform -translate-y-1/2 -translate-x-1/2 top-1/2",
        className
      )}
      style={{ left: `${percentage}%` }}
      onMouseDown={handleMouseDown}
      {...props}
    />
  );
};

// Tabs Components (basic implementation)
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

const TabsRoot: React.FC<TabsProps & { colorScheme?: string; padding?: number; index?: number; onChange?: (index: number) => void }> = ({
  children,
  className,
  value,
  defaultValue = "",
  onValueChange,
  colorScheme,
  padding,
  index,
  onChange,
  ...props
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [internalIndex, setInternalIndex] = React.useState(index || 0);
  const currentValue = value !== undefined ? value : internalValue;
  const currentIndex = index !== undefined ? index : internalIndex;

  const handleChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const handleIndexChange = (newIndex: number) => {
    if (index === undefined) {
      setInternalIndex(newIndex);
    }
    onChange?.(newIndex);
  };

  const chakraProps = { padding };
  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleChange }}>
      <div className={cn(tailwindClasses, className)} {...props}>
        {React.Children.map(children, (child, childIndex) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              currentIndex,
              onIndexChange: handleIndexChange,
            });
          }
          return child;
        })}
      </div>
    </TabsContext.Provider>
  );
};

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

const TabsList: React.FC<TabsListProps> = ({
  children,
  className,
  currentIndex = 0,
  onIndexChange,
  ...props
}) => {
  return (
    <div className={cn("flex border-b border-gray-200", className)} {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isSelected: index === currentIndex,
            onClick: () => onIndexChange?.(index),
          });
        }
        return child;
      })}
    </div>
  );
};

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({
  children,
  className,
  isSelected = false,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
        isSelected
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  currentIndex?: number;
  padding?: number;
}

const TabsContent: React.FC<TabsContentProps> = ({
  children,
  className,
  currentIndex = 0,
  padding,
  ...props
}) => {
  const chakraProps = { padding };
  const tailwindClasses = chakraPropsToTailwind(chakraProps);

  return (
    <div className={cn("mt-4", tailwindClasses, className)} {...props}>
      {React.Children.map(children, (child, index) => {
        if (index === currentIndex) {
          return child;
        }
        return null;
      })}
    </div>
  );
};

// Export Tabs as compound component
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};

// FormErrorMessage component for form error display
interface FormErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("text-red-500 text-sm mt-1", className)} {...props}>
      {children}
    </div>
  );
};

// Drawer components (mobile-first modal)
interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: string;
  isFullHeight?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  onClose,
  placement = 'right',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className={cn(
        "absolute bg-white shadow-lg",
        placement === 'right' && "right-0 top-0 h-full w-80",
        placement === 'left' && "left-0 top-0 h-full w-80",
        placement === 'top' && "top-0 left-0 w-full h-80",
        placement === 'bottom' && "bottom-0 left-0 w-full h-80"
      )}>
        {children}
      </div>
    </div>
  );
};

export const DrawerContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("p-4 h-full", className)}>{children}</div>
);

export const DrawerBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("flex-1 overflow-auto", className)}>{children}</div>
);

export const DrawerCloseButton: React.FC<{ onClick: () => void; className?: string }> = ({ onClick, className }) => (
  <button 
    onClick={onClick}
    className={cn("absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700", className)}
  >
    ×
  </button>
);

// useDisclosure hook
export const useDisclosure = (defaultIsOpen = false) => {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen);
  
  const onOpen = React.useCallback(() => setIsOpen(true), []);
  const onClose = React.useCallback(() => setIsOpen(false), []);
  const onToggle = React.useCallback(() => setIsOpen(prev => !prev), []);
  
  return { isOpen, onOpen, onClose, onToggle };
};

// SkeletonCircle component for loading states
interface SkeletonCircleProps {
  size?: string | number;
  className?: string;
}

export const SkeletonCircle: React.FC<SkeletonCircleProps> = ({ 
  size = "40px", 
  className = "" 
}) => {
  const sizeStyle = typeof size === 'number' ? `${size}px` : size;
  
  return (
    <div 
      className={cn("bg-gray-200 rounded-full animate-pulse", className)}
      style={{ width: sizeStyle, height: sizeStyle }}
    />
  );
};

// Stepper Components
interface StepperProps {
  children: React.ReactNode;
  index?: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ 
  children, 
  index = 0, 
  orientation = 'horizontal',
  className 
}) => {
  return (
    <div className={cn(
      "stepper",
      orientation === 'horizontal' ? "flex items-center" : "flex flex-col",
      className
    )}>
      {React.Children.map(children, (child, childIndex) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isActive: childIndex === index,
            isCompleted: childIndex < index,
            stepIndex: childIndex,
          });
        }
        return child;
      })}
    </div>
  );
};

interface StepProps {
  children: React.ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
  stepIndex?: number;
  className?: string;
}

export const Step: React.FC<StepProps> = ({ 
  children, 
  isActive = false,
  isCompleted = false,
  stepIndex = 0,
  className 
}) => {
  return (
    <div className={cn(
      "step flex items-center",
      isActive && "step-active",
      isCompleted && "step-completed",
      className
    )}>
      {children}
    </div>
  );
};

// Step-related components for more granular control
export const StepIndicator: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <div className={cn("step-indicator", className)}>{children}</div>
);

export const StepStatus: React.FC<{ 
  complete?: React.ReactNode; 
  incomplete?: React.ReactNode; 
  active?: React.ReactNode;
  className?: string;
}> = ({ 
  complete, 
  incomplete, 
  active, 
  className 
}) => (
  <div className={cn("step-status", className)}>
    {complete || incomplete || active}
  </div>
);

export const StepIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("step-icon text-green-500", className)}>✓</div>
);

export const StepNumber: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("step-number w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center", className)}>
    1
  </div>
);

export const StepSeparator: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("step-separator flex-1 h-0.5 bg-gray-200 mx-2", className)} />
);

// Hook for managing steps
export const useSteps = ({ index = 0, count = 0 }) => {
  const [activeStep, setActiveStep] = React.useState(index);
  
  const goToNext = React.useCallback(() => {
    setActiveStep(prev => Math.min(prev + 1, count - 1));
  }, [count]);
  
  const goToPrevious = React.useCallback(() => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  }, []);
  
  const reset = React.useCallback(() => {
    setActiveStep(index);
  }, [index]);
  
  return {
    activeStep,
    setActiveStep,
    goToNext,
    goToPrevious,
    reset,
    isActiveStep: (step: number) => activeStep === step,
    isCompleteStep: (step: number) => activeStep > step,
  };
};
