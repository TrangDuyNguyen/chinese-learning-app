# HƯỚNG DẪN 4 BƯỚC TẠO GOOGLE OAUTH CLIENT ID (TRONG 2 PHÚT)

Để ứng dụng mở được cửa sổ đăng nhập Google chính chủ (`accounts.google.com`), bạn cần tạo một **Google Client ID** hoàn toàn miễn phí từ Google Cloud.

---

## Bước 1: Mở Google Cloud Console
1. Truy cập: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Đăng nhập bằng tài khoản Gmail của bạn.
3. Ở thanh tiêu đề trên cùng, bấm chọn **Select a project** $\rightarrow$ Bấm **New Project** $\rightarrow$ Đặt tên dự án (ví dụ: `Mandarin-Roadmap`) $\rightarrow$ Bấm **Create**.

---

## Bước 2: Cấu Hình Màn Hình Đồng Ý OAuth (OAuth Consent Screen)
1. Ở menu bên trái, chọn **APIs & Services** $\rightarrow$ **OAuth consent screen**.
2. Chọn loại người dùng: **External** $\rightarrow$ Bấm **Create**.
3. Điền các thông tin cơ bản:
   - **App name:** `Hán Ngữ Zero to Hero`
   - **User support email:** Chọn Gmail của bạn.
   - **Developer contact information:** Điền Gmail của bạn.
4. Bấm **Save and Continue** qua các bước Scopes và Test users (để mặc định).
5. Bấm **Back to Dashboard**.

---

## Bước 3: Tạo Khóa OAuth Client ID
1. Ở menu bên trái, chọn **Credentials** (Thông tin xác thực).
2. Bấm nút **+ CREATE CREDENTIALS** ở trên cùng $\rightarrow$ Chọn **OAuth client ID**.
3. Tại mục **Application type**, chọn: **Web application**.
4. **Name:** `Mandarin Web App`.
5. Tại mục **Authorized JavaScript origins** (Nguồn gốc JavaScript được ủy quyền) — *BƯỚC QUAN TRỌNG NHẤT*:
   - Bấm **+ ADD URI** và thêm:
     - `http://localhost:3000`
     - `http://localhost:5173`
     - `http://localhost:4173`
     - `http://127.0.0.1:3000`
6. Bấm **CREATE**.
7. Google sẽ hiển thị một hộp thoại chứa:
   - **Your Client ID:** Dạng `xxxxxxxxxxxx-xxxxxxxxxxxxxxxx.apps.googleusercontent.com`
   - Hãy sao chép chuỗi **Client ID** này!

---

## Bước 4: Kích Hoạt Trong Ứng Dụng
Bạn có 2 cách cực kỳ nhanh để kích hoạt:

### Cách 1: Dán trực tiếp vào file `.env`
Mở file `.env` trong thư mục dự án và dán Client ID:
```env
VITE_GOOGLE_CLIENT_ID=xxxxxxxxxxxx-xxxxxxxxxxxxxxxx.apps.googleusercontent.com
VITE_ADMIN_EMAIL=your_real_email@gmail.com
```
Sau đó lưu file và khởi động lại (`npm run dev`).

### Cách 2: Nhập trực tiếp trên giao diện Web
Ngay trên màn hình đăng nhập của ứng dụng, bấm vào mục **"Cài đặt Google Client ID"**, dán mã vào và bấm **Lưu & Kích hoạt** $\rightarrow$ Nút Google Sign-In chính thức sẽ xuất hiện ngay lập tức!
