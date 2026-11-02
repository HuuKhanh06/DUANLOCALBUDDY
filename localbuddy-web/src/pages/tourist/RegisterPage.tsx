// pages/tourist/RegisterPage.tsx (S-02)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { useToast } from '../../components/ui/Toast';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [roleTab, setRoleTab] = useState('tourist');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [kycFile, setKycFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !email || !phone || !password) {
      setErrorMsg('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      return;
    }

    // Kiểm tra trùng email demo
    if (email === 'minhanh.demo@example.com' || email === 'hoangnam.demo@example.com') {
      setErrorMsg('Email đã được sử dụng. Vui lòng chọn email khác.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (roleTab === 'guide') {
        showToast('Đăng ký thành công. Hồ sơ đang chờ xác minh từ Admin.', 'info');
      } else {
        showToast('Đăng ký tài khoản thành công! Vui lòng đăng nhập.', 'success');
      }
      navigate('/dang-nhap');
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <div className="bg-white border border-[#D6E2D9] rounded-[16px] p-6 shadow-sm">
        <h2 className="text-[24px] font-bold text-[#14231A] text-center mb-1">Đăng ký tài khoản</h2>
        <p className="text-[13px] text-[#4B5B50] text-center mb-6">
          Trải nghiệm khám phá Đà Nẵng cùng người bản địa
        </p>

        <Tabs
          tabs={[
            { id: 'tourist', label: 'Khách du lịch (Tourist)' },
            { id: 'guide', label: 'Hướng dẫn viên (Guide)' },
          ]}
          activeTab={roleTab}
          onChange={setRoleTab}
          className="mb-6 justify-center"
        />

        {roleTab === 'guide' && (
          <div className="mb-5 p-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-[8px] text-[13px] text-[#92400E]">
            ⚠️ <strong>Lưu ý:</strong> Hồ sơ Guide cần Admin duyệt xác minh KYC trước khi được hiển thị công khai trên hệ thống.
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label="Họ và tên *"
            placeholder="Ví dụ: Trần Minh Anh"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Email *"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Số điện thoại *"
            placeholder="0900 000 001"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Input
            label="Mật khẩu *"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            label="Xác nhận mật khẩu *"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {roleTab === 'guide' && (
            <div className="space-y-1">
              <label className="text-[14px] font-medium text-[#14231A]">
                Tài liệu xác thực KYC (CMND / CCCD / Thẻ HDV) *
              </label>
              <div className="border-2 border-dashed border-[#D6E2D9] rounded-[8px] p-4 text-center bg-[#F6FAF6]">
                <input
                  type="file"
                  id="kyc-upload"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setKycFile(e.target.files[0].name);
                  }}
                />
                <label htmlFor="kyc-upload" className="cursor-pointer text-[13px] text-[#15803D] font-semibold hover:underline">
                  {kycFile ? `✓ Đã chọn: ${kycFile}` : '📁 Bấm để chọn tệp tài liệu xác thực giả lập'}
                </label>
                <div className="text-[11px] text-[#4B5B50] mt-1">Hỗ trợ JPG, PNG, PDF (Mô phỏng đồ án)</div>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-[#FEE2E2] text-[#B91C1C] rounded-[8px] text-[13px]">
              {errorMsg}
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isLoading}>
            Đăng ký tài khoản
          </Button>
        </form>

        <div className="mt-6 text-center text-[14px] text-[#4B5B50] border-t border-[#D6E2D9] pt-4">
          Đã có tài khoản?{' '}
          <Link to="/dang-nhap" className="font-semibold text-[#15803D] hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

