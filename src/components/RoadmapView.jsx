import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Target, 
  AlertTriangle, 
  BookMarked, 
  ArrowRight, 
  Award,
  ChevronDown,
  ChevronUp,
  Volume2
} from 'lucide-react';
import { roadmapStages } from '../data/roadmapData';
import { speakChinese } from '../utils/speech';

export default function RoadmapView({ setActiveTab, completedMilestones, toggleMilestone }) {
  const [expandedStage, setExpandedStage] = useState('stage-0');

  const jumpToTabMap = {
    'stage-0': 'pinyin',
    'stage-1': 'vocabulary',
    'stage-2': 'grammar',
    'stage-3': 'resources'
  };

  const jumpLabels = {
    'stage-0': 'Học Bảng Pinyin & Nét Ngay',
    'stage-1': 'Luyện Từ Vựng HSK 1 - 2',
    'stage-2': 'Luyện Ngữ Pháp Chữ 把, 被, Bổ Ngữ',
    'stage-3': 'Khám Phá Giáo Trình & App Nâng Cao'
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white p-8 md:p-12 shadow-xl">
        <div className="absolute -right-10 -bottom-10 opacity-10 text-[260px] font-hanzi select-none pointer-events-none">
          龙
        </div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold">
            <span>🎯 Lộ Trình Chuẩn Hóa Khung HSK 3.0 & Giao Tiếp Thực Chiến</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Từ Con Số 0 Đến Thành Thạo <span className="text-amber-400">Tiếng Trung</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Thiết kế riêng cho người Việt: Khai thác triệt để lợi thế <strong className="text-amber-300">Âm Hán - Việt</strong> (giúp bạn đã biết sẵn 60% từ vựng), chuẩn hóa phát âm ngữ âm ngay từ ngày đầu tiên để không bao giờ bị "ngọng tiếng Trung".
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => {
                setExpandedStage('stage-0');
                setActiveTab('pinyin');
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm shadow-lg shadow-red-600/30 transition-all"
            >
              <span>Bắt đầu từ Chặng 0 (Ngữ âm)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              <span>Xem Thời Khóa Biểu 45 Phút/Ngày</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur">
            <div className="text-2xl font-bold text-amber-400">4 Chặng</div>
            <div className="text-xs text-slate-400 mt-0.5">Lộ trình bài bản</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur">
            <div className="text-2xl font-bold text-emerald-400">1200+ Từ</div>
            <div className="text-xs text-slate-400 mt-0.5">HSK 1 đến HSK 4</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur">
            <div className="text-2xl font-bold text-sky-400">50 Bộ Thủ</div>
            <div className="text-xs text-slate-400 mt-0.5">Cốt lõi chữ Hán</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur">
            <div className="text-2xl font-bold text-rose-400">100% Phản Xạ</div>
            <div className="text-xs text-slate-400 mt-0.5">Nghe nói tự nhiên</div>
          </div>
        </div>
      </div>

      {/* Interactive Milestone Timeline */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Cây Lộ Trình Chi Tiết (Milestone Roadmap)</h2>
            <p className="text-sm text-slate-500">Bấm vào từng chặng để xem giáo trình, ngữ pháp, cạm bẫy cần tránh và đánh dấu mục tiêu đã hoàn thành.</p>
          </div>
        </div>

        <div className="space-y-4">
          {roadmapStages.map((stage) => {
            const isExpanded = expandedStage === stage.id;
            const completedCount = stage.milestones.filter(m => completedMilestones[m]).length;
            const totalCount = stage.milestones.length;
            const isAllCompleted = completedCount === totalCount && totalCount > 0;

            return (
              <div 
                key={stage.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white shadow-sm ${
                  isExpanded ? 'border-red-500 ring-2 ring-red-500/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header Row */}
                <div 
                  onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-slate-50/75 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${stage.color} text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0`}>
                      {stage.stageNumber}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-slate-900">{stage.title}</h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700">
                          {stage.badge}
                        </span>
                        {isAllCompleted && (
                          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">
                            <Award className="w-3 h-3" /> Đã Hoàn Thành
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">{stage.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{stage.duration}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Tiến độ: <strong className="text-slate-700">{completedCount}/{totalCount} mục tiêu</strong>
                      </div>
                    </div>

                    <div className="p-1 rounded-full bg-slate-100 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-6 bg-gradient-to-b from-slate-50/50 to-white">
                    {/* Summary & Target Banner */}
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-amber-900 text-sm">
                      <Target className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold block mb-0.5">Mục tiêu cốt lõi: {stage.target}</strong>
                        <p className="text-amber-800 text-xs leading-relaxed">{stage.summary}</p>
                      </div>
                    </div>

                    {/* Modules Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {stage.modules.map((mod, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2.5">
                          <div className="flex items-center gap-2">
                            <BookMarked className="w-4 h-4 text-red-600" />
                            <h4 className="font-bold text-sm text-slate-900">{mod.title}</h4>
                          </div>
                          <ul className="space-y-1.5 text-xs text-slate-600">
                            {mod.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-1.5 leading-relaxed">
                                <span className="text-red-500 font-bold shrink-0">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Pitfalls & Mistakes to Avoid */}
                    <div className="p-4 rounded-xl bg-red-50/60 border border-red-200/70 space-y-2">
                      <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Cạm Bẫy Cần Tránh (Lỗi Điển Hình Của Người Việt Học Tiếng Trung)</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-red-800">
                        {stage.pitfalls.map((pit, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 bg-white/70 p-2.5 rounded-lg border border-red-100">
                            <span className="text-red-500 font-bold shrink-0">✕</span>
                            <span>{pit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Milestone Checkpoints */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Mục Tiêu Kiểm Tra Đạt Chuẩn (Bấm để đánh dấu khi bạn đã làm chủ):</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {stage.milestones.map((milestone, mIdx) => {
                          const isDone = !!completedMilestones[milestone];
                          return (
                            <button
                              key={mIdx}
                              onClick={() => toggleMilestone(milestone)}
                              className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                                isDone 
                                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 font-medium'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              <span className="mt-0.5 shrink-0">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                                ) : (
                                  <Circle className="w-4 h-4 text-slate-400" />
                                )}
                              </span>
                              <span className={`text-xs ${isDone ? 'line-through text-emerald-800/80' : ''}`}>
                                {milestone}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setActiveTab(jumpToTabMap[stage.id])}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow transition-all"
                      >
                        <span>{jumpLabels[stage.id]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
