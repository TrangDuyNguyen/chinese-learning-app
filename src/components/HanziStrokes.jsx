import React, { useState } from 'react';
import { 
  PenTool, 
  Search, 
  Sparkles, 
  Check, 
  Info, 
  Volume2, 
  BookOpen,
  LayoutGrid
} from 'lucide-react';
import { basicStrokes, strokeOrderRules, commonRadicals } from '../data/radicalsData';
import { speakChinese, playPinyinAudio } from '../utils/speech';

export default function HanziStrokes() {
  const [activeSub, setActiveSub] = useState('rules'); // 'strokes' | 'rules' | 'radicals'
  const [searchRadical, setSearchRadical] = useState('');
  const [selectedPracticeChar, setSelectedPracticeChar] = useState({
    char: '你',
    pinyin: 'nǐ',
    hvd: 'Nhĩ',
    meaning: 'Bạn, anh, chị',
    strokes: 7,
    rule: 'Trái trước phải sau'
  });

  const filteredRadicals = commonRadicals.filter(r => 
    r.radical.includes(searchRadical) || 
    r.nameHVD.toLowerCase().includes(searchRadical.toLowerCase()) ||
    r.meaning.toLowerCase().includes(searchRadical.toLowerCase()) ||
    r.pinyin.toLowerCase().includes(searchRadical.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-2">
              <PenTool className="w-3.5 h-3.5" />
              <span>Chặng 0: Bản Chất Chữ Hán & Bút Thuận</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Quy Tắc Bút Thuận & 50 Bộ Thủ Cốt Lõi
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Chữ Hán không phải là vẽ tranh ngẫu hứng. Mọi chữ Hán đều được cấu thành từ <strong>8 nét cơ bản</strong> và tuân thủ nghiêm ngặt <strong>7 quy tắc bút thuận</strong>.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveSub('rules')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSub === 'rules' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              7 Quy Tắc Bút Thuận
            </button>
            <button
              onClick={() => setActiveSub('strokes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSub === 'strokes' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              8 Nét Cơ Bản
            </button>
            <button
              onClick={() => setActiveSub('radicals')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSub === 'radicals' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              50 Bộ Thủ Thường Gặp
            </button>
          </div>
        </div>
      </div>

      {/* TIANZIGE INTERACTIVE PREVIEW */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-lg text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Ô Điền Tự Cách (田字格) - Chuẩn Mực Viết Chữ Hán</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Quan sát bố cục chữ: <span className="text-amber-400">{selectedPracticeChar.char}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Viết chữ Hán cân đối yêu cầu giữ chữ nằm trọn trong 4 ô vuông nhỏ, không chạm mép viền ngoài, trọng tâm đặt ở chính giữa giao điểm chữ thập đỏ.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-200">
              Pinyin: <strong>{selectedPracticeChar.pinyin}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-200">
              Hán Việt: <strong>{selectedPracticeChar.hvd}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-200">
              Nghĩa: <strong>{selectedPracticeChar.meaning}</strong>
            </span>
            <button
              onClick={() => speakChinese(selectedPracticeChar.char)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-all shadow"
            >
              <Volume2 className="w-3.5 h-3.5" /> Nghe đọc
            </button>
          </div>
        </div>

        {/* Big Tianzige Box */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-amber-50 rounded-2xl border-4 border-red-800 shadow-2xl flex items-center justify-center select-none overflow-hidden group">
          {/* Inner Tianzige dashed lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-0 border-t border-dashed border-red-400"></div>
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0 border-l border-dashed border-red-400"></div>
            {/* Diagonal guides */}
            <div className="absolute inset-0 border border-red-200"></div>
          </div>

          <span className="font-hanzi text-8xl sm:text-9xl font-normal text-slate-900 relative z-10 transition-transform duration-200 group-hover:scale-105">
            {selectedPracticeChar.char}
          </span>
        </div>
      </div>

      {/* TAB 1: 7 QUY TẮC BÚT THUẬN */}
      {activeSub === 'rules' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strokeOrderRules.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedPracticeChar({
                  char: item.exampleChar,
                  pinyin: item.pinyin,
                  hvd: item.meaningVn,
                  meaning: item.meaningVn,
                  strokes: item.breakdown.length,
                  rule: item.rule
                })}
                className="bg-white rounded-2xl border border-slate-200 hover:border-red-500 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-red-600">{item.rule}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakChinese(item.exampleChar);
                      }}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.meaning}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Thứ tự nét viết:</div>
                    <div className="text-xs font-semibold text-slate-800 mt-0.5">{item.breakdown}</div>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center font-hanzi text-2xl font-bold text-red-700">
                    {item.exampleChar}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: 8 NÉT CƠ BẢN */}
      {activeSub === 'strokes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {basicStrokes.map((stroke, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-red-400 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{stroke.name}</span>
                  <span className="text-xs font-mono text-slate-400">{stroke.pinyin}</span>
                </div>

                <div className="h-20 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <span className="font-hanzi text-5xl text-red-600 font-bold select-none">
                    {stroke.char}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">{stroke.desc}</p>

                <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                  Ví dụ: <strong className="text-slate-800">{stroke.example}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 50 BỘ THỦ CỐT LÕI */}
      {activeSub === 'radicals' && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchRadical}
              onChange={(e) => setSearchRadical(e.target.value)}
              placeholder="Tìm bộ thủ theo tên (ví dụ: Nhân, Khẩu, Thủy, Mộc) hoặc ý nghĩa..."
              className="w-full text-sm outline-none bg-transparent placeholder:text-slate-400"
            />
            {searchRadical && (
              <button 
                onClick={() => setSearchRadical('')}
                className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                Xóa
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredRadicals.map((rad, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 hover:border-red-400 p-5 shadow-sm transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-hanzi font-bold text-red-600">{rad.radical}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{rad.nameHVD}</div>
                        <div className="text-[10px] text-slate-400">{rad.strokes} nét • {rad.pinyin}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => playPinyinAudio(rad.pinyin, rad.examples[0] ? rad.examples[0].split(' ')[0] : null)}
                      className="p-1.5 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                      title="Nghe đọc bộ thủ"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {rad.meaning}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 mb-1">Chữ chứa bộ này:</div>
                  <div className="flex flex-wrap gap-1">
                    {rad.examples.map((ex, exIdx) => (
                      <button
                        key={exIdx}
                        onClick={() => speakChinese(ex.split(' ')[0])}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-red-50 hover:text-red-700 text-[11px] text-slate-700 transition-colors"
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
