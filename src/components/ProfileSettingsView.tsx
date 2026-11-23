import React, { useState } from 'react';
import {
  User,
  Bookmark,
  Bell,
  Download,
  Trash2,
  FileSpreadsheet,
  FileCode,
  Calendar,
  Shield,
  Heart,
  ChevronRight,
  Info,
  Check,
} from 'lucide-react';
import { UserProfile, FestivalEvent, AppLanguage } from '../types/festival';
import { calculateAllEventsForYear } from '../utils/festivalCalculator';
import { exportToICS, exportToCSV, exportToJSON } from '../utils/dataExporter';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';
import { getTranslation } from '../utils/i18n';
import { clearPersonalProfileData } from '../utils/userStore';

interface ProfileSettingsViewProps {
  user: UserProfile;
  events: FestivalEvent[];
  targetYear: number;
  onUpdateUser: (user: UserProfile) => void;
  onSelectEvent: (event: FestivalEvent) => void;
  onRemoveBookmark: (id: string) => void;
  onRemoveReminder: (id: string) => void;
  lang?: AppLanguage;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  user,
  events,
  targetYear,
  onUpdateUser,
  onSelectEvent,
  onRemoveBookmark,
  onRemoveReminder,
  lang = 'vi',
}) => {
  const t = getTranslation(lang);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [clearedSuccess, setClearedSuccess] = useState(false);

  const bookmarkedEvents = events.filter((e) => user.bookmarks.includes(e.id));
  const allCalculated = calculateAllEventsForYear(events, targetYear);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      fullName: fullName.trim() || 'Khách tham quan',
      email: email.trim(),
      phone: phone.trim(),
    });
    setSavedSuccess(true);
    setClearedSuccess(false);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleClearPersonalData = () => {
    const cleaned = clearPersonalProfileData();
    setFullName(cleaned.fullName);
    setEmail('');
    setPhone('');
    onUpdateUser(cleaned);
    setClearedSuccess(true);
    setSavedSuccess(false);
    setTimeout(() => setClearedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Profile Summary */}
      <div className="heritage-gradient-bar rounded-3xl p-6 sm:p-8 text-amber-50 shadow-lg flex flex-col sm:flex-row items-center gap-6 border border-amber-600/40">
        <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-amber-300/30 flex items-center justify-center text-3xl font-black text-amber-300 shadow-md">
          {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-black font-serif">{user.fullName || (lang === 'vi' ? 'Khách tham quan' : 'Visitor')}</h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-400 text-stone-950">
              {lang === 'vi' ? 'Truy cập công khai • Không cần đăng nhập' : 'Open Access • No Login Needed'}
            </span>
          </div>
          <p className="text-xs text-amber-200">
            {[user.email, user.phone].filter(Boolean).join(' • ') ||
              (lang === 'vi'
                ? 'Hồ sơ lưu cục bộ trên trình duyệt của bạn'
                : 'Preferences saved locally in your browser')}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2 justify-center sm:justify-start">
            {user.interests.map((i) => (
              <span
                key={i}
                className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded-md text-amber-200 border border-amber-400/30"
              >
                #{i}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Settings form & Bookmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 cols): Profile Settings Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-black text-stone-900 uppercase tracking-wider flex items-center gap-2 font-serif">
              <User className="w-4 h-4 text-red-700" />
              <span>{lang === 'vi' ? 'Cập Nhật Thông Tin Cá Nhân' : 'Personal Profile Settings'}</span>
            </h2>

            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 leading-relaxed flex items-start gap-2">
              <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-amber-900 mb-0.5">
                  {lang === 'vi'
                    ? 'Mục đích thu thập & Lưu trữ cục bộ (Tự nguyện):'
                    : 'Purpose & Local-Only Storage Disclosure:'}
                </strong>
                <span>
                  {lang === 'vi'
                    ? 'Các trường dưới đây hoàn toàn không bắt buộc. Tên hiển thị chỉ dùng để điền sẵn tên tác giả khi bạn gửi câu chuyện văn hóa; Email/SĐT (nếu nhập) chỉ lưu trên trình duyệt của bạn, không gửi về máy chủ và không dùng để quảng cáo hay định danh.'
                    : 'All fields below are optional. Your display name prefills author attribution when submitting local stories; optional email/phone stay strictly in your browser storage, are never sent to any server, and are never used for tracking.'}
                </span>
              </div>
            </div>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'vi' ? 'Đã lưu thông tin cá nhân cục bộ!' : 'Preferences saved locally!'}</span>
              </div>
            )}

            {clearedSuccess && (
              <div className="p-3 bg-stone-100 text-stone-800 text-xs rounded-xl border border-stone-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-stone-700" />
                <span>{lang === 'vi' ? 'Đã xóa toàn bộ thông tin cá nhân khỏi trình duyệt.' : 'Cleared personal profile data from browser storage.'}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  {lang === 'vi' ? 'Tên hiển thị (tùy chọn)' : 'Display Name (optional)'}
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={lang === 'vi' ? 'Khách tham quan' : 'Visitor'}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-red-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  {lang === 'vi' ? 'Địa chỉ Email (tùy chọn)' : 'Email Address (optional)'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'vi' ? 'Không bắt buộc' : 'Optional'}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-red-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  {lang === 'vi' ? 'Số điện thoại (tùy chọn)' : 'Phone Number (optional)'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={lang === 'vi' ? 'Không bắt buộc' : 'Optional'}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-red-600 font-medium"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  {lang === 'vi' ? 'Lưu thay đổi cục bộ' : 'Save Locally'}
                </button>
                <button
                  type="button"
                  onClick={handleClearPersonalData}
                  className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl border border-stone-200 transition cursor-pointer"
                >
                  {lang === 'vi' ? 'Xóa dữ liệu cá nhân' : 'Clear Personal Data'}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Exports Section */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 font-serif">
              <Download className="w-4 h-4 text-red-700" />
              <span>{lang === 'vi' ? 'Xuất Dữ Liệu Lễ Hội' : 'Export Festival Data'}</span>
            </h3>
            <p className="text-xs text-stone-500">
              {lang === 'vi' ? 'Tải về lịch lễ hội chuẩn năm ' : 'Download standardized festival calendar for year '}
              {targetYear}:
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() => exportToICS(allCalculated)}
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 text-center transition"
              >
                <Calendar className="w-4 h-4 mx-auto text-red-700 mb-1" />
                <span className="block text-[11px] font-bold text-stone-800">iCal (.ics)</span>
              </button>
              <button
                onClick={() => exportToCSV(allCalculated)}
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 text-center transition"
              >
                <FileSpreadsheet className="w-4 h-4 mx-auto text-emerald-700 mb-1" />
                <span className="block text-[11px] font-bold text-stone-800">Excel (.csv)</span>
              </button>
              <button
                onClick={() => exportToJSON(allCalculated)}
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 text-center transition"
              >
                <FileCode className="w-4 h-4 mx-auto text-amber-700 mb-1" />
                <span className="block text-[11px] font-bold text-stone-800">JSON API</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Bookmarked Festivals */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-red-700 fill-current" />
                <h2 className="text-base font-black text-stone-900 font-serif">
                  {lang === 'vi' ? 'Lễ Hội Đã Lưu Yêu Thích' : 'Saved Bookmarks'}
                </h2>
              </div>
              <span className="text-xs font-bold text-stone-500">
                {bookmarkedEvents.length} {lang === 'vi' ? 'sự kiện' : 'festivals'}
              </span>
            </div>

            {bookmarkedEvents.length === 0 ? (
              <div className="p-8 text-center text-stone-400 space-y-2">
                <Bookmark className="w-8 h-8 mx-auto text-stone-300" />
                <p className="text-xs">
                  {lang === 'vi'
                    ? 'Bạn chưa lưu lễ hội nào. Hãy bấm biểu tượng Bookmark trên các thẻ lễ hội để lưu lại.'
                    : 'No saved festivals yet. Click the bookmark icon on any festival card to save it.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {bookmarkedEvents.map((ev) => {
                  const evName = lang === 'en' && ev.en?.name ? ev.en.name : ev.name;
                  return (
                    <div
                      key={ev.id}
                      className="py-3.5 flex items-center justify-between gap-4 hover:bg-amber-50/40 px-2 rounded-xl transition"
                    >
                      <div
                        onClick={() => onSelectEvent(ev)}
                        className="cursor-pointer space-y-0.5 flex-1"
                      >
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-stone-900 hover:text-red-700 font-serif">
                            {evName}
                          </h4>
                          <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                            {ev.category}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500">
                          {ev.province} • Dân tộc {ev.ethnicGroup} • {ev.locationName}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onRemoveBookmark(ev.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg transition"
                          title={lang === 'vi' ? 'Bỏ lưu' : 'Remove bookmark'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSelectEvent(ev)}
                          className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-lg transition"
                        >
                          {lang === 'vi' ? 'Xem' : 'View'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-5 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
        <Info className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <h2 className="font-extrabold text-sm text-amber-900 uppercase tracking-wider mb-1">
            {lang === 'vi' ? 'Khuyến cáo pháp lý bắt buộc:' : 'Mandatory Legal Notice:'}
          </h2>
          <p>{LEGAL_DISCLAIMER}</p>
        </div>
      </div>
    </div>
  );
};
