// pages/admin/PayoutsPage.tsx (S-28: Duyệt lệnh rút tiền)
import React, { useState } from 'react';
import { useBookingContext } from '../../context/BookingContext';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/common/GuideCard';
import { useToast } from '../../components/ui/Toast';
import { formatDate } from '../../utils/time';
import { formatMoney } from '../../utils/money';
import { WithdrawalRequest } from '../../types';

export const PayoutsPage: React.FC = () => {
  const { withdrawals, approveWithdrawal, rejectWithdrawal, allGuides } = useBookingContext();
  const { showToast } = useToast();

  const [confirmApprove, setConfirmApprove] = useState<WithdrawalRequest | null>(null);
  const [confirmReject, setConfirmReject] = useState<WithdrawalRequest | null>(null);

  const handleApprove = () => {
    if (!confirmApprove) return;
    approveWithdrawal(confirmApprove.id);
    showToast(`Đã duyệt chuyển khoản ${formatMoney(confirmApprove.amount)} cho Guide thành công!`, 'success');
    setConfirmApprove(null);
  };

  const handleReject = () => {
    if (!confirmReject) return;
    rejectWithdrawal(confirmReject.id);
    showToast(`Đã từ chối lệnh rút ${confirmReject.id}. Số tiền đã hoàn lại ví Guide.`, 'info');
    setConfirmReject(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#D6E2D9] pb-4">
        <div>
          <span className="text-[12px] font-mono font-bold text-[#15803D] uppercase">S-28 • ADMIN PORTAL</span>
          <h1 className="text-[24px] font-bold text-[#14231A] mt-0.5">Duyệt lệnh rút tiền thu nhập Guide</h1>
          <p className="text-[14px] text-[#4B5B50] mt-1">
            Quy trình: Admin chuyển khoản ngân hàng thủ công cho Guide rồi bấm duyệt để hoàn tất giao dịch (RQ-17).
          </p>
        </div>
        <span className="bg-[#FEF3C7] text-[#92400E] px-3 py-1 rounded-full text-[13px] font-bold">
          {withdrawals.filter((w) => w.status === 'PENDING').length} lệnh chờ duyệt
        </span>
      </div>

      {withdrawals.length === 0 ? (
        <EmptyState title="Không có lệnh rút tiền nào" description="Khi Guide yêu cầu rút tiền từ ví, danh sách sẽ hiển thị tại đây." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã lệnh</TableHead>
              <TableHead>Hướng dẫn viên</TableHead>
              <TableHead>Ngày yêu cầu</TableHead>
              <TableHead>Số tiền rút</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác duyệt thủ công</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawals.map((w) => {
              const guideName = allGuides.find((g) => g.user.id === w.guideId)?.user.fullName || 'Lê Hoàng Nam';

              return (
                <TableRow key={w.id}>
                  <TableCell className="font-mono font-bold text-[#15803D]">{w.id}</TableCell>
                  <TableCell className="font-semibold text-[#14231A]">
                    {guideName}
                    <span className="text-[11px] text-[#4B5B50] block">STK: 1029384756 (Vietcombank)</span>
                  </TableCell>
                  <TableCell>{formatDate(w.createdAt.split('T')[0])}</TableCell>
                  <TableCell className="font-bold text-[16px] tabular-nums text-[#15803D]">
                    {formatMoney(w.amount)}
                  </TableCell>
                  <TableCell>
                    {w.status === 'PENDING' && (
                      <span className="text-[12px] bg-[#FEF3C7] text-[#92400E] px-2.5 py-0.5 rounded-full font-bold">
                        ⏳ Chờ chuyển khoản
                      </span>
                    )}
                    {w.status === 'APPROVED' && (
                      <span className="text-[12px] bg-[#DCFCE7] text-[#166534] px-2.5 py-0.5 rounded-full font-bold">
                        ✓ Đã chuyển khoản
                      </span>
                    )}
                    {w.status === 'REJECTED' && (
                      <span className="text-[12px] bg-[#FEE2E2] text-[#B91C1C] px-2.5 py-0.5 rounded-full font-bold">
                        ✕ Đã từ chối
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {w.status === 'PENDING' ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="danger"
                          onClick={() => setConfirmReject(w)}
                          className="text-[12px] h-8 px-2.5"
                        >
                          Từ chối
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => setConfirmApprove(w)}
                          className="text-[12px] h-8 px-3 font-bold"
                        >
                          ✓ Đã chuyển khoản
                        </Button>
                      </div>
                    ) : (
                      <span className="text-[12px] text-[#4B5B50]">Đã xử lý</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      {/* Modal xác nhận đã chuyển khoản */}
      <Modal
        isOpen={Boolean(confirmApprove)}
        onClose={() => setConfirmApprove(null)}
        title="Xác nhận duyệt lệnh rút tiền (S-28)"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmApprove(null)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleApprove}>
              Xác nhận đã chuyển khoản
            </Button>
          </>
        }
      >
        <p className="text-[14px] text-[#4B5B50]">
          Bạn xác nhận đã thực hiện chuyển khoản <strong>{confirmApprove && formatMoney(confirmApprove.amount)}</strong> đến STK Vietcombank của Guide? Lệnh rút sẽ chuyển sang trạng thái <strong>Đã chuyển khoản (APPROVED)</strong>.
        </p>
      </Modal>

      {/* Modal xác nhận từ chối */}
      <Modal
        isOpen={Boolean(confirmReject)}
        onClose={() => setConfirmReject(null)}
        title="Từ chối lệnh rút tiền"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmReject(null)}>
              Hủy
            </Button>
            <Button variant="danger" onClick={handleReject}>
              Xác nhận từ chối & hoàn ví
            </Button>
          </>
        }
      >
        <p className="text-[14px] text-[#4B5B50]">
          Lệnh rút sẽ bị từ chối và số tiền <strong>{confirmReject && formatMoney(confirmReject.amount)}</strong> sẽ được hoàn trả tự động vào ví của Guide.
        </p>
      </Modal>
    </div>
  );
};

