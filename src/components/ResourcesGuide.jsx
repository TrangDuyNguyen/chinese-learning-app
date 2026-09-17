import React from 'react';
import { 
  Library, 
  Smartphone, 
  Tv, 
  Headphones, 
  ExternalLink, 
  Sparkles, 
  Star,
  Check,
  Award
} from 'lucide-react';

export const textbooks = [
  {
    name: "Giáo Trình Chuẩn HSK (HSK Standard Course)",
    author: "Khương Lệ Bình (Jiang Liping) - NXB ĐH Ngôn ngữ Bắc Kinh",
    recommendation: "KHUYÊN DÙNG SỐ 1 CHO NGƯỜI MỚI",
    color: "border-red-500 ring-2 ring-red-500/10",
    pros: [
      "Bám sát 100% dạng bài thi HSK 3.0 mới nhất",
      "Hình ảnh màu sắc nét, hiện đại, từ vựng rất thực tế",
      "Có file audio chuẩn giọng phát thanh viên Bắc Kinh",
      "Phân chia bài học khoa học: HSK 1 (15 bài), HSK 2 (15 bài)"
    ],
    cons: ["Giá sách tương đối cao hơn bản in cũ, nhưng rất đáng đầu tư."],
    target: "Người muốn thi lấy chứng chỉ HSK để du học, xin việc hoặc học theo chuẩn quốc tế."
  },
  {
    name: "Bộ Giáo Trình Hán Ngữ 6 Quyển",
    author: "Dương Ký Châu (Yang Jizhou)",
    recommendation: "KINH ĐIỂN TẠI CÁC TRƯỜNG ĐẠI HỌC",
    color: "border-slate-200",
    pros: [
      "Bộ giáo trình phổ biến nhất tại các trung tâm và trường ĐH ở Việt Nam",
      "Hệ thống ngữ pháp được phân tích cực kỳ cặn kẽ và tỉ mỉ",
      "Rất nhiều tài liệu bài tập, video giảng dạy miễn phí trên Youtube"
    ],
    cons: [
      "Bài khóa phong cách thập niên trước, một số từ vựng ít dùng trong đời sống hiện đại",
      "Quyển 1-2 khá nặng nề về lý thuyết ngữ âm."
    ],
    target: "Người thích phong cách học thuật truyền thống, muốn nắm chắc từng li từng tí ngữ pháp."
  },
  {
    name: "Giáo Trình Boya (Boya Chinese)",
    author: "Lý Hiểu Kỳ - Đại học Bắc Kinh",
    recommendation: "PHÙ HỢP GIAO TIẾP VĂN HÓA SÂU",
    color: "border-slate-200",
    pros: [
      "Bài khóa sinh động, đậm đà văn hóa và phong tục Trung Hoa hiện đại",
      "Lượng từ vựng phong phú, rèn luyện kỹ năng đọc hiểu rất tốt"
    ],
    cons: ["Lượng từ mới trong mỗi bài khá nhiều, người tự học có thể thấy hơi ngợp nếu không kiên trì."],
    target: "Người muốn học giao tiếp đời sống, yêu thích văn hóa Trung Quốc, muốn đọc văn xuôi."
  }
];

export const topApps = [
  {
    name: "Pleco Chinese Dictionary",
    type: "Từ điển sống còn",
    desc: "Từ điển tra cứu Hán ngữ số 1 thế giới. Hỗ trợ vẽ tay, tra theo bộ thủ, pinyin, giải nghĩa Anh-Trung-Việt và phát âm mẫu.",
    free: "Miễn phí 100% bản cơ bản",
    badge: "Phải cài ngay"
  },
  {
    name: "SuperChinese / HelloChinese",
    type: "Học tương tác cho người mới",
    desc: "Giao diện bài học dạng trò chơi (Gamification), tích hợp AI nhận diện giọng nói để sửa phát âm từng âm tiết.",
    free: "Miễn phí các bài mở đầu",
    badge: "Người mới bắt đầu"
  },
  {
    name: "Du Chinese / The Chairman's Bao",
    type: "Luyện đọc theo cấp độ (Graded Reader)",
    desc: "Đọc báo, truyện ngắn phân cấp từ HSK 1 đến HSK 6. Bấm vào từng chữ để nghe đọc và xem giải nghĩa tức thì.",
    free: "Có bài đọc miễn phí hàng tuần",
    badge: "Tăng phản xạ đọc"
  },
  {
    name: "Anki",
    type: "Flashcard Spaced Repetition",
    desc: "Phần mềm lặp lại ngắt quãng tốt nhất để ghi nhớ hàng nghìn từ vựng vĩnh viễn vào trí nhớ dài hạn.",
    free: "Miễn phí trên Android & Web, có phí trên iOS",
    badge: "Trí nhớ siêu đẳng"
  }
];

export const mediaChannels = [
  {
    type: "Youtube",
    name: "ChinesePod / Mandarin Corner",
    desc: "Kênh luyện nghe hội thoại thực tế quay trên đường phố Trung Quốc với phụ đề Pinyin và Hán tự."
  },
  {
    type: "Podcast",
    name: "Coffee Break Chinese",
    desc: "Mỗi tập 15-20 phút, bài học giải thích chi tiết bằng tiếng Anh dễ hiểu, rất tiện nghe khi đi xe buýt, tập gym."
  },
  {
    type: "Website",
    name: "HanziCraft / YellowBridge",
    desc: "Website giải phẫu cấu trúc chữ Hán, phân tích các bộ thủ và từ ghép thông dụng."
  }
];

export default function ResourcesGuide() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-1">
            <Library className="w-3.5 h-3.5" />
            <span>Tài Nguyên Học Tập Tinh Gọn</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Review Giáo Trình & Hệ Sinh Thái Công Cụ Học Tiếng Trung
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Giữa hàng trăm tài liệu trên thị trường, bạn chỉ cần chọn <strong>đúng 1 bộ giáo trình chính</strong> và <strong>2-3 ứng dụng bổ trợ</strong> để tránh bị phân tán năng lượng.
          </p>
        </div>
      </div>

      {/* TEXTBOOK COMPARISON */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Library className="w-5 h-5 text-red-600" />
          <span>So Sánh 3 Bộ Giáo Trình Kinh Điển Nhất Hiện Nay</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {textbooks.map((book, idx) => (
            <div 
              key={idx}
              className={`bg-white rounded-3xl border p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6 ${book.color}`}
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-black tracking-wider uppercase text-red-600">
                    {book.recommendation}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {book.name}
                  </h3>
                  <p className="text-xs text-slate-500">Tác giả: {book.author}</p>
                </div>

                {/* Pros */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Ưu điểm vượt trội:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {book.pros.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold shrink-0">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-400">Điểm cần lưu ý:</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{book.cons[0]}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <strong>Phù hợp nhất với:</strong> {book.target}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOP APPS & TOOLS */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-600" />
          <span>Top 4 Ứng Dụng Không Thể Thiếu Trên Điện Thoại</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topApps.map((app, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-5 shadow-sm transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                    {app.badge}
                  </span>
                  <span className="text-[10px] text-slate-400">{app.type}</span>
                </div>

                <h3 className="font-bold text-base text-slate-900">{app.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{app.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-emerald-600 font-semibold">
                {app.free}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MEDIA CHANNELS */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="max-w-xl space-y-1">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Tv className="w-5 h-5 text-rose-500" />
            <span>Kênh Học Phụ Trợ Qua Âm Thanh & Video</span>
          </h2>
          <p className="text-xs text-slate-300">
            Tận dụng thời gian rảnh khi rửa bát, lái xe để "tắm ngôn ngữ" thụ động.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mediaChannels.map((ch, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-amber-300 uppercase">
                {ch.type}
              </span>
              <h3 className="text-sm font-bold text-white">{ch.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{ch.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
