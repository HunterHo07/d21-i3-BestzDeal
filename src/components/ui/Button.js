'use client';

import { useState } from 'react';
import Link from 'next/link';

const variants = {
  primary: 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:from-indigo-700 hover:to-cyan-600',
  secondary: 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50',
  outline: 'bg-transparent border border-white text-white hover:bg-white/10',
  ghost: 'bg-transparent text-indigo-600 hover:bg-indigo-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  success: 'bg-green-600 text-white hover:bg-green-700',
};

const sizes = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-base',
  lg: 'py-3 px-6 text-lg',
  xl: 'py-4 px-8 text-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  loading = false,
  disabled = false,
  onClick,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  const disabledClasses = (disabled || loading) ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  
  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`;
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </>
  );
  
  if (href) {
    return (
      <Link 
        href={href}
        className={buttonClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {content}
      </Link>
    );
  }
  
  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {content}
    </button>
  );
}
