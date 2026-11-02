// pages/admin/AdminLoginPage.tsx (S-05: Đăng nhập Quản trị viên)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../components/ui/Toast';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [username, setUsername] = useState('admin@localbuddy.vn');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username || !password) {
      setErrorMsg('Vui lòng nhập tài khoản và mật khẩu quản trị.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Giả lập xác thực Admin
      if (username === 'admin@localbuddy.vn' && password === 'admin123') {
        showToast('Đăng nhập quản trị viên thành công!', 'success');
        navigate('/admin/kyc');
      } else {
        setErrorMsg('Tài khoản hoặc mật khẩu quản trị không chính xác.');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#14532D] flex items-center justify-center p-4">
      <div className="bg-white rounded-[16px] border border-[#D6E2D9] max-w-md w-full p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-[#DCFCE7] text-[#15803D] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
            🛡️
          </div>
          <h1 className="text-[22px] font-bold text-[#14231A]">Cổng Quản Trị Hệ Thống</h1>
          <p className="text-[13px] text-[#4B5B50] mt-1">
            LOCALBUDDY Administration Portal (S-05)
          </p>
        </div>

        {/* Demo info */}
        <div className="bg-[#F6FAF6] border border-[#D6E2D9] rounded-[8px] p-3 mb-5 text-[12px] text-[#14231A]">
          <span className="font-bold text-[#15803D] block">Tài khoản quản trị demo:</span>
          <div>Email: <code>admin@localbuddy.vn</code></div>
          <div>Mật khẩu: <code>admin123</code></div>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <Input
            label="Tài khoản quản trị *"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Mật khẩu *"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMsg && (
            <div className="p-3 bg-[#FEE2E2] text-[#B91C1C] rounded-[8px] text-[13px]">
              {errorMsg}
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isLoading}>
            Đăng nhập Quản trị viên
          </Button>
        </form>

        <div className="mt-6 text-center text-[13px] text-[#4B5B50] border-t border-[#D6E2D9] pt-4">
          <Link to="/" className="text-[#15803D] hover:underline">
            ← Quay về trang chủ người dùng
          </Link>
        </div>
      </div>
    </div>
  );
};

