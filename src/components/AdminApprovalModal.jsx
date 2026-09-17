import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  UserX, 
  Trash2, 
  Crown, 
  Check, 
  Clock, 
  Search, 
  CheckCheck,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminApprovalModal({ isOpen, onClose }) {
  const { 
    users, 
    currentUser, 
    approveUser, 
    rejectUser, 
    approveAllPending, 
    deleteUser, 
    toggleAdminRole,
    addAdminEmail 
  } = useAuth();

  const [filter, setFilter] = useState('pending'); // 'all' | 'pending' | 'approved' | 'rejected'
  const [searchTerm, setSearchTerm] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adminSuccessMsg, setAdminSuccessMsg] = useState('');

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newAdminEmail.trim()) return;
    const success = await addAdminEmail(newAdminEmail.trim());
    if (success) {
      setAdminSuccessMsg(`Đã cấp quyền Admin cho ${newAdminEmail}!`);
      setNewAdminEmail('');
      setTimeout(() => setAdminSuccessMsg(''), 4000);
    }
  };

  if (!isOpen) return null;

  const filteredUsers = users.filter(u => {
    const matchesFilter = filter === 'all' ? true : u.status === filter;
    const matchesSearch = 
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = users.filter(u => u.status === 'pending').length;
  const approvedCount = users.filter(u => u.status === 'approved').length;
  const rejectedCount = users.filter(u => u.status === 'rejected').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Bảng Phê Duyệt Tài Khoản Người Dùng
              </h2>
              <p className="text-xs text-slate-500">
                Chỉ những tài khoản được bạn chấp thuận mới có quyền truy cập vào lộ trình học.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Summary Stats & Batch Action */}
        <div className="p-5 border-b border-slate-100 bg-white grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-xl font-bold text-slate-900">{users.length}</div>
            <div className="text-[11px] text-slate-500">Tổng tài khoản</div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <div className="text-xl font-bold text-amber-800">{pendingCount}</div>
            <div className="text-[11px] text-amber-700 font-semibold">Chờ phê duyệt</div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <div className="text-xl font-bold text-emerald-800">{approvedCount}</div>
            <div className="text-[11px] text-emerald-700 font-semibold">Đã chấp thuận</div>
          </div>

          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center">
            <div className="text-xl font-bold text-rose-800">{rejectedCount}</div>
            <div className="text-[11px] text-rose-700 font-semibold">Bị từ chối</div>
          </div>
        </div>

        {/* Add Admin Quick Bar */}
        <div className="px-6 py-3 bg-amber-500/10 border-b border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-amber-900 font-bold">
            <Crown className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Thêm Admin bằng Email:</span>
          </div>

          <form onSubmit={handleAddAdmin} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              required
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              placeholder="Nhập email (ví dụ: ban@gmail.com)..."
              className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-amber-500 w-full sm:w-64 shadow-inner"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs shadow transition-all shrink-0 flex items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Cấp Quyền Admin</span>
            </button>
          </form>
        </div>

        {adminSuccessMsg && (
          <div className="px-6 py-2 bg-emerald-50 text-emerald-800 text-xs font-semibold border-b border-emerald-200 flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{adminSuccessMsg}</span>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="px-6 py-3 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filter === 'pending'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Chờ duyệt ({pendingCount})</span>
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'approved'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Đã duyệt ({approvedCount})
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'rejected'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Từ chối ({rejectedCount})
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Tất cả
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm email, tên..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 outline-none"
              />
            </div>

            {pendingCount > 0 && (
              <button
                onClick={approveAllPending}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm shrink-0"
                title="Duyệt tất cả tài khoản đang chờ"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Duyệt tất cả ({pendingCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* User List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              Không có tài khoản nào phù hợp với bộ lọc.
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isMe = user.email.toLowerCase() === currentUser?.email?.toLowerCase();
              return (
                <div
                  key={user.id || user.email}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={user.picture} 
                      alt={user.name}
                      className="w-11 h-11 rounded-full border border-slate-200 bg-slate-100 shrink-0"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{user.name}</span>
                        {user.role === 'admin' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 flex items-center gap-1">
                            <Crown className="w-3 h-3 text-amber-600" /> Admin
                          </span>
                        )}
                        {isMe && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                            Bạn
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Ngày đăng ký: {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    {/* Status Badge */}
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${
                      user.status === 'approved' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : user.status === 'pending'
                        ? 'bg-amber-100 text-amber-800 animate-pulse'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {user.status === 'approved' && '✓ Đã chấp thuận'}
                      {user.status === 'pending' && '⏳ Chờ phê duyệt'}
                      {user.status === 'rejected' && '✕ Đã từ chối'}
                    </span>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1">
                      {user.status !== 'approved' && (
                        <button
                          onClick={() => approveUser(user.email)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                          title="Chấp thuận cho vào học"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Duyệt</span>
                        </button>
                      )}

                      {user.status !== 'rejected' && !isMe && (
                        <button
                          onClick={() => rejectUser(user.email)}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1 transition-all"
                          title="Từ chối truy cập"
                        >
                          <UserX className="w-3.5 h-3.5" />
                          <span>Từ chối</span>
                        </button>
                      )}

                      {!isMe && (
                        <>
                          <button
                            onClick={() => toggleAdminRole(user.email)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-amber-600 transition-colors"
                            title={user.role === 'admin' ? 'Bỏ quyền Admin' : 'Cấp quyền Admin'}
                          >
                            <Crown className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Bạn có chắc muốn xóa tài khoản ${user.email}?`)) {
                                deleteUser(user.email);
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-slate-400" />
            <span>Mọi thay đổi phê duyệt có hiệu lực ngay lập tức với người dùng.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
