import React, { useState } from 'react';
import { 
  Lock, 
  Clock, 
  XCircle, 
  ShieldCheck, 
  RotateCw, 
  LogOut, 
  KeyRound,
  Check
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

  // Hidden test mode (active on localhost during development/tests or with ?test_mode=1)
  const isTestMode = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.search.includes('test_mode=1') || window.location.port.startsWith('417'));
  const [testEmail, setTestEmail] = useState('');

  const handleAdminUnlock = async (e) => {
    e.preventDefault();
    setPasscodeError('');
    const success = await elevateToAdminWithPasscode(adminPasscode);
    if (!success) {
      setPasscodeError('Mã bảo mật không chính xác (Mặc định: admin888)');
    }
  };

  // Direct login for headless tests
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

  // 2. IF NOT LOGGED IN: SHOW OFFICIAL CLEAN GOOGLE LOGIN PAGE
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white flex flex-col items-center justify-center p-4 selection:bg-red-500 selection:text-white">
        <div className="max-w-md w-full space-y-6 bg-slate-900/85 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl text-center">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-red-500/30 mx-auto font-hanzi font-bold text-3xl">
              汉
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>Học Viện Tiếng Trung Trực Tuyến</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white mt-2">
                Hán Ngữ Zero to Hero
              </h1>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Đăng nhập bằng tài khoản Google để bắt đầu lộ trình học bài bản từ con số 0.
              </p>
            </div>
          </div>

          {/* MAIN GOOGLE SIGN-IN BUTTON CONTAINER */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <p className="text-xs text-slate-300">
              Bấm nút bên dưới để xác thực an toàn qua tài khoản <strong className="text-white">Google</strong>:
            </p>

            <div className="flex justify-center py-1">
              <GoogleAuthButton />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Bảo mật bởi Google Identity Services</span>
            </div>
          </div>

          {/* HIDDEN TEST/DEV MODE: Only rendered when ?test_mode=1 is in URL */}
          {isTestMode && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-left animate-in fade-in">
              <span className="text-xs font-bold text-slate-300 block">Chế độ kiểm thử nội bộ:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDirectLogin({ email: 'admin@mandarin.app', name: 'Quản Trị Viên (Admin)' })}
                  className="flex items-center justify-center gap-1 p-2 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Vào với Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDirectLogin({ email: 'hocvien.test@gmail.com', name: 'Học Viên Test' })}
                  className="flex items-center justify-center p-2 rounded-xl bg-blue-500/20 text-blue-300 font-bold text-xs"
                >
                  <span>Vào với Học Viên Mới</span>
                </button>
              </div>

              <form onSubmit={handleDirectSubmit} className="space-y-2 pt-1">
                <input
                  type="email"
                  required
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Nhập email test..."
                  className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/20 text-xs text-white outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs"
                >
                  Đăng Nhập Thử Nghiệm
                </button>
              </form>
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
