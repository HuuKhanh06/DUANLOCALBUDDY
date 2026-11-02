// pages/tourist/BookingDetailPage.tsx (S-11 + S-16 Modal hủy)
import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useBookingContext } from '../../context/BookingContext';
import { StatusBadge, PaymentBadge } from '../../components/common/StatusBadge';
import { PaymentSummary } from '../../components/common/PaymentSummary';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Input';
import { Countdown } from '../../components/common/GuideCard';
import { useToast } from '../../components/ui/Toast';
import { formatMoney } from '../../utils/money';
import { formatDate, formatTimeRange, calcDeltaHours } from '../../utils/time';
import { calcPenaltyRate, calcPenaltyAmount, calcRefundAmount } from '../../features/payment/calc';
import { getBookingActions } from '../../features/booking/actions';

export const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    getBookingById,
    getGuideById,
    cancelBooking,
    confirmCompletion,
    submitDispute,
    submitReview,
    reviews,
  } = useBookingContext();
  const { showToast } = useToast();

  const booking = getBookingById(id || '');
  const guideItem = booking ? getGuideById(booking.guideId) : undefined;

  // Kiểm tra xem đơn đã được đánh giá chưa
  const hasReviewed = reviews.some((r) => r.bookingId === booking?.id);

  // Modals state
  const isHuyParam = searchParams.get('huy') === '1';
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(isHuyParam);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Input states
  const [disputeReason, setDisputeReason] = useState('');
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!booking) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl font-bold">Không tìm thấy đơn đặt lịch</h2>
        <Button variant="primary" onClick={() => navigate('/don-cua-toi')} className="mt-4">
          Quay lại danh sách đơn
        </Button>
      </div>
    );
  }

  // Tính toán ΔT và mức phạt cho Modal S-16
  const deltaHours = booking.deltaHours ?? Math.max(0, calcDeltaHours(booking.date, booking.startTime));
  const penaltyRate = calcPenaltyRate(deltaHours);
  const penaltyAmount = calcPenaltyAmount(booking.depositAmount, deltaHours);
  const refundAmount = calcRefundAmount(booking.depositAmount, deltaHours);

  // Danh sách nút theo bảng nút chuẩn
  const actions = getBookingActions({
    bookingStatus: booking.bookingStatus,
    paymentStatus: booking.paymentStatus,
    role: 'tourist',
    canReview: !hasReviewed,
    canConfirmComplete: booking.bookingStatus === 'CONFIRMED' && (Boolean(booking.guideRequestedCompletion) || deltaHours <= 0),
    deltaHours,
  });

  const handleActionClick = (key: string) => {
    if (key === 'pay_deposit') {
      navigate(`/don/${booking.id}/dat-coc`);
    } else if (key === 'cancel') {
      setIsCancelModalOpen(true);
    } else if (key === 'confirm_complete') {
      confirmCompletion(booking.id);
      showToast('Đã xác nhận hoàn tất ca! Vui lòng thanh toán 70% còn lại.', 'success');
    } else if (key === 'pay_final') {
      navigate(`/don/${booking.id}/thanh-toan-70`);
    } else if (key === 'dispute') {
      setIsDisputeModalOpen(true);
    } else if (key === 'review') {
      setIsReviewModalOpen(true);
    }
  };

  // Xác nhận hủy đơn (S-16)
  const handleConfirmCancel = () => {
    cancelBooking(booking.id);
    setIsCancelModalOpen(false);
    showToast(
      `Đã hủy đơn ${booking.id}. Phạt: ${formatMoney(penaltyAmount)}, Hoàn: ${formatMoney(refundAmount)}`,
      'info'
    );
  };

  // Xác nhận khiếu nại
  const handleConfirmDispute = () => {
    if (!disputeReason.trim()) {
      showToast('Vui lòng nhập lý do khiếu nại.', 'error');
      return;
    }
    submitDispute(booking.id, disputeReason);
    setIsDisputeModalOpen(false);
    showToast('Đã gửi khiếu nại. Quản trị viên (Admin) sẽ xử lý trong thời gian sớm nhất.', 'warning');
  };

  // Xác nhận đánh giá
  const handleConfirmReview = () => {
    if (!reviewComment.trim()) {
      showToast('Vui lòng nhập nhận xét của bạn.', 'error');
      return;
    }
    submitReview(booking.id, reviewStars, reviewComment);
    setIsReviewModalOpen(false);
    showToast('Cảm ơn bạn đã gửi đánh giá cho hướng dẫn viên!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      {/* Header chi tiết đơn */}
      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D6E2D9] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-mono font-bold text-[#4B5B50] uppercase">{booking.id}</span>
              <span className="text-[12px] text-[#4B5B50]">
                (Tạo lúc: {formatDate(booking.createdAt.split('T')[0])})
              </span>
            </div>
            <h1 className="text-[22px] font-bold text-[#14231A] mt-1">
              Chuyến đi cùng {guideItem?.user.fullName || 'Hướng dẫn viên'}
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={booking.bookingStatus} />
            {booking.bookingStatus !== 'CANCELLED' && booking.bookingStatus !== 'DISPUTED' && (
              <PaymentBadge status={booking.paymentStatus} />
            )}
          </div>
        </div>

        {/* Thông tin ca */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px]">
          <div className="space-y-1.5">
            <div className="text-[#4B5B50]">
              📅 Ngày tham quan: <strong className="text-[#14231A]">{formatDate(booking.date)}</strong>
            </div>
            <div className="text-[#4B5B50]">
              ⏰ Thời gian ca: <strong className="text-[#14231A]">{formatTimeRange(booking.startTime, booking.endTime)} ({booking.hours} giờ)</strong>
            </div>
            <div className="text-[#4B5B50]">
              👥 Số lượng khách: <strong className="text-[#14231A]">{booking.guestCount} người</strong>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[#4B5B50]">
              📍 Điểm hẹn: <strong className="text-[#14231A]">{booking.meetingLocation || 'Theo thỏa thuận'}</strong>
            </div>
            {booking.specialRequests && (
              <div className="text-[#4B5B50]">
                📝 Yêu cầu: <span className="text-[#14231A] italic">{booking.specialRequests}</span>
              </div>
            )}
          </div>
        </div>

        {/* Thông báo đặc biệt theo trạng thái */}
        {booking.bookingStatus === 'PENDING' && (
          <div className="p-3 bg-[#FEF3C7] rounded-[8px] text-[13px] text-[#92400E] flex items-center justify-between">
            <span>⏳ Đơn đang chờ Guide xác nhận trong vòng 24 giờ kể từ khi tạo.</span>
            <Countdown seconds={86400} label="Còn lại" />
          </div>
        )}

        {booking.bookingStatus === 'WAITING_PAYMENT' && (
          <div className="p-3 bg-[#FFEDD5] rounded-[8px] text-[13px] text-[#9A3412] flex items-center justify-between flex-wrap gap-2">
            <span>Guide đã chấp nhận đơn! Bạn có 15 phút để hoàn tất đặt cọc 30%.</span>
            <Button
              variant="primary"
              onClick={() => navigate(`/don/${booking.id}/dat-coc`)}
              className="h-8 text-[12px] px-3"
            >
              💳 Đặt cọc 30% ngay
            </Button>
          </div>
        )}

        {booking.bookingStatus === 'DISPUTED' && (
          <div className="p-3 bg-[#FEE2E2] rounded-[8px] text-[13px] text-[#B91C1C]">
            ⚠️ Đơn đang trong trạng thái tranh chấp. Quản trị viên đang xem xét bằng chứng và sẽ đưa ra quyết định cuối cùng.
          </div>
        )}
      </div>

      {/* Tóm tắt số tiền (Tourist KHÔNG BAO GIỜ thấy phí sàn) */}
      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm space-y-4">
        <h2 className="text-[16px] font-bold text-[#14231A]">Thông tin thanh toán</h2>

        {booking.bookingStatus === 'CANCELLED' ? (
          <div className="bg-[#F6FAF6] border border-[#D6E2D9] rounded-[12px] p-4 space-y-2 text-[14px]">
            <h4 className="font-semibold text-[#B91C1C]">Kết quả quyết toán đơn đã hủy:</h4>
            <div className="flex justify-between">
              <span className="text-[#4B5B50]">Thời điểm hủy cách giờ bắt đầu (ΔT):</span>
              <span className="font-bold tabular-nums text-[#14231A]">{deltaHours.toFixed(1)} giờ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4B5B50]">Tiền cọc đã đóng (D):</span>
              <span className="font-semibold tabular-nums text-[#14231A]">{formatMoney(booking.depositAmount)}</span>
            </div>
            <div className="flex justify-between text-[#B91C1C]">
              <span>Mức phạt áp dụng ({penaltyRate * 100}%):</span>
              <span className="font-bold tabular-nums">-{formatMoney(booking.penalty ?? penaltyAmount)}</span>
            </div>
            <div className="flex justify-between text-[#15803D] border-t border-[#D6E2D9] pt-2 font-bold">
              <span>Số tiền hoàn trả lại cho Tourist:</span>
              <span className="tabular-nums">+{formatMoney(booking.refund ?? refundAmount)}</span>
            </div>
          </div>
        ) : (
          <PaymentSummary
            total={booking.totalAmount}
            deposit={booking.depositAmount}
            remaining={booking.remainingAmount}
            mode="tourist"
          />
        )}
      </div>

      {/* Vùng các nút hành động theo ma trận trạng thái */}
      {actions.length > 0 && (
        <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm flex flex-wrap gap-3 items-center justify-end">
          {actions.map((act) => (
            <Button
              key={act.key}
              variant={act.variant}
              onClick={() => handleActionClick(act.key)}
              className="px-5"
            >
              {act.label}
            </Button>
          ))}
        </div>
      )}

      {/* S-16: MODAL HỦY ĐƠN VÀ XEM TRƯỚC HOÀN PHẠT (TUYỆT ĐỐI KHÔNG CÓ Ô LÝ DO theo Q10) */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Xác nhận hủy đơn đặt lịch (S-16)"
        maxWidth="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsCancelModalOpen(false)}>
              Không hủy
            </Button>
            <Button variant="danger" onClick={handleConfirmCancel}>
              Xác nhận hủy đơn
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-[14px] text-[#4B5B50]">
            Theo quy định hoàn hủy dịch vụ, tiền phạt và hoàn được tính dựa trên mốc thời gian từ lúc hủy đến khi ca bắt đầu:
          </p>

          <div className="bg-[#F6FAF6] border border-[#D6E2D9] rounded-[10px] p-4 text-[14px] space-y-2">
            <div className="flex justify-between">
              <span className="text-[#4B5B50]">Thời gian còn lại (ΔT):</span>
              <span className="font-bold tabular-nums text-[#14231A]">{deltaHours.toFixed(1)} giờ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4B5B50]">Mức phạt theo quy định:</span>
              <span className="font-bold text-[#B91C1C]">
                {penaltyRate === 0 && '0% (ΔT > 48h)'}
                {penaltyRate === 0.5 && '50% (24h ≤ ΔT ≤ 48h)'}
                {penaltyRate === 1 && '100% (ΔT < 24h)'}
              </span>
            </div>
            <div className="flex justify-between text-[#B91C1C]">
              <span>Số tiền phạt (trên tiền cọc):</span>
              <span className="font-bold tabular-nums">{formatMoney(penaltyAmount)}</span>
            </div>
            <div className="flex justify-between text-[#15803D] border-t border-[#D6E2D9] pt-2 font-bold">
              <span>Số tiền được hoàn lại:</span>
              <span className="tabular-nums">{formatMoney(refundAmount)}</span>
            </div>
          </div>

          <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-[8px] text-[12px] text-[#B91C1C]">
            ⚠️ Sau khi xác nhận, đơn đặt lịch sẽ chuyển sang trạng thái <strong>Đã hủy</strong> và khung giờ được mở lại cho khách khác. Thao tác này không thể hoàn tác.
          </div>
        </div>
      </Modal>

      {/* MODAL KHIẾU NẠI (DISPUTE) */}
      <Modal
        isOpen={isDisputeModalOpen}
        onClose={() => setIsDisputeModalOpen(false)}
        title="Gửi khiếu nại chuyến đi"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDisputeModalOpen(false)}>
              Hủy bỏ
            </Button>
            <Button variant="danger" onClick={handleConfirmDispute}>
              Gửi khiếu nại tới Admin
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-[14px] text-[#4B5B50]">
            Nếu dịch vụ không đúng như thỏa thuận hoặc có sự cố trong ca tham quan, vui lòng nhập nội dung khiếu nại:
          </p>
          <Textarea
            label="Lý do khiếu nại *"
            placeholder="Mô tả cụ thể sự việc để Quản trị viên đối soát..."
            value={disputeReason}
            onChange={(e) => setDisputeReason(e.target.value)}
          />
        </div>
      </Modal>

      {/* MODAL ĐÁNH GIÁ (REVIEW) */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Đánh giá hướng dẫn viên"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsReviewModalOpen(false)}>
              Để sau
            </Button>
            <Button variant="primary" onClick={handleConfirmReview}>
              Gửi đánh giá
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-[14px] font-medium text-[#14231A] block mb-2">Số sao đánh giá:</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setReviewStars(s)}
                  className={`text-2xl ${s <= reviewStars ? 'text-amber-500' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <Textarea
            label="Nhận xét của bạn *"
            placeholder="Chia sẻ trải nghiệm về thái độ, sự nhiệt tình và kiến thức của Guide..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

