import React from 'react';
import { 
  Compass, 
  Volume2, 
  PenTool, 
  Layers, 
  BookOpen, 
  CalendarCheck, 
  Library,
  Sparkles,
  ShieldCheck,
  LogOut,
  UserCheck,
  Crown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activeTab, setActiveTab, progressStats, onOpenAdminModal }) {
  const { currentUser, isAdmin, pendingCount, logout } = useAuth();

  const navItems = [
    { id: 'roadmap', label: 'Lộ Trình Tổng Quan', icon: Compass, badge: '4 Chặng' },
    { id: 'pinyin', label: 'Bảng Âm Pinyin', icon: Volume2, badge: 'Phát âm' },
    { id: 'hanzi', label: 'Chữ Hán & Bộ Thủ', icon: PenTool, badge: 'Bút thuận' },
    { id: 'vocabulary', label: 'Từ Vựng Flashcard', icon: Layers, badge: 'HSK 1-3' },
    { id: 'grammar', label: 'Ngữ Pháp Trọng Điểm', icon: BookOpen, badge: 'Quy tắc vàng' },
    { id: 'planner', label: 'Kế Hoạch & Checklist', icon: CalendarCheck, badge: 'Mỗi ngày' },
    { id: 'resources', label: 'Giáo Trình & Công Cụ', icon: Library, badge: 'Khuyên dùng' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('roadmap')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-red-500/20 font-hanzi font-bold text-xl">
              汉
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
                  Hán Ngữ Zero to Hero
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 rounded-full">
                  Từ Số 0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Lộ trình học tiếng Trung bài bản & thực chiến cho người Việt</p>
            </div>
          </div>

          {/* User Profile & Admin Approval Trigger */}
          <div className="flex items-center gap-3">
            {/* Quick Stat Badge */}
            {progressStats && (
              <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-xs text-slate-600">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Tiến độ: <strong className="text-red-600 font-semibold">{progressStats.completedTasks}/{progressStats.totalTasks}</strong></span>
              </div>
            )}

            {/* Admin Approval Button (Only shown to Admin) */}
            {isAdmin && (
              <button
                onClick={onOpenAdminModal}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs shadow-sm transition-all animate-in fade-in"
                title="Quản lý và phê duyệt học viên"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Phê Duyệt</span>
                {pendingCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-black animate-bounce shadow">
                    {pendingCount}
                  </span>
                )}
              </button>
            )}

            {/* User Profile Dropdown / Card */}
            {currentUser && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <img 
                  src={currentUser.picture} 
                  alt={currentUser.name} 
                  className="w-8 h-8 rounded-full border border-slate-200 bg-slate-100 shrink-0"
                  title={currentUser.email}
                />
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-none truncate max-w-[120px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                    {isAdmin ? (
                      <span className="text-amber-600 font-bold flex items-center gap-0.5">
                        <Crown className="w-2.5 h-2.5" /> Admin
                      </span>
                    ) : (
                      <span>Học viên</span>
                    )}
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    if (window.confirm('Bạn có muốn đăng xuất không?')) {
                      logout();
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm shadow-red-500/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-red-700 text-red-100' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
