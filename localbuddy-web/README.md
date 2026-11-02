# LOCALBUDDY — Nền Tảng Đặt Local Guide Theo Giờ Tại Đà Nẵng

> **Đồ án học phần:** Phân tích và Thiết kế Hệ thống Nâng cao  
> **Phiên bản triển khai:** Google Antigravity IDE (React, TypeScript, Vite, Tailwind CSS)  
> **Màu chủ đạo:** Xanh lá thiên nhiên `#15803D` • **Font chữ:** `Be Vietnam Pro`  
> **Lưu ý quan trọng:** Toàn bộ dữ liệu, đăng nhập và cổng thanh toán là **giả lập (mock)** phục vụ đồ án học phần; không có backend, không có cơ sở dữ liệu thật và không phát sinh giao dịch tiền tệ thật.

---

## 1. Cài đặt và Khởi chạy trên Localhost

### Yêu cầu môi trường
* Node.js phiên bản LTS (khuyến nghị v18+)
* Trình duyệt Chrome / Edge

### Các bước khởi chạy
```bash
# 1. Điều hướng vào thư mục dự án
cd localbuddy-web

# 2. Cài đặt các gói phụ thuộc (Dependencies)
npm install

# 3. Khởi chạy máy chủ phát triển
npm run dev

# 4. Kiểm tra biên dịch TypeScript & Vite Build
npm run build

# 5. Chạy bộ kiểm thử tự động (Tính tiền G, D, B, phí sàn, phạt hủy ΔT)
npm test
```
Máy chủ dev sẽ chạy tại địa chỉ: **`http://localhost:5173/`**

---

## 2. Tài khoản Demo có sẵn

Hệ thống được cài đặt sẵn 3 tài khoản mẫu đại diện cho 3 vai trò:

| Vai trò | Email đăng nhập | Mật khẩu | Màn hình chính sau đăng nhập |
| :--- | :--- | :--- | :--- |
| **Khách du lịch (Tourist)** | `minhanh.demo@example.com` | `123456` | S-10: Đơn của tôi (`/don-cua-toi`) |
| **Hướng dẫn viên (Guide)** | `hoangnam.demo@example.com` | `123456` | S-21: Đơn & ca của tôi (`/guide/don-va-ca`) |
| **Quản trị viên (Admin)** | `admin@localbuddy.vn` | `admin123` | S-26: Thẩm định KYC (`/admin/kyc`) |

---

## 3. Danh mục 24 Màn hình (Screen Inventory S-xx)

Bạn có thể truy cập trang tra cứu trung tâm tại: **`http://localhost:5173/danh-muc`** hoặc mở trực tiếp từng màn:

### Nhóm 1: Khách du lịch & Public (Mobile 390px & Desktop 1440px)
* `S-01`: **Trang chủ** (`/`) — Điểm vào chính, tìm kiếm nhanh và xem Guide nổi bật
* `S-02`: **Đăng ký** (`/dang-ky`) — 2 tab Tourist & Guide nộp tài liệu KYC
* `S-04`: **Đăng nhập** (`/dang-nhap`) — Xác thực phân vai trò du khách và HDV
* `S-06`: **Tìm kiếm, lọc Guide** (`/guides`) — Chỉ hiển thị các Guide đã xác minh (KYC)
* `S-07`: **Hồ sơ Guide & Lịch rảnh** (`/guides/u-guide-1`) — Xem thông tin và chọn ca trống
* `S-08`: **Đặt lịch chuyến đi** (`/dat-lich/u-guide-1`) — Form đặt lịch (ẩn phí sàn theo Q13)
* `S-09`: **Thanh toán cọc 30%** (`/don/BK-1002/dat-coc`) — Đồng hồ 15 phút, cổng giả lập
* `S-10`: **Đơn của tôi** (`/don-cua-toi`) — Dashboard du khách với 2 huy hiệu độc lập
* `S-11`: **Chi tiết đơn** (`/don/BK-1001`) — Timeline trạng thái, khiếu nại, đánh giá
* `S-16`: **Modal hủy đơn** (`/don/BK-1003?huy=1`) — Xem trước tiền phạt và hoàn theo $\Delta T$
* `S-13`: **Thanh toán 70%** (`/don/BK-1004/thanh-toan-70`) — Quyết toán Online hoặc Tiền mặt
* `S-17`: **Trung tâm thông báo** (`/thong-bao`) — Cập nhật sự kiện đơn và ví

### Nhóm 2: Hướng dẫn viên Guide (Mobile 390px & Desktop 1440px)
* `S-18`: **Hồ sơ, giá & xác minh** (`/guide/ho-so`) — Chặn giá ngoài khoảng 80k - 500k/h
* `S-19`: **Cấu hình lịch rảnh** (`/guide/lich-ranh`) — Quản lý ca AVAILABLE, HOLD, BUSY
* `S-20`: **Đơn đến** (`/guide/don-den`) — Đồng hồ 24h, hiển thị phí sàn và tiền nhận
* `S-21`: **Đơn & ca của tôi** (`/guide/don-va-ca`) — Yêu cầu hoàn thành & xác nhận tiền mặt
* `S-24`: **Ví thu nhập & Rút tiền** (`/guide/vi`) — Rút tối thiểu 200.000 đ

### Nhóm 3: Quản trị viên Admin (Desktop 1440px)
* `S-05`: **Đăng nhập Admin** (`/admin/dang-nhap`) — Cổng quản trị độc lập
* `S-26`: **Thẩm định KYC** (`/admin/kyc`) — Duyệt hồ sơ để Guide xuất hiện ở S-06
* `S-27`: **Quản lý tài khoản** (`/admin/tai-khoan`) — Khóa tài khoản và thu hồi xác minh
* `S-28`: **Duyệt lệnh rút tiền** (`/admin/rut-tien`) — Duyệt sau khi chuyển khoản thủ công
* `S-29`: **Xử lý tranh chấp** (`/admin/tranh-chap`) — Chốt đơn Đã hủy, không thu 70%
* `S-30`: **Báo cáo doanh thu** (`/admin/bao-cao`) — Thống kê phí sàn thu được từ đơn PAID
* `S-31`: **Cấu hình phí sàn** (`/admin/phi-san`) — Thiết lập Fee_Rate từ 10% đến 15%

---

## 4. Hướng dẫn Nhập vào Figma bằng plugin `html.to.design`

Để nhập các màn hình từ Localhost vào file thiết kế Figma một cách chuẩn xác:

1. **Khởi chạy ứng dụng**: Đảm bảo `npm run dev` đang chạy tại `http://localhost:5173`.
2. **Sử dụng tham số `?figma=1`**:
   * Truy cập trang danh mục: `http://localhost:5173/danh-muc`
   * Tích chọn checkbox: **"Bật tham số ?figma=1"**.
   * Hệ thống sẽ tự động tắt toàn bộ animation và hiệu ứng CSS transition để `html.to.design` chụp chính xác từng lớp layer.
3. **Mở Figma & Plugin `html.to.design`**:
   * Dán URL tương ứng (ví dụ: `http://localhost:5173/guides?figma=1`).
   * Chọn khung kích thước: **Mobile 390px** hoặc **Desktop 1440px** theo bảng danh mục.
4. **Quy trình chuẩn hóa trong Figma (7 bước theo Mục 8.3 đặc tả)**:
   * **Bước 1:** Đặt tên Frame chuẩn theo mã: `"S-11 Chi tiết đơn, Tourist, Mobile"`.
   * **Bước 2:** Tạo Figma Variables cho màu sắc theo Design Tokens (Primary `#15803D`, Soft `#DCFCE7`, Neutral `#374151`...).
   * **Bước 3:** Chuyển các thành phần lặp thành Components: `StatusBadge`, `PaymentBadge`, `BookingCard`, `TimeSlot`...
   * **Bước 4:** Kiểm tra font chữ `Be Vietnam Pro` đã được load đầy đủ.
   * **Bước 5:** Bật tính năng Auto Layout cho các Card và Form.
   * **Bước 6:** Nối Prototype theo 5 luồng nghiệp vụ chính: Đặt lịch, Thanh toán cọc, Hoàn thành & Trả 70%, Hủy đơn theo $\Delta T$, Xử lý tranh chấp.
   * **Bước 7:** Xuất ảnh và bảng ma trận truy vết phục vụ báo cáo bảo vệ đồ án.

---

## 5. Các Quy Tắc Nghiệp Vụ Bất Biến Đã Kiểm Chứng (RQ-01 đến RQ-19)

1. **Hai huy hiệu trạng thái độc lập**: `BookingStatus` (dạng đặc có icon) và `PaymentStatus` (dạng viền), không bao giờ gộp nhãn.
2. **Thời hạn nghiệp vụ**: Guide phản hồi trong 24 giờ; cọc trong 15 phút; Tourist phản hồi trong 24 giờ sau yêu cầu hoàn tất.
3. **Công thức tiền**: $G = \text{giá} \times \text{giờ}$, cọc $D = 30\% G$, còn lại $B = 70\% G$. Phí sàn $10\% - 15\%$ chụp lúc tạo đơn và **tuyệt đối không hiển thị cho Tourist**.
4. **Quy tắc phạt hủy đơn theo $\Delta T$**: $\Delta T > 48\text{h}$ phạt $0\%$; $24\text{h} \le \Delta T \le 48\text{h}$ phạt $50\%$; $\Delta T < 24\text{h}$ phạt $100\%$ tiền cọc. Ẩn nút hủy khi $\Delta T \le 0$.
5. **Đánh giá & Khiếu nại**: Đánh giá chỉ bật khi `COMPLETED` và `PAID`. Khiếu nại bị chặn sau khi đã hoàn thành và quyết toán đủ.
6. **Ví tiền Guide**: Số dư chỉ được cộng khi đơn chuyển sang `PAID`. Rút tiền tối thiểu $200.000\text{ đ}$.
