import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Sparkles, 
  Lightbulb, 
  ArrowRight
} from 'lucide-react';
import { grammarLessons } from '../data/grammarData';
import { speakChinese } from '../utils/speech';

export default function GrammarMaster() {
  const [selectedLessonId, setSelectedLessonId] = useState(grammarLessons[0].id);

  const selectedLesson = grammarLessons.find(g => g.id === selectedLessonId) || grammarLessons[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Chặng 1 & 2: Cấu Trúc Ngữ Pháp Vàng</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              6 Mẫu Ngữ Pháp Cốt Lõi Quyết Định Trình Độ Tiếng Trung
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Ngữ pháp tiếng Trung không chia thì (quá khứ, tương lai), không biến đổi đuôi từ. Điểm mấu chốt là <strong>trật tự từ</strong> và <strong>hư từ kết cấu</strong>.
            </p>
          </div>
        </div>

        {/* Lesson Pills Selector */}
        <div className="flex space-x-2 overflow-x-auto pt-6 mt-6 border-t border-slate-100 no-scrollbar">
          {grammarLessons.map((les) => (
            <button
              key={les.id}
              onClick={() => setSelectedLessonId(les.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedLessonId === les.id
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{les.title}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                selectedLessonId === les.id ? 'bg-red-700 text-red-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {les.level}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Lesson Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        {/* Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                {selectedLesson.badge}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{selectedLesson.level}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              {selectedLesson.title}
            </h2>
          </div>
        </div>

        {/* Formula Display */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-red-50 via-amber-50 to-red-50 border border-red-200 text-center space-y-2">
          <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Công Thức Chuẩn Xác:</span>
          <div className="text-base sm:text-lg font-mono font-bold text-slate-900 bg-white/80 py-3 px-4 rounded-xl border border-red-200 shadow-sm">
            {selectedLesson.formula}
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>Bản Chất & Cách Dùng:</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {selectedLesson.desc}
          </p>
        </div>

        {/* Contrast Comparison: VN vs Wrong vs Correct */}
        {selectedLesson.comparison && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-600" />
              <span>Đối Chiếu Tư Duy Tiếng Việt & Lỗi Thường Gặp:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ý nghĩ tiếng Việt:</span>
                <p className="text-sm font-semibold text-slate-800">{selectedLesson.comparison.vietnamese}</p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Lỗi dịch từng từ (Sai):
                </span>
                <p className="text-sm font-mono text-rose-800 font-medium">{selectedLesson.comparison.wrongChinese}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Chuẩn bản xứ (Đúng):
                </span>
                <p className="text-sm font-mono text-emerald-900 font-bold">{selectedLesson.comparison.correctChinese}</p>
              </div>
            </div>
          </div>
        )}

        {/* Practical Example Sentences */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-blue-600" />
            <span>Câu Ví Dụ Thực Chiến (Bấm loa để nghe phát âm):</span>
          </h3>

          <div className="space-y-2.5">
            {selectedLesson.examples.map((ex, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-red-400 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="font-hanzi text-lg font-bold text-slate-900">
                    {ex.zh}
                  </div>
                  <div className="text-xs font-medium text-red-600">
                    {ex.pinyin}
                  </div>
                  <div className="text-xs text-slate-600">
                    {ex.vi}
                  </div>
                </div>

                <button
                  onClick={() => speakChinese(ex.zh)}
                  className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-xs font-semibold text-slate-700 transition-colors shrink-0"
                >
                  <Volume2 className="w-4 h-4 text-slate-500 hover:text-red-600" />
                  <span>Nghe câu</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
