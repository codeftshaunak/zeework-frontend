import { toast } from "@/lib/toast";

/**
 * Utility functions for freelancer profile
 */

// Generate initials from first and last name
export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Copy profile URL to clipboard
export const copyProfileURL = (userId: string, userType: 'f' | 'a' | 'c' = 'f'): void => {
  if (typeof window === "undefined" || !userId) return;

  const profileURL = `${window.location.origin}/profile/${userType}/${userId}`;
  navigator.clipboard.writeText(profileURL).then(() => {
    toast.success("Profile URL copied to clipboard");
  }).catch(() => {
    toast.error("Failed to copy URL");
  });
};

// Format date range for experience/education
export const formatDateRange = (startDate: string, endDate: string, isCurrent?: boolean): string => {
  const start = new Date(startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });

  if (isCurrent) {
    return `${start} - Present`;
  }

  const end = new Date(endDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });

  return `${start} - ${end}`;
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// Calculate duration between two dates
export const calculateDuration = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    if (remainingMonths === 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    }
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  }
};

// Get status color for different status types
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    completed: 'bg-green-100 text-green-800',
    in_progress: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
  };

  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate URL format
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Generate avatar color based on name
export const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
  ];

  const charCode = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
  return colors[charCode % colors.length];
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Debounce function for search/input
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Generate slug from text
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};