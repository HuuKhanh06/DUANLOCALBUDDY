// pages/admin/KycReviewPage.tsx (S-26: Thẩm định KYC)
import React, { useState } from 'react';
import { useBookingContext } from '../../context/BookingContext';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/common/GuideCard';
import { useToast } from '../../components/ui/Toast';
import { formatDate } from '../../utils/time';
import { formatMoney } from '../../utils/money';
import { KycRecord } from '../../types';

export const KycReviewPage: React.FC = () => {
  const { kycRecords, allGuides, approveKyc, rejectKyc } = useBookingContext();
  const { showToast } = useToast();

  // Chỉ liệt kê các hồ sơ KYC đang Chờ xác minh (PENDING)
  const pendingKycs = kycRecords.filter((k) => k.status === 'PENDING');

  const [selectedKyc, setSelectedKyc] = useState<KycRecord | null>(null);
  const [rejectModalKyc, setRejectModalKyc] = useState<KycRecord | null>(null);
  const [rejectReason, setRejectReason] = useState('Hình ảnh giấy tờ tùy thân bị mờ, không rõ số CMND/CCCD.');

  const handleApprove = (guideId: string, guideName: string) => {
    approveKyc(guideId);
    showToast(
      `Đã duyệt KYC thành công cho Guide ${guideName}! Hướng dẫn viên này hiện đã xuất hiện trên trang tìm kiếm (S-06).`,
      'success'
    );
    setSelectedKyc(null);
  };

  const handleConfirmReject = () => {
    if (!rejectModalKyc) return;
    rejectKyc(rejectModalKyc.guideId, rejectReason);
    showToast(
      `Đã từ chối hồ sơ KYC của hướng dẫn viên. Hồ sơ tiếp tục bị ẩn với du khách.`,
      'info'
    );
    setRejectModalKyc(null);
    setSelectedKyc(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#D6E2D9] pb-4">
        <div>
          <span className="text-[12px] font-mono font-bold text-[#15803D] uppercase">S-26 • ADMIN PORTAL</span>
          <h1 className="text-[24px] font-bold text-[#14231A] mt-0.5">Thẩm định hồ sơ xác thực KYC Guide</h1>
          <p className="text-[14px] text-[#4B5B50] mt-1">
            Kiểm tra tài liệu định danh (CCCD/CMND/Thẻ HDV). Chỉ Guide đã được duyệt mới hiển thị với du khách tại S-06.
          </p>
        </div>

        <span className="bg-[#FEF3C7] text-[#92400E] px-3 py-1 rounded-full text-[13px] font-bold">
          {pendingKycs.length} hồ sơ chờ duyệt
        </span>
      </div>

      {pendingKycs.length === 0 ? (
        <EmptyState
          title="Không có hồ sơ KYC nào đang chờ thẩm định"
          description="Tất cả hồ sơ đăng ký làm hướng dẫn viên đã được xử lý xong."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã hồ sơ</TableHead>
              <TableHead>Họ và tên Guide</TableHead>
              <TableHead>Email / Điện thoại</TableHead>
              <TableHead>Ngày nộp</TableHead>
              <TableHead>Đơn giá đề xuất</TableHead>
              <TableHead>Số lượng tài liệu</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingKycs.map((k) => {
              const guideInfo = allGuides.find((g) => g.user.id === k.guideId);
              const guideName = guideInfo?.user.fullName || 'Phạm Thu Hà';

              return (
                <TableRow key={k.id}>
                  <TableCell className="font-mono font-bold text-[#15803D]">{k.id}</TableCell>
                  <TableCell className="font-semibold text-[#14231A]">
                    {guideName}
                    <span className="text-[11px] block text-[#92400E] font-normal">Chờ xác minh</span>
                  </TableCell>
                  <TableCell>
                    {guideInfo?.user.email}
                    <span className="text-[12px] text-[#4B5B50] block">{guideInfo?.user.phone}</span>
                  </TableCell>
                  <TableCell>{formatDate(k.submittedAt.split('T')[0])}</TableCell>
                  <TableCell className="font-semibold tabular-nums text-[#15803D]">
                    {formatMoney(guideInfo?.profile.hourlyRate || 150000)}/h
                  </TableCell>
                  <TableCell>{k.documents.length} tệp (Mặt trước & Mặt sau)</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => setSelectedKyc(k)}
                        className="text-[12px] h-8 px-3"
                      >
                        🔍 Xem tài liệu
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleApprove(k.guideId, guideName)}
                        className="text-[12px] h-8 px-3"
                      >
                        ✓ Duyệt KYC
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      {/* Modal xem chi tiết tài liệu KYC */}
      <Modal
        isOpen={Boolean(selectedKyc)}
        onClose={() => setSelectedKyc(null)}
        title="Thẩm định hồ sơ định danh Guide (S-26)"
        maxWidth="lg"
        footer={
          selectedKyc && (
            <div className="flex items-center justify-between w-full">
              <Button
                variant="danger"
                onClick={() => setRejectModalKyc(selectedKyc)}
                className="text-[13px]"
              >
                ✕ Từ chối hồ sơ
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setSelectedKyc(null)}>
                  Đóng
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    const gName = allGuides.find((g) => g.user.id === selectedKyc.guideId)?.user.fullName || 'Guide';
                    handleApprove(selectedKyc.guideId, gName);
                  }}
                  className="font-bold"
                >
                  ✓ Duyệt & Công khai Guide
                </Button>
              </div>
            </div>
          )
        }
      >
        {selectedKyc && (
          <div className="space-y-5">
            {/* Thông tin ứng viên */}
            <div className="bg-[#F6FAF6] border border-[#D6E2D9] rounded-[10px] p-4 text-[14px] grid grid-cols-2 gap-3">
              <div>
                <span className="text-[#4B5B50] block text-[12px]">Họ và tên:</span>
                <strong className="text-[#14231A]">
                  {allGuides.find((g) => g.user.id === selectedKyc.guideId)?.user.fullName || 'Phạm Thu Hà'}
                </strong>
              </div>
              <div>
                <span className="text-[#4B5B50] block text-[12px]">Khu vực hoạt động:</span>
                <strong className="text-[#14231A]">Ngũ Hành Sơn, Đà Nẵng</strong>
              </div>
              <div className="col-span-2">
                <span className="text-[#4B5B50] block text-[12px]">Giới thiệu tóm tắt:</span>
                <p className="text-[#14231A] text-[13px] mt-0.5">
                  {allGuides.find((g) => g.user.id === selectedKyc.guideId)?.profile.bio}
                </p>
              </div>
            </div>

            {/* Tài liệu xác thực mô phỏng */}
            <div>
              <h4 className="text-[14px] font-bold text-[#14231A] mb-3">Tài liệu đính kèm (Ảnh mô phỏng):</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedKyc.documents.map((doc, idx) => (
                  <div key={idx} className="border border-[#D6E2D9] rounded-[10px] p-3 text-center bg-white space-y-2">
                    <span className="text-[12px] font-semibold text-[#14231A] block">{doc.name}</span>
                    <div className="w-full h-36 bg-[#E5E7EB] rounded-[8px] flex flex-col items-center justify-center text-[#4B5B50] border-2 border-dashed border-[#D6E2D9]">
                      <span className="text-3xl mb-1">🪪</span>
                      <span className="text-[12px] font-mono">Tài liệu giả lập đồ án</span>
                      <span className="text-[11px] text-[#15803D] font-bold mt-1">Đạt chuẩn kích thước</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[#FEF3C7] rounded-[8px] text-[12px] text-[#92400E]">
              💡 <strong>Lưu ý nghiệp vụ (RQ-10):</strong> Sau khi Admin bấm "Duyệt", Guide này sẽ lập tức chuyển sang trạng thái <code>Đã xác minh</code> và xuất hiện trên màn hình tìm kiếm <code>S-06</code> của du khách.
            </div>
          </div>
        )}
      </Modal>

      {/* Modal xác nhận Từ chối KYC */}
      <Modal
        isOpen={Boolean(rejectModalKyc)}
        onClose={() => setRejectModalKyc(null)}
        title="Từ chối hồ sơ KYC"
        footer={
          <>
            <Button variant="ghost" onClick={() => setRejectModalKyc(null)}>
              Hủy
            </Button>
            <Button variant="danger" onClick={handleConfirmReject}>
              Xác nhận từ chối hồ sơ
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-[14px] text-[#4B5B50]">
            Hồ sơ của hướng dẫn viên này sẽ bị từ chối và tiếp tục bị ẩn hoàn toàn với du khách.
          </p>
          <div>
            <label className="text-[13px] font-medium text-[#14231A] block mb-1">
              Ghi chú lý do nội bộ (Không hiển thị cho Guide theo đặc tả):
            </label>
            <textarea
              className="w-full border border-[#D6E2D9] rounded-[8px] p-2.5 text-[14px]"
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

