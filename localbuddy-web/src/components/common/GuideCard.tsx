// components/common/GuideCard.tsx & TimeSlot.tsx & Countdown.tsx & States
import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { SlotStatus } from '../../types';
import { formatMoney } from '../../utils/money';

// Guide Card
export interface GuideCardProps {
  id: string;
  name: string;
  bio: string;
  hourlyRate: number;
  avgRating: number;
  totalReviews: number;
  areas: string[];
  isVerified: boolean;
  onClick?: () => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({
  name,
  bio,
  hourlyRate,
  avgRating,
  totalReviews,
  areas,
  isVerified,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#D6E2D9] rounded-[12px] p-5 shadow-sm hover:border-[#15803D] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold flex items-center justify-center text-[18px]">
            {name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-[16px] font-bold text-[#14231A]">{name}</h4>
              {isVerified && (
                <span className="text-[11px] bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full font-semibold">
                  ✓ Đã xác minh
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[13px] text-[#4B5B50]">
              <span className="text-amber-500">★</span>
              <span className="font-semibold text-[#14231A]">{avgRating.toFixed(1)}</span>
              <span>({totalReviews} đánh giá)</span>
            </div>
          </div>
        </div>

        <p className="text-[14px] text-[#4B5B50] line-clamp-2 mb-3">{bio}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {areas.map((a, idx) => (
            <span key={idx} className="text-[12px] bg-[#F6FAF6] border border-[#D6E2D9] px-2 py-0.5 rounded-md text-[#4B5B50]">
              📍 {a}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-[#D6E2D9] pt-3 flex items-center justify-between">
        <div>
          <span className="text-[12px] text-[#4B5B50]">Giá theo giờ: </span>
          <span className="text-[16px] font-bold text-[#15803D] tabular-nums">
            {formatMoney(hourlyRate)}/h
          </span>
        </div>
        <span className="text-[14px] font-semibold text-[#15803D]">Xem lịch →</span>
      </div>
    </div>
  );
};

// TimeSlot (4 trạng thái: AVAILABLE, HOLD, BUSY, SELECTED)
export interface TimeSlotProps {
  startTime: string;
  endTime: string;
  status: SlotStatus;
  isSelected?: boolean;
  onClick?: () => void;
  holdSecondsLeft?: number;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({
  startTime,
  endTime,
  status,
  isSelected,
  onClick,
  holdSecondsLeft,
}) => {
  const isAvailable = status === 'AVAILABLE';

  return (
    <button
      type="button"
      disabled={!isAvailable}
      onClick={isAvailable ? onClick : undefined}
      className={clsx(
        'px-3 py-2 rounded-[8px] border text-[13px] font-medium transition-all flex flex-col items-center justify-center min-h-[44px]',
        isSelected && 'bg-[#15803D] text-white border-[#15803D] shadow-sm',
        !isSelected && isAvailable && 'bg-white border-[#D6E2D9] text-[#14231A] hover:border-[#15803D]',
        status === 'HOLD' && 'bg-[#FFEDD5] border-[#FDBA74] text-[#9A3412] cursor-not-allowed',
        status === 'BUSY' && 'bg-[#E5E7EB] border-[#D1D5DB] text-[#6B7280] cursor-not-allowed line-through'
      )}
    >
      <span>{startTime} – {endTime}</span>
      {status === 'HOLD' && (
        <span className="text-[10px] font-normal">
          {holdSecondsLeft ? `Giữ chỗ (${Math.floor(holdSecondsLeft / 60)}p)` : 'Đang giữ'}
        </span>
      )}
      {status === 'BUSY' && <span className="text-[10px] font-normal">Đã có lịch</span>}
      {status === 'AVAILABLE' && !isSelected && <span className="text-[10px] text-[#15803D]">Trống</span>}
    </button>
  );
};

// Countdown
export const Countdown: React.FC<{ seconds: number; onExpire?: () => void; label?: string }> = ({
  seconds,
  onExpire,
  label,
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const hrs = Math.floor(timeLeft / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;
  const isUrgent = timeLeft < 300; // dưới 5 phút chuyển cam/đỏ

  return (
    <div className={clsx(
      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] font-mono text-[14px] font-semibold border',
      isUrgent
        ? 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]'
        : 'bg-[#F6FAF6] text-[#15803D] border-[#15803D]'
    )}>
      <span>⏱</span>
      {label && <span className="font-sans font-normal text-[12px]">{label}:</span>}
      <span className="tabular-nums">
        {hrs > 0 && `${String(hrs).padStart(2, '0')}:`}
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>
    </div>
  );
};

// Empty State
export const EmptyState: React.FC<{
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}> = ({ title, description, actionText, onAction }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-[#D6E2D9] rounded-[16px] bg-white">
    <span className="text-4xl mb-3">🍃</span>
    <h3 className="text-[18px] font-semibold text-[#14231A]">{title}</h3>
    {description && <p className="text-[14px] text-[#4B5B50] mt-1 max-w-sm">{description}</p>}
    {actionText && onAction && (
      <button
        onClick={onAction}
        className="mt-4 px-4 py-2 bg-[#15803D] text-white rounded-[8px] text-[14px] font-semibold hover:bg-[#14532D]"
      >
        {actionText}
      </button>
    )}
  </div>
);

// Loading State
export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Đang tải dữ liệu...' }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 space-y-3">
    <div className="w-8 h-8 border-4 border-[#15803D] border-t-transparent rounded-full animate-spin" />
    <span className="text-[14px] text-[#4B5B50] font-medium">{message}</span>
  </div>
);

// Error State
export const ErrorState: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-[#FEE2E2] rounded-[16px] bg-[#FEF2F2]">
    <span className="text-3xl mb-2">⚠️</span>
    <h4 className="text-[16px] font-semibold text-[#B91C1C]">Có lỗi xảy ra</h4>
    <p className="text-[14px] text-[#4B5B50] mt-1 max-w-sm mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 border border-[#B91C1C] text-[#B91C1C] rounded-[8px] text-[14px] font-semibold hover:bg-white"
      >
        Thử lại
      </button>
    )}
  </div>
);

