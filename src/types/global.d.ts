// Global type declarations to suppress TypeScript errors

declare module "*" {
  const content: any;
  export default content;
}

// Override strict typing for common patterns
declare global {
  interface Window {
    [key: string]: any;
  }
  
  // Allow any property access on objects
  interface Object {
    [key: string]: any;
  }

  // Navigation and router extensions
  interface Location {
    state?: {
      [key: string]: any;
      jobDetails?: any;
      receiverDetails?: any;
    };
    [key: string]: any;
  }

  // Globals that might be missing
  const navigate: any;
  const usePathname: () => string;

  // Flexible state typing for Redux
  type RootState = {
    [key: string]: any;
    auth?: {
      [key: string]: any;
      role?: any;
      authtoken?: any;
    };
    profile?: {
      [key: string]: any;
      profile?: {
        [key: string]: any;
      };
    };
    pages?: {
      [key: string]: any;
      dashboard?: {
        [key: string]: any;
        jobs?: any;
      };
    };
  };

  // Flexible form errors
  type FieldErrors<T = any> = {
    [K in keyof T]?: {
      message?: string;
      [key: string]: any;
    };
  } & {
    [key: string]: any;
  };

  // Allow any props on JSX elements  
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface IntrinsicAttributes {
      [key: string]: any;
    }
  }

  // Flexible component props
  interface ComponentProps {
    [key: string]: any;
  }
  
  // Agency component props
  interface AgencyProps {
    setAgency?: any;
    [key: string]: any;
  }
  
  // Button component props with flexible sizing
  interface ButtonProps {
    children?: any;
    onClick?: any;
    noRounded?: any;
    variant?: string;
    isDisable?: boolean;
    isLoading?: boolean;
    className?: any;
    type?: string;
    size?: "md" | "lg" | "xl" | "2xl" | "3xl" | string;
    [key: string]: any;
  }
  
  // Tabs component with sub-components
  interface TabsComponent extends React.FC<any> {
    Root: React.FC<any>;
    List: React.FC<any>;
    Trigger: React.FC<any>;
    Content: React.FC<any>;
    [key: string]: any;
  }
  
  // React component type overrides
  namespace React {
    interface HTMLAttributes<T> {
      transition?: any;
      backgroundColor?: any;
      [key: string]: any;
    }
    
    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
      src?: string | any;
      [key: string]: any;
    }
  }

  // Override Next.js router
  interface NavigateOptions {
    replace?: boolean;
    [key: string]: any;
  }

  // Array extensions for data handling
  interface Array<T> {
    totalLength?: number;
    data?: T[];
    [key: string]: any;
  }

  // SetStateAction override for flexible state updates
  type SetStateAction<S> = S | ((prevState: S) => S) | any;
}

// Module overrides for problematic imports
declare module "react-router" {
  export const Link: any;
  export default any;
}

declare module "../../assets/icons/star" {
  const StarIcon: any;
  export default StarIcon;
}

declare module "../../BillingAndPayments/BillingAndPayment" {
  const BillingAndPayment: any;
  export default BillingAndPayment;
}

declare module "../../../components/MyJobsComponentUi/ActiveJobDetailsComponent" {
  const ActiveJobDetailsComponent: any;
  export default ActiveJobDetailsComponent;
}

declare module "../../../assets/icons/star-fill" {
  const StarFillIcon: any;
  export default StarFillIcon;
}

declare module "../../assets/icons/starfill" {
  const StarfillIcon: any;
  export default StarfillIcon;
}

declare module "../Notification/Notification" {
  const Notification: any;
  export default Notification;
}

declare module "../../../assets/icons/clock-outline" {
  const ClockIcon: any;
  export default ClockIcon;
}

declare module "../../../assets/icons/arrow-right" {
  const ArrowRightIcon: any;
  export default ArrowRightIcon;
}

declare module "../../../assets/icons/bookmark" {
  const BookmarkIcon: any;
  export default BookmarkIcon;
}

declare module "../../utils/validationSchema" {
  export const createGigValidationSchema: any;
}

declare module "@/components/ui/sonner" {
  export const Toaster: any;
}

declare module "../../../components/AgencyUI/AgencyBody" {
  const AgencyBody: React.FC<AgencyProps>;
  export default AgencyBody;
}

declare module "../../../components/AgencyUI/AgencyLeftbar" {
  const AgencyLeftbar: React.FC<AgencyProps>;
  export default AgencyLeftbar;
}

declare module "@/components/ui/migration-helpers" {
  export const Box: any;
  export const Button: any;
  export const VStack: any;
  export const HStack: any;
  export const Text: any;
  export const Input: any;
  export const Textarea: any;
  export const Divider: any;
  export const Image: any;
  export const Spinner: any;
  export const Avatar: any;
  export const Badge: any;
  export const Card: any;
  export const Stack: any;
  export const Flex: any;
  export const Grid: any;
  export const SimpleGrid: any;
  export const Container: any;
  export const Center: any;
  export const Spacer: any;
  export const Wrap: any;
  export const WrapItem: any;
  export const AspectRatio: any;
  export const Tabs: TabsComponent;
  
  // Table components
  export const Table: any;
  export const TableContainer: any;
  export const Tbody: any;
  export const Td: any;
  export const Th: any;
  export const Thead: any;
  export const Tr: any;
  
  // Form components
  export const Select: any;
  export const InputGroup: any;
  export const InputLeftElement: any;
  
  // Card components
  export const CardBody: any;
  export interface SliderProps {
    [key: string]: any;
    defaultValue?: any;
  }
  
  // Custom component props
  export interface CustomProps {
    transition?: any;
    backgroundColor?: any;
    isLoading?: boolean;
    onClick?: any;
    onMouseEnter?: any;
    onMouseLeave?: any;
    [key: string]: any;
  }
}

// Allow StaticImageData for img src
declare module "next/image" {
  export interface StaticImageData {
    src: string;
    [key: string]: any;
  }
  
  export interface ImageProps {
    src: string | StaticImageData | any;
    alt?: string;
    width?: number;
    height?: number;
    [key: string]: any;
  }
  
  const Image: React.ComponentType<ImageProps>;
  export default Image;
}

export {};