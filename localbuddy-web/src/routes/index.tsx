// routes/index.tsx – Hoàn thiện 100% 24 tuyến đường dẫn (Không còn trang Placeholder nào!)
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout, TouristLayout, GuideLayout, AdminLayout } from '../layouts';
import { UIKitPage } from '../pages/UIKitPage';

// Public & Tourist P0 / P1
import { HomePage } from '../pages/public/HomePage';
import { RegisterPage } from '../pages/tourist/RegisterPage';
import { LoginPage } from '../pages/tourist/LoginPage';
import { GuideSearchPage } from '../pages/tourist/GuideSearchPage';
import { GuideProfilePage } from '../pages/tourist/GuideProfilePage';
import { BookingFormPage } from '../pages/tourist/BookingFormPage';
import { DepositPaymentPage } from '../pages/tourist/DepositPaymentPage';
import { MyBookingsPage } from '../pages/tourist/MyBookingsPage';
import { BookingDetailPage } from '../pages/tourist/BookingDetailPage';
import { BalancePaymentPage } from '../pages/tourist/BalancePaymentPage';
import { NotificationsPage } from '../pages/tourist/NotificationsPage';

// Guide P0 / P1
import { IncomingRequestsPage } from '../pages/guide/IncomingRequestsPage';
import { AvailabilityPage } from '../pages/guide/AvailabilityPage';
import { MyBookingsAndShiftsPage } from '../pages/guide/MyBookingsAndShiftsPage';
import { ProfileAndPricePage } from '../pages/guide/ProfileAndPricePage';
import { WalletPage } from '../pages/guide/WalletPage';

// Admin P0 / P1 / P2
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { KycReviewPage } from '../pages/admin/KycReviewPage';
import { DisputesPage } from '../pages/admin/DisputesPage';
import { AccountsPage } from '../pages/admin/AccountsPage';
import { PayoutsPage } from '../pages/admin/PayoutsPage';
import { ReportsPage } from '../pages/admin/ReportsPage';
import { FeeConfigPage } from '../pages/admin/FeeConfigPage';

import { DirectoryPage } from '../pages/DirectoryPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Route độc lập: UI-Kit & Danh mục */}
      <Route path="/ui-kit" element={<UIKitPage />} />
      <Route path="/danh-muc" element={<DirectoryPage />} />

      {/* Public Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dang-ky" element={<RegisterPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/admin/dang-nhap" element={<AdminLoginPage />} />
        <Route path="/guides" element={<GuideSearchPage />} />
        <Route path="/guides/:id" element={<GuideProfilePage />} />
      </Route>

      {/* Tourist Layout */}
      <Route element={<TouristLayout />}>
        <Route path="/dat-lich/:guideId" element={<BookingFormPage />} />
        <Route path="/don-cua-toi" element={<MyBookingsPage />} />
        <Route path="/don/:id" element={<BookingDetailPage />} />
        <Route path="/don/:id/dat-coc" element={<DepositPaymentPage />} />
        <Route path="/don/:id/thanh-toan-70" element={<BalancePaymentPage />} />
        <Route path="/thong-bao" element={<NotificationsPage />} />
      </Route>

      {/* Guide Layout */}
      <Route element={<GuideLayout />}>
        <Route path="/guide/don-va-ca" element={<MyBookingsAndShiftsPage />} />
        <Route path="/guide/don-den" element={<IncomingRequestsPage />} />
        <Route path="/guide/lich-ranh" element={<AvailabilityPage />} />
        <Route path="/guide/ho-so" element={<ProfileAndPricePage />} />
        <Route path="/guide/vi" element={<WalletPage />} />
      </Route>

      {/* Admin Layout */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/kyc" element={<KycReviewPage />} />
        <Route path="/admin/tranh-chap" element={<DisputesPage />} />
        <Route path="/admin/tai-khoan" element={<AccountsPage />} />
        <Route path="/admin/rut-tien" element={<PayoutsPage />} />
        <Route path="/admin/bao-cao" element={<ReportsPage />} />
        <Route path="/admin/phi-san" element={<FeeConfigPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
