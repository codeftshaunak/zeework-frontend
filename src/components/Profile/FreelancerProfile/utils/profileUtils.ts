import { toast } from "@/lib/toast";

/**
 * Utility functions for freelancer profile
 */

// Generate initials from first and last name
export 
};

// Copy profile URL to clipboard
export 
  const profileURL = `${window.location.origin}/profile/${userType}/${userId}`;
  navigator.clipboard.writeText(profileURL).then(() => {
    toast.success("Profile URL copied to clipboard");
  }).catch(() => {
    toast.error("Failed to copy URL");
  });
};

// Format date range for experience/education
export 
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
export 
};

// Truncate text with ellipsis
export 
  return text.slice(0, maxLength) + "...";
};

// Calculate duration between two dates
export 
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
export 
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

// Validate email format
export 
  return emailRegex.test(email);
};

// Validate URL format
export 
    return true;
  } catch {
    return false;
  }
};

// Generate avatar color based on name
export 
  const charCode = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
  return colors[charCode % colors.length];
};

// Format file size
export 
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Debounce function for search/input
export 
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Generate slug from text
export 
};