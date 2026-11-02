LocalBuddy — Đặc tả UI/UX và kế hoạch triển khai Antigravity (mục 3.3)
30 thg 10, 2026 · @Someone
1. Tóm tắt kết quả kiểm chứng và điểm còn chưa rõ
Bản này thay công cụ triển khai: Google Antigravity IDE (React, TypeScript, Vite) thay cho v0.dev; màu chủ đạo đổi từ xanh biển sang xanh lá. Mọi quyết định nghiệp vụ giữ nguyên từ hai tài liệu trước: Giai đoạn A (kiểm chứng) và Giai đoạn B (quyết định Q1 đến Q15, 31 màn, ma trận). Phần 1 này chỉ tóm tắt, không lặp lại toàn bộ.
1.1. Đã kiểm chứng (từ Giai đoạn A)
Hạng mục
Kết quả
Nhãn
Use Case
29 UC (nhóm A 10, B 10, C 9), không trùng, không thiếu; tệp "final" không dùng vì chỉ đủ 18 UC và sai actor
[T] đếm được, [S] kết luận không dùng
Quy tắc nghiệp vụ
28 quy tắc R-01 đến R-28
[T]
Hai nhóm trạng thái độc lập
BookingStatus 6 giá trị, PaymentStatus 8 giá trị, khung giờ AVAILABLE, HOLD, BUSY
[T] BC
Thời hạn
Guide phản hồi 24 giờ; cọc 15 phút; Tourist phản hồi 24 giờ sau yêu cầu hoàn thành
[T]
Tiền
G = giá giờ × số giờ; cọc 30%; còn lại 70%; phí sàn 10% đến 15% chụp lúc tạo đơn; phạt 0%, 50%, 100% theo ΔT với mốc 48 giờ và 24 giờ; rút tối thiểu 200.000 đ
[T]
Mâu thuẫn và thiếu
11 mâu thuẫn (MT), 16 chỗ thiếu (TD)
[T]
1.2. Những điểm đang là giả định đã chốt (Giai đoạn B, mục 1)
Hai huy hiệu trạng thái tách biệt (Q1); không hiển thị PaymentStatus ở nhánh BC chưa gán (Q2); Online thất bại cho thử lại hoặc chọn tiền mặt (Q3); chọn phương thức trả 70% sau COMPLETED (Q6); Booking Notes tùy chọn (Q7, đang chờ nhóm xác nhận); đầu vào đăng ký gồm email và số điện thoại (Q8); web responsive mobile-first (Q15). Nhãn [S] trong toàn bộ tài liệu này nghĩa là theo những giả định đó.
1.3. Thay đổi so với bản trước
Hạng mục
Bản Giai đoạn B
Bản này
Công cụ sinh giao diện
v0.dev, Next.js
Antigravity IDE, React, TypeScript, Vite
Màu chủ đạo
Xanh biển Đà Nẵng
Xanh lá (mục 4)
Nhập Figma
URL công khai của v0
localhost qua html.to.design (mục 8)
Màn hình
31 màn theo UC
Gộp và đánh ưu tiên P0 P1 P2 (mục 2); giữ mã S-xx để truy vết
Prompt
5 prompt cụm cho v0
6 prompt giai đoạn độc lập cho Antigravity (mục 7)
Quyết định "không hiển thị phí sàn cho Tourist" được giữ (Q13); Design System ở mục 4 dùng màu xanh lá nhưng không đổi quy tắc nào.
1.4. Điểm còn chưa rõ ảnh hưởng tới giao diện
Mã
Nội dung
Cách giao diện xử lý tạm
MT-01, MT-02, Q1
Tên và số trạng thái khác nhau giữa UC.15, BC, CSDL
Dùng tên của BC
TD-01, MT-03, Q2
PaymentStatus chưa gán ở nhánh hủy, hết hạn cọc, tranh chấp
Hiển thị bảng kết quả tiền thay cho huy hiệu
TD-02, TD-03
Guide không gửi yêu cầu hoàn thành; Online thất bại; đối soát
Không vẽ nhánh đó, chỉ có thông báo lỗi chung
TD-04, Q5
Hủy khi ΔT ≤ 0
Ẩn nút hủy sau giờ bắt đầu
MT-04, Q7
Booking Notes bắt buộc hay không
Tùy chọn, chờ nhóm
TD-06
Lựa chọn xử lý tranh chấp của Admin
Chỉ kết quả đã có trong quy tắc
Mục 1 phát sinh thêm một điểm chưa có trong tài liệu: danh sách "màn ứng viên" trong yêu cầu mới (Dashboard, Tin nhắn, Cài đặt, khôi phục tài khoản) đa phần không có UC tương ứng; cách xử lý ở mục 2.1.
2. Chốt phạm vi màn hình và Screen Inventory
2.1. Đối chiếu danh sách màn ứng viên với phạm vi thực
Danh sách trong yêu cầu chỉ là ứng viên. Bảng dưới đây chốt từng màn theo căn cứ UC, FR, BR; chức năng không có UC không được tự thêm.
Màn ứng viên
Quyết định
Căn cứ
Trang chủ
Giữ, ưu tiên P1 (bổ sung ngoài UC)
Lối vào UC.09; Q14
Tìm kiếm, lọc, kết quả
Gộp thành một màn
UC.09, UC.10 (UC.10 là extend của UC.09)
Đăng nhập, đăng ký
Giữ; đăng ký Tourist và Guide gộp theo hai tab
UC.01, UC.02, UC.03
Khôi phục tài khoản, quên mật khẩu
Loại
Không UC, không FR
Dashboard Tourist
Loại; dùng "Đơn của tôi" làm trang chính sau đăng nhập
Không UC; UC.15
Dashboard Guide
Loại; dùng "Đơn và ca" làm trang chính
Không UC; UC.16
Dashboard Admin
Gộp vào Báo cáo doanh thu
UC.28
Xem lịch khả dụng (Tourist)
Gộp vào hồ sơ Guide và màn đặt lịch
UC.11, UC.12
Tin nhắn
Loại, đánh dấu "chưa có căn cứ"
Không UC, không FR đã thấy
Hồ sơ cá nhân Tourist, Cài đặt
Loại, đánh dấu "chưa có căn cứ"
Không UC
Quản lý Booking của Admin
Loại; Admin chỉ thấy đơn qua xử lý tranh chấp
Không UC riêng; UC.27
Quản lý đánh giá, nhật ký quản trị
Loại
Ma trận quyền đọc nhật ký chưa có (TD-11)
Đối soát giao dịch
Loại
Không UC đối soát (TD-03, Q3)
Doanh thu Guide
Gộp vào Ví
UC.22
Thông báo
Giữ, P1 (bổ sung ngoài UC)
UC.15, UC.16
2.2. Screen Inventory
Có 24 màn. Mã S-xx giữ từ Giai đoạn B để truy vết; 7 mã được gộp: S-03 vào S-02; S-12, S-14, S-15 vào S-11; S-22, S-23 vào S-21; S-25 vào S-18. Một màn có thể có nhiều trạng thái (tab, modal, panel).
Screen ID
Tên màn hình
Vai trò
Mục tiêu nghiệp vụ
UC liên quan
Ưu tiên
Màn trước
Màn tiếp theo
S-01
Trang chủ
Khách, Tourist
Điểm vào, dẫn tới tìm Guide
UC.09
P1
—
S-06, S-02, S-04
S-02
Đăng ký (Tourist, Guide và nộp KYC)
Khách
Tạo tài khoản; Guide nộp hồ sơ xác minh
UC.01, UC.02
P0
S-01, S-04
S-04
S-04
Đăng nhập Tourist và Guide
Tourist, Guide
Xác thực và điều hướng theo vai trò
UC.03
P0
S-01, S-02
S-10 (Tourist), S-21 (Guide)
S-05
Đăng nhập Admin
Admin
Xác thực quản trị
UC.04
P1
—
S-26
S-06
Tìm kiếm, lọc và kết quả Guide
Tourist, Khách
Tìm Guide đã xác minh
UC.09, UC.10
P0
S-01
S-07
S-07
Hồ sơ Guide và lịch khả dụng
Tourist
Xem hồ sơ, chọn khung giờ trống
UC.11
P0
S-06
S-08
S-08
Đặt lịch
Tourist
Tạo Booking PENDING
UC.12
P0
S-07
S-11
S-09
Thanh toán cọc 30%
Tourist
Đặt cọc trong 15 phút
UC.14
P0
S-11, S-17
S-11
S-10
Đơn của tôi
Tourist
Theo dõi danh sách đơn
UC.15
P0
S-04
S-11
S-11
Chi tiết đơn (Tourist), gồm phản hồi hoàn tất, khiếu nại, đánh giá
Tourist
Theo dõi, xác nhận hoàn tất, khiếu nại, đánh giá
UC.15, UC.18, UC.19, UC.26
P0
S-10, S-08, S-17
S-09, S-13, S-16
S-13
Thanh toán 70% và quyết toán
Tourist
Trả phần còn lại
UC.20
P0
S-11
S-11
S-16
Modal hủy đơn và xem trước hoàn phạt
Tourist, Guide
Xác nhận hủy có số tiền
UC.24, UC.25
P0
S-11, S-21
S-11, S-21
S-17
Trung tâm thông báo
Tourist, Guide
Nhận sự kiện đơn
UC.15, UC.16
P1
Mọi màn
S-11, S-21
S-18
Hồ sơ, giá và trạng thái xác minh Guide
Guide
Cập nhật hồ sơ, giá; xem xác minh
UC.07 (UC.02, UC.03)
P1
S-21
S-19
S-19
Cấu hình lịch rảnh
Guide
Quản lý khung giờ
UC.08
P0
S-21
S-21
S-20
Đơn đến: chấp nhận hoặc từ chối
Guide
Phản hồi trong 24 giờ
UC.13
P0
S-17, S-21
S-21
S-21
Đơn và ca của tôi (Guide), gồm yêu cầu hoàn thành và xác nhận tiền mặt
Guide
Theo dõi, hoàn thành ca, xác nhận 70% tiền mặt
UC.16, UC.17, UC.21, UC.24
P0
S-04, S-20
S-16, S-24
S-24
Ví và rút tiền
Guide
Xem số dư, yêu cầu rút
UC.22
P1
S-21
S-28 (xử lý)
S-26
Thẩm định KYC
Admin
Duyệt hoặc từ chối hồ sơ
UC.05
P0
S-05
S-27
S-27
Quản lý tài khoản
Admin
Khóa, kích hoạt, thu hồi xác minh
UC.06
P1
S-26
S-26
S-28
Duyệt lệnh rút
Admin
Chuyển khoản thủ công
UC.23
P1
S-26
S-26
S-29
Xử lý tranh chấp
Admin
Chốt kết quả tranh chấp
UC.27
P0
S-26
S-26
S-30
Báo cáo doanh thu và thống kê (trang chính Admin)
Admin
Xem số liệu tổng hợp
UC.28
P2
S-05
S-26
S-31
Cấu hình phí sàn
Admin
Đặt Fee_Rate
UC.29
P2
S-30
S-30
Phân bổ ưu tiên: P0 có 15 màn (S-02, S-04, S-06 đến S-11, S-13, S-16, S-19 đến S-21, S-26, S-29), P1 có 7 màn, P2 có 2 màn. Ghi chú: với Admin, S-26 và S-29 là P0 nhưng cần S-05 (P1) để đăng nhập; Giai đoạn 4 sẽ làm cả S-05.
3. Đặc tả chi tiết các màn hình P0
Mỗi màn có bảng 13 dòng bao quát 15 nội dung yêu cầu (vai trò và mục tiêu gộp; hai trạng thái phản hồi gộp). Khi hai bảng khác nhau, ngịch quy tắc ở Giai đoạn A và B. Không đặt tên trạng thái, công thức hay quy tắc quyền ngoài những gì đã có. Hai huy hiệu trạng thái và bảng nút theo trạng thái ở Giai đoạn B mục 2 và 5.1 áp dụng cho các màn dưới đây.
3.0. Dữ liệu mẫu dùng chung
Dữ liệu là giả để minh họa, nhất quán giữa các màn; không có dữ liệu cá nhân hay thanh toán thật.
Mẫu
Nội dung
Tourist
Trần Minh Anh, minhanh.demo@example.com, 0900 000 001
Guide đã xác minh
Lê Hoàng Nam, 200.000 đ/giờ, khu vực Mỹ Khê, Bà Nà, Hội An, đánh giá 4,8
Guide chờ xác minh
Phạm Thu Hà, 150.000 đ/giờ
Phí sàn đang áp dụng
12% (trong 10% đến 15%)
Đơn mẫu 3 giờ
G = 600.000 đ; cọc 30% = 180.000 đ; còn lại 70% = 420.000 đ; phí 12% = 72.000 đ (chỉ Guide thấy); Guide nhận Online G − phí = 528.000 đ
BK-1001
Chờ Guide xác nhận, Chưa thanh toán
BK-1002
Chờ đặt cọc, Chờ thanh toán cọc
BK-1003
Đã xác nhận, Đã cọc 30%, ca cách giờ bắt đầu 30 giờ
BK-1004
Đã hoàn thành, Chờ thanh toán 70%
BK-1005
Đã hoàn thành, Đã thanh toán đủ
BK-1006
Đang tranh chấp
BK-1007
Đã hủy do Tourist hủy; ΔT 30 giờ; phạt 50% cọc = 90.000 đ; hoàn 90.000 đ
3.1. Nhóm tài khoản và tìm kiếm: S-02, S-04, S-06, S-07, S-08
S-02 Đăng ký (Tourist, Guide và nộp KYC)
Mục
Nội dung
Vai trò và mục tiêu
Khách; tạo tài khoản Tourist hoặc Guide, Guide nộp hồ sơ KYC
UC và yêu cầu
UC.01, UC.02; FR 1.1
Bố cục
Tiêu đề, hai tab (Tourist, Guide), biểu mẫu, nút đăng ký, liên kết sang đăng nhập. Tab Guide có thêm bước tải tài liệu KYC
Thành phần
Input, Button, Tabs, vùng tải tệp, Toast
Dữ liệu hiển thị
Ghi chú "Hồ sơ Guide chưa công khai cho đến khi Admin duyệt" (tab Guide)
Dữ liệu nhập
Họ tên, email, số điện thoại, mật khẩu, xác nhận mật khẩu [S]; Guide thêm tài liệu KYC
Thao tác
Bấm "Đăng ký": kiểm tra định dạng và trùng email, số điện thoại; hợp lệ thì hiện thành công và chuyển S-04 (Guide: hồ sơ chờ xác minh, is_verified = False). Không tự đăng nhập thay người dùng
Điều kiện nút
Nút vô hiệu khi thiếu trường bắt buộc hoặc mật khẩu không khớp
Trạng thái
Đang gửi, lỗi trùng email, lỗi trùng số điện thoại, lỗi tải tệp, thành công
Thông báo
"Email đã được sử dụng"; "Đăng ký thành công. Hồ sơ đang chờ xác minh" (Guide)
Điều hướng
Thành công sang S-04; "Đã có tài khoản" sang S-04
Dữ liệu mẫu
Tab Tourist: Trần Minh Anh; tab Guide: Phạm Thu Hà
Quy tắc cần kiểm chứng
Q8, MT-05; Guide chưa xác minh bị ẩn với Tourist (BR-01); loại tài liệu KYC chưa nêu [?]
S-04 Đăng nhập Tourist và Guide
Mục
Nội dung
Vai trò và mục tiêu
Tourist, Guide; xác thực và vào đúng khu vực
UC và yêu cầu
UC.03; FR 1.1
Bố cục
Tiêu đề, biểu mẫu, nút đăng nhập, liên kết đăng ký
Thành phần
Input, Button, Toast, thông báo lỗi
Dữ liệu hiển thị
Không có
Dữ liệu nhập
Email hoặc số điện thoại, mật khẩu
Thao tác
Bấm "Đăng nhập": kiểm tra thông tin mock; sai thì báo lỗi; tài khoản bị khóa thì từ chối; đúng thì chuyển theo vai trò
Điều kiện nút
Vô hiệu khi định danh hoặc mật khẩu trống
Trạng thái
Đang gửi, sai thông tin, tài khoản bị khóa
Thông báo
"Thông tin đăng nhập không đúng"; "Tài khoản đã bị khóa"
Điều hướng
Tourist sang S-10; Guide sang S-21; Admin không dùng màn này
Dữ liệu mẫu
Hai tài khoản demo (Tourist, Guide); đây là xác thực giả, không phải xác thực thật
Quy tắc cần kiểm chứng
Tài khoản bị khóa không đăng nhập; không có "quên mật khẩu"
S-06 Tìm kiếm, lọc và kết quả Guide
Mục
Nội dung
Vai trò và mục tiêu
Tourist, Khách; tìm Guide đã xác minh
UC và yêu cầu
UC.09, UC.10 (extend)
Bố cục
Header, ô tìm kiếm, bộ lọc (cột trái trên desktop, ngăn kéo trên mobile), lưới thẻ Guide, phân trang
Thành phần
Search bar, Select, Guide card, Pagination, Empty state, Loading state, Error state
Dữ liệu hiển thị
Ảnh, tên, giá theo giờ, đánh giá trung bình, huy hiệu "Đã xác minh"
Dữ liệu nhập
Từ khóa; tiêu chí lọc giá và đánh giá (tiêu chí khác chưa nêu, TD-16)
Thao tác
Tìm, lọc: cập nhật danh sách; bấm thẻ: sang S-07. Chỉ hiển thị Guide is_verified = True
Điều kiện nút
Nút "Xóa bộ lọc" chỉ sáng khi đang lọc
Trạng thái
Đang tải (skeleton), rỗng kèm "Xóa bộ lọc", lỗi kèm "Thử lại"
Thông báo
"Không tìm thấy Guide phù hợp"
Điều hướng
Thẻ sang S-07
Dữ liệu mẫu
6 Guide đã xác minh, trong đó Lê Hoàng Nam; Phạm Thu Hà không được hiển thị
Quy tắc cần kiểm chứng
Chỉ Guide đã xác minh; giá trong 80.000 đến 500.000 đ
S-07 Hồ sơ Guide và lịch khả dụng
Mục
Nội dung
Vai trò và mục tiêu
Tourist; xem hồ sơ và chọn khung giờ trống
UC và yêu cầu
UC.11
Bố cục
Ảnh và thông tin, giới thiệu, giá, lịch khả dụng theo ngày, danh sách đánh giá, thanh hành động cố định dưới (mobile)
Thành phần
Avatar, Date picker, Time slot, Badge, Button
Dữ liệu hiển thị
Tên, giá theo giờ, giới thiệu, khung giờ AVAILABLE, đánh giá kèm tên hiển thị Tourist [S]
Dữ liệu nhập
Ngày, khung giờ
Thao tác
Bấm "Đặt lịch" khi đã chọn khung giờ: sang S-08 giữ ngày và khung đã chọn; chưa đăng nhập thì chuyển S-04
Điều kiện nút
Vô hiệu khi chưa chọn khung hoặc không còn khung trống
Trạng thái
Đang tải; không có khung trống; lỗi tải
Thông báo
"Chưa có khung giờ trống"
Điều hướng
S-08; quay lại S-06
Dữ liệu mẫu
Lê Hoàng Nam, 200.000 đ/giờ, khung trống 09:00 – 12:00 và 14:00 – 17:00 ngày 02/11/2026
Quy tắc cần kiểm chứng
Không hiển thị Guide chưa xác minh; HOLD, BUSY hiện là "không còn trống" (TD-10)
S-08 Đặt lịch
Mục
Nội dung
Vai trò và mục tiêu
Tourist; tạo Booking PENDING
UC và yêu cầu
UC.12; FR 4.1
Bố cục
Tóm tắt Guide, biểu mẫu, tóm tắt giá (Payment summary), nút gửi
Thành phần
Date picker, Time slot, Input, Payment summary, Button
Dữ liệu hiển thị
G, cọc 30%, còn lại 70%; không hiển thị phí sàn
Dữ liệu nhập
Ngày, khung giờ, số giờ, số khách (bắt buộc), địa điểm gặp và yêu cầu riêng (tùy chọn [S])
Thao tác
Bấm "Gửi yêu cầu đặt lịch": kiểm tra khung giờ còn trống và giờ bắt đầu ≥ 24 giờ [S]; hợp lệ thì tạo đơn PENDING, chụp Fee_Rate, sang S-11 kèm thông báo; không đổi PaymentStatus
Điều kiện nút
Vô hiệu khi thiếu số khách hoặc khung giờ
Trạng thái
Đang gửi; khung vừa bị người khác giữ (Atomic Lock)
Thông báo
"Khung giờ này vừa được đặt, vui lòng chọn khung khác"; "Đã gửi, chờ Guide xác nhận trong 24 giờ"
Điều hướng
Thành công sang S-11; hủy quay S-07
Dữ liệu mẫu
3 giờ, 2 khách, G 600.000 đ, cọc 180.000 đ, còn 420.000 đ
Quy tắc cần kiểm chứng
D = 30% G, B = 70% G; chụp Fee_Rate khi tạo đơn; Q5, Q7, MT-04
3.2. Nhóm đơn và thanh toán của Tourist: S-09, S-10, S-11, S-13, S-16
S-09 Thanh toán cọc 30%
Mục
Nội dung
Vai trò và mục tiêu
Tourist; đặt cọc trong 15 phút
UC và yêu cầu
UC.14; FR 4.5
Bố cục
Đồng hồ 15 phút, tóm tắt đơn, số tiền cọc, khung cổng thanh toán mô phỏng, nút thanh toán
Thành phần
Payment summary, Button, Toast, Modal xác nhận kết quả
Dữ liệu hiển thị
Mã đơn, Guide, thời gian ca, cọc D, đồng hồ còn lại. Nhãn rõ "Cổng thanh toán giả lập, không có giao dịch thật"
Dữ liệu nhập
Không có thẻ thật; nút chọn kết quả giả lập (thành công, thất bại) để trình diễn
Thao tác
Thành công: BookingStatus thành Đã xác nhận, PaymentStatus Đã cọc 30%, khung giờ HOLD thành BUSY; thất bại: báo lỗi, đồng hồ vẫn chạy; hết 15 phút: đơn bị hủy, khung trả về AVAILABLE
Điều kiện nút
Chỉ bật khi đơn Đợi đặt cọc và đồng hồ còn
Trạng thái
Đang xử lý, thành công, thất bại, hết hạn
Thông báo
"Đặt cọc thành công"; "Thanh toán không thành công, thử lại"; "Đã hết 15 phút, đơn đã bị hủy"
Điều hướng
Về S-11
Dữ liệu mẫu
BK-1002, cọc 180.000 đ
Quy tắc cần kiểm chứng
Q2, MT-03: nhánh hết hạn không gán PaymentStatus mới; không giả vờ có thanh toán thật
S-10 Đơn của tôi
Mục
Nội dung
Vai trò và mục tiêu
Tourist; xem danh sách đơn, trang chính sau đăng nhập
UC và yêu cầu
UC.15; FR 4.6
Bố cục
Header, tab lọc trạng thái, danh sách thẻ đơn
Thành phần
Tabs, Booking card, Status badge (hai huy hiệu), Empty state, Loading state, Error state
Dữ liệu hiển thị
Mã đơn, Guide, thời gian, hai huy hiệu, tổng G
Dữ liệu nhập
Bộ lọc theo BookingStatus
Thao tác
Bấm thẻ: sang S-11; nút "Thanh toán cọc" nhanh (chỉ đơn Đợi đặt cọc): sang S-09
Điều kiện nút
Chỉ đơn Đợi đặt cọc mới có nút nhanh
Trạng thái
Đang tải, rỗng kèm "Tìm Guide" sang S-06, lỗi kèm "Thử lại"
Thông báo
Không có đơn nào
Điều hướng
S-11, S-09, S-06
Dữ liệu mẫu
BK-1001 đến BK-1007 (mục 3.0)
Quy tắc cần kiểm chứng
Q1, MT-01; hai huy hiệu, không nhãn gộp
S-11 Chi tiết đơn (Tourist)
Mục
Nội dung
Vai trò và mục tiêu
Tourist; theo dõi đơn và thực hiện hành động theo trạng thái
UC và yêu cầu
UC.15, UC.18, UC.19, UC.26
Bố cục
Hai huy hiệu, dòng thời gian trạng thái, thông tin Guide, thông tin ca, Payment summary, vùng hành động, phần đánh giá
Thành phần
Status badge, Payment summary, Button, Modal (khiếu nại, đánh giá), Toast
Dữ liệu hiển thị
Mã đơn, Guide, thời gian, số khách, địa điểm, G, D, B, đồng hồ nếu có; đơn hủy: bảng kết quả tiền
Dữ liệu nhập
Khiếu nại: lý do, bằng chứng tùy chọn; đánh giá: sao, nhận xét
Thao tác
Nút theo bảng Giai đoạn B mục 5.1. Xác nhận hoàn tất: đơn sang COMPLETED và hiện "Thanh toán 70%"; Khiếu nại: DISPUTED, chỉ xem; Đánh giá: chỉ khi COMPLETED và PAID
Điều kiện nút
Xem bảng 5.1; nút đánh giá vô hiệu kèm lý do khi chưa đủ điều kiện
Trạng thái
Đang tải, lỗi, không tìm thấy đơn, đơn DISPUTED chỉ xem, đơn CANCELLED chỉ xem
Thông báo
"Đã xác nhận hoàn tất"; "Đã gửi khiếu nại, chờ Admin xử lý"; "Cảm ơn bạn đã đánh giá"
Điều hướng
S-09, S-13, S-16 (modal)
Dữ liệu mẫu
Mỗi BK-1001 đến BK-1007 tương ứng một trạng thái
Quy tắc cần kiểm chứng
UC.19 chặn khiếu nại sau COMPLETED; đánh giá cần COMPLETED và PAID; hai huy hiệu; Q2, Q13; không hiển thị phí sàn
S-13 Thanh toán 70% và quyết toán
Mục
Nội dung
Vai trò và mục tiêu
Tourist; trả phần còn lại sau khi COMPLETED
UC và yêu cầu
UC.20
Bố cục
Tóm tắt đơn, số tiền B, lựa chọn Online hoặc Tiền mặt, khung cổng thanh toán mô phỏng, nút xác nhận
Thành phần
Radio, Payment summary, Button, Toast, Modal
Dữ liệu hiển thị
B = 420.000 đ (BK-1004), phương thức
Dữ liệu nhập
Phương thức (Online, Tiền mặt)
Thao tác
Online thành công: PaymentStatus Đã thanh toán đủ, Guide được cộng ví (G trừ phí); Online thất bại: báo lỗi, "Thử lại" hoặc "Chọn tiền mặt" (Q3); Tiền mặt: chờ Guide xác nhận ở S-21
Điều kiện nút
Chỉ khi đơn COMPLETED và chưa PAID
Trạng thái
Đang xử lý, thành công, thất bại, chờ Guide xác nhận tiền mặt
Thông báo
"Thanh toán thành công"; "Thanh toán không thành công"; "Đang chờ Guide xác nhận đã nhận tiền mặt"
Điều hướng
Về S-11
Dữ liệu mẫu
BK-1004
Quy tắc cần kiểm chứng
Ví chỉ cộng khi PAID; MT-07, MT-08; Q3, Q6; TD-03
S-16 Modal hủy đơn và xem trước hoàn phạt
Mục
Nội dung
Vai trò và mục tiêu
Tourist, Guide; xác nhận hủy sau khi xem số tiền
UC và yêu cầu
UC.24, UC.25 (include)
Bố cục
Modal: ΔT, mức phạt, số tiền phạt, số tiền hoàn, cảnh báo, hai nút
Thành phần
Modal, Payment summary, Button
Dữ liệu hiển thị
ΔT; mức phạt 0% khi ΔT > 48 giờ, 50% khi 24 đến 48 giờ, 100% khi < 24 giờ; Guide hủy đơn Đã xác nhận: hoàn 100% cho Tourist và ghi nhận vi phạm
Dữ liệu nhập
Không (không ô lý do, Q10)
Thao tác
"Xác nhận hủy": đơn CANCELLED, hiện bảng kết quả tiền; "Không hủy": đóng. Không đổi gì nếu chọn "Không hủy"
Điều kiện nút
Modal bắt buộc trước khi hủy; không có modal khi ΔT ≤ 0 (Q5)
Trạng thái
Số tiền tính sẵn; đang xử lý; lỗi
Thông báo
"Đã hủy đơn. Phạt 90.000 đ, hoàn 90.000 đ" (mẫu BK-1007)
Điều hướng
Về S-11 hoặc S-21
Dữ liệu mẫu
BK-1007: ΔT 30 giờ, cọc 180.000 đ, phạt 50% = 90.000 đ
Quy tắc cần kiểm chứng
Bảng phạt theo ΔT; phí trên tiền phạt chỉ hiện ở phía Guide; TD-04, TD-05
3.3. Nhóm Guide và Admin: S-19, S-20, S-21, S-26, S-29
S-19 Cấu hình lịch rảnh
Mục
Nội dung
Vai trò và mục tiêu
Guide; quản lý khung giờ có thể đặt
UC và yêu cầu
UC.08
Bố cục
Chọn tuần, lưới ngày và giờ, chú giải ba trạng thái
Thành phần
Date picker, Time slot, Badge, Button, Toast
Dữ liệu hiển thị
Mỗi khung: Trống (AVAILABLE), Đang giữ chỗ kèm đồng hồ (HOLD), Đã có lịch (BUSY)
Dữ liệu nhập
Chọn hoặc bỏ khung AVAILABLE
Thao tác
Bấm khung trống hoặc khung chưa mở để mở hoặc đóng; bấm "Lưu" để cập nhật
Điều kiện nút
Khung HOLD và BUSY không sửa được; "Lưu" vô hiệu khi không thay đổi
Trạng thái
Đang tải, đang lưu, lỗi lưu
Thông báo
"Đã lưu lịch rảnh"; "Khung giờ đang có đơn, không thể sửa"
Điều hướng
Quay lại S-21
Dữ liệu mẫu
Lê Hoàng Nam; 02/11/2026: 09:00 – 12:00 trống, 14:00 – 17:00 đang giữ (BK-1002), 18:00 – 20:00 đã có lịch (BK-1003)
Quy tắc cần kiểm chứng
Ba trạng thái khung giờ; Atomic Lock; MT-02, TD-10
S-20 Đơn đến: chấp nhận hoặc từ chối
Mục
Nội dung
Vai trò và mục tiêu
Guide; phản hồi đơn PENDING trong 24 giờ
UC và yêu cầu
UC.13
Bố cục
Danh sách đơn đến, vùng chi tiết, hai nút Chấp nhận và Từ chối
Thành phần
Booking card, Button, Modal xác nhận từ chối, Toast
Dữ liệu hiển thị
Tourist, thời gian ca, số khách, địa điểm, yêu cầu riêng, G, phí sàn và tiền Guide nhận, đồng hồ 24 giờ
Dữ liệu nhập
Không
Thao tác
Chấp nhận: đơn sang Chờ đặt cọc, khung HOLD, đồng hồ 15 phút bắt đầu; Từ chối (sau xác nhận): đơn CANCELLED, khung trả AVAILABLE; quá 24 giờ: đơn tự hủy
Điều kiện nút
Chỉ đơn PENDING còn trong 24 giờ
Trạng thái
Rỗng, đang tải, lỗi, đã quá hạn
Thông báo
"Đã chấp nhận. Tourist có 15 phút để đặt cọc"; "Đã từ chối đơn"
Điều hướng
Về S-21
Dữ liệu mẫu
BK-1001: 3 giờ, 2 khách, G 600.000 đ, phí 72.000 đ, Guide nhận 528.000 đ nếu trả Online
Quy tắc cần kiểm chứng
Hạn 24 giờ từ lúc tạo đơn; 15 phút từ lúc chấp nhận; TD-04, TD-11, Q13
S-21 Đơn và ca của tôi (Guide)
Mục
Nội dung
Vai trò và mục tiêu
Guide; trang chính sau đăng nhập, theo dõi đơn và ca, yêu cầu hoàn thành, xác nhận tiền mặt
UC và yêu cầu
UC.16, UC.17, UC.21, UC.24
Bố cục
Tab lọc, danh sách đơn, vùng chi tiết đơn, vùng hành động
Thành phần
Tabs, Booking card, Status badge (hai huy hiệu), Button, Modal
Dữ liệu hiển thị
Mã đơn, Tourist, ca, hai huy hiệu, tiền Guide nhận, ca sắp tới
Dữ liệu nhập
Xác nhận yêu cầu hoàn thành; xác nhận đã nhận đủ 70% tiền mặt
Thao tác
Yêu cầu hoàn thành: gửi cho Tourist, đồng hồ 24 giờ của Tourist; Xác nhận tiền mặt: PaymentStatus PAID, cộng ví theo quy tắc; Hủy đơn: mở S-16 (cảnh báo vi phạm)
Điều kiện nút
Yêu cầu hoàn thành chỉ sau khi khung giờ kết thúc; Xác nhận tiền mặt chỉ đơn COMPLETED nhánh tiền mặt; theo bảng nút Giai đoạn B mục 5.1
Trạng thái
Rỗng, đang tải, lỗi, đơn bị khóa chưa xác định (TD-09)
Thông báo
"Đã gửi yêu cầu hoàn thành"; "Đã xác nhận nhận tiền mặt"
Điều hướng
S-20, S-16, S-24, S-19, S-18
Dữ liệu mẫu
BK-1003 (ca 30 giờ nữa), BK-1004, BK-1005
Quy tắc cần kiểm chứng
Q4, TD-02, TD-03; tiền mặt cộng ví cọc trừ phí; Guide hủy CONFIRMED hoàn 100%
S-26 Thẩm định KYC
Mục
Nội dung
Vai trò và mục tiêu
Admin; duyệt hoặc từ chối hồ sơ Guide
UC và yêu cầu
UC.05
Bố cục
Sidebar, bảng hồ sơ chờ, vùng xem tài liệu, nút Duyệt và Từ chối
Thành phần
Sidebar, Table, Pagination, Modal, Toast
Dữ liệu hiển thị
Tên Guide, ngày nộp, tài liệu KYC, trạng thái
Dữ liệu nhập
Quyết định; lý do từ chối (có bắt buộc không chưa nêu [?])
Thao tác
Duyệt: Guide thành đã xác minh và hiện ở S-06; Từ chối: giữ ẩn
Điều kiện nút
Chỉ hồ sơ chờ xác minh
Trạng thái
Hàng đợi rỗng, đang tải, lỗi
Thông báo
"Đã duyệt hồ sơ"; "Đã từ chối hồ sơ"
Điều hướng
Sidebar sang S-29, S-27, S-28, S-30, S-31
Dữ liệu mẫu
Phạm Thu Hà, hồ sơ chờ, 2 tài liệu mẫu
Quy tắc cần kiểm chứng
Chỉ Guide đã xác minh mới hiện với Tourist; MT-02, TD-08
S-29 Xử lý tranh chấp
Mục
Nội dung
Vai trò và mục tiêu
Admin; chốt kết quả tranh chấp
UC và yêu cầu
UC.27
Bố cục
Danh sách tranh chấp, chi tiết đơn, lý do và bằng chứng hai bên, vùng quyết định
Thành phần
Table, Booking card, Modal xác nhận, Toast
Dữ liệu hiển thị
Mã đơn, hai bên, lý do, bằng chứng, số tiền G, D, B
Dữ liệu nhập
Ghi chú của Admin
Thao tác
Chốt kết quả: đơn CANCELLED (tranh chấp), không thu 70%; sau xác nhận không hoàn tác; không kháng nghị (Q11)
Điều kiện nút
Chỉ đơn Đang tranh chấp
Trạng thái
Rỗng, đang tải, lỗi
Thông báo
"Đã chốt tranh chấp. Đơn chuyển sang Đã hủy"
Điều hướng
Về danh sách
Dữ liệu mẫu
BK-1006
Quy tắc cần kiểm chứng
DISPUTED sang CANCELLED; 70% không thu; TD-06 (các lựa chọn khác chưa nêu)
Đã đặc tả đủ 15 màn P0. Các màn P1 và P2 (S-01, S-05, S-17, S-18, S-24, S-27, S-28, S-30, S-31) dùng mô tả ở Giai đoạn B mục 4 và sẽ được làm ở Giai đoạn 5; S-05 làm sớm cùng Giai đoạn 4 vì Admin cần đăng nhập.
4. Design System LOCALBUDDY (xanh lá)
Hướng thiết kế: hiện đại, sạch, dễ đọc, gần gũi nhưng đáng tin như một marketplace dịch vụ. Màu có tên theo vai trò (token) để đặt thành biến CSS và Figma Variables. Tỷ lệ tương phản dưới đây đã tính bằng công thức WCAG, mọi cặp chữ nền đều ≥ 4,5:1.
4.1. Màu sắc
Token
Mã màu
Dùng cho
Tương phản
color-primary
#15803D
Nút chính, liên kết, tab đang chọn
Chữ trắng trên nền này 5,02:1
color-primary-dark
#14532D
Header, thanh bên Admin, tiêu đề nhấn
Chữ trắng 9,11:1
color-secondary
#86EFAC
Màu nhấn phụ, nền nổi bật, biểu đồ
Chữ tối trên nền này 11,64:1; không dùng làm chữ trên nền trắng
color-primary-soft
#DCFCE7
Nền huy hiệu, vùng chọn
Chữ #166534 6,49:1
color-bg
#F6FAF6
Nền trang
Chữ chính 15,5:1
color-surface
#FFFFFF
Thẻ, bảng, modal
Chữ chính 16,34:1
color-text
#14231A
Chữ chính
—
color-text-muted
#4B5B50
Chữ phụ, chú thích
7,21:1 trên nền trắng
color-border
#D6E2D9
Viền, đường kẻ
Chỉ trang trí, không mang thông tin
color-success
#166534 trên #DCFCE7
Thành công, Hoàn thành
6,49:1
color-warning
#92400E trên #FEF3C7
Chờ, sắp hết hạn
6,37:1
color-error
#B91C1C trên #FEE2E2
Lỗi, tranh chấp, hủy do vi phạm
5,3:1
color-info
#1E40AF trên #DBEAFE
Thông tin, Đã xác nhận
7,15:1
color-neutral
#374151 trên #E5E7EB
Đã hủy, vô hiệu
8,33:1
Huy hiệu BookingStatus dùng dạng đặc (nền nhạt, chữ đậm, có biểu tượng); huy hiệu PaymentStatus dùng dạng viền (nền trắng, viền mảnh) để phân biệt hai nhóm. Mọi trạng thái luôn có nhãn chữ, không chỉ dựa vào màu.
BookingStatus (nhãn)
Nền
Chữ
Biểu tượng gợi ý
Chờ Guide xác nhận
#FEF3C7
#92400E
Đồng hồ
Chờ đặt cọc
#FFEDD5
#9A3412
Thẻ tiền
Đã xác nhận
#DBEAFE
#1E40AF
Dấu tích trong vòng
Đã hoàn thành
#DCFCE7
#166534
Dấu tích
Đang tranh chấp
#FEE2E2
#B91C1C
Cảnh báo
Đã hủy
#E5E7EB
#374151
Dấu X
4.2. Typography
Cấp
Kích thước và độ đậm
Dùng cho
Font
Be Vietnam Pro (hỗ trợ tiếng Việt), dự phòng sans-serif hệ thống
Toàn bộ
H1
32 px / 40, 700 (mobile 26 px)
Tiêu đề trang
H2
24 px / 32, 700 (mobile 20 px)
Tiêu đề phần
H3
18 px / 26, 600
Tiêu đề thẻ, modal
Body
16 px / 24, 400
Nội dung
Body nhỏ
14 px / 20, 400
Bảng, nhãn ô nhập
Caption
12 px / 16, 500
Huy hiệu, chú thích; không dùng cho thông tin quan trọng
Số tiền
16 đến 24 px, 600, số căn đều (tabular)
G, D, B, số dư
4.3. Layout
Hạng mục
Quy ước
Khung
Mobile 390 px (lề 16 px, lưới 4 cột); Tablet 768 px (lưới 8 cột); Desktop 1440 px (nội dung tối đa 1200 px, lưới 12 cột, khoảng cách cột 24 px)
Khoảng cách
Bội số của 4 px: 4, 8, 12, 16, 24, 32, 48
Bo góc
Input và nút 8 px; thẻ 12 px; modal 16 px; huy hiệu 999 px
Bóng
Thẻ: 0 1 px 3 px nhạt; modal: 0 8 px 24 px nhạt; không dùng bóng đậm
Responsive
Mobile-first; Tourist và Guide có hai khung (390 và 1440); Admin chỉ desktop (một sidebar 240 px)
Điều hướng
Tourist: header trên; Guide: header trên và thanh dưới (mobile); Admin: sidebar trái
Khả năng tiếp cận
Vùng bấm tối thiểu 44 px; focus nhìn thấy rõ; nhãn ô nhập luôn hiện
4.4. Component dùng chung
Component
Biến thể chính
Dùng ở
Button
Primary, Secondary, Danger, Ghost; trạng thái thường, hover, focus, vô hiệu, đang tải
Mọi màn
Input
Text, mật khẩu, số tiền, vùng nhập dài; có lỗi
S-02, S-04, S-08
Search bar
Có ô lọc nhanh
S-01, S-06
Select, Dropdown
Đơn chọn
Bộ lọc, S-27
Date picker
Chọn ngày, ngày không còn trống bị mờ
S-07, S-08, S-19
Time slot
AVAILABLE, HOLD (có đồng hồ), BUSY, đã chọn
S-07, S-08, S-19
Guide card
Thẻ kết quả, thẻ nổi bật
S-01, S-06
Avatar
3 cỡ; chữ cái đầu khi không có ảnh
Toàn bộ
Status badge
BookingStatus (6), PaymentStatus (8), xác minh (2)
S-10, S-11, S-21, S-29
Booking card
Danh sách, thu gọn, chi tiết
S-10, S-20, S-21, S-29
Payment summary
Tourist (G, D, B), Guide (thêm phí và tiền nhận), Admin
S-08, S-09, S-11, S-13, S-16, S-20
Modal
Xác nhận, biểu mẫu, nguy hiểm
S-16, S-20, S-29
Toast
Thành công, lỗi, thông tin; tự đóng sau 5 giây; có nhãn chữ
Mọi màn
Tabs
Lọc trạng thái, đổi vai trò đăng ký
S-02, S-10, S-21
Table, Pagination
Admin; thu thành thẻ trên mobile
S-26 đến S-30
Sidebar, Header
Theo vai trò
Mọi màn
Empty, Loading, Error state
Ba khung chuẩn, có hành động
Mọi danh sách
Đồng hồ đếm ngược
24 giờ, 15 phút; chuyển cam khi sắp hết
S-08, S-09, S-11, S-20
4.5. Quy tắc tái sử dụng
Component giữ nguyên hình dạng giữa ba vai trò; chỉ khác nội dung. Ví dụ: Payment summary cùng một component nhưng Tourist không thấy phí sàn, Guide và Admin thấy (Q13). Admin dùng mật độ bảng cao hơn, còn Tourist và Guide ưu tiên thẻ. Mọi màu lấy từ token, không ghi mã màu trực tiếp trong component.
5. Kiến trúc frontend và cấu trúc thư mục
Kiến trúc nhỏ gọn cho một đồ án học phần: chỉ giao diện, dữ liệu mock, không backend, không cổng thanh toán thật, không xác thực thật.
5.1. Lựa chọn công nghệ
Hạng mục
Lựa chọn
Lý do
Khung
React 18 và TypeScript
Theo yêu cầu; kiểu dữ liệu giúp trạng thái đơn không bị gõ sai
Build
Vite
Chạy localhost nhanh, dễ dùng với Antigravity
Kiểu dáng
Tailwind CSS với token ở theme
Nhất quán, DOM đơn giản, thuận tiện cho html.to.design
Bộ component
shadcn/ui (mã nằm trong dự án) và Radix cho modal, tab
Dễ sửa; không phụ thuộc thư viện đóng
Định tuyến
React Router với BrowserRouter
Mỗi màn có URL riêng
State
useState, Context nhỏ cho "phiên mock" và kho dữ liệu mock
Đủ cho mô phỏng chuyển trạng thái; không thêm Redux
Định dạng
Tiện ích tự viết cho tiền và giờ; không thêm thư viện ngày nếu không cần
Giữ ít phụ thuộc
Font
Be Vietnam Pro từ Google Fonts
Hỗ trợ tiếng Việt đầy đủ
Không thêm
Backend, cơ sở dữ liệu, API thanh toán, xác thực, dịch vụ ngoài
Ngoài phạm vi
5.2. Cấu trúc thư mục
localbuddy-web/
  index.html
  package.json, vite.config.ts, tsconfig.json, tailwind.config.ts
  src/
    main.tsx, App.tsx
    assets/                 logo, ảnh minh họa
    styles/                 tokens.css (biến màu), globals.css
    components/
      ui/                   Button, Input, Select, Tabs, Modal, Toast, Table, Pagination
      common/               StatusBadge, PaymentBadge, PaymentSummary, BookingCard,
                            GuideCard, TimeSlot, Countdown, EmptyState, LoadingState, ErrorState
      layout/               Header, Sidebar, BottomNav, PageContainer
    layouts/                PublicLayout, TouristLayout, GuideLayout, AdminLayout
    pages/
      public/               Home, Register, Login, AdminLogin
      tourist/              GuideSearch, GuideProfile, BookingForm, DepositPayment,
                            MyBookings, BookingDetail, BalancePayment, Notifications
      guide/                IncomingRequests, MyBookingsAndShifts, Availability, ProfileAndPrice, Wallet
      admin/                KycReview, Disputes, Accounts, Payouts, Reports, FeeConfig
    features/
      booking/              logic hiển thị nút theo trạng thái, đồng hồ, chuyển trạng thái mock
      payment/              tính G, D, B, phí, phạt (hàm thuần, có kiểm tra)
      kyc/, review/, guide/
    data/                   users.ts, guides.ts, slots.ts, bookings.ts, payments.ts,
                            reviews.ts, kyc.ts, notifications.ts
    hooks/                  useMockSession, useCountdown, useBookings
    routes/                 index.tsx, guards.tsx (chặn theo vai trò, chỉ mock)
    types/                  booking.ts, payment.ts, user.ts
    utils/                  money.ts, time.ts, statusLabels.ts
Chỉ hai lớp logic: features/booking quy định trạng thái và nút; features/payment chứa công thức tiền. Các trang không tự tính tiền hay tự quyết định nút để tránh mỗi màn một định nghĩa.
5.3. Tuyến đường dẫn (mỗi màn một URL)
URL
Màn
Vai trò
/
S-01
Khách, Tourist
/dang-ky
S-02
Khách
/dang-nhap
S-04
Tourist, Guide
/admin/dang-nhap
S-05
Admin
/guides
S-06
Khách, Tourist
/guides/:id
S-07
Khách, Tourist
/dat-lich/:guideId
S-08
Tourist
/don-cua-toi
S-10
Tourist
/don/:id
S-11
Tourist
/don/:id/dat-coc
S-09
Tourist
/don/:id/thanh-toan-70
S-13
Tourist
/thong-bao
S-17
Tourist, Guide
/guide/don-va-ca
S-21
Guide
/guide/don-den
S-20
Guide
/guide/lich-ranh
S-19
Guide
/guide/ho-so
S-18
Guide
/guide/vi
S-24
Guide
/admin/kyc
S-26
Admin
/admin/tai-khoan
S-27
Admin
/admin/rut-tien
S-28
Admin
/admin/tranh-chap
S-29
Admin
/admin/bao-cao
S-30
Admin
/admin/phi-san
S-31
Admin
S-16 (modal hủy) không có URL riêng; mở từ S-11 hoặc S-21, thêm tham số ?huy=1 để nhập được riêng vào Figma.
5.4. Dữ liệu mock
Thực thể
Trường tối thiểu
Người dùng
id, vai trò, họ tên, email, số điện thoại, trạng thái khóa
Hồ sơ Guide
id, giới thiệu, giá theo giờ, đã xác minh, đánh giá trung bình
Khung giờ
guideId, ngày, giờ bắt đầu, giờ kết thúc, AVAILABLE, HOLD hoặc BUSY
Booking
id, touristId, guideId, giờ, số khách, địa điểm, ghi chú, BookingStatus, PaymentStatus, Fee_Rate đã chụp, thời điểm các mốc
Thanh toán
bookingId, loại (cọc, 70%), phương thức, số tiền, kết quả giả lập
Đánh giá
bookingId, sao, nhận xét
KYC
guideId, tài liệu, trạng thái
Thông báo
userId, nội dung, bookingId, đã đọc
Ví, lệnh rút
guideId, số dư khả dụng, số tiền, trạng thái
Bộ dữ liệu khởi tạo dùng đúng BK-1001 đến BK-1007 ở mục 3.0 để mỗi đơn có cùng thông tin ở Dashboard, danh sách và chi tiết. Không đưa dữ liệu cá nhân hay thông tin thanh toán thật.
6. Kế hoạch triển khai bằng Antigravity
Sáu giai đoạn, mỗi giai đoạn là một prompt độc lập (mục 7). Chỉ sang giai đoạn sau khi giai đoạn trước đạt điều kiện hoàn thành. Không xin Antigravity làm cả hệ thống trong một prompt.
Giai đoạn
Mục tiêu
Màn hình
Điều kiện hoàn thành
1
Khung dự án, Design System, layout, routing, dữ liệu mock đầu
Trang thử cho component (/ui-kit)
npm run build không lỗi; /ui-kit hiện đủ component và hai huy hiệu
2
Luồng Tourist P0
S-02, S-04, S-06, S-07, S-08, S-09, S-10, S-11, S-13, S-16
Đi được từ tìm Guide đến thanh toán 70% và hủy trên dữ liệu mock; tiền đúng
3
Luồng Guide P0
S-19, S-20, S-21 (cùng S-18 và S-24 giản lược nếu đủ thời gian)
Chấp nhận đơn ở Guide làm đổi trạng thái thấy được ở Tourist
4
Admin P0
S-05, S-26, S-29
Duyệt KYC làm Guide hiện ở tìm kiếm; chốt tranh chấp chuyển đơn CANCELLED
5
Màn P1 và P2
S-01, S-17, S-18, S-24, S-27, S-28, S-30, S-31
Mọi tuyến trong mục 5.3 mở được, không nút trang trí
6
Kiểm thử và chuẩn bị nhập Figma
Tất cả
Checklist mục 10 đạt; danh sách URL localhost sẵn sàng
6.1. Nguyên tắc cho mọi giai đoạn
Nguyên tắc
Nội dung
Kiểm tra trước khi sửa
Đọc cấu trúc dự án, file cấu hình, mã liên quan; lập kế hoạch ngắn trước thay đổi lớn
Tái sử dụng
Dùng lại component và hàm có sẵn; không ghi đè hay xóa file không liên quan
Nghiệp vụ
Không đổi quy tắc, không đặt tên trạng thái hay công thức mới, không thêm tính năng ngoài phạm vi
Nút
Mỗi nút chính có hành vi mock có phản hồi rõ; không nút trang trí
Trung thực
Thanh toán và xác thực là giả lập và phải ghi rõ trên giao diện
Báo cáo
Sau mỗi giai đoạn: chạy ứng dụng, sửa lỗi, liệt kê file đã đổi, chức năng xong, vấn đề còn tồn
7. Prompt Antigravity theo từng giai đoạn
Dùng theo thứ tự 1 đến 6, mỗi lần một prompt trong một phiên làm việc. Antigravity không đọc được tài liệu này, nên trước khi bắt đầu hãy lưu mục 2 đến 5 thành file docs/spec.md trong dự án (sao chép từ tài liệu này và Giai đoạn B mục 1, 2, 5) để các prompt tham chiếu. Mỗi prompt đều có bối cảnh và quy tắc chép sẵn nên chạy được độc lập.
7.0. Khối quy tắc dán ở đầu mọi prompt
Bối cảnh: dự án học phần Phân tích và Thiết kế Hệ thống Nâng cao. LOCALBUDDY là nền tảng đặt Local Guide theo giờ tại Đà Nẵng. Chỉ làm giao diện mock bằng React, TypeScript, Vite, Tailwind, React Router; không backend, không cơ sở dữ liệu, không thanh toán hay xác thực thật. Giao diện tiếng Việt, màu chủ đạo xanh lá (#15803D), font Be Vietnam Pro.
Quy trình: trước khi sửa mã, kiểm tra cấu trúc dự án và đọc docs/spec.md cùng các file liên quan; lập kế hoạch ngắn trước thay đổi lớn; tái sử dụng mã sẵn có; không ghi đè hay xóa file không liên quan; không tự đổi quy tắc nghiệp vụ; không thêm tính năng ngoài phạm vi (không "quên mật khẩu", không đăng nhập mạng xã hội, không chat); mọi nút chính phải có hành vi mock với phản hồi rõ, không nút trang trí; thanh toán và đăng nhập là giả lập và phải ghi rõ trên giao diện. Sau khi làm xong: chạy ứng dụng, sửa lỗi, rồi báo cáo file đã đổi, chức năng đã xong, vấn đề còn tồn.
Quy tắc nghiệp vụ bất biến: (1) BookingStatus và PaymentStatus là hai huy hiệu tách biệt. BookingStatus: Chờ Guide xác nhận (PENDING), Chờ đặt cọc (WAITING_PAYMENT), Đã xác nhận (CONFIRMED), Đã hoàn thành (COMPLETED), Đang tranh chấp (DISPUTED), Đã hủy (CANCELLED). PaymentStatus: Chưa thanh toán, Chờ thanh toán cọc, Đã cọc 30%, Chờ thanh toán 70%, Đã thanh toán đủ, Chờ hoàn tiền (ẩn mặc định), Đã hoàn tiền (ẩn mặc định), Chờ đối soát. (2) Guide phản hồi trong 24 giờ từ lúc tạo đơn; cọc trong 15 phút từ lúc Guide chấp nhận; Tourist phản hồi trong 24 giờ sau yêu cầu hoàn thành. (3) G = giá giờ × số giờ; cọc D = 30% G; còn lại B = 70% G; giá giờ từ 80.000 đến 500.000 đ; phí sàn 10% đến 15% chụp lúc tạo đơn, chỉ hiển thị cho Guide và Admin, không hiển thị cho Tourist. (4) Hủy đơn: ΔT trên 48 giờ phạt 0%, từ 24 đến 48 giờ phạt 50%, dưới 24 giờ phạt 100% (trên tiền cọc); modal xem trước hoàn/phạt bắt buộc trước khi hủy, không có ô lý do; Guide hủy đơn Đã xác nhận thì hoàn 100% cho Tourist và ghi nhận vi phạm. (5) Đánh giá chỉ khi đơn Đã hoàn thành và Đã thanh toán đủ; khiếu nại bị chặn sau khi đơn Đã hoàn thành; tranh chấp do Admin chốt thành Đã hủy, không thu 70%. (6) Khung giờ: Trống (AVAILABLE), Đang giữ chỗ (HOLD), Đã có lịch (BUSY). (7) Guide chưa xác minh không hiển thị với Tourist. (8) Ví Guide chỉ cộng khi đơn đã thanh toán đủ; rút tối thiểu 200.000 đ, Admin chuyển khoản thủ công.
Định dạng: tiền 1.250.000 đ; giờ 14:00 – 17:00; ngày 30/10/2026.
7.1. Prompt giai đoạn 1: khung dự án và Design System
[Dán khối 7.0 trước đoạn này]

Mục tiêu: khởi tạo dự án localbuddy-web theo cấu trúc trong docs/spec.md mục 5.2, dựng Design System và dữ liệu mock. Chưa làm màn nghiệp vụ.
Việc cần làm:
1. Tạo dự án Vite React TypeScript, cài tailwindcss, react-router-dom, các gói shadcn/ui và Radix cần cho Modal, Tabs.
2. Tạo styles/tokens.css và theme Tailwind theo bảng màu mục 4.1 (color-primary #15803D, primary-dark #14532D, secondary #86EFAC, soft #DCFCE7, bg #F6FAF6, surface #FFFFFF, text #14231A, muted #4B5B50, border #D6E2D9; badge theo bảng BookingStatus). Nạp font Be Vietnam Pro.
3. Tạo component: Button, Input, Select, Tabs, Modal, Toast, Table, Pagination, StatusBadge (6 giá trị, dạng đặc có biểu tượng), PaymentBadge (dạng viền, 8 giá trị), PaymentSummary (chế độ tourist ẩn phí, chế độ guide hiện phí), BookingCard, GuideCard, TimeSlot (4 trạng thái), Countdown, EmptyState, LoadingState, ErrorState, Header, Sidebar, BottomNav.
4. Tạo 4 layout: PublicLayout, TouristLayout, GuideLayout, AdminLayout (Admin có sidebar 240 px, chỉ desktop).
5. Tạo routes theo bảng mục 5.3; mỗi route hiện trang giữ chỗ có tên màn và mã S-xx. Thêm route /ui-kit hiện mọi component và mọi trạng thái.
6. Tạo types và dữ liệu mock: người dùng, Guide, khung giờ, Booking BK-1001 đến BK-1007 đúng bảng dưới, thanh toán, đánh giá, KYC, thông báo.
   Tourist: Trần Minh Anh. Guide đã xác minh: Lê Hoàng Nam 200.000 đ/giờ. Guide chờ xác minh: Phạm Thu Hà. Phí sàn 12%. Đơn mẫu 3 giờ: G 600.000, cọc 180.000, còn 420.000, phí 72.000.
   BK-1001 Chờ Guide xác nhận/Chưa thanh toán; BK-1002 Chờ đặt cọc/Chờ thanh toán cọc; BK-1003 Đã xác nhận/Đã cọc 30%, ca cách 30 giờ; BK-1004 Đã hoàn thành/Chờ thanh toán 70%; BK-1005 Đã hoàn thành/Đã thanh toán đủ; BK-1006 Đang tranh chấp; BK-1007 Đã hủy, ΔT 30 giờ, phạt 90.000, hoàn 90.000.
7. Viết utils/money.ts và features/payment/calc.ts: tính G, D, B, phí, phạt theo ΔT; thêm test đơn giản cho các mốc 48 giờ và 24 giờ và cho G = 600.000.
8. Viết features/booking/actions.ts: hàm trả về danh sách nút theo (BookingStatus, PaymentStatus, vai trò, đủ điều kiện đánh giá) đúng bảng nút trong docs/spec.md.
Tiêu chí nghiệm thu: npm run build không lỗi; npm run dev chạy được; /ui-kit hiện đủ 6 huy hiệu BookingStatus, 6 huy hiệu PaymentStatus có hiển thị, 4 trạng thái TimeSlot; test tính tiền đạt; không lỗi console; mọi route trong mục 5.3 mở được.
Lệnh: npm install, npm run build, npm run dev, npm test.
Điều kiện chuyển giai đoạn: mọi tiêu chí trên đạt và bạn đã xem /ui-kit trên trình duyệt.
7.2. Prompt giai đoạn 2: luồng Tourist P0
[Dán khối 7.0 trước đoạn này]

Mục tiêu: xây các màn Tourist P0 chạy được trên dữ liệu mock, đổi trạng thái đơn bằng context mock (không lưu bền).
Màn cần làm (theo docs/spec.md mục 3): S-02 Đăng ký (hai tab, Guide có tải KYC giả), S-04 Đăng nhập, S-06 Tìm kiếm và lọc, S-07 Hồ sơ Guide và lịch, S-08 Đặt lịch, S-09 Thanh toán cọc, S-10 Đơn của tôi, S-11 Chi tiết đơn (gồm phản hồi hoàn tất, khiếu nại, đánh giá), S-13 Thanh toán 70%, S-16 Modal hủy.
Yêu cầu nghiệp vụ: S-06 chỉ hiện Guide đã xác minh; S-08 kiểm tra khung còn trống, số khách bắt buộc, địa điểm và yêu cầu riêng tùy chọn, giờ bắt đầu cách lúc đặt từ 24 giờ; gửi đơn tạo PENDING và Chưa thanh toán; S-09 có đồng hồ 15 phút, cổng giả lập có hai nút kết quả (thành công, thất bại); thành công chuyển Đã xác nhận và Đã cọc 30%; hết giờ chuyển Đã hủy; S-11 hiển thị nút theo features/booking/actions.ts; xác nhận hoàn tất chuyển Đã hoàn thành; khiếu nại chuyển Đang tranh chấp; S-13 cho chọn Online hoặc Tiền mặt, Online thất bại hiện Thử lại và Chọn tiền mặt, Online thành công chuyển Đã thanh toán đủ; S-16 luôn hiện ΔT, mức phạt, số tiền phạt và hoàn trước khi xác nhận, không có ô lý do, không modal khi ΔT ≤ 0 (ẩn nút hủy); đơn hủy hiện bảng kết quả tiền thay cho huy hiệu thanh toán; không hiển thị phí sàn ở bất kỳ màn Tourist.
Component tái sử dụng: Header, TouristLayout, StatusBadge, PaymentBadge, BookingCard, GuideCard, TimeSlot, PaymentSummary, Countdown, Modal, Toast, Empty/Loading/Error state.
Trạng thái mỗi danh sách: đang tải (skeleton), rỗng, lỗi có nút Thử lại; có nút bật tắt lỗi giả để trình diễn.
Dữ liệu: BK-1001 đến BK-1007 và 6 Guide đã xác minh trong data/. Dữ liệu phải nhất quán giữa S-10 và S-11.
Nghiệm thu: đi liền mạch S-06, S-07, S-08, S-11, S-09, S-11; BK-1004 thanh toán 70% thành PAID rồi mở đánh giá; BK-1003 hủy hiện đúng số tiền; BK-1006 chỉ xem; không nút nào ngoài bảng nút; không phí sàn ở Tourist; không lỗi console; hai khung 390 px và 1440 px đều dùng được.
Lệnh: npm run build, npm run dev, npm test.
Điều kiện chuyển giai đoạn: nghiệm thu đạt và bạn đã bấm thử toàn bộ luồng trên trình duyệt.
7.3. Prompt giai đoạn 3: luồng Guide P0
[Dán khối 7.0 trước đoạn này]

Mục tiêu: xây các màn Guide P0, dùng chung kho dữ liệu mock với giai đoạn 2 để thay đổi ở Guide thấy được ở Tourist.
Màn: S-19 Lịch rảnh, S-20 Đơn đến, S-21 Đơn và ca của tôi (gồm yêu cầu hoàn thành và xác nhận tiền mặt). Sau đó nếu đủ thời gian: S-18 Hồ sơ và giá (khoảng giá 80.000 đến 500.000 đ, hiện trạng thái xác minh Chờ xác minh hoặc Đã xác minh), S-24 Ví và rút tiền.
Yêu cầu nghiệp vụ: S-19 chỉ sửa được khung Trống, Hold và Busy không sửa; S-20 chỉ đơn Chờ Guide xác nhận, có đồng hồ 24 giờ; Chấp nhận chuyển đơn sang Chờ đặt cọc, khung HOLD, thông báo Tourist có 15 phút; Từ chối có modal xác nhận rồi đơn Đã hủy và khung về Trống; hiển thị phí sàn và tiền Guide nhận; S-21: Yêu cầu hoàn thành chỉ bật sau khi khung giờ kết thúc, xác nhận tiền mặt chỉ đơn Đã hoàn thành nhánh tiền mặt; hủy đơn mở modal S-16 với cảnh báo hoàn 100% cho Tourist và ghi nhận vi phạm, không nêu ngưỡng; không vẽ nhánh Guide không gửi yêu cầu hoàn thành.
Component: GuideLayout, BottomNav, BookingCard, StatusBadge, PaymentBadge, PaymentSummary (chế độ guide), TimeSlot, Countdown, Modal.
Dữ liệu: giữ BK-1001 đến BK-1007; đăng nhập mock là Lê Hoàng Nam.
Nghiệm thu: chấp nhận BK-1001 ở S-20 làm BK-1001 hiện Chờ đặt cọc ở S-10 của Tourist; lịch S-19 khớp trạng thái đơn; tiền Guide nhận đúng (528.000 đ cho đơn mẫu trả Online); không lỗi console; hai khung 390 px và 1440 px.
Lệnh: npm run build, npm run dev, npm test.
Điều kiện chuyển giai đoạn: nghiệm thu đạt, giai đoạn 2 vẫn chạy đúng.
7.4. Prompt giai đoạn 4: Admin P0
[Dán khối 7.0 trước đoạn này]

Mục tiêu: xây giao diện Admin (chỉ desktop 1440 px) dùng chung kho mock để thao tác của Admin tác động đến Guide và Tourist.
Màn: S-05 Đăng nhập Admin (tách biệt giao diện người dùng), S-26 Thẩm định KYC, S-29 Xử lý tranh chấp; AdminLayout có sidebar dẫn tới các màn Admin khác (các màn đó để giai đoạn 5, hiện trang giữ chỗ).
Yêu cầu nghiệp vụ: S-26 chỉ liệt kê hồ sơ Chờ xác minh; Duyệt đổi Guide thành Đã xác minh và Guide đó xuất hiện ở S-06; Từ chối giữ Guide ẩn với Tourist; không hiển thị lý do từ chối cho Guide. S-29 chỉ đơn Đang tranh chấp; hiện chi tiết đơn, lý do và bằng chứng hai bên, số tiền; chỉ một kết quả: chốt thành Đã hủy (tranh chấp), không thu 70%, kèm ô ghi chú; có modal xác nhận không hoàn tác; không thêm kháng nghị hay chia tỷ lệ. Không làm màn quản lý Booking riêng, đối soát, nhật ký.
Component: AdminLayout, Sidebar, Table, Pagination, Modal, Toast, BookingCard, StatusBadge, Empty/Loading/Error state.
Dữ liệu: hồ sơ KYC của Phạm Thu Hà với 2 tài liệu mẫu (ảnh minh họa, không giấy tờ thật); BK-1006 là tranh chấp.
Nghiệm thu: duyệt Phạm Thu Hà rồi S-06 có thêm Guide này; chốt BK-1006 rồi đơn hiện Đã hủy ở S-10 và S-11 của Tourist; không lỗi console.
Lệnh: npm run build, npm run dev, npm test.
Điều kiện chuyển giai đoạn: nghiệm thu đạt, giai đoạn 2 và 3 không hỏng.
7.5. Prompt giai đoạn 5: màn P1 và P2
[Dán khối 7.0 trước đoạn này]

Mục tiêu: hoàn thiện các màn còn lại, không sửa luồng đã chạy.
Màn: S-01 Trang chủ (bổ sung ngoài UC), S-17 Thông báo (bổ sung ngoài UC), S-18 Hồ sơ và giá (nếu chưa làm), S-24 Ví và rút tiền (nếu chưa làm), S-27 Quản lý tài khoản, S-28 Duyệt lệnh rút, S-30 Báo cáo doanh thu và thống kê, S-31 Cấu hình phí sàn.
Yêu cầu nghiệp vụ: S-24 hiển thị số dư khả dụng (không tự suy công thức), ô rút từ 200.000 đ đến số dư, nút vô hiệu kèm lý do khi số dư dưới 200.000 đ; ví chỉ cộng khi đơn đã thanh toán đủ. S-28 duyệt sau khi chuyển khoản thủ công, không cổng thanh toán. S-27 khóa, kích hoạt, thu hồi xác minh có modal xác nhận; tài khoản bị khóa không đăng nhập được. S-30 lọc ngày, tuần, tháng và nút xuất báo cáo (xuất file mock); chỉ số dùng số doanh thu và số đơn từ dữ liệu mock, không thêm chỉ số lạ. S-31 ô Fee_Rate giới hạn 10% đến 15%, áp dụng cho đơn mới, đơn cũ giữ tỷ lệ đã chụp. S-17 chỉ thông báo sự kiện đơn và ví theo docs/spec.md mục 5.3 của Giai đoạn B.
Component: tái sử dụng; không tạo component mới nếu đã có tương đương.
Nghiệm thu: mọi tuyến trong mục 5.3 mở được; không còn trang giữ chỗ; đổi Fee_Rate ở S-31 ảnh hưởng đơn mới tạo ở S-08 nhưng không đổi BK-1001 đến BK-1007; không lỗi console.
Lệnh: npm run build, npm run dev, npm test.
Điều kiện chuyển giai đoạn: nghiệm thu đạt.
7.6. Prompt giai đoạn 6: kiểm thử và chuẩn bị nhập Figma
[Dán khối 7.0 trước đoạn này]

Mục tiêu: rà soát toàn dự án và chuẩn bị để html.to.design nhập từng màn. Không thêm tính năng.
Việc cần làm:
1. Kiểm tra routing và mọi liên kết; truy cập trực tiếp từng URL đều hiện đủ nội dung (có dữ liệu mock sẵn khi mở độc lập, ví dụ /don/BK-1003 và /don/BK-1003?huy=1).
2. Kiểm tra nút theo bảng nút, hai huy hiệu, tiền G, D, B, phạt, không phí sàn ở Tourist, dữ liệu nhất quán giữa màn.
3. Kiểm tra responsive ở 390 px và 1440 px; không cuộn ngang.
4. Sửa lỗi console và cảnh báo.
5. Làm DOM đơn giản cho việc nhập Figma: tránh ảnh nền và lớp phủ che nội dung, tránh hiệu ứng phụ thuộc JavaScript (tắt animation khi thêm tham số ?figma=1), đặt tên class rõ cho layout và component, đảm bảo font đã nạp trước khi hiện.
6. Thêm trang /danh-muc liệt kê mọi URL theo mã S-xx để mở nhanh khi nhập.
7. Viết README: cách cài, chạy localhost, danh sách URL, tài khoản demo, ghi chú đây là dữ liệu và thanh toán giả.
Nghiệm thu: npm run build không lỗi, không cảnh báo console, mọi URL mở trực tiếp được; báo cáo danh sách vấn đề còn tồn.
Lệnh: npm run build, npm run dev, npm test.
Điều kiện hoàn thành: checklist nghiệm thu (mục 10) đạt.
8. Chạy ứng dụng và nhập vào Figma bằng html.to.design
Mình không chạy được Antigravity, Figma hay trình duyệt của bạn từ đây, nên đây là hướng dẫn để bạn tự làm. Giao diện plugin có thể thay đổi theo phiên bản; hãy đối chiếu với tài liệu hiện hành của html.to.design. Nhập HTML vào Figma không đảm bảo chuyển đúng mọi font, hiệu ứng hay tương tác, nên cần kiểm tra và chuẩn hóa sau khi nhập.
8.1. Chạy trên localhost
Bước
Việc cần làm
1
Cài Node.js bản LTS trên máy
2
Mở thư mục localbuddy-web trong Antigravity; trong terminal chạy npm install
3
Chạy npm run dev; Vite in ra địa chỉ (thường là http://localhost:5173)
4
Mở trang /danh-muc để thấy danh sách URL theo mã S-xx; mở thử từng URL trực tiếp
5
Đăng nhập mock bằng tài khoản demo trong README (Tourist, Guide, Admin)
Nếu localhost là đủ cho plugin và trình duyệt của bạn, không cần URL công khai. Nếu plugin không đọc được localhost, dùng chức năng chụp từ trình duyệt của plugin (extension) hoặc tạm thời dùng công cụ tạo đường hầm (tunnel) cho localhost, theo tài liệu của plugin.
8.2. Thứ tự nhập vào Figma
Ưu tiên
Màn
Khung
1 (luồng đặt lịch)
S-06, S-07, S-08, S-09, S-11
390 px và 1440 px
2
S-10, S-13, S-16 (/don/BK-1003?huy=1)
390 px và 1440 px
3 (Guide)
S-20, S-21, S-19
390 px và 1440 px
4 (Admin)
S-26, S-29
1440 px
5
S-02, S-04, S-05, S-01, S-17, S-18, S-24, S-27, S-28, S-30, S-31
theo vai trò
8.3. Chuẩn hóa trong Figma
Bước
Việc cần làm
1
Đặt tên khung theo mẫu "S-11 Chi tiết đơn, Tourist, Mobile" để khớp ma trận truy vết
2
Tạo Variables cho màu theo token mục 4.1 và Styles cho chữ mục 4.2
3
Chuyển các thành phần lặp thành Components: huy hiệu (hai nhóm), nút, thẻ đơn, Payment summary, time slot, modal
4
Kiểm chữ bị đổi font, lớp thiếu, ảnh vỡ; sửa bằng tay
5
Bật Auto layout cho các nhóm chính để nối prototype dễ
6
Nối prototype theo 5 luồng: đặt lịch (S-07 đến S-08, S-11, S-09, S-11), hoàn tất và thanh toán 70% (S-21, S-11, S-13, S-11), hủy đơn (S-11, S-16, S-11), tranh chấp (S-11, S-29), rút tiền (S-24, S-28). Chỉ nối các bước đã có trong bảng nút mục 5.1 Giai đoạn B
7
Xuất ảnh từng màn và bảng truy vết cho báo cáo mục 3.3
Hai định tuyến bổ sung chỉ dùng cho việc nhập (không phải màn nghiệp vụ): /danh-muc và tham số ?figma=1 tắt hoạt ảnh, đều do prompt giai đoạn 6 tạo ra.
9. Ma trận truy vết nghiệp vụ đến giao diện
Mã RQ-xx là mã dùng trong tài liệu này cho từng yêu cầu quan trọng; cột đầu ghi nguồn (FR, BR, hoặc R-xx phần tương ứng ở Giai đoạn A). Ma trận 29 UC đầy đủ theo mã UC ở Giai đoạn B mục 6 vẫn còn hiệu lực; bảng dưới đây tập trung vào các quy tắc cần đối chiếu đặc biệt.
Yêu cầu
UC
Screen
Component
Hành động
Kết quả mong đợi
Cách kiểm tra
RQ-01 BookingStatus và PaymentStatus độc lập (BC FR 4.6; Q1, MT-01)
UC.15
S-10, S-11, S-21
StatusBadge, PaymentBadge
Xem đơn
Hai huy hiệu riêng, tên theo mục 4.1
Mở /ui-kit và S-10: mỗi đơn có hai huy hiệu
RQ-02 Guide phản hồi trong 24 giờ
UC.12, UC.13
S-08, S-20, S-11
Countdown
Tạo đơn, mở S-20
Đồng hồ 24 giờ; quá hạn đơn bị hủy
BK-1001 hiện đồng hồ; đẩy thời gian mock quá 24 giờ thì Đã hủy
RQ-03 Thanh toán cọc trong 15 phút (BC FR 4.5)
UC.13, UC.14
S-20, S-09
Countdown, Modal
Chấp nhận; thanh toán cọc
Đồng hồ 15 phút từ lúc chấp nhận; hết giờ hủy đơn, khung về Trống
BK-1002 hết giờ mock thì Đã hủy và khung AVAILABLE
RQ-04 Cọc 30%, còn lại 70%
UC.12, UC.14, UC.20
S-08, S-09, S-13
PaymentSummary
Xem tóm tắt
D = 30% G, B = 70% G
G = 600.000 đ cho D = 180.000 đ, B = 420.000 đ; test calc.ts
RQ-05 Phí sàn 10% đến 15%, chụp lúc tạo đơn; chỉ Guide và Admin thấy (Q13)
UC.12, UC.13, UC.29
S-08, S-20, S-31
PaymentSummary, Input
Tạo đơn; đổi Fee_Rate
Tourist không thấy phí; đơn cũ giữ tỷ lệ
Tìm "phí" trên màn Tourist không có; đổi 12% sang 15% không đổi BK-1001
RQ-06 Hoàn/phạt theo ΔT (0%, 50%, 100%; mốc 48 và 24 giờ)
UC.24, UC.25
S-16
Modal, PaymentSummary
Mở modal hủy
Số tiền phạt và hoàn tính sẵn
BK-1007 ΔT 30 giờ: phạt 90.000 đ; test ΔT 49, 48, 24, 23 giờ
RQ-07 Modal xem trước bắt buộc, không ô lý do (Q10)
UC.24, UC.25
S-16
Modal
Bấm Hủy đơn
Không thể hủy nếu chưa thấy modal
Không đường tắt hủy không qua modal
RQ-08 Guide hủy CONFIRMED: hoàn 100% và ghi vi phạm
UC.24
S-16, S-21
Modal
Guide hủy
Cảnh báo hoàn 100%, ghi nhận vi phạm
BK-1003 ở Guide
RQ-09 Trạng thái khung giờ AVAILABLE, HOLD, BUSY; Atomic Lock
UC.08, UC.12, UC.13, UC.14
S-07, S-08, S-19
TimeSlot
Chọn, chấp nhận, cọc
Chuyển đúng trạng thái; chọn khung vừa bị giữ báo lỗi
Chấp nhận BK-1001: HOLD; cọc: BUSY
RQ-10 Chỉ Guide đã xác minh hiện với Tourist (BR-01)
UC.02, UC.05, UC.09
S-03 (gộp S-02), S-06, S-26
GuideCard, Table
Duyệt KYC
Guide chờ xác minh ẩn; duyệt xong hiện
Phạm Thu Hà không ở S-06 trước duyệt, có sau duyệt
RQ-11 Khả năng phân quyền theo vai trò
UC.03, UC.04
S-04, S-05, layouts
Header, Sidebar
Đăng nhập, mở URL trái vai trò
Chuyển về màn đăng nhập (chỉ mock); Admin tách biệt
Tourist mở /admin/kyc thì bị chuyển; ma trận quyền chi tiết chưa có (TD-16)
RQ-12 Hoàn thành dịch vụ: Guide gửi yêu cầu sau khi ca kết thúc; Tourist 24 giờ
UC.17, UC.18
S-21, S-11
Button, Countdown
Yêu cầu; xác nhận hoặc khiếu nại
Nút bật đúng lúc; đơn sang COMPLETED hoặc DISPUTED
Nút vô hiệu trước giờ kết thúc; đi hết hai nhánh
RQ-13 Thanh toán 70% và ví chỉ cộng khi PAID (MT-08)
UC.20, UC.21, UC.22
S-13, S-21, S-24
PaymentSummary
Trả 70%
PAID rồi mới cộng ví (Online G trừ phí)
Trả BK-1004 Online: ví tăng 528.000 đ
RQ-14 Đánh giá chỉ khi COMPLETED và PAID
UC.26
S-11
Modal, Button
Bấm Đánh giá
Nút bật đúng lúc
BK-1004 chưa PAID: vô hiệu; BK-1005: bật
RQ-15 Tranh chấp: Admin chốt DISPUTED sang CANCELLED, không thu 70%
UC.19, UC.27
S-11, S-29
Modal
Chốt tranh chấp
Đơn Đã hủy ở cả ba vai trò
BK-1006 trước và sau khi chốt
RQ-16 Chặn khiếu nại sau COMPLETED (UC.19)
UC.19
S-11
Button
Mở đơn COMPLETED
Không có nút khiếu nại
BK-1004, BK-1005 không có nút
RQ-17 Rút tiền tối thiểu 200.000 đ, chuyển khoản thủ công (MT-06, Q9)
UC.22, UC.23
S-24, S-28
Input, Table
Yêu cầu rút, duyệt
Chặn dưới 200.000 đ; Admin duyệt thủ công
Nhập 199.999 đ bị chặn
RQ-18 Giá theo giờ 80.000 đến 500.000 đ
UC.07
S-18
Input
Nhập giá
Chặn ngoài khoảng
Nhập 79.999 đ và 500.001 đ đều lỗi
RQ-19 Nhánh mà tài liệu chưa nêu: không vẽ (TD-02, TD-03, TD-04, TD-06)
UC.17, UC.20, UC.24, UC.27
S-11, S-13, S-21, S-29
—
—
Không có đường đi bịa
Duyệt mã và giao diện: không có nút ngoài bảng nút
10. Checklist nghiệm thu cuối cùng
Đánh dấu từng mục khi kiểm trên bản đang chạy, không kiểm trên mã nguồn.
10.1. Nghiệp vụ
[ ] Mỗi màn khớp UC ở ma trận Giai đoạn B mục 6; 29 UC đều có màn và thấy được
[ ] BookingStatus và PaymentStatus luôn là hai huy hiệu riêng; tên đúng mục 4.1
[ ] Đồng hồ 24 giờ, 15 phút, 24 giờ ở đúng màn; hết giờ dẫn tới đúng kết quả
[ ] G, D, B, phí, phạt đúng với ví dụ 600.000 đ; test ΔT ở 49, 48, 24, 23 giờ đạt
[ ] Phí sàn không hiển thị ở bất kỳ màn Tourist
[ ] Nút đúng bảng nút Giai đoạn B mục 5.1; không có nút cho nhánh tài liệu chưa nêu
[ ] Modal hủy luôn hiện trước khi hủy, không ô lý do; Guide hủy thấy cảnh báo hoàn 100% và vi phạm
[ ] Đánh giá chỉ khi COMPLETED và PAID; khiếu nại không có sau COMPLETED
[ ] Guide chưa xác minh không hiện ở tìm kiếm; duyệt KYC làm Guide hiện
[ ] Ví chỉ cộng khi PAID; rút tối thiểu 200.000 đ
[ ] Tranh chấp kết thúc đơn Đã hủy, không thu 70%
[ ] Dữ liệu mock nhất quán giữa S-10, S-11, S-20, S-21, S-29 (cùng mã đơn, cùng số tiền)
[ ] Mọi quyết định giả định Q1 đến Q15 được nhóm xác nhận hoặc ghi nhãn [S] trong báo cáo
10.2. UI/UX
[ ] Màu và chữ đúng token; tương phản ≥ 4,5:1; không trạng thái nào chỉ dựa vào màu
[ ] Các component giống nhau giữa Tourist, Guide, Admin
[ ] Thao tác chính dễ tìm (mỗi màn có một nút chính rõ)
[ ] Thông báo lỗi và thành công rõ, tiếng Việt, nêu cách sửa
[ ] Mọi danh sách có ba trạng thái: trống, đang tải, lỗi
[ ] 390 px và 1440 px đều dùng được, không cuộn ngang; vùng bấm ≥ 44 px
[ ] Nhãn trạng thái dễ hiểu, không lộ tên enum tiếng Anh
[ ] Thanh toán và đăng nhập có nhãn "giả lập"
[ ] Không có lỗi console; npm run build thành công
10.3. Figma
[ ] Màn nhập vào không thiếu nội dung, font đúng
[ ] Layer có cấu trúc hợp lý, đặt tên khung theo mã S-xx
[ ] Thành phần dùng chung đã chuẩn hóa thành Component, màu thành Variables
[ ] Nối được prototype 5 luồng ở mục 8.3
[ ] Luồng bám Activity Diagram, Sequence Diagram và Use Case; riêng BPMN To-Be đã đối chiếu ở Giai đoạn A. Chưa đọc được Activity Diagram hay Sequence Diagram vì chưa có trong tài liệu đã gửi, cần nhóm cung cấp nếu muốn đối chiếu
[ ] Không tương tác nào trái quy trình nghiệp vụ, mã nguồn dự án LOCAL BUDDY
