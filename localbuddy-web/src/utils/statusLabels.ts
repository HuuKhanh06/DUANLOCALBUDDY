// utils/statusLabels.ts – Nhãn tiếng Việt cho enum

import { BookingStatus, PaymentStatus, SlotStatus } from '../types';

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING: 'Chờ Guide xác nhận',
  WAITING_PAYMENT: 'Chờ đặt cọc',
  CONFIRMED: 'Đã xác nhận',
  COMPLETED: 'Đã hoàn thành',
  DISPUTED: 'Đang tranh chấp',
  CANCELLED: 'Đã hủy',
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  UNPAID: 'Chưa thanh toán',
  WAITING_DEPOSIT: 'Chờ thanh toán cọc',
  DEPOSITED: 'Đã cọc 30%',
  WAITING_FINAL: 'Chờ thanh toán 70%',
  PAID: 'Đã thanh toán đủ',
  WAITING_REFUND: 'Chờ hoàn tiền',
  REFUNDED: 'Đã hoàn tiền',
  WAITING_RECONCILE: 'Chờ đối soát',
};

export const SLOT_STATUS_LABELS: Record<SlotStatus, string> = {
  AVAILABLE: 'Trống',
  HOLD: 'Đang giữ chỗ',
  BUSY: 'Đã có lịch',
};

