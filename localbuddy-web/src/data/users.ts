// data/users.ts
import { User, GuideProfile } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u-tourist-1',
    role: 'tourist',
    fullName: 'Trần Minh Anh',
    email: 'minhanh.demo@example.com',
    phone: '0900000001',
    isLocked: false,
  },
  {
    id: 'u-guide-1',
    role: 'guide',
    fullName: 'Lê Hoàng Nam',
    email: 'hoangnam.demo@example.com',
    phone: '0900000002',
    isLocked: false,
  },
  {
    id: 'u-guide-2',
    role: 'guide',
    fullName: 'Phạm Thu Hà',
    email: 'thuha.demo@example.com',
    phone: '0900000003',
    isLocked: false,
  },
  {
    id: 'u-admin-1',
    role: 'admin',
    fullName: 'Admin LocalBuddy',
    email: 'admin@localbuddy.vn',
    phone: '0900000099',
    isLocked: false,
  },
];

export const mockGuideProfiles: GuideProfile[] = [
  {
    userId: 'u-guide-1',
    bio: 'Hướng dẫn viên địa phương tại Đà Nẵng với 5 năm kinh nghiệm. Thông thạo tiếng Anh và tiếng Việt.',
    hourlyRate: 200000,
    isVerified: true,
    avgRating: 4.8,
    totalReviews: 42,
    areas: ['Mỹ Khê', 'Bà Nà', 'Hội An'],
    avatarUrl: undefined,
  },
  {
    userId: 'u-guide-2',
    bio: 'Sinh viên du lịch, yêu thích chia sẻ văn hóa địa phương.',
    hourlyRate: 150000,
    isVerified: false, // chờ xác minh
    avgRating: 0,
    totalReviews: 0,
    areas: ['Ngũ Hành Sơn'],
    avatarUrl: undefined,
  },
];

// Thêm 5 Guide đã xác minh khác để S-06 có đủ 6 Guide
export const mockExtraGuides: { user: User; profile: GuideProfile }[] = [
  {
    user: { id: 'u-guide-3', role: 'guide', fullName: 'Nguyễn Văn Bình', email: 'binh.demo@example.com', phone: '0900000004', isLocked: false },
    profile: { userId: 'u-guide-3', bio: 'Chuyên tour ẩm thực Đà Nẵng.', hourlyRate: 180000, isVerified: true, avgRating: 4.5, totalReviews: 18, areas: ['Hải Châu'] },
  },
  {
    user: { id: 'u-guide-4', role: 'guide', fullName: 'Trần Thị Lan', email: 'lan.demo@example.com', phone: '0900000005', isLocked: false },
    profile: { userId: 'u-guide-4', bio: 'Tour cồn Đình – làng quê miền Trung.', hourlyRate: 120000, isVerified: true, avgRating: 4.6, totalReviews: 31, areas: ['Cồn Đình'] },
  },
  {
    user: { id: 'u-guide-5', role: 'guide', fullName: 'Lý Minh Tuấn', email: 'tuan.demo@example.com', phone: '0900000006', isLocked: false },
    profile: { userId: 'u-guide-5', bio: 'Chuyên tour leo núi và thể thao mạo hiểm.', hourlyRate: 250000, isVerified: true, avgRating: 4.9, totalReviews: 55, areas: ['Bà Nà', 'Sơn Trà'] },
  },
  {
    user: { id: 'u-guide-6', role: 'guide', fullName: 'Võ Thị Mai', email: 'mai.demo@example.com', phone: '0900000007', isLocked: false },
    profile: { userId: 'u-guide-6', bio: 'Hướng dẫn phố cổ Hội An.', hourlyRate: 160000, isVerified: true, avgRating: 4.7, totalReviews: 27, areas: ['Hội An'] },
  },
  {
    user: { id: 'u-guide-7', role: 'guide', fullName: 'Đặng Quốc Hùng', email: 'hung.demo@example.com', phone: '0900000008', isLocked: false },
    profile: { userId: 'u-guide-7', bio: 'Tour biển Mỹ Khê và bán đảo Sơn Trà.', hourlyRate: 140000, isVerified: true, avgRating: 4.4, totalReviews: 12, areas: ['Mỹ Khê', 'Sơn Trà'] },
  },
];

