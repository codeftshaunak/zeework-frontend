// Redux type overrides

declare module "react-redux" {
  export function useSelector<T = any>(selector: (state: any) => T): T;
  export const useDispatch: () => any;
  export const Provider: any;
  export const connect: any;
}

// Hook form overrides
declare module "react-hook-form" {
  export interface UseFormProps<T = any> {
    resolver?: any;
    defaultValues?: any;
    mode?: any;
    [key: string]: any;
  }
  
  export interface UseFormReturn<T = any> {
    register: (name: string, options?: any) => any;
    handleSubmit: (onSubmit: (data: any) => any) => any;
    formState: {
      errors: { [key: string]: any };
      [key: string]: any;
    };
    setValue: (name: string, value: any) => void;
    trigger: (name?: string) => any;
    reset: (data?: any) => void;
    [key: string]: any;
  }

  export function useForm<T = any>(props?: UseFormProps<T>): UseFormReturn<T>;
}

// Yup resolver override
declare module "@hookform/resolvers/yup" {
  export function yupResolver(schema: any): any;
}

// Context overrides
declare global {
  interface CurrentUserContextType {
    [key: string]: any;
    getUserDetails?: () => Promise<void> | void;
  }

  interface SocketContextType {
    socket?: any;
    [key: string]: any;
  }
}

export {};