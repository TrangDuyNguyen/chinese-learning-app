import React, { useState } from 'react';
import { 
  Volume2, 
  Sparkles, 
  HelpCircle, 
  Wind, 
  Flame, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { initialsData, finalsData, tonesData, toneChangeRules } from '../data/pinyinData';
import { playPinyinAudio, speakChinese, extractChineseText } from '../utils/speech';

export default function PinyinMaster() {
  const [subTab, setSubTab] = useState('tones'); // 'tones' | 'initials' | 'finals' | 'rules'

  // Syllables to tone mapping for Tone tab
  const toneSyllableMap = {
    1: 'mā',
    2: 'má',
    3: 'mǎ',
    4: 'mà',
    0: 'ma'
  };

  const toneHanziMap = {
    1: '妈',
    2: '麻',
    3: '马',
    4: '骂',
    0: '吗'
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-2">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Chặng 0: Nền Tảng Ngữ Âm Toàn Diện</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Bảng Ngữ Âm Pinyin & Phát Âm Chuẩn Bắc Kinh
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Tích hợp <strong>1.600+ file ghi âm người bản xứ</strong> và công nghệ giọng nói Mandarin chuẩn. Bấm vào bất kỳ âm nào để nghe phát âm mẫu và xem mẹo phát âm cho người Việt.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setSubTab('tones')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                subTab === 'tones' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4 Thanh Điệu
            </button>
            <button
              onClick={() => setSubTab('initials')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                subTab === 'initials' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              21 Thanh Mẫu (Phụ âm)
            </button>
            <button
              onClick={() => setSubTab('finals')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                subTab === 'finals' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              36 Vận Mẫu (Nguyên âm)
            </button>
            <button
              onClick={() => setSubTab('rules')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                subTab === 'rules' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Quy Tắc Biến Điệu
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: 4 THANH ĐIỆU (TONES) */}
      {subTab === 'tones' && (
        <div className="space-y-6">
          {/* Tone visual cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tonesData.filter(t => t.toneNumber !== 0).map((tone) => (
              <div 
                key={tone.toneNumber}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-red-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {tone.name}
                    </span>
                    <span className="text-lg font-black text-slate-400">{tone.symbol}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => playPinyinAudio(toneSyllableMap[tone.toneNumber], toneHanziMap[tone.toneNumber])}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white flex items-center justify-center text-2xl font-black shadow-md hover:scale-105 active:scale-95 transition-all group"
                      title="Bấm để nghe âm thanh bản xứ chuẩn"
                    >
                      <span className="group-hover:hidden">{tone.mark}</span>
                      <Volume2 className="w-6 h-6 hidden group-hover:block text-amber-400" />
                    </button>
                    <div>
                      <div className="text-xs font-bold text-red-600">Cao độ: {tone.pitch}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{tone.desc}</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                    <strong className="text-slate-900 flex items-center gap-1 font-semibold">
                      <Info className="w-3.5 h-3.5 text-blue-500" /> Lưu ý cho người Việt:
                    </strong>
                    <p className="text-[11px] leading-relaxed text-slate-600">{tone.vnNote}</p>
                  </div>
                </div>

                {/* Example word chips */}
                <div className="pt-3 border-t border-slate-100 mt-4">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Ví dụ thực tế:</div>
                  <div className="space-y-1">
                    {tone.examples.map((ex, idx) => {
                      const hanzi = extractChineseText(ex);
                      const pinyinPart = ex.split(' ')[0];
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (hanzi) {
                              speakChinese(hanzi);
                            } else {
                              playPinyinAudio(pinyinPart);
                            }
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-red-50 hover:text-red-700 text-xs text-slate-700 transition-colors text-left"
                        >
                          <span className="font-medium">{ex}</span>
                          <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Tone Comparison Lab: ma / ba / yi */}
          <div className="bg-gradient-to-br from-red-50 via-amber-50 to-white rounded-2xl border border-red-200 p-6 sm:p-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Phòng Thí Nghiệm Luyện 4 Thanh Điệu Với Âm "MA" (Ghi âm chuẩn bản xứ)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trong tiếng Trung, cùng một âm tiết `ma` nhưng khi đổi thanh điệu sẽ mang các ý nghĩa hoàn toàn khác nhau. Bấm từng ô dưới đây để nghe chuẩn xác giọng đọc người bản xứ:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                { pinyin: "mā", hanzi: "妈", vn: "Mẹ (Mẫu thân)", tone: "Thanh 1 (55)", hint: "Cao, phẳng và ngân dài" },
                { pinyin: "má", hanzi: "麻", vn: "Cây gai / Tê dại", tone: "Thanh 2 (35)", hint: "Vuốt lên như dấu sắc" },
                { pinyin: "mǎ", hanzi: "马", vn: "Con ngựa (Mã)", tone: "Thanh 3 (214)", hint: "Hạ giọng sâu rồi lượn lên" },
                { pinyin: "mà", hanzi: "骂", vn: "Mắng chửi (Mạ)", tone: "Thanh 4 (51)", hint: "Rơi giật mạnh, dứt khoát" }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => playPinyinAudio(item.pinyin, item.hanzi)}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-red-500 shadow-sm hover:shadow-md transition-all text-center space-y-1.5 group"
                >
                  <div className="text-3xl font-hanzi font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    {item.hanzi}
                  </div>
                  <div className="text-lg font-bold text-red-600 flex items-center justify-center gap-1">
                    <span>{item.pinyin}</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600" />
                  </div>
                  <div className="text-xs font-semibold text-slate-700">{item.vn}</div>
                  <div className="text-[10px] text-slate-400">{item.hint}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 21 THANH MẪU (INITIALS) */}
      {subTab === 'initials' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <Wind className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Quy tắc vàng: Phân biệt âm BẬT HƠI và KHÔNG BẬT HƠI</strong>
              <p className="leading-relaxed">
                Tiếng Trung có các cặp âm đối ngẫu sống còn: <code className="font-bold bg-white px-1.5 py-0.5 rounded border border-amber-300">b - p</code>, <code className="font-bold bg-white px-1.5 py-0.5 rounded border border-amber-300">d - t</code>, <code className="font-bold bg-white px-1.5 py-0.5 rounded border border-amber-300">g - k</code>, <code className="font-bold bg-white px-1.5 py-0.5 rounded border border-amber-300">z - c</code>, <code className="font-bold bg-white px-1.5 py-0.5 rounded border border-amber-300">zh - ch</code>, <code className="font-bold bg-white px-1.5 py-0.5 rounded border border-amber-300">j - q</code>. 
                Các âm có nhãn đỏ <strong>BẬT HƠI</strong> cần tống một luồng gió mạnh từ cổ họng làm bay tờ giấy ăn để trước miệng! Bấm chữ cái để nghe phát âm thanh mẫu chuẩn (bō, pō, mò, fó...).
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {initialsData.map((grp, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    {grp.group}
                  </h3>
                  <span className="text-xs text-slate-500">{grp.desc}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {grp.items.map((item) => (
                    <div 
                      key={item.pinyin}
                      className="p-4 rounded-xl border border-slate-200 hover:border-red-400 bg-slate-50/50 hover:bg-white transition-all space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => playPinyinAudio(item.pinyin)}
                            className="flex items-center gap-2 text-2xl font-black text-slate-900 hover:text-red-600 transition-colors group"
                            title="Bấm để nghe chuẩn âm phụ âm"
                          >
                            <span>{item.pinyin}</span>
                            <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                          </button>
                          {item.isAspirated && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold bg-red-100 text-red-700 uppercase tracking-wider flex items-center gap-1">
                              <Wind className="w-2.5 h-2.5" /> Bật hơi
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-semibold text-slate-800">
                          {item.vnEquivalent}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {item.tip}
                        </p>
                      </div>

                      <button
                        onClick={() => speakChinese(extractChineseText(item.example))}
                        className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600 hover:text-red-600 transition-colors"
                        title="Nghe từ ví dụ thực tế"
                      >
                        <span className="truncate">Ví dụ: <strong>{item.example}</strong></span>
                        <Volume2 className="w-3.5 h-3.5 shrink-0 ml-1 text-slate-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 36 VẬN MẪU (FINALS) */}
      {subTab === 'finals' && (
        <div className="space-y-6">
          <div className="space-y-6">
            {finalsData.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  {cat.category}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {cat.items.map((item) => (
                    <button
                      key={item.pinyin}
                      onClick={() => playPinyinAudio(item.pinyin)}
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/50 hover:bg-white text-left transition-all space-y-1.5 group"
                      title="Bấm nghe nguyên âm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {item.pinyin}
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                      </div>
                      <div className="text-xs text-slate-600 font-medium line-clamp-1">
                        {item.vnEquivalent}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {item.example}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: QUY TẮC BIẾN ĐIỆU */}
      {subTab === 'rules' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toneChangeRules.map((rule, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base text-red-600">{rule.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{rule.desc}</p>
                  <div className="p-3 rounded-xl bg-red-50/70 border border-red-200 text-xs font-bold text-red-800 text-center">
                    {rule.formula}
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mẫu âm thanh thực tế:</div>
                  <div className="space-y-1.5">
                    {rule.examples.map((ex, eIdx) => {
                      const hanzi = extractChineseText(ex.original) || extractChineseText(ex.pronounced);
                      return (
                        <button
                          key={eIdx}
                          onClick={() => {
                            if (hanzi) {
                              speakChinese(hanzi);
                            } else {
                              speakChinese(ex.pronounced);
                            }
                          }}
                          className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-red-50 text-xs text-slate-700 hover:text-red-700 transition-colors text-left"
                        >
                          <div>
                            <div className="font-semibold text-slate-900">{ex.original}</div>
                            <div className="text-[11px] text-red-600 font-bold">Đọc thành: {ex.pronounced}</div>
                            <div className="text-[10px] text-slate-500">Nghĩa: {ex.meaning}</div>
                          </div>
                          <Volume2 className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                        </button>
                      );
                    })}
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
