// pages/admin/AccountsPage.tsx (S-27: Quản lý tài khoản Admin)
import React, { useState } from 'react';
import { useBookingContext } from '../../context/BookingContext';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { User } from '../../types';

export const AccountsPage: React.FC = () => {
  const { allUsers, toggleUserLock, revokeGuideVerification, allGuides } = useBookingContext();
  const { showToast } = useToast();

  const [confirmLockUser, setConfirmLockUser] = useState<User | null>(null);
  const [confirmRevokeUser, setConfirmRevokeUser] = useState<User | null>(null);

  const handleConfirmLock = () => {
    if (!confirmLockUser) return;
    toggleUserLock(confirmLockUser.id);
    showToast(
      confirmLockUser.isLocked
        ? `Đã mở khóa tài khoản cho ${confirmLockUser.fullName}`
        : `Đã khóa tài khoản của ${confirmLockUser.fullName}. Tài khoản này không thể đăng nhập.`,
      'info'
    );
    setConfirmLockUser(null);
  };

  const handleConfirmRevoke = () => {
    if (!confirmRevokeUser) return;
    revokeGuideVerification(confirmRevokeUser.id);
    showToast(`Đã thu hồi quyền xác minh của Guide ${confirmRevokeUser.fullName}. Guide đã bị ẩn khỏi tìm kiếm.`, 'warning');
    setConfirmRevokeUser(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#D6E2D9] pb-4">
        <div>
          <span className="text-[12px] font-mono font-bold text-[#15803D] uppercase">S-27 • ADMIN PORTAL</span>
          <h1 className="text-[24px] font-bold text-[#14231A] mt-0.5">Quản lý tài khoản hệ thống</h1>
          <p className="text-[14px] text-[#4B5B50] mt-1">
            Khóa, kích hoạt tài khoản và thu hồi xác minh KYC của hướng dẫn viên vi phạm
          </p>
        </div>
        <span className="text-[13px] bg-white border border-[#D6E2D9] px-3 py-1 rounded-full font-bold text-[#14231A]">
          Tổng cộng: {allUsers.length} tài khoản
        </span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã tài khoản</TableHead>
            <TableHead>Họ và tên</TableHead>
            <TableHead>Email / Điện thoại</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái xác minh</TableHead>
            <TableHead>Trạng thái khóa</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers.map((u) => {
            const isGuide = u.role === 'guide';
            const guideProf = allGuides.find((g) => g.user.id === u.id)?.profile;

            return (
              <TableRow key={u.id}>
                <TableCell className="font-mono text-[13px] font-bold">{u.id}</TableCell>
                <TableCell className="font-semibold text-[#14231A]">{u.fullName}</TableCell>
                <TableCell>
                  {u.email}
                  <span className="text-[12px] text-[#4B5B50] block">{u.phone}</span>
                </TableCell>
                <TableCell>
                  <span className="uppercase text-[11px] font-bold px-2 py-0.5 rounded bg-gray-100 text-[#374151]">
                    {u.role}
                  </span>
                </TableCell>
                <TableCell>
                  {isGuide ? (
                    guideProf?.isVerified ? (
                      <span className="text-[12px] bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded font-bold">
                        ✓ Đã xác minh
                      </span>
                    ) : (
                      <span className="text-[12px] bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded font-bold">
                        ⏳ Chưa / Đã thu hồi
                      </span>
                    )
                  ) : (
                    <span className="text-[#4B5B50] text-[12px]">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {u.isLocked ? (
                    <span className="text-[12px] bg-[#FEE2E2] text-[#B91C1C] px-2 py-0.5 rounded font-bold">
                      🔒 Đã bị khóa
                    </span>
                  ) : (
                    <span className="text-[12px] text-[#166534] font-semibold">
                      Hoạt động
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Nút thu hồi xác minh nếu là Guide đã verify */}
                    {isGuide && guideProf?.isVerified && (
                      <Button
                        variant="ghost"
                        onClick={() => setConfirmRevokeUser(u)}
                        className="text-[11px] h-7 px-2 text-[#92400E] border border-[#FDE68A]"
                      >
                        Thu hồi xác minh
                      </Button>
                    )}

                    {/* Nút Khóa / Mở khóa */}
                    <Button
                      variant={u.isLocked ? 'secondary' : 'danger'}
                      onClick={() => setConfirmLockUser(u)}
                      className="text-[11px] h-7 px-2.5"
                    >
                      {u.isLocked ? '🔓 Mở khóa' : '🔒 Khóa tài khoản'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Modal xác nhận khóa / mở khóa */}
      <Modal
        isOpen={Boolean(confirmLockUser)}
        onClose={() => setConfirmLockUser(null)}
        title={confirmLockUser?.isLocked ? 'Xác nhận mở khóa tài khoản' : 'Xác nhận khóa tài khoản người dùng'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmLockUser(null)}>
              Hủy
            </Button>
            <Button
              variant={confirmLockUser?.isLocked ? 'primary' : 'danger'}
              onClick={handleConfirmLock}
            >
              {confirmLockUser?.isLocked ? 'Xác nhận mở khóa' : 'Xác nhận khóa'}
            </Button>
          </>
        }
      >
        <p className="text-[14px] text-[#4B5B50]">
          {confirmLockUser?.isLocked
            ? `Tài khoản của ${confirmLockUser?.fullName} sẽ được phép đăng nhập lại bình thường.`
            : `Khi bị khóa, tài khoản của ${confirmLockUser?.fullName} sẽ bị từ chối đăng nhập tại màn hình đăng nhập (S-04).`}
        </p>
      </Modal>

      {/* Modal thu hồi xác minh */}
      <Modal
        isOpen={Boolean(confirmRevokeUser)}
        onClose={() => setConfirmRevokeUser(null)}
        title="Xác nhận thu hồi xác minh KYC"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmRevokeUser(null)}>
              Hủy
            </Button>
            <Button variant="danger" onClick={handleConfirmRevoke}>
              Thu hồi xác minh
            </Button>
          </>
        }
      >
        <p className="text-[14px] text-[#4B5B50]">
          Bạn có chắc chắn muốn thu hồi trạng thái <strong>Đã xác minh</strong> của Guide <strong>{confirmRevokeUser?.fullName}</strong> không? Sau khi thu hồi, Guide này sẽ bị ẩn khỏi kết quả tìm kiếm (S-06) của khách du lịch.
        </p>
      </Modal>
    </div>
  );
};

