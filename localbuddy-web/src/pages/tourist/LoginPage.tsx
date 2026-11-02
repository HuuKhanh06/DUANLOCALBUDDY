// pages/tourist/LoginPage.tsx (S-04)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useBookingContext } from '../../context/BookingContext';
import { useToast } from '../../components/ui/Toast';
import { mockUsers } from '../../data/users';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useBookingContext();
  const { showToast } = useToast();

  const [identifier, setIdentifier] = useState('minhanh.demo@example.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier || !password) {
      setErrorMsg('Vui lòng nhập email hoặc số điện thoại và mật khẩu.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Tìm tài khoản theo email hoặc phone
      const matched = mockUsers.find(
        (u) => (u.email === identifier || u.phone === identifier)
      );

      if (!matched) {
        setErrorMsg('Thông tin đăng nhập không đúng.');
        return;
      }

      if (matched.isLocked) {
        setErrorMsg('Tài khoản đã bị khóa. Vui lòng liên hệ Admin.');
        return;
      }

      setCurrentUser(matched);
      showToast(`Đăng nhập thành công! Xin chào ${matched.fullName}`, 'success');

      if (matched.role === 'tourist') {
        navigate('/don-cua-toi');
      } else if (matched.role === 'guide') {
        navigate('/guide/don-va-ca');
      } else {
        navigate('/admin/kyc');
      }
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm">
        <div className="text-center mb-6">
          <span className="text-3xl">🌱</span>
          <h2 className="text-[24px] font-bold text-[#14231A] mt-2">Đăng nhập LOCALBUDDY</h2>
          <p className="text-[13px] text-[#4B5B50] mt-1">
            (Xác thực giả lập phục vụ đồ án học phần)
          </p>
        </div>

        {/* Gợi ý tài khoản demo */}
        <div className="bg-[#F6FAF6] border border-[#D6E2D9] rounded-[8px] p-3 mb-5 text-[12px] space-y-1">
          <span className="font-bold text-[#15803D]">Tài khoản demo sẵn có:</span>
          <div className="flex justify-between items-center text-[#4B5B50]">
            <span>Tourist: <code>minhanh.demo@example.com</code></span>
            <button
              type="button"
              onClick={() => setIdentifier('minhanh.demo@example.com')}
              className="text-[#15803D] font-bold hover:underline"
            >
              Chọn
            </button>
          </div>
          <div className="flex justify-between items-center text-[#4B5B50]">
            <span>Guide: <code>hoangnam.demo@example.com</code></span>
            <button
              type="button"
              onClick={() => setIdentifier('hoangnam.demo@example.com')}
              className="text-[#15803D] font-bold hover:underline"
            >
              Chọn
            </button>
          </div>
          <div className="text-[#92400E] text-[11px] pt-1">Mật khẩu bất kỳ: <code>123456</code></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email hoặc Số điện thoại"
            placeholder="minhanh.demo@example.com"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <Input
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMsg && (
            <div className="p-3 bg-[#FEE2E2] text-[#B91C1C] rounded-[8px] text-[13px]">
              {errorMsg}
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Đăng nhập
          </Button>
        </form>

        <div className="mt-6 text-center text-[14px] text-[#4B5B50] border-t border-[#D6E2D9] pt-4">
          Chưa có tài khoản?{' '}
          <Link to="/dang-ky" className="font-semibold text-[#15803D] hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

