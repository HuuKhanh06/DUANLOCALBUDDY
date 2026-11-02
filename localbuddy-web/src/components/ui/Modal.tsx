// components/ui/Modal.tsx
import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        className={clsx(
          'w-full bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[#D6E2D9] overflow-hidden flex flex-col',
          maxWClass
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D6E2D9]">
          <h3 className="text-[18px] font-semibold text-[#14231A]">{title}</h3>
          <button
            onClick={onClose}
            className="text-[#4B5B50] hover:text-[#14231A] p-1 rounded-md text-[18px]"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh] text-[16px] text-[#14231A]">
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F6FAF6] border-t border-[#D6E2D9]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

