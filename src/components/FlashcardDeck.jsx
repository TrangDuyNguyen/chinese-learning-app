import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Eye, 
  EyeOff, 
  Shuffle, 
  Sparkles,
  CheckCircle2,
  XCircle,
  Award
} from 'lucide-react';
import { vocabularyList } from '../data/vocabularyHsk';
import { speakChinese } from '../utils/speech';

export default function FlashcardDeck() {
  const [mode, setMode] = useState('flashcard'); // 'flashcard' | 'quiz'
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPinyin, setShowPinyin] = useState(true);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  const filteredWords = filterLevel === 'ALL' 
    ? vocabularyList 
    : vocabularyList.filter(w => w.level === filterLevel);

  const currentWord = filteredWords[currentIndex] || filteredWords[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filteredWords.length));
  };

  // Generate quiz options for current quiz question
  const currentQuizWord = filteredWords[quizIndex] || filteredWords[0];
  const generateQuizOptions = (correct) => {
    const wrong = vocabularyList
      .filter(w => w.id !== correct.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [correct, ...wrong].sort(() => 0.5 - Math.random());
  };

  const [quizOptions, setQuizOptions] = useState(() => generateQuizOptions(currentQuizWord));

  const handleAnswer = (option) => {
    if (isQuizSubmitted) return;
    setSelectedOption(option);
    setIsQuizSubmitted(true);
    if (option.id === currentQuizWord.id) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    const nextIdx = (quizIndex + 1) % filteredWords.length;
    setQuizIndex(nextIdx);
    setSelectedOption(null);
    setIsQuizSubmitted(false);
    setQuizOptions(generateQuizOptions(filteredWords[nextIdx]));
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setIsQuizSubmitted(false);
    setQuizOptions(generateQuizOptions(filteredWords[0]));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Chặng 1 & 2: Vốn Từ Thực Chiến</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Thẻ Ghi Nhớ Từ Vựng Flashcard & Trắc Nghiệm
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Học từ vựng qua phương pháp lặp lại ngắt quãng (Spaced Repetition) kết hợp đối chiếu <strong>Âm Hán - Việt</strong> để nhớ sâu, nhớ lâu và bật phản xạ tức thì.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('flashcard')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'flashcard' 
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Lật Thẻ Flashcard
            </button>
            <button
              onClick={() => {
                setMode('quiz');
                restartQuiz();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'quiz' 
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/25' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Làm Bài Trắc Nghiệm
            </button>
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400 mr-2">Cấp độ HSK:</span>
          {['ALL', 'HSK 1', 'HSK 2', 'HSK 3'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setFilterLevel(lvl);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterLevel === lvl
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl === 'ALL' ? 'Tất cả từ vựng' : lvl}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-400">
            {filteredWords.length} từ vựng cốt lõi
          </span>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {mode === 'flashcard' && currentWord && (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Card Controls Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-2">
            <div>
              Thẻ số <strong className="text-slate-800">{currentIndex + 1}</strong> / {filteredWords.length}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPinyin(!showPinyin)}
                className="flex items-center gap-1 hover:text-slate-900 transition-colors"
                title="Ẩn / Hiện Pinyin"
              >
                {showPinyin ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showPinyin ? 'Ẩn Pinyin' : 'Hiện Pinyin'}</span>
              </button>
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1 hover:text-slate-900 transition-colors"
                title="Trộn ngẫu nhiên"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Trộn thẻ</span>
              </button>
            </div>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative h-96 w-full cursor-pointer perspective select-none"
          >
            <div
              className={`w-full h-full rounded-3xl border-2 transition-transform duration-500 transform-style-3d p-8 shadow-xl flex flex-col justify-between ${
                isFlipped 
                  ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-slate-700' 
                  : 'bg-white border-slate-200 hover:border-red-400'
              }`}
            >
              {/* Card Top Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isFlipped ? 'bg-white/10 text-amber-300' : 'bg-red-50 text-red-700'
                  }`}>
                    {currentWord.level}
                  </span>
                  <span className={`text-xs ${isFlipped ? 'text-slate-400' : 'text-slate-500'}`}>
                    {currentWord.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakChinese(currentWord.char);
                    }}
                    className={`p-2 rounded-xl transition-all ${
                      isFlipped 
                        ? 'bg-white/10 hover:bg-white/20 text-white' 
                        : 'bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600'
                    }`}
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Card Center Content */}
              {!isFlipped ? (
                // Front Side
                <div className="text-center space-y-4 my-auto">
                  <div className="font-hanzi text-7xl font-bold tracking-wider text-slate-900">
                    {currentWord.char}
                  </div>

                  {showPinyin ? (
                    <div className="text-2xl font-semibold text-red-600 tracking-wide">
                      {currentWord.pinyin}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic">
                      (Pinyin đang bị ẩn - Bấm để lật thẻ xem đáp án)
                    </div>
                  )}

                  <div className="text-xs text-slate-400 flex items-center justify-center gap-1 pt-2">
                    <RotateCw className="w-3.5 h-3.5" /> Bấm vào thẻ để xem nghĩa & ví dụ
                  </div>
                </div>
              ) : (
                // Back Side
                <div className="space-y-4 my-auto">
                  <div className="space-y-1 text-center border-b border-white/10 pb-4">
                    <div className="text-2xl font-bold text-amber-400">
                      {currentWord.meaning}
                    </div>
                    <div className="flex items-center justify-center gap-3 text-xs text-slate-300">
                      <span>Âm Hán-Việt: <strong className="text-white">{currentWord.hvd}</strong></span>
                      <span>•</span>
                      <span>Từ loại: <strong className="text-white">{currentWord.type}</strong></span>
                      {currentWord.traditional !== currentWord.char && (
                        <>
                          <span>•</span>
                          <span>Phồn thể: <strong>{currentWord.traditional}</strong></span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Example Sentence */}
                  {currentWord.example && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Ví dụ ứng dụng:</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakChinese(currentWord.example.zh);
                          }}
                          className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="font-hanzi text-base font-semibold text-white">
                        {currentWord.example.zh}
                      </div>
                      <div className="text-xs text-amber-200/90 font-medium">
                        {currentWord.example.pinyin}
                      </div>
                      <div className="text-xs text-slate-300">
                        {currentWord.example.vi}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Card Footer */}
              <div className="text-center text-[11px] text-slate-400 border-t border-slate-100 dark:border-white/10 pt-3">
                {isFlipped ? 'Bấm để lật lại mặt trước' : 'Bấm để xem mặt sau'}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-sm shadow-sm transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Từ Trước</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm shadow-md shadow-red-600/25 transition-all"
            >
              <span>Từ Tiếp Theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* QUIZ MODE */}
      {mode === 'quiz' && currentQuizWord && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Progress & Score */}
            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-4">
              <div>
                Câu hỏi <strong className="text-slate-800">{quizIndex + 1}</strong> / {filteredWords.length}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-bold">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Điểm: {quizScore}</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="text-center space-y-3 py-4">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Chọn ý nghĩa chính xác của từ:</span>
              <div className="font-hanzi text-6xl font-bold text-slate-900">
                {currentQuizWord.char}
              </div>
              <div className="text-xl font-semibold text-red-600">
                {currentQuizWord.pinyin}
              </div>
              <button
                onClick={() => speakChinese(currentQuizWord.char)}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 pt-1"
              >
                <Volume2 className="w-4 h-4" /> Nghe phát âm
              </button>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {quizOptions.map((opt, idx) => {
                const isSelected = selectedOption?.id === opt.id;
                const isCorrect = opt.id === currentQuizWord.id;

                let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:border-red-400";
                if (isQuizSubmitted) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-900 font-bold";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-50 border-rose-400 text-rose-900";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isQuizSubmitted}
                    onClick={() => handleAnswer(opt)}
                    className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt.meaning} (Hán Việt: {opt.hvd})</span>
                    {isQuizSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isQuizSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next Question Button */}
            {isQuizSubmitted && (
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={nextQuizQuestion}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow transition-all"
                >
                  <span>Câu Tiếp Theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
