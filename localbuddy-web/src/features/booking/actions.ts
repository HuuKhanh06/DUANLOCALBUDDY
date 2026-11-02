// features/booking/actions.ts
// Trả về danh sách nút hành động theo (BookingStatus, PaymentStatus, vai trò, đủ điều kiện)

import { BookingStatus, PaymentStatus, UserRole } from '../../types';

export interface BookingAction {
  key: string;
  label: string;
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
}

interface ActionsParams {
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  role: UserRole;
  canReview?: boolean;          // COMPLETED + PAID + chưa đánh giá
  canConfirmComplete?: boolean; // Tourist: Guide đã yêu cầu hoàn thành hoặc ca đã qua
  isAfterShiftEnd?: boolean;    // Guide: ca đã kết thúc
  isCashBranch?: boolean;       // Tourist chọn tiền mặt, chờ Guide xác nhận
  deltaHours?: number;          // ΔT giờ đến ca (nếu <= 0 thì ẩn nút hủy)
}

export function getBookingActions(p: ActionsParams): BookingAction[] {
  const actions: BookingAction[] = [];
  const { bookingStatus: bs, paymentStatus: ps, role, deltaHours } = p;

  // ── TOURIST ──────────────────────────────────────────────
  if (role === 'tourist') {
    if (bs === 'WAITING_PAYMENT' && ps === 'WAITING_DEPOSIT') {
      actions.push({ key: 'pay_deposit', label: 'Thanh toán cọc', variant: 'primary' });
    }
    // Hủy đơn chỉ khi CONFIRMED + DEPOSITED và ΔT > 0 (ẩn nút hủy khi ΔT <= 0 theo Q5)
    if (bs === 'CONFIRMED' && ps === 'DEPOSITED') {
      if (deltaHours === undefined || deltaHours > 0) {
        actions.push({ key: 'cancel', label: 'Hủy đơn', variant: 'danger' });
      }
      if (p.canConfirmComplete) {
        actions.push({ key: 'confirm_complete', label: 'Xác nhận hoàn tất', variant: 'primary' });
      }
    }
    if (bs === 'COMPLETED' && ps === 'WAITING_FINAL') {
      actions.push({ key: 'pay_final', label: 'Thanh toán 70%', variant: 'primary' });
      actions.push({ key: 'dispute', label: 'Khiếu nại', variant: 'danger' });
    }
    if (bs === 'COMPLETED' && ps === 'PAID' && p.canReview) {
      actions.push({ key: 'review', label: 'Đánh giá', variant: 'secondary' });
    }
    // PENDING: không có nút hành động (chờ Guide)
    // DISPUTED, CANCELLED: chỉ xem
  }

  // ── GUIDE ────────────────────────────────────────────────
  if (role === 'guide') {
    if (bs === 'PENDING') {
      actions.push({ key: 'accept', label: 'Chấp nhận', variant: 'primary' });
      actions.push({ key: 'reject', label: 'Từ chối', variant: 'danger' });
    }
    if (bs === 'CONFIRMED') {
      if (deltaHours === undefined || deltaHours > 0) {
        actions.push({ key: 'cancel', label: 'Hủy đơn', variant: 'danger' });
      }
      if (p.isAfterShiftEnd) {
        actions.push({ key: 'request_complete', label: 'Yêu cầu hoàn thành', variant: 'primary' });
      }
    }
    if (bs === 'COMPLETED' && p.isCashBranch) {
      actions.push({ key: 'confirm_cash', label: 'Xác nhận đã nhận tiền mặt', variant: 'primary' });
    }
    // WAITING_PAYMENT, DISPUTED, CANCELLED: chỉ xem
  }

  // ── ADMIN ─────────────────────────────────────────────────
  if (role === 'admin') {
    if (bs === 'DISPUTED') {
      actions.push({ key: 'resolve_dispute', label: 'Chốt tranh chấp', variant: 'primary' });
    }
  }

  return actions;
}
