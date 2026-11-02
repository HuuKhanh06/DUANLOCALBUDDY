// ============================================================
// TYPES – LOCALBUDDY
// ============================================================

// ---------- User ----------
export type UserRole = 'tourist' | 'guide' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  phone: string;
  isLocked: boolean;
}

export interface GuideProfile {
  userId: string;
  bio: string;
  hourlyRate: number; // VND, 80000–500000
  isVerified: boolean;
  avgRating: number;
  totalReviews: number;
  areas: string[]; // e.g. ['Mỹ Khê', 'Bà Nà', 'Hội An']
  avatarUrl?: string;
}

// ---------- Slot ----------
export type SlotStatus = 'AVAILABLE' | 'HOLD' | 'BUSY';

export interface TimeSlotData {
  id: string;
  guideId: string;
  date: string;       // 'YYYY-MM-DD'
  startTime: string;  // 'HH:mm'
  endTime: string;    // 'HH:mm'
  status: SlotStatus;
  bookingId?: string; // set when HOLD or BUSY
}

// ---------- Booking ----------
export type BookingStatus =
  | 'PENDING'
  | 'WAITING_PAYMENT'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'DISPUTED'
  | 'CANCELLED';

export type PaymentStatus =
  | 'UNPAID'
  | 'WAITING_DEPOSIT'
  | 'DEPOSITED'
  | 'WAITING_FINAL'
  | 'PAID'
  | 'WAITING_REFUND'   // hidden by default
  | 'REFUNDED'         // hidden by default
  | 'WAITING_RECONCILE';

export type PaymentMethod = 'ONLINE' | 'CASH';

export interface Booking {
  id: string; // 'BK-1001' … 'BK-1007'
  touristId: string;
  guideId: string;
  date: string;       // 'YYYY-MM-DD'
  startTime: string;
  endTime: string;
  hours: number;
  guestCount: number;
  meetingLocation?: string;
  specialRequests?: string;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  feeRate: number;      // e.g. 0.12 (captured at booking creation)
  totalAmount: number;  // G
  depositAmount: number; // D = 30% G
  remainingAmount: number; // B = 70% G
  createdAt: string;    // ISO datetime
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  deltaHours?: number;  // ΔT for cancelled bookings
  penalty?: number;
  refund?: number;
  paymentMethod?: PaymentMethod;
  guideRequestedCompletion?: boolean;
  touristConfirmedCompletion?: boolean;
}

// ---------- Payment ----------
export interface Payment {
  id: string;
  bookingId: string;
  type: 'deposit' | 'final';
  method: PaymentMethod;
  amount: number;
  result: 'success' | 'fail' | 'pending';
  createdAt: string;
}

// ---------- Review ----------
export interface Review {
  id: string;
  bookingId: string;
  touristId: string;
  guideId: string;
  stars: number;      // 1–5
  comment: string;
  createdAt: string;
}

// ---------- KYC ----------
export type KycStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface KycDocument {
  name: string;
  url: string; // placeholder image
}

export interface KycRecord {
  id: string;
  guideId: string;
  documents: KycDocument[];
  status: KycStatus;
  submittedAt: string;
  reviewNote?: string;
}

// ---------- Notification ----------
export interface Notification {
  id: string;
  userId: string;
  content: string;
  bookingId?: string;
  isRead: boolean;
  createdAt: string;
}

// ---------- Wallet ----------
export interface Wallet {
  guideId: string;
  availableBalance: number; // VND
}

export interface WithdrawalRequest {
  id: string;
  guideId: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

// ---------- App Config ----------
export interface AppConfig {
  feeRate: number; // 0.10 to 0.15
}

