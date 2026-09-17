import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Loader2, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function GoogleAuthButton() {
  const { 
    loginWithGoogle, 
    loginWithGoogleRedirect, 
    redirectAuthError, 
    setRedirectAuthError 
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [redirectLoading, setRedirectLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPopupBlocked, setIsPopupBlocked] = useState(false);

  // Popup sign-in
  const handleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    if (setRedirectAuthError) setRedirectAuthError('');
    setIsPopupBlocked(false);

    const result = await loginWithGoogle();
    setLoading(false);

    if (!result.success) {
      const errStr = (result.error || '') + ' ' + (result.code || '');
      
      if (errStr.includes('auth/popup-blocked')) {
        setIsPopupBlocked(true);
        setErrorMsg('Trình duyệt của bạn đã chặn cửa sổ Popup. Vui lòng bấm nút "Đăng Nhập Bằng Chuyển Hướng" bên dưới (không cần mở popup) hoặc cho phép popup trên thanh địa chỉ duyệt web.');
      } else if (errStr.includes('auth/popup-closed-by-user')) {
        setErrorMsg('Bạn đã đóng cửa sổ đăng nhập Google trước khi hoàn tất.');
      } else if (errStr.includes('auth/unauthorized-domain')) {
        setErrorMsg(`Tên miền "${window.location.hostname}" chưa được cấp phép trong Firebase! Vui lòng vào Firebase Console -> Authentication -> Settings -> Authorized domains -> Thêm "${window.location.hostname}".`);
      } else if (errStr.includes('auth/operation-not-allowed') || errStr.includes('configuration-not-found')) {
        setErrorMsg('Chưa bật Google Provider trong Firebase! Vui lòng vào Firebase Console -> Authentication -> Sign-in method -> Bật Google: Enable.');
      } else {
        setErrorMsg(result.error);
      }
    }
  };

  // Redirect sign-in (immune to popup blockers)
  const handleRedirectSignIn = async () => {
    setRedirectLoading(true);
    setErrorMsg('');
    if (setRedirectAuthError) setRedirectAuthError('');
    const result = await loginWithGoogleRedirect();
    if (result?.error) {
      setRedirectLoading(false);
      setErrorMsg(result.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 w-full">
      {/* REDIRECT AUTH ERROR ALERT */}
      {redirectAuthError && (
        <div className="w-full p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-left space-y-1.5 animate-in fade-in">
          <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>Thông Báo Xác Thực Google</span>
          </div>
          <p className="text-xs text-rose-200 leading-relaxed">
            {redirectAuthError}
          </p>
        </div>
      )}

      {/* Primary Popup Sign-In Button */}
      <button
        type="button"
        onClick={handleSignIn}
        disabled={loading || redirectLoading}
        className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-xl shadow-black/30 border border-slate-200 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed group"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 text-red-600 animate-spin" />
        ) : (
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        <span>{loading ? 'Đang mở cửa sổ Google...' : 'Đăng nhập bằng Google'}</span>
      </button>

      {/* POPUP BLOCKED PROMINENT FALLBACK */}
      {isPopupBlocked && (
        <div className="w-full p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-left space-y-2.5 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Trình duyệt đã chặn cửa sổ Popup</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Safari, Chrome hoặc trình duyệt của bạn đang chặn popup tự động. Bấm nút dưới đây để đăng nhập trực tiếp qua trang của Google mà không cần popup:
          </p>
          <button
            type="button"
            onClick={handleRedirectSignIn}
            disabled={redirectLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all active:scale-[0.98]"
          >
            {redirectLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang chuyển hướng sang Google...</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                <span>Đăng Nhập Chuyển Hướng (Không cần Popup)</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* ERROR ALERT (IF NOT POPUP BLOCKED) */}
      {errorMsg && !isPopupBlocked && (
        <div className="flex items-start gap-2 text-xs text-rose-300 bg-rose-500/15 border border-rose-500/30 p-3 rounded-xl max-w-sm text-left animate-in fade-in w-full">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{errorMsg}</span>
        </div>
      )}

      {/* Permanent subtle redirect option for users whose browser always blocks popups */}
      {!isPopupBlocked && (
        <button
          type="button"
          onClick={handleRedirectSignIn}
          disabled={loading || redirectLoading}
          className="text-[11px] text-slate-400 hover:text-amber-300 underline underline-offset-2 transition-colors flex items-center gap-1 mt-1"
        >
          {redirectLoading ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Đang chuyển hướng...</span>
            </>
          ) : (
            <>
              <ExternalLink className="w-3 h-3" />
              <span>Bị chặn popup? Đăng nhập chuyển hướng tại đây</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
