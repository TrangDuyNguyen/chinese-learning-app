import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  Flame, 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  Sparkles,
  Trophy,
  Coffee
} from 'lucide-react';

const defaultWeeklyPlan = [
  { day: "Thứ Hai", task: "Khởi động: Ôn lại bảng âm Pinyin & 8 nét cơ bản", time: "45 phút", key: "mon" },
  { day: "Thứ Ba", task: "Nạp từ mới: Học 10 từ vựng HSK mới qua Flashcard & viết vào ô Điền tự cách", time: "45 phút", key: "tue" },
  { day: "Thứ Tư", task: "Luyện tai nghe: Nghe Shadowing bài khóa hội thoại 3 lần và nhại lại giọng đọc", time: "45 phút", key: "wed" },
  { day: "Thứ Năm", task: "Ngữ pháp thực chiến: Học 1 mẫu câu mới và tự đặt 3 câu giao tiếp của riêng mình", time: "45 phút", key: "thu" },
  { day: "Thứ Sáu", task: "Luyện viết chữ Hán: Nhận diện 5 bộ thủ và viết 15 chữ Hán đúng bút thuận", time: "45 phút", key: "fri" },
  { day: "Thứ Bảy", task: "Phản xạ nói: Tự quay video hoặc ghi âm 2 phút nói về một chủ đề quen thuộc", time: "45 phút", key: "sat" },
  { day: "Chủ Nhật", task: "Tổng kết tuần: Làm bài trắc nghiệm Mini-Quiz và ghi chú các lỗi sai vào sổ tay", time: "30 phút", key: "sun" }
];

export const pomodoroStages = [
  { time: "10 Phút Đầu", title: "Ôn Tập Kích Hoạt Trí Nhớ", desc: "Dùng Flashcard lướt lại 20 từ vựng của ngày hôm trước để chống quên lãng (Hiệu ứng ngắt quãng Ebbinghaus)." },
  { time: "15 Phút Tiếp", title: "Nạp Kiến Thức Mới", desc: "Học 1 điểm ngữ pháp mới hoặc 8-10 từ vựng mới trong giáo trình. Chú ý phân tích âm Hán - Việt." },
  { time: "15 Phút Tiếp", title: "Luyện Phản Xạ Nghe - Nói - Viết", desc: "Bật audio nghe 3 lần, nhại lại đúng cao độ ngữ điệu (Shadowing). Sau đó viết 5 chữ Hán khó vào vở kẻ ô." },
  { time: "5 Phút Cuối", title: "Đúc Kết & Gấp Sách", desc: "Tự hỏi lại bản thân: 'Hôm nay mình đã nhớ được câu gì hay nhất?' và ghi nhanh vào sổ tay." }
];

export default function StudyPlanner() {
  const [completedDays, setCompletedDays] = useState(() => {
    try {
      const saved = localStorage.getItem('mandarin_study_plan');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mandarin_study_plan', JSON.stringify(completedDays));
    } catch (e) {
      console.error(e);
    }
  }, [completedDays]);

  const toggleDay = (key) => {
    setCompletedDays(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetWeek = () => {
    if (window.confirm('Bạn có muốn đặt lại tiến độ tuần mới không?')) {
      setCompletedDays({});
    }
  };

  const completedCount = Object.values(completedDays).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / defaultWeeklyPlan.length) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-2">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Kỷ Luật & Thói Quen Hàng Ngày</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Thời Khóa Biểu 45 Phút/Ngày & Checklist Tiến Độ
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Học ngoại ngữ thành công <strong>không nằm ở việc dồn 5 tiếng cuối tuần</strong>, mà nằm ở sự liên tục 45 phút mỗi ngày.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-amber-800">
              <Flame className="w-5 h-5 text-amber-500" />
              <div>
                <div className="text-[10px] text-amber-700 uppercase font-bold">Hoàn thành tuần:</div>
                <div className="text-base font-black">{completedCount}/7 ngày ({progressPercent}%)</div>
              </div>
            </div>

            <button
              onClick={resetWeek}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
              title="Đặt lại tuần mới"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 45-MINUTE POMODORO FORMULA */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>Phương Pháp Pomodoro 45 Phút "Vàng"</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Công Thức Chia Nhỏ 45 Phút Học Không Mệt Mỏi
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Áp dụng chuẩn quy trình này mỗi ngày sẽ giúp não bộ luôn trong trạng thái tập trung cao độ nhất và ghi nhớ dài hạn gấp 3 lần.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pomodoroStages.map((stage, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 backdrop-blur"
            >
              <div className="text-xs font-bold text-amber-400 font-mono">
                {stage.time}
              </div>
              <h3 className="font-bold text-sm text-white">
                {stage.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* WEEKLY CHECKLIST */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-red-600" />
            <span>Kế Hoạch Hành Động 7 Ngày Trong Tuần</span>
          </h2>
          <span className="text-xs text-slate-400">Tự động lưu vào trình duyệt</span>
        </div>

        <div className="space-y-2.5">
          {defaultWeeklyPlan.map((item) => {
            const isDone = !!completedDays[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleDay(item.key)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
                  isDone 
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900' 
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <button className="shrink-0 text-emerald-600">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        isDone ? 'bg-emerald-200/60 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.day}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.time}
                      </span>
                    </div>

                    <p className={`text-sm mt-1 font-medium ${isDone ? 'line-through text-emerald-800/70' : 'text-slate-800'}`}>
                      {item.task}
                    </p>
                  </div>
                </div>

                {isDone && (
                  <span className="hidden sm:inline-flex text-xs font-bold text-emerald-700 px-2.5 py-1 rounded-full bg-emerald-100">
                    Tuyệt vời!
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
