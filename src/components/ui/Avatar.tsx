import React from 'react';
import Image from 'next/image';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  boxSize?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  boxSize,
  className,
  ...props
}) => {
  const sizeClasses = {
    'sm': 'w-8 h-8 text-sm',
    'md': 'w-12 h-12 text-base',
    'lg': 'w-16 h-16 text-lg',
    'xl': 'w-20 h-20 text-xl',
    '2xl': 'w-24 h-24 text-2xl'
  };

  // Handle boxSize prop from Chakra UI
  const customSize = boxSize ? `w-[${boxSize}] h-[${boxSize}]` : sizeClasses[size];
  
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';

  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600 ${customSize} ${className || ''}`}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={name || 'Avatar'}
          className="w-full h-full object-cover rounded-full"
          width={48}
          height={48}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;