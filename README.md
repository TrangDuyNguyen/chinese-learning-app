# 🇨🇳 Lộ Trình Học Tiếng Trung Từ Số 0 (Zero to Hero Mandarin)

> Một hệ thống lộ trình học tiếng Trung toàn diện, chuẩn hóa theo khung **HSK 3.0** và tối ưu hóa riêng cho người Việt Nam nhờ khai thác triệt để lợi thế **Âm Hán - Việt**.

---

## 🌟 Điểm Nổi Bật Của Dự Án

Dự án bao gồm 2 phần được đồng bộ hoàn hảo:
1. **Ứng Dụng Web Học Tập Tương Tác Hiện Đại (Interactive Web App)**:
   - **Bản đồ lộ trình tương tác 4 chặng:** Từ Nhập môn, Sơ cấp (HSK 1-2), Trung cấp (HSK 3-4) đến Nâng cao (HSK 5+).
   - **Bảng âm thanh Pinyin tương tác:** Nghe phát âm bản xứ giọng Bắc Kinh qua Web Speech API, hướng dẫn đặt lưỡi và mẹo tránh bẫy phát âm.
   - **Quy tắc chữ Hán & Bút thuận:** 8 nét cơ bản, 7 quy tắc thứ tự nét, ô Điền Tự Cách (田字格) và tra cứu 50 bộ thủ cốt lõi.
   - **Flashcard & Trắc nghiệm Mini-Quiz:** Lật thẻ 3D, đối chiếu âm Hán-Việt, câu ví dụ thực tế và kiểm tra phản xạ tức thì.
   - **Ngữ pháp trọng điểm:** Phân tích 6 mẫu ngữ pháp vàng (Trật tự câu, Chữ 的, Bổ ngữ, Câu chữ 把, Câu chữ 被, Câu so sánh 比).
   - **Thời khóa biểu 45 phút/ngày:** Công thức chia nhỏ Pomodoro học không áp lực kèm Checklist 7 ngày lưu tự động trên trình duyệt.
   - **Cẩm nang giáo trình & Công cụ:** So sánh chi tiết Giáo trình Chuẩn HSK, Hán Ngữ 6 quyển, Boya và top ứng dụng trên smartphone.

2. **Hệ Thống Cẩm Nang Chuyên Sâu (`docs/`)**:
   - `docs/00-cam-nang-ngu-am-pinyin.md`: Bảng thanh mẫu, vận mẫu, 4 thanh điệu và quy tắc biến điệu.
   - `docs/01-quy-tac-chu-han-va-bo-thu.md`: 8 nét cơ bản, 7 quy tắc bút thuận, giải mã 50 bộ thủ.
   - `docs/02-lo-trinh-chi-tiet-hsk1-hsk2.md`: Kế hoạch 12 tuần chinh phục sơ cấp (500 từ vựng).
   - `docs/03-lo-trinh-trung-cap-hsk3-hsk4.md`: Kế hoạch 5 tháng trung cấp (1200 từ vựng, tự tin đi làm).
   - `docs/04-bi-quyet-hoc-han-viet.md`: Quy luật chuyển đổi phụ âm, nguyên âm Hán-Việt sang Pinyin và các bẫy từ vựng cần tránh.

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy Ứng Dụng

Yêu cầu máy đã cài đặt Node.js (phiên bản 18 trở lên).

```bash
# 1. Di chuyển vào thư mục dự án
cd /Users/nguyenduytrang/Documents/antigravity/valiant-heisenberg

# 2. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 3. Khởi chạy máy chủ phát triển
npm run dev
```

Sau khi chạy lệnh, truy cập trình duyệt theo địa chỉ: `http://localhost:3000` (hoặc cổng hiển thị trên terminal).

Để build phiên bản chạy chính thức (Production build):
```bash
npm run build
```

---

## 🗺️ Tóm Tắt Lộ Trình 4 Chặng

```
[Chặng 0: Khởi Động & Ngữ Âm]  -->  [Chặng 1: Sơ Cấp HSK 1 - 2]
    • 1 - 2 Tuần                     • 1 - 3 Tháng
    • 100% Chuẩn Pinyin & Nét         • 500 Từ vựng cốt lõi
    • 50 Bộ thủ cốt lõi               • Giao tiếp sinh hoạt hàng ngày
           |                                  |
           v                                  v
[Chặng 2: Trung Cấp HSK 3 - 4]  -->  [Chặng 3: Nâng Cao HSK 5+]
    • 3 - 5 Tháng                     • 6 - 12 Tháng+
    • 1200 Từ vựng                    • 2500+ Từ & Thành ngữ
    • Làm việc, đàm phán, du lịch      • Xem phim, đọc báo, tự nhiên
```

---

## 💡 Lời Khuyên Cho Người Tự Học
- **Kiên trì mỗi ngày 45 phút** quan trọng hơn rất nhiều so với học dồn 5 tiếng vào cuối tuần.
- **Phát âm to rõ ràng:** Đừng ngại nói sai, hãy tận dụng tính năng nghe và lặp lại (Shadowing) trong ứng dụng.
- **Khai thác âm Hán-Việt:** Hãy luôn hỏi "Từ này âm Hán Việt là gì?" trước khi học thuộc lòng nghĩa tiếng Việt.
