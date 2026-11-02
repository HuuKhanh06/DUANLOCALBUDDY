// pages/admin/DisputesPage.tsx (S-29: Xử lý tranh chấp)
import React, { useState } from 'react';
import { useBookingContext } from '../../context/BookingContext';
import { StatusBadge, PaymentBadge } from '../../components/common/StatusBadge';
import { PaymentSummary } from '../../components/common/PaymentSummary';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/common/GuideCard';
import { useToast } from '../../components/ui/Toast';
import { formatDate, formatTimeRange } from '../../utils/time';
import { formatMoney } from '../../utils/money';
import { Booking } from '../../types';

export const DisputesPage: React.FC = () => {
  const { bookings, resolveDispute } = useBookingContext();
  const { showToast } = useToast();

  // Chỉ liệt kê các đơn Đang tranh chấp (DISPUTED)
  const disputedBookings = bookings.filter((b) => b.bookingStatus === 'DISPUTED');

  const [selectedDispute, setSelectedDispute] = useState<Booking | null>(null);
  const [adminNote, setAdminNote] = useState('Đã đối soát thông tin ca tham quan. Khách du lịch phản ánh đúng thực tế, Guide không hoàn thành đúng cam kết thời gian.');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleOpenResolve = (b: Booking) => {
    setSelectedDispute(b);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmResolve = () => {
    if (!selectedDispute) return;
    resolveDispute(selectedDispute.id, adminNote);
    showToast(
      `Đã chốt xử lý tranh chấp đơn ${selectedDispute.id}! Đơn đã chuyển sang Đã hủy (CANCELLED) ở tất cả các vai trò và không thu 70% còn lại.`,
      'success'
    );
    setIsConfirmModalOpen(false);
    setSelectedDispute(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#D6E2D9] pb-4">
        <div>
          <span className="text-[12px] font-mono font-bold text-[#B91C1C] uppercase">S-29 • ADMIN PORTAL</span>
          <h1 className="text-[24px] font-bold text-[#14231A] mt-0.5">Xử lý khiếu nại & Tranh chấp đơn (S-29)</h1>
          <p className="text-[14px] text-[#4B5B50] mt-1">
            Xem xét bằng chứng từ hai bên. Quyết định của Quản trị viên là quyết định cuối cùng, không thể kháng nghị.
          </p>
        </div>

        <span className="bg-[#FEE2E2] text-[#B91C1C] px-3 py-1 rounded-full text-[13px] font-bold">
          {disputedBookings.length} vụ tranh chấp
        </span>
      </div>

      {disputedBookings.length === 0 ? (
        <EmptyState
          title="Không có vụ tranh chấp nào đang chờ xử lý"
          description="Tất cả khiếu nại giữa du khách và hướng dẫn viên đã được phân xử xong."
        />
      ) : (
        <div className="space-y-6">
          {disputedBookings.map((b) => {
            const platformFee = Math.round(b.totalAmount * b.feeRate);
            const guideReceives = b.totalAmount - platformFee;

            return (
              <div
                key={b.id}
                className="bg-white border-2 border-[#FCA5A5] rounded-[16px] p-6 shadow-sm space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D6E2D9] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#B91C1C] text-lg">{b.id}</span>
                      <StatusBadge status={b.bookingStatus} />
                      <PaymentBadge status={b.paymentStatus} />
                    </div>
                    <span className="text-[13px] text-[#4B5B50] mt-1 block">
                      Khách: <strong>Trần Minh Anh</strong> (0900 000 001) • Guide: <strong>Lê Hoàng Nam</strong> (0900 000 002)
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[12px] text-[#4B5B50]">Tổng giá trị tranh chấp:</span>
                    <div className="text-[20px] font-bold text-[#B91C1C] tabular-nums">
                      {formatMoney(b.totalAmount)}
                    </div>
                  </div>
                </div>

                {/* Thông tin sự kiện và bằng chứng hai bên */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[10px] p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[#B91C1C] font-bold text-[14px]">
                      <span>👤 Khiếu nại từ Tourist:</span>
                    </div>
                    <p className="text-[13px] text-[#14231A] leading-relaxed">
                      "Hướng dẫn viên đến trễ 45 phút so với giờ hẹn tại Làng chài Nam Ô, tự ý cắt bớt lịch trình tham quan không đúng như đã cam kết trong đơn đặt lịch."
                    </p>
                    <div className="text-[11px] text-[#4B5B50]">
                      Bằng chứng kèm theo: 02 ảnh chụp nhật ký cuộc gọi và định vị GPS.
                    </div>
                  </div>

                  <div className="bg-[#F6FAF6] border border-[#D6E2D9] rounded-[10px] p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[#15803D] font-bold text-[14px]">
                      <span>🧭 Giải trình từ Guide:</span>
                    </div>
                    <p className="text-[13px] text-[#14231A] leading-relaxed">
                      "Do thời tiết mưa lớn gây sạt lở cục bộ trên đường Nguyễn Tất Thành dẫn đến đến trễ. Đã thỏa thuận bù giờ thêm cho khách nhưng khách không đồng ý."
                    </p>
                    <div className="text-[11px] text-[#4B5B50]">
                      Bằng chứng kèm theo: Ảnh thời tiết thực tế tại cung đường.
                    </div>
                  </div>
                </div>

                {/* Thông tin tài chính vụ việc */}
                <div className="bg-[#F9FAFB] border border-[#D6E2D9] rounded-[10px] p-4 space-y-2 text-[14px]">
                  <h4 className="font-bold text-[#14231A]">Bảng phân bổ tài chính:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[#4B5B50] text-[12px] block">Tổng tiền (G):</span>
                      <strong className="text-[#14231A]">{formatMoney(b.totalAmount)}</strong>
                    </div>
                    <div>
                      <span className="text-[#4B5B50] text-[12px] block">Tiền cọc 30% (D):</span>
                      <strong className="text-[#15803D]">{formatMoney(b.depositAmount)}</strong>
                    </div>
                    <div>
                      <span className="text-[#4B5B50] text-[12px] block">Còn lại 70% (B):</span>
                      <strong className="text-[#B91C1C]">{formatMoney(b.remainingAmount)} (Không thu)</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#D6E2D9]">
                  <span className="text-[13px] text-[#4B5B50]">
                    Quy tắc chốt tranh chấp: Chuyển đơn sang <strong>Đã hủy</strong>, không thu khoản 70% còn lại.
                  </span>

                  <Button
                    variant="danger"
                    onClick={() => handleOpenResolve(b)}
                    className="px-5 font-bold"
                  >
                    ⚖️ Chốt kết quả tranh chấp
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal xác nhận không hoàn tác (RQ-15, Q11) */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Xác nhận chốt kết quả tranh chấp (S-29)"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsConfirmModalOpen(false)}>
              Hủy bỏ
            </Button>
            <Button variant="danger" onClick={handleConfirmResolve}>
              Chốt quyết định (Không hoàn tác)
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-[14px]">
          <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-[8px] text-[#B91C1C]">
            ⚠️ <strong>Quy định giải quyết tranh chấp (Q11):</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-[13px]">
              <li>Đơn hàng sẽ chuyển sang trạng thái <strong>Đã hủy (CANCELLED)</strong>.</li>
              <li>Khoản tiền 70% còn lại (420.000 đ) sẽ <strong>hoàn toàn không được thu</strong> từ du khách.</li>
              <li>Quyết định của Admin là quyết định có hiệu lực thi hành ngay lập tức, <strong>không có kháng nghị</strong> và <strong>không thể hoàn tác</strong>.</li>
            </ul>
          </div>

          <div>
            <label className="text-[13px] font-bold text-[#14231A] block mb-1">
              Ghi chú kết luận của Quản trị viên (Admin Note) *:
            </label>
            <textarea
              className="w-full border border-[#D6E2D9] rounded-[8px] p-2.5 text-[14px]"
              rows={3}
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
