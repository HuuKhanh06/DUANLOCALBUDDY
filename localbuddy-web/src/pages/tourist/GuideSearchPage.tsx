// pages/tourist/GuideSearchPage.tsx (S-06)
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuideCard, EmptyState, LoadingState, ErrorState } from '../../components/common/GuideCard';
import { useBookingContext } from '../../context/BookingContext';
import { Button } from '../../components/ui/Button';

export const GuideSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { verifiedGuides } = useBookingContext();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [minRating, setMinRating] = useState<number>(0);

  // Demo state switches
  const [simulateLoading, setSimulateLoading] = useState(false);
  const [simulateError, setSimulateError] = useState(false);

  // Lọc Guide (CHỈ hiển thị Guide isVerified === true)
  const filteredGuides = useMemo(() => {
    return verifiedGuides.filter((item) => {
      const matchName = item.user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchArea = item.profile.areas.some((a) =>
        a.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchPrice = item.profile.hourlyRate <= maxPrice;
      const matchRating = item.profile.avgRating >= minRating;
      return (matchName || matchArea) && matchPrice && matchRating;
    });
  }, [verifiedGuides, searchTerm, maxPrice, minRating]);

  const hasFilterActive = searchTerm !== '' || maxPrice < 500000 || minRating > 0;

  const handleResetFilters = () => {
    setSearchTerm('');
    setMaxPrice(500000);
    setMinRating(0);
  };

  return (
    <div className="py-6 space-y-6">
      {/* Header & Demo controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D6E2D9] pb-4">
        <div>
          <h1 className="text-[26px] font-bold text-[#14231A]">Tìm kiếm Local Guide tại Đà Nẵng</h1>
          <p className="text-[14px] text-[#4B5B50] mt-1">
            Chỉ hiển thị các hướng dẫn viên đã được kiểm duyệt xác minh danh tính (KYC).
          </p>
        </div>

        {/* Nút giả lập trạng thái cho bài kiểm thử */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white p-1.5 rounded-[8px] border border-[#D6E2D9] text-[12px]">
          <span className="text-[#4B5B50] font-semibold">Demo:</span>
          <button
            onClick={() => setSimulateLoading(!simulateLoading)}
            className={`px-2 py-1 rounded ${simulateLoading ? 'bg-[#15803D] text-white' : 'bg-gray-100 text-[#14231A]'}`}
          >
            {simulateLoading ? 'Tắt Loading' : 'Giả lập Loading'}
          </button>
          <button
            onClick={() => setSimulateError(!simulateError)}
            className={`px-2 py-1 rounded ${simulateError ? 'bg-[#B91C1C] text-white' : 'bg-gray-100 text-[#14231A]'}`}
          >
            {simulateError ? 'Tắt Error' : 'Giả lập Lỗi'}
          </button>
        </div>
      </div>

      {/* Bộ lọc và Tìm kiếm */}
      <div className="bg-white border border-[#D6E2D9] rounded-[12px] p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Tìm theo tên Guide hoặc địa điểm (Hội An, Mỹ Khê...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-[8px] border border-[#D6E2D9] text-[14px] focus:outline-none focus:border-[#15803D]"
          />
          <span className="absolute left-3 top-2.5 text-[#4B5B50]">🔍</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 text-[14px]">
            <span className="text-[#4B5B50]">Giá tối đa:</span>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border border-[#D6E2D9] rounded-[8px] px-2.5 py-1.5 text-[14px] bg-white"
            >
              <option value={500000}>Tất cả mức giá</option>
              <option value={200000}>≤ 200.000 đ/h</option>
              <option value={150000}>≤ 150.000 đ/h</option>
              <option value={120000}>≤ 120.000 đ/h</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-[14px]">
            <span className="text-[#4B5B50]">Đánh giá:</span>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="border border-[#D6E2D9] rounded-[8px] px-2.5 py-1.5 text-[14px] bg-white"
            >
              <option value={0}>Tất cả sao</option>
              <option value={4.5}>Từ 4.5 ★ trở lên</option>
              <option value={4.8}>Từ 4.8 ★ trở lên</option>
            </select>
          </div>

          {hasFilterActive && (
            <Button variant="ghost" onClick={handleResetFilters} className="text-[13px] h-8">
              ✕ Xóa bộ lọc
            </Button>
          )}
        </div>
      </div>

      {/* Hiển thị danh sách kết quả */}
      {simulateError ? (
        <ErrorState
          message="Lỗi mô phỏng: Không thể nạp danh sách Guide từ hệ thống."
          onRetry={() => setSimulateError(false)}
        />
      ) : simulateLoading ? (
        <LoadingState message="Đang tìm kiếm các hướng dẫn viên khả dụng..." />
      ) : filteredGuides.length === 0 ? (
        <EmptyState
          title="Không tìm thấy Guide phù hợp"
          description="Hãy thử từ khóa khác hoặc bấm nút xóa bộ lọc để xem toàn bộ danh sách."
          actionText="Xóa bộ lọc tìm kiếm"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map(({ user, profile }) => (
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
      )}
    </div>
  );
};

