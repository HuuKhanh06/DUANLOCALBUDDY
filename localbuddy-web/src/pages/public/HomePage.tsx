// pages/public/HomePage.tsx (S-01: Trang chủ)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBookingContext } from '../../context/BookingContext';
import { GuideCard } from '../../components/common/GuideCard';
import { Button } from '../../components/ui/Button';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { verifiedGuides } = useBookingContext();
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/guides?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="space-y-12 py-4">
      {/* Hero Banner */}
      <section className="relative rounded-[24px] overflow-hidden bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#166534] text-white p-8 md:p-14 shadow-lg">
        <div className="max-w-2xl space-y-4">
          <span className="bg-[#86EFAC]/20 text-[#86EFAC] px-3.5 py-1 rounded-full text-[13px] font-semibold border border-[#86EFAC]/30 inline-block">
            🌱 Nền tảng Local Guide theo giờ tại Đà Nẵng
          </span>
          <h1 className="text-[32px] md:text-[42px] font-extrabold leading-tight">
            Khám phá Đà Nẵng cùng người bản địa thân thiện
          </h1>
          <p className="text-[16px] text-white/80 leading-relaxed">
            Đặt hướng dẫn viên địa phương đã được xác minh danh tính (KYC). Minh bạch giá cả, thanh toán linh hoạt, đồng hành cùng bạn trên từng cung đường.
          </p>

          {/* Ô tìm kiếm nhanh */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 pt-2 max-w-lg">
            <input
              type="text"
              placeholder="Nhập địa điểm (Mỹ Khê, Hội An, Sơn Trà...)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="px-4 py-3 rounded-[8px] text-[15px] text-[#14231A] bg-white flex-1 focus:outline-none"
            />
            <Button type="submit" variant="secondary" className="font-bold whitespace-nowrap px-6">
              🔍 Tìm Guide ngay
            </Button>
          </form>
        </div>
      </section>

      {/* Cam kết cốt lõi */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm flex items-start gap-4">
          <span className="text-3xl p-3 bg-[#DCFCE7] text-[#15803D] rounded-xl">🛡️</span>
          <div>
            <h3 className="font-bold text-[16px] text-[#14231A]">100% Xác minh danh tính</h3>
            <p className="text-[13px] text-[#4B5B50] mt-1">
              Chỉ các Guide có hồ sơ CCCD và chuyên môn được Admin phê duyệt mới được mở lịch.
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm flex items-start gap-4">
          <span className="text-3xl p-3 bg-[#FEF3C7] text-[#92400E] rounded-xl">💳</span>
          <div>
            <h3 className="font-bold text-[16px] text-[#14231A]">Cọc 30% linh hoạt</h3>
            <p className="text-[13px] text-[#4B5B50] mt-1">
              Chỉ cọc 30% giữ chỗ trong 15 phút. 70% còn lại thanh toán sau khi chuyến đi hoàn tất.
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm flex items-start gap-4">
          <span className="text-3xl p-3 bg-[#DBEAFE] text-[#1E40AF] rounded-xl">⚖️</span>
          <div>
            <h3 className="font-bold text-[16px] text-[#14231A]">Bảo vệ quyền lợi</h3>
            <p className="text-[13px] text-[#4B5B50] mt-1">
              Quy tắc hoàn hủy minh bạch theo mốc 48h/24h. Admin hỗ trợ giải quyết tranh chấp công bằng.
            </p>
          </div>
        </div>
      </section>

      {/* Danh sách Guide nổi bật đã xác minh */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[22px] font-bold text-[#14231A]">Hướng dẫn viên nổi bật tại Đà Nẵng</h2>
            <p className="text-[14px] text-[#4B5B50]">Được du khách đánh giá cao và sẵn sàng đồng hành</p>
          </div>
          <Link to="/guides" className="text-[14px] font-bold text-[#15803D] hover:underline">
            Xem tất cả Guide →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedGuides.slice(0, 3).map(({ user, profile }) => (
            <GuideCard
              key={user.id}
              id={user.id}
              name={user.fullName}
              bio={profile.bio}
              hourlyRate={profile.hourlyRate}
              avgRating={profile.avgRating}
              totalReviews={profile.totalReviews}
              areas={profile.areas}
              isVerified={profile.isVerified}
              onClick={() => navigate(`/guides/${user.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

