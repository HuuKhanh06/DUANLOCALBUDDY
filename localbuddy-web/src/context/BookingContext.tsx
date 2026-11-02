// context/BookingContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Booking, TimeSlotData, Review, User, GuideProfile, WithdrawalRequest, KycRecord, Notification } from '../types';
import { mockBookings } from '../data/bookings';
import { mockSlots, mockReviews, mockAppConfig, mockWallets, mockKycRecords, mockNotifications } from '../data/mockData';
import { mockUsers, mockGuideProfiles, mockExtraGuides } from '../data/users';
import { calcPenaltyAmount, calcRefundAmount } from '../features/payment/calc';
import { calcDeltaHours } from '../utils/time';

interface BookingContextType {
  bookings: Booking[];
  slots: TimeSlotData[];
  reviews: Review[];
  verifiedGuides: { user: User; profile: GuideProfile }[];
  allGuides: { user: User; profile: GuideProfile }[];
  allUsers: User[];
  currentUser: User | null;
  setCurrentUser: (u: User | null) => void;
  // Cấu hình phí sàn nền tảng (S-31)
  feeRate: number;
  updateFeeRate: (newRate: number) => boolean;
  // KYC & Quản trị Admin (S-26, S-27, S-28, S-29)
  kycRecords: KycRecord[];
  walletBalance: number;
  withdrawals: WithdrawalRequest[];
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  toggleUserLock: (userId: string) => void;
  revokeGuideVerification: (userId: string) => void;
  approveWithdrawal: (id: string) => void;
  rejectWithdrawal: (id: string) => void;
  // Actions chung
  getBookingById: (id: string) => Booking | undefined;
  getGuideById: (guideId: string) => { user: User; profile: GuideProfile } | undefined;
  // Actions của Tourist
  createBooking: (params: {
    guideId: string;
    date: string;
    startTime: string;
    endTime: string;
    hours: number;
    guestCount: number;
    meetingLocation?: string;
    specialRequests?: string;
  }) => Booking;
  payDeposit: (bookingId: string, isSuccess: boolean) => boolean;
  expireDeposit: (bookingId: string) => void;
  cancelBooking: (bookingId: string) => void;
  confirmCompletion: (bookingId: string) => void;
  payFinal: (bookingId: string, method: 'ONLINE' | 'CASH', isSuccess: boolean) => boolean;
  submitDispute: (bookingId: string, reason: string) => void;
  submitReview: (bookingId: string, stars: number, comment: string) => void;
  addVerifiedGuide: (userId: string) => void;
  // Actions của Guide
  acceptBooking: (bookingId: string) => void;
  rejectBooking: (bookingId: string) => void;
  requestCompletion: (bookingId: string) => void;
  confirmCashPayment: (bookingId: string) => void;
  guideCancelBooking: (bookingId: string) => void;
  toggleSlotAvailability: (slotId: string) => void;
  updateGuidePrice: (guideId: string, newRate: number, newBio?: string) => boolean;
  requestWithdrawal: (amount: number) => boolean;
  // Actions của Admin
  approveKyc: (guideId: string) => void;
  rejectKyc: (guideId: string, note?: string) => void;
  resolveDispute: (bookingId: string, adminNote: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [slots, setSlots] = useState<TimeSlotData[]>(mockSlots);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);
  const [walletBalance, setWalletBalance] = useState<number>(mockWallets[0].availableBalance);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([
    {
      id: 'wd-101',
      guideId: 'u-guide-1',
      amount: 200000,
      status: 'PENDING',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);
  const [kycList, setKycList] = useState<KycRecord[]>(mockKycRecords);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [feeRate, setFeeRate] = useState<number>(mockAppConfig.feeRate); // 0.12 (12%)

  // Danh sách toàn bộ người dùng trong hệ thống
  const [userList, setUserList] = useState<User[]>([
    ...mockUsers,
    ...mockExtraGuides.map((g) => g.user),
  ]);

  // Danh sách Guide
  const [allGuideList, setAllGuideList] = useState<{ user: User; profile: GuideProfile }[]>([
    { user: mockUsers[1], profile: mockGuideProfiles[0] }, // Lê Hoàng Nam (Verified)
    { user: mockUsers[2], profile: mockGuideProfiles[1] }, // Phạm Thu Hà (Chờ xác minh)
    ...mockExtraGuides,                                   // 5 Guide verified khác
  ]);

  const verifiedGuides = allGuideList.filter((g) => g.profile.isVerified);

  const getBookingById = (id: string) => bookings.find((b) => b.id === id);

  const getGuideById = (guideId: string) =>
    allGuideList.find((g) => g.user.id === guideId);

  // S-31: Cập nhật tỷ lệ phí sàn (10% - 15%), chỉ áp dụng cho đơn mới
  const updateFeeRate = (newRate: number): boolean => {
    if (newRate < 0.10 || newRate > 0.15) return false;
    setFeeRate(newRate);
    return true;
  };

  // S-27: Khóa hoặc mở khóa tài khoản
  const toggleUserLock = (userId: string) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isLocked: !u.isLocked } : u))
    );
  };

  // S-27: Thu hồi xác minh Guide
  const revokeGuideVerification = (userId: string) => {
    setAllGuideList((prev) =>
      prev.map((g) =>
        g.user.id === userId
          ? { ...g, profile: { ...g.profile, isVerified: false } }
          : g
      )
    );
  };

  // S-28: Duyệt lệnh rút tiền (sau khi Admin chuyển khoản thủ công)
  const approveWithdrawal = (id: string) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: 'APPROVED' } : w))
    );
    // Tạo thông báo cho Guide
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        userId: 'u-guide-1',
        content: `Lệnh rút tiền ${id} đã được Admin chuyển khoản thành công.`,
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  // S-28: Từ chối lệnh rút tiền -> hoàn lại số dư ví cho Guide
  const rejectWithdrawal = (id: string) => {
    const target = withdrawals.find((w) => w.id === id);
    if (!target) return;
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: 'REJECTED' } : w))
    );
    setWalletBalance((prev) => prev + target.amount);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        userId: 'u-guide-1',
        content: `Lệnh rút tiền ${id} bị từ chối. Số tiền đã được hoàn trả lại vào ví khả dụng.`,
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // ADMIN: Duyệt KYC Guide (S-26)
  const approveKyc = (guideId: string) => {
    setAllGuideList((prev) =>
      prev.map((g) =>
        g.user.id === guideId
          ? { ...g, profile: { ...g.profile, isVerified: true } }
          : g
      )
    );
    setKycList((prev) =>
      prev.map((k) =>
        k.guideId === guideId ? { ...k, status: 'APPROVED' } : k
      )
    );
  };

  // ADMIN: Từ chối KYC Guide (S-26)
  const rejectKyc = (guideId: string, note?: string) => {
    setKycList((prev) =>
      prev.map((k) =>
        k.guideId === guideId ? { ...k, status: 'REJECTED', reviewNote: note } : k
      )
    );
  };

  // ADMIN: Chốt kết quả tranh chấp (S-29)
  const resolveDispute = (bookingId: string, adminNote: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              bookingStatus: 'CANCELLED',
              paymentStatus: 'REFUNDED',
              specialRequests: b.specialRequests
                ? `${b.specialRequests} | [Admin chốt]: ${adminNote}`
                : `[Admin chốt]: ${adminNote}`,
              cancelledAt: new Date().toISOString(),
            }
          : b
      )
    );

    setSlots((prev) =>
      prev.map((s) =>
        s.bookingId === bookingId
          ? { ...s, status: 'AVAILABLE', bookingId: undefined }
          : s
      )
    );
  };

  // GUIDE: Chấp nhận đơn PENDING (S-20)
  const acceptBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              bookingStatus: 'WAITING_PAYMENT',
              paymentStatus: 'WAITING_DEPOSIT',
              confirmedAt: new Date().toISOString(),
            }
          : b
      )
    );

    const target = bookings.find((b) => b.id === bookingId);
    if (target) {
      setSlots((prev) =>
        prev.map((s) =>
          s.guideId === target.guideId &&
          s.date === target.date &&
          s.startTime === target.startTime
            ? { ...s, status: 'HOLD', bookingId }
            : s
        )
      );
    }
  };

  // GUIDE: Từ chối đơn PENDING (S-20)
  const rejectBooking = (bookingId: string) => {
    const target = bookings.find((b) => b.id === bookingId);
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, bookingStatus: 'CANCELLED', cancelledAt: new Date().toISOString() }
          : b
      )
    );

    if (target) {
      setSlots((prev) =>
        prev.map((s) =>
          s.guideId === target.guideId &&
          s.date === target.date &&
          s.startTime === target.startTime
            ? { ...s, status: 'AVAILABLE', bookingId: undefined }
            : s
        )
      );
    }
  };

  // GUIDE: Yêu cầu hoàn thành (S-21)
  const requestCompletion = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              bookingStatus: 'COMPLETED',
              paymentStatus: 'WAITING_FINAL',
              guideRequestedCompletion: true,
              completedAt: new Date().toISOString(),
            }
          : b
      )
    );
  };

  // GUIDE: Xác nhận 70% tiền mặt (S-21)
  const confirmCashPayment = (bookingId: string) => {
    const target = bookings.find((b) => b.id === bookingId);
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              paymentStatus: 'PAID',
              paymentMethod: 'CASH',
            }
          : b
      )
    );

    if (target) {
      const platformFee = Math.round(target.totalAmount * target.feeRate);
      const addition = target.depositAmount - platformFee;
      setWalletBalance((prev) => prev + addition);
    }
  };

  // GUIDE: Hủy đơn CONFIRMED
  const guideCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              bookingStatus: 'CANCELLED',
              cancelledAt: new Date().toISOString(),
              penalty: 0,
              refund: b.depositAmount,
            }
          : b
      )
    );

    setSlots((prev) =>
      prev.map((s) =>
        s.bookingId === bookingId
          ? { ...s, status: 'AVAILABLE', bookingId: undefined }
          : s
      )
    );
  };

  const toggleSlotAvailability = (slotId: string) => {
    setSlots((prev) =>
      prev.map((s) => {
        if (s.id !== slotId) return s;
        if (s.status === 'HOLD' || s.status === 'BUSY') return s;
        return {
          ...s,
          status: s.status === 'AVAILABLE' ? 'BUSY' : 'AVAILABLE',
        };
      })
    );
  };

  const updateGuidePrice = (guideId: string, newRate: number, newBio?: string): boolean => {
    if (newRate < 80000 || newRate > 500000) return false;
    setAllGuideList((prev) =>
      prev.map((g) =>
        g.user.id === guideId
          ? {
              ...g,
              profile: {
                ...g.profile,
                hourlyRate: newRate,
                bio: newBio !== undefined ? newBio : g.profile.bio,
              },
            }
          : g
      )
    );
    return true;
  };

  const requestWithdrawal = (amount: number): boolean => {
    if (amount < 200000 || amount > walletBalance) return false;
    setWalletBalance((prev) => prev - amount);
    const newReq: WithdrawalRequest = {
      id: `wd-${Date.now()}`,
      guideId: 'u-guide-1',
      amount,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    setWithdrawals((prev) => [newReq, ...prev]);
    return true;
  };

  // TOURIST: Tạo đơn mới (chụp feeRate hiện thời của hệ thống)
  const createBooking = (params: {
    guideId: string;
    date: string;
    startTime: string;
    endTime: string;
    hours: number;
    guestCount: number;
    meetingLocation?: string;
    specialRequests?: string;
  }): Booking => {
    const guideItem = getGuideById(params.guideId);
    const hourlyRate = guideItem?.profile.hourlyRate || 200000;
    const total = hourlyRate * params.hours;
    const deposit = Math.round(total * 0.3);
    const remaining = total - deposit;
    const currentFeeRate = feeRate; // Chụp Fee_Rate lúc tạo đơn

    const nextIdNumber = 1000 + bookings.length + 1;
    const newId = `BK-${nextIdNumber}`;

    const newBooking: Booking = {
      id: newId,
      touristId: 'u-tourist-1',
      guideId: params.guideId,
      date: params.date,
      startTime: params.startTime,
      endTime: params.endTime,
      hours: params.hours,
      guestCount: params.guestCount,
      meetingLocation: params.meetingLocation || '',
      specialRequests: params.specialRequests || '',
      bookingStatus: 'PENDING',
      paymentStatus: 'UNPAID',
      feeRate: currentFeeRate,
      totalAmount: total,
      depositAmount: deposit,
      remainingAmount: remaining,
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    setSlots((prev) =>
      prev.map((s) =>
        s.guideId === params.guideId &&
        s.date === params.date &&
        s.startTime === params.startTime
          ? { ...s, status: 'HOLD', bookingId: newId }
          : s
      )
    );

    return newBooking;
  };

  const payDeposit = (bookingId: string, isSuccess: boolean): boolean => {
    if (!isSuccess) return false;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              bookingStatus: 'CONFIRMED',
              paymentStatus: 'DEPOSITED',
              confirmedAt: new Date().toISOString(),
            }
          : b
      )
    );
    const target = bookings.find((b) => b.id === bookingId);
    if (target) {
      setSlots((prev) =>
        prev.map((s) =>
          s.guideId === target.guideId &&
          s.date === target.date &&
          s.startTime === target.startTime
            ? { ...s, status: 'BUSY' }
            : s
        )
      );
    }
    return true;
  };

  const expireDeposit = (bookingId: string) => {
    const target = bookings.find((b) => b.id === bookingId);
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, bookingStatus: 'CANCELLED', cancelledAt: new Date().toISOString() }
          : b
      )
    );
    if (target) {
      setSlots((prev) =>
        prev.map((s) =>
          s.guideId === target.guideId &&
          s.date === target.date &&
          s.startTime === target.startTime
            ? { ...s, status: 'AVAILABLE', bookingId: undefined }
            : s
        )
      );
    }
  };

  const cancelBooking = (bookingId: string) => {
    const b = bookings.find((item) => item.id === bookingId);
    if (!b) return;

    const delta = b.deltaHours ?? Math.max(0, calcDeltaHours(b.date, b.startTime));
    const penalty = b.paymentStatus === 'DEPOSITED' ? calcPenaltyAmount(b.depositAmount, delta) : 0;
    const refund = b.paymentStatus === 'DEPOSITED' ? calcRefundAmount(b.depositAmount, delta) : 0;

    setBookings((prev) =>
      prev.map((item) =>
        item.id === bookingId
          ? {
              ...item,
              bookingStatus: 'CANCELLED',
              cancelledAt: new Date().toISOString(),
              deltaHours: delta,
              penalty,
              refund,
            }
          : item
      )
    );

    setSlots((prev) =>
      prev.map((s) =>
        s.bookingId === bookingId
          ? { ...s, status: 'AVAILABLE', bookingId: undefined }
          : s
      )
    );
  };

  const confirmCompletion = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              bookingStatus: 'COMPLETED',
              paymentStatus: 'WAITING_FINAL',
              completedAt: new Date().toISOString(),
              touristConfirmedCompletion: true,
            }
          : b
      )
    );
  };

  const payFinal = (bookingId: string, method: 'ONLINE' | 'CASH', isSuccess: boolean): boolean => {
    if (!isSuccess) return false;
    const target = bookings.find((b) => b.id === bookingId);

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          paymentMethod: method,
          paymentStatus: method === 'ONLINE' ? 'PAID' : 'WAITING_FINAL',
        };
      })
    );

    if (method === 'ONLINE' && target) {
      const fee = Math.round(target.totalAmount * target.feeRate);
      const receives = target.totalAmount - fee;
      setWalletBalance((prev) => prev + receives);
    }

    return true;
  };

  const submitDispute = (bookingId: string, _reason: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, bookingStatus: 'DISPUTED', paymentStatus: 'WAITING_RECONCILE' }
          : b
      )
    );
  };

  const submitReview = (bookingId: string, stars: number, comment: string) => {
    const b = bookings.find((item) => item.id === bookingId);
    if (!b) return;
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      bookingId,
      touristId: b.touristId,
      guideId: b.guideId,
      stars,
      comment,
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  const addVerifiedGuide = (userId: string) => {
    setAllGuideList((prev) =>
      prev.map((g) =>
        g.user.id === userId ? { ...g, profile: { ...g.profile, isVerified: true } } : g
      )
    );
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        slots,
        reviews,
        verifiedGuides,
        allGuides: allGuideList,
        allUsers: userList,
        currentUser,
        setCurrentUser,
        feeRate,
        updateFeeRate,
        kycRecords: kycList,
        walletBalance,
        withdrawals,
        notifications,
        markNotificationAsRead,
        toggleUserLock,
        revokeGuideVerification,
        approveWithdrawal,
        rejectWithdrawal,
        getBookingById,
        getGuideById,
        createBooking,
        payDeposit,
        expireDeposit,
        cancelBooking,
        confirmCompletion,
        payFinal,
        submitDispute,
        submitReview,
        addVerifiedGuide,
        acceptBooking,
        rejectBooking,
        requestCompletion,
        confirmCashPayment,
        guideCancelBooking,
        toggleSlotAvailability,
        updateGuidePrice,
        requestWithdrawal,
        approveKyc,
        rejectKyc,
        resolveDispute,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBookingContext must be used within BookingProvider');
  return context;
};
