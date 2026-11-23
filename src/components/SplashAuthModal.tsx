import React, { useState } from 'react';
import { X, Check, Sparkles, Heart, User } from 'lucide-react';
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
  'Văn hóa các dân tộc Việt Nam',
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
  const [fullName, setFullName] = useState(user.fullName || 'Khách tham quan');
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
      fullName: fullName.trim() || 'Khách tham quan',
      interests: selectedInterests.length > 0 ? selectedInterests : ['Lễ hội dân gian cổ truyền'],
      role,
    };
    onSaveUser(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-amber-200 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="heritage-gradient-bar p-6 text-amber-50 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-amber-100 hover:text-white hover:bg-white/10 rounded-full transition"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 bg-amber-500/20 rounded-xl backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </span>
            <span className="text-xs uppercase tracking-wider font-bold text-amber-200">
              Truy cập công khai • Không cần đăng nhập
            </span>
          </div>
          <h2 className="text-2xl font-bold font-serif">
            Tùy chỉnh Trải nghiệm & Sở thích
          </h2>
          <p className="text-sm text-amber-100/90 mt-1">
            Mọi tính năng đều mở tự do không cần tài khoản. Tùy chọn dưới đây được lưu cục bộ trên trình duyệt của bạn.
          </p>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-5">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
              Tên hiển thị trên trình duyệt (Tùy chọn)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Khách tham quan"
                className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"
              />
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Mục đích: Chỉ dùng để điền sẵn tên hiển thị trên thanh điều hướng và bài viết cộng đồng trên chính thiết bị của bạn; không gửi về máy chủ và có thể xóa tại mục Hồ sơ.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-600 fill-red-600" />
              Chủ đề di sản quan tâm:
            </h3>
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
                        ? 'bg-red-700 text-white border-red-700 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-amber-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-1">
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
              Chế độ xem giao diện (Đều mở công khai)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`p-2.5 text-xs font-semibold rounded-xl border text-left transition ${
                  role === 'user'
                    ? 'border-red-700 bg-red-50 text-red-950 ring-2 ring-red-100'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Khách tra cứu</span>
                  {role === 'user' && <Check className="w-3.5 h-3.5 text-red-700" />}
                </div>
                <span className="text-[11px] text-stone-500 font-normal">Tra cứu, lưu lịch, đóng góp</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`p-2.5 text-xs font-semibold rounded-xl border text-left transition ${
                  role === 'admin'
                    ? 'border-amber-600 bg-amber-50 text-amber-950 ring-2 ring-amber-100'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Biên tập dữ liệu CMS</span>
                  {role === 'admin' && <Check className="w-3.5 h-3.5 text-amber-700" />}
                </div>
                <span className="text-[11px] text-stone-500 font-normal">Quản lý & thêm sự kiện thử nghiệm</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-700 hover:bg-red-800 text-white font-bold text-sm rounded-xl shadow-md shadow-red-700/20 transition cursor-pointer"
          >
            Lưu tùy chọn cục bộ
          </button>
        </form>
      </div>
    </div>
  );
};
