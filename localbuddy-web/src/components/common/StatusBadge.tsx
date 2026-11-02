// components/common/StatusBadge.tsx & PaymentBadge.tsx
import React from 'react';
import { clsx } from 'clsx';
import { BookingStatus, PaymentStatus } from '../../types';
import { BOOKING_STATUS_LABELS, PAYMENT_STATUS_LABELS } from '../../utils/statusLabels';

// BookingStatus badge: dạng đặc (nền nhạt, chữ đậm, biểu tượng)
export const StatusBadge: React.FC<{ status: BookingStatus; className?: string }> = ({ status, className }) => {
  const config: Record<BookingStatus, { bg: string; text: string; icon: string }> = {
    PENDING: { bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]', icon: '⏳' },
    WAITING_PAYMENT: { bg: 'bg-[#FFEDD5]', text: 'text-[#9A3412]', icon: '💳' },
    CONFIRMED: { bg: 'bg-[#DBEAFE]', text: 'text-[#1E40AF]', icon: '✓' },
    COMPLETED: { bg: 'bg-[#DCFCE7]', text: 'text-[#166534]', icon: '✓✓' },
    DISPUTED: { bg: 'bg-[#FEE2E2]', text: 'text-[#B91C1C]', icon: '⚠️' },
    CANCELLED: { bg: 'bg-[#E5E7EB]', text: 'text-[#374151]', icon: '✕' },
  };

  const item = config[status] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: '•' };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-[999px] text-[12px] font-semibold tracking-wide',
        item.bg,
        item.text,
        className
      )}
    >
      <span>{item.icon}</span>
      <span>{BOOKING_STATUS_LABELS[status] || status}</span>
    </span>
  );
};

// PaymentStatus badge: dạng viền (nền trắng, viền mảnh)
export const PaymentBadge: React.FC<{ status: PaymentStatus; className?: string }> = ({ status, className }) => {
  const config: Record<PaymentStatus, { border: string; text: string }> = {
    UNPAID: { border: 'border-[#92400E]', text: 'text-[#92400E]' },
    WAITING_DEPOSIT: { border: 'border-[#9A3412]', text: 'text-[#9A3412]' },
    DEPOSITED: { border: 'border-[#1E40AF]', text: 'text-[#1E40AF]' },
    WAITING_FINAL: { border: 'border-[#15803D]', text: 'text-[#15803D]' },
    PAID: { border: 'border-[#166534]', text: 'text-[#166534]' },
    WAITING_REFUND: { border: 'border-[#374151]', text: 'text-[#374151]' },
    REFUNDED: { border: 'border-[#374151]', text: 'text-[#374151]' },
    WAITING_RECONCILE: { border: 'border-[#B91C1C]', text: 'text-[#B91C1C]' },
  };

  const item = config[status] || { border: 'border-gray-400', text: 'text-gray-600' };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-0.5 rounded-[999px] text-[12px] font-medium bg-white border',
        item.border,
        item.text,
        className
      )}
    >
      {PAYMENT_STATUS_LABELS[status] || status}
    </span>
  );
};

