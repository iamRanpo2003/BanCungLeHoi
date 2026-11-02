import React, { useState } from 'react';
import { X, Check, Mail, Phone, Lock, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { UserProfile } from '../types/festival';

interface SplashAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSaveUser: (user: UserProfile) => void;
}

const INTEREST_OPTIONS = [
  'Lễ hội dân gian cổ truyền',
  'Sự kiện lịch sử cách mạng',
  'Văn hóa 54 dân tộc anh em',
  'Di sản UNESCO đại diện nhân loại',
  'Phong tục tập quán & Tín ngưỡng',
  'Diễn xướng nghệ thuật (Quan họ, Cồng chiêng, Ca trù...)',
  'Ẩm thực trẩy hội truyền thống',
  'Di tích quốc gia đặc biệt',
];

export const SplashAuthModal: React.FC<SplashAuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onSaveUser,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'interests'>('login');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [fullName, setFullName] = useState(user.fullName || '');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(user.interests || []);
  const [role, setRole] = useState<'user' | 'admin'>(user.role || 'user');

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      fullName: fullName.trim() || 'Người yêu di sản',
      email: email.trim() || 'user@bancunglehoi.ai.studio',
      phone: phone.trim() || '0987654321',
      interests: selectedInterests.length > 0 ? selectedInterests : ['Lễ hội dân gian'],
      role: role,
    };
    onSaveUser(updated);
    onClose();
  };

  const handleQuickDemo = (demoRole: 'user' | 'admin') => {
    const updated: UserProfile = {
      ...user,
      fullName: demoRole === 'admin' ? 'Ban Quản Trị Di Sản' : 'Nguyễn Viết Hải (Nghiên cứu viên)',
      email: demoRole === 'admin' ? 'admin@bancunglehoi.gov.vn' : 'hai2752003hai@gmail.com',
      role: demoRole,
      interests: selectedInterests.length > 0 ? selectedInterests : INTEREST_OPTIONS.slice(0, 4),
    };
    onSaveUser(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 bg-white/15 rounded-xl backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </span>
            <span className="text-xs uppercase tracking-wider font-bold text-blue-200">
              Cổng thông tin văn hóa
            </span>
          </div>
          <h2 className="text-2xl font-bold font-sans">
            Bancunglehoi - Tài khoản & Sở thích
          </h2>
          <p className="text-sm text-blue-100 mt-1">
            Tra cứu chuyên sâu, đóng góp tư liệu và nhận nhắc nhở lịch lễ hội toàn quốc
          </p>

          {/* Mode Tabs */}
          <div className="flex gap-2 mt-4 bg-black/20 p-1 rounded-xl">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                authMode === 'login' ? 'bg-white text-blue-900 shadow-xs' : 'text-blue-100 hover:text-white'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                authMode === 'register' ? 'bg-white text-blue-900 shadow-xs' : 'text-blue-100 hover:text-white'
              }`}
            >
              Đăng ký mới
            </button>
            <button
              onClick={() => setAuthMode('interests')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                authMode === 'interests' ? 'bg-white text-blue-900 shadow-xs' : 'text-blue-100 hover:text-white'
              }`}
            >
              Chọn sở thích
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {authMode !== 'interests' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Viết Hải"
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              )}

              {/* Method Toggle: Email or Phone */}
              <div className="flex gap-2 border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={() => setMethod('email')}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg ${
                    method === 'email' ? 'bg-blue-50 text-blue-700' : 'text-slate-500'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" /> Qua Email
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('phone')}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg ${
                    method === 'phone' ? 'bg-blue-50 text-blue-700' : 'text-slate-500'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" /> Qua Số điện thoại
                </button>
              </div>

              {method === 'email' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Địa chỉ Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ban@example.com"
                      className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Số điện thoại di động
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0987xxxxxx"
                      className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    defaultValue="••••••••"
                    required
                    placeholder="Nhập mật khẩu"
                    className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Role selection in modal */}
              <div className="pt-1">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Vai trò trải nghiệm
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`p-2.5 text-xs font-semibold rounded-xl border text-left transition ${
                      role === 'user'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-100'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>Người dùng / Độc giả</span>
                      {role === 'user' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal">Tra cứu, lưu lịch, đóng góp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`p-2.5 text-xs font-semibold rounded-xl border text-left transition ${
                      role === 'admin'
                        ? 'border-amber-600 bg-amber-50 text-amber-950 ring-2 ring-amber-100'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>Quản trị viên (CMS)</span>
                      {role === 'admin' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal">Duyệt bài, sửa sự kiện</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer"
              >
                {authMode === 'login' ? 'Đăng nhập ngay' : 'Hoàn tất đăng ký'}
              </button>

              {/* Social Login Options */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-400 font-medium">Hoặc đăng nhập nhanh qua</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('user')}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('user')}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <svg className="w-4 h-4 text-blue-600 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  Chọn nhanh các chủ đề bạn quan tâm:
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hệ thống sẽ ưu tiên gợi ý các sự kiện, lịch lễ hội và bài viết phù hợp cho bạn.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {INTEREST_OPTIONS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition border flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      <span>{interest}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="px-4 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50"
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Lưu sở thích ({selectedInterests.length} đã chọn)
                </button>
              </div>
            </div>
          )}

          {/* Quick Demo Role Switching Section */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Chuyển đổi nhanh tài khoản thử nghiệm (1-Click Demo)</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Bạn có thể vào thẳng với vai trò Khách để tra cứu, hoặc Quản trị viên để kiểm duyệt bài viết cộng đồng và quản lý cơ sở dữ liệu lễ hội.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleQuickDemo('user')}
                className="flex-1 py-1.5 px-2 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg text-blue-700 font-bold transition text-center shadow-2xs"
              >
                Vào vai Độc giả
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="flex-1 py-1.5 px-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition text-center shadow-2xs"
              >
                Vào vai Quản trị CMS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
