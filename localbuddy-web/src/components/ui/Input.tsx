// components/ui/Input.tsx
import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, hint, className, id, ...props }) => {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-[14px] font-medium text-[#14231A]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          'w-full px-3 min-h-[44px] rounded-[8px] border text-[16px] text-[#14231A] bg-white transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:border-[#15803D]',
          error ? 'border-[#B91C1C]' : 'border-[#D6E2D9]',
          'disabled:bg-[#F6FAF6] disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
      {error && <span className="text-[12px] text-[#B91C1C]">{error}</span>}
      {hint && !error && <span className="text-[12px] text-[#4B5B50]">{hint}</span>}
    </div>
  );
};

// Textarea variant
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, hint, className, id, ...props }) => {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-[14px] font-medium text-[#14231A]">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={clsx(
          'w-full px-3 py-2 rounded-[8px] border text-[16px] text-[#14231A] bg-white transition-colors resize-none',
          'focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:border-[#15803D]',
          error ? 'border-[#B91C1C]' : 'border-[#D6E2D9]',
          className
        )}
        rows={3}
        {...props}
      />
      {error && <span className="text-[12px] text-[#B91C1C]">{error}</span>}
      {hint && !error && <span className="text-[12px] text-[#4B5B50]">{hint}</span>}
    </div>
  );
};

