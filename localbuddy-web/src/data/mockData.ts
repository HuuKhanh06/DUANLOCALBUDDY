// data/slots.ts – Khung giờ của Guide Lê Hoàng Nam
import { TimeSlotData } from '../types';

export const mockSlots: TimeSlotData[] = [
  // Ngày 02/11/2026
  { id: 'slot-1', guideId: 'u-guide-1', date: '2026-11-02', startTime: '09:00', endTime: '12:00', status: 'AVAILABLE' },
  { id: 'slot-2', guideId: 'u-guide-1', date: '2026-11-02', startTime: '14:00', endTime: '17:00', status: 'HOLD', bookingId: 'BK-1002' },
  { id: 'slot-3', guideId: 'u-guide-1', date: '2026-11-02', startTime: '18:00', endTime: '20:00', status: 'BUSY', bookingId: 'BK-1003' },
  // Ngày 03/11/2026
  { id: 'slot-4', guideId: 'u-guide-1', date: '2026-11-03', startTime: '08:00', endTime: '11:00', status: 'AVAILABLE' },
  { id: 'slot-5', guideId: 'u-guide-1', date: '2026-11-03', startTime: '13:00', endTime: '16:00', status: 'AVAILABLE' },
  // Ngày 04/11/2026
  { id: 'slot-6', guideId: 'u-guide-1', date: '2026-11-04', startTime: '09:00', endTime: '12:00', status: 'AVAILABLE' },
];

// data/reviews.ts
export const mockReviews = [
  {
    id: 'rev-1',
    bookingId: 'BK-1005',
    touristId: 'u-tourist-1',
    guideId: 'u-guide-1',
    stars: 5,
    comment: 'Anh Nam rất nhiệt tình, am hiểu văn hoá địa phương. Chắc chắn sẽ đặt lại!',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// data/kyc.ts
export const mockKycRecords = [
  {
    id: 'kyc-1',
    guideId: 'u-guide-2',
    documents: [
      { name: 'CMND mặt trước', url: 'https://placehold.co/400x250?text=CMND+Mat+Truoc' },
      { name: 'CMND mặt sau', url: 'https://placehold.co/400x250?text=CMND+Mat+Sau' },
    ],
    status: 'PENDING' as const,
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// data/notifications.ts
export const mockNotifications = [
  {
    id: 'notif-1',
    userId: 'u-tourist-1',
    content: 'Guide Lê Hoàng Nam đã chấp nhận đơn BK-1002. Bạn có 15 phút để đặt cọc.',
    bookingId: 'BK-1002',
    isRead: false,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-2',
    userId: 'u-tourist-1',
    content: 'Đơn BK-1004 đã hoàn thành. Vui lòng thanh toán 70% còn lại.',
    bookingId: 'BK-1004',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-3',
    userId: 'u-guide-1',
    content: 'Bạn có đơn mới BK-1001 từ Trần Minh Anh.',
    bookingId: 'BK-1001',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

// data/wallets.ts
export const mockWallets = [
  {
    guideId: 'u-guide-1',
    availableBalance: 528000, // nhận từ BK-1005
  },
  {
    guideId: 'u-guide-2',
    availableBalance: 0,
  },
];

export const mockWithdrawals = [
  // Không có yêu cầu rút nào để bắt đầu
];

// data/config.ts
export const mockAppConfig = {
  feeRate: 0.12, // 12%
};

