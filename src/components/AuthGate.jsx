import React, { useState } from 'react';
import { 
  Lock, 
  Clock, 
  XCircle, 
  ShieldCheck, 
  RotateCw, 
  LogOut, 
  Check, 
  Sparkles,
  HelpCircle,
  KeyRound,
  FileText,
  Cloud
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GoogleAuthButton from './GoogleAuthButton';

export default function AuthGate({ children }) {
  const { 
    currentUser, 
    isApproved, 
    handleDirectLogin,
    elevateToAdminWithPasscode,
    logout 
  } = useAuth();

  const [adminPasscode, setAdminPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showAdminUnlock, setShowAdminUnlock] = useState(false);

  // Test account inputs for automated test & local development
  const [testEmail, setTestEmail] = useState('');
  const [activeTab, setActiveTab] = useState('google');

  const handleAdminUnlock = async (e) => {
    e.preventDefault();
    setPasscodeError('');
    const success = await elevateToAdminWithPasscode(adminPasscode);
    if (!success) {
      setPasscodeError('Mã bảo mật không chính xác (Mặc định: admin888)');
    }
  };

  // Direct login for tests / local admin setup
  const handleDirectSubmit = async (e) => {
    e.preventDefault();
    if (!testEmail) return;
    await handleDirectLogin({ email: testEmail, name: testEmail.split('@')[0] });
    setTestEmail('');
  };

  // 1. IF APPROVED: RENDER FULL APPLICATION
  if (currentUser && isApproved) {
    return <>{children}</>;
  }

  // 2. IF NOT LOGGED IN: SHOW GOOGLE LOGIN PAGE
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white flex flex-col items-center justify-center p-4 selection:bg-red-500 selection:text-white">
        <div className="max-w-md w-full space-y-6 bg-slate-900/85 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-red-500/30 mx-auto font-hanzi font-bold text-3xl">
              汉
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>Google Firebase Authentication</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white mt-2">
                Hán Ngữ Zero to Hero
              </h1>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Đăng nhập bằng tài khoản Google chính chủ. Quản trị viên sẽ phê duyệt quyền truy cập trước khi vào học.
              </p>
            </div>
          </div>

          {/* TABS SELECTOR */}
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('google')}
              className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'google'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Google Sign-In</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('direct')}
              className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'direct'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin & Thử Nghiệm</span>
            </button>
          </div>

          {/* TAB 1: OFFICIAL GOOGLE AUTH VIA FIREBASE */}
          {activeTab === 'google' && (
            <div className="py-2 space-y-4 animate-in fade-in text-center">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 text-center">
                <p className="text-xs text-slate-300">
                  Bấm nút bên dưới để mở cửa sổ xác thực an toàn từ <strong className="text-white">Google</strong>:
                </p>

                <div className="flex justify-center py-1">
                  <GoogleAuthButton />
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <Cloud className="w-3.5 h-3.5 shrink-0" />
                  <span>Kết nối Google Firebase (mandarin-learning-54243)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Lưu ý quan trọng cho lần đầu:</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Nếu popup báo <em>"auth/operation-not-allowed"</em>, bạn chỉ cần vào <strong>Firebase Console &gt; Authentication &gt; Sign-in method</strong> và bật nút gạt <strong>Google: Enable</strong> là xong nhé!
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: DIRECT / ADMIN / TEST LOGIN */}
          {activeTab === 'direct' && (
            <div className="py-2 space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <span className="text-xs font-bold text-slate-300 block">Đăng nhập tài khoản thử nghiệm / Admin:</span>
                
                {/* One click buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDirectLogin({ email: 'admin@mandarin.app', name: 'Quản Trị Viên (Admin)' })}
                    className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs transition-colors text-center"
                  >
                    <KeyRound className="w-3.5 h-3.5 shrink-0" />
                    <span>Vào với Admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDirectLogin({ email: 'hocvien.test@gmail.com', name: 'Học Viên Test' })}
                    className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 font-bold text-xs transition-colors text-center"
                  >
                    <span>Vào với Học Viên Mới</span>
                  </button>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase">Hoặc nhập email bất kỳ</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                <form onSubmit={handleDirectSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="Nhập email (ví dụ: student@gmail.com)"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-xs text-white placeholder:text-slate-500 outline-none focus:border-red-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow transition-colors"
                  >
                    Đăng Nhập Thử Nghiệm
                  </button>
                </form>
              </div>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                Chế độ này cho phép bạn kiểm thử quy trình duyệt và phân quyền ngay cả khi ngoại tuyến.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. IF LOGGED IN BUT PENDING APPROVAL
  if (currentUser.status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white flex flex-col items-center justify-center p-4 selection:bg-amber-500 selection:text-white">
        <div className="max-w-md w-full space-y-6 bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 p-8 rounded-3xl shadow-2xl text-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10 animate-pulse">
            <Clock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <span>Trạng Thái: Đang Chờ Phê Duyệt</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              Tài Khoản Google Đã Tiếp Nhận
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bạn đã đăng nhập thành công với tài khoản Google. Quản trị viên sẽ kiểm tra và cấp quyền truy cập lộ trình trong thời gian sớm nhất.
            </p>
          </div>

          {/* User Google Profile Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-left">
            <img 
              src={currentUser.picture} 
              alt={currentUser.name}
              className="w-12 h-12 rounded-full border border-amber-400/50 bg-slate-800 shrink-0 object-cover"
            />
            <div className="truncate">
              <div className="font-bold text-sm text-white truncate">{currentUser.name}</div>
              <div className="text-xs text-amber-300/90 truncate">{currentUser.email}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Xác thực lúc: {new Date(currentUser.createdAt).toLocaleString('vi-VN')}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs shadow-lg transition-all"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Kiểm Tra Lại Trạng Thái Phê Duyệt</span>
            </button>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng Xuất (Đổi Tài Khoản Google Khác)</span>
            </button>
          </div>

          {/* Admin Backdoor Unlock for Owner */}
          <div className="pt-4 border-t border-white/10 text-xs text-slate-400">
            {!showAdminUnlock ? (
              <button 
                onClick={() => setShowAdminUnlock(true)}
                className="text-[11px] text-amber-400/80 hover:text-amber-300 underline"
              >
                Bạn là Quản trị viên? Nhập mã mở khóa Admin tại đây
              </button>
            ) : (
              <form onSubmit={handleAdminUnlock} className="space-y-2 mt-2 p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[11px] font-semibold text-slate-300 block">Mã bảo mật Quản Trị Viên:</span>
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="Mã bảo mật (mặc định: admin888)"
                  className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/20 text-xs text-white outline-none"
                />
                {passcodeError && (
                  <div className="text-[10px] text-rose-400">{passcodeError}</div>
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-1.5 rounded-lg bg-amber-500 text-slate-900 font-bold text-xs"
                  >
                    Kích Hoạt Quyền Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdminUnlock(false)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 text-slate-400 text-xs"
                  >
                    Đóng
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. IF LOGGED IN BUT REJECTED
  if (currentUser.status === 'rejected') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white flex flex-col items-center justify-center p-4 selection:bg-rose-500 selection:text-white">
        <div className="max-w-md w-full space-y-6 bg-slate-900/90 backdrop-blur-xl border border-rose-500/30 p-8 rounded-3xl shadow-2xl text-center">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10">
            <XCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold">
              <span>Trạng Thái: Bị Từ Chối</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              Tài Khoản Không Được Phê Duyệt
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tài khoản Google <strong>{currentUser.email}</strong> chưa được Quản trị viên cấp quyền truy cập lộ trình học.
            </p>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng Xuất (Đổi Tài Khoản Khác)</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
}
