// components/common/BookingCard.tsx
import React from 'react';
import { Booking } from '../../types';
import { StatusBadge, PaymentBadge } from './StatusBadge';
import { formatMoney } from '../../utils/money';
import { formatDate, formatTimeRange } from '../../utils/time';

interface BookingCardProps {
  booking: Booking;
  guideName?: string;
  touristName?: string;
  onClick?: () => void;
  actionButton?: React.ReactNode;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  guideName,
  touristName,
  onClick,
  actionButton,
}) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white border border-[#D6E2D9] rounded-[12px] p-4 shadow-sm hover:border-[#15803D] transition-colors cursor-pointer flex flex-col justify-between gap-4"
    >
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div>
          <span className="text-[12px] font-bold text-[#4B5B50] uppercase tracking-wider">{booking.id}</span>
          <h4 className="text-[16px] font-semibold text-[#14231A]">
            {guideName ? `Guide: ${guideName}` : touristName ? `Khách: ${touristName}` : 'Đơn đặt lịch'}
          </h4>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={booking.bookingStatus} />
          {/* Không hiển thị PaymentBadge ở nhánh hủy/tranh chấp nếu chưa gán */}
          {booking.bookingStatus !== 'CANCELLED' && booking.bookingStatus !== 'DISPUTED' && (
            <PaymentBadge status={booking.paymentStatus} />
          )}
        </div>
      </div>

      <div className="text-[14px] text-[#4B5B50] space-y-1">
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>{formatDate(booking.date)} ({formatTimeRange(booking.startTime, booking.endTime)})</span>
        </div>
        <div className="flex items-center gap-2">
          <span>👥</span>
          <span>{booking.guestCount} khách • {booking.hours} giờ</span>
        </div>
        {booking.meetingLocation && (
          <div className="flex items-center gap-2 truncate">
            <span>📍</span>
            <span className="truncate">{booking.meetingLocation}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-[#D6E2D9] pt-3 mt-1">
        <div>
          <span className="text-[12px] text-[#4B5B50]">Tổng tiền: </span>
          <span className="text-[16px] font-bold text-[#15803D] tabular-nums">
            {formatMoney(booking.totalAmount)}
          </span>
        </div>
        {actionButton && <div>{actionButton}</div>}
      </div>
    </div>
  );
};

