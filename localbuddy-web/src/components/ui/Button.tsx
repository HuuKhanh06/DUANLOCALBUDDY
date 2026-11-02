// components/ui/Button.tsx
import React from 'react';
import { clsx } from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#15803D] text-white hover:bg-[#14532D] focus-visible:ring-[#15803D] disabled:bg-[#86EFAC] disabled:text-[#14532D]',
  secondary: 'bg-[#DCFCE7] text-[#15803D] border border-[#15803D] hover:bg-[#86EFAC] focus-visible:ring-[#15803D]',
  danger: 'bg-[#B91C1C] text-white hover:bg-[#991B1B] focus-visible:ring-[#B91C1C] disabled:bg-[#FCA5A5]',
  ghost: 'bg-transparent text-[#15803D] hover:bg-[#DCFCE7] focus-visible:ring-[#15803D]',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-[8px] text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed',
        variantClasses[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
};

