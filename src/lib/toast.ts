import { toast as sonnerToast } from "sonner";

// Toast utility to replace Chakra's useToast
export const toast = {
  success: (message: string, options?: { description?: string; duration?: number }) => {
    return sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration,
    });
  },

  error: (message: string, options?: { description?: string; duration?: number }) => {
    return sonnerToast.error(message, {
      description: options?.description,
      duration: options?.duration,
    });
  },

  warning: (message: string, options?: { description?: string; duration?: number }) => {
    return sonnerToast.warning(message, {
      description: options?.description,
      duration: options?.duration,
    });
  },

  info: (message: string, options?: { description?: string; duration?: number }) => {
    return sonnerToast.info(message, {
      description: options?.description,
      duration: options?.duration,
    });
  },

  // Default toast
  default: (message: string, options?: { description?: string; duration?: number }) => {
    return sonnerToast(message, {
      description: options?.description,
      duration: options?.duration,
    });
  },

  // Promise-based toast for async operations
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return sonnerToast.promise(promise, options);
  },

  // Dismiss all toasts
  dismiss: () => {
    return sonnerToast.dismiss();
  }
};

// Hook-style function to maintain compatibility with existing useToast usage
export const useToast = () => {
  return toast;
};

// Export individual functions for direct import
export const { success, error, warning, info, promise, dismiss } = toast;