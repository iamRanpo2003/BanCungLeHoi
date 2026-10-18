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
import { UserProfile, FestivalEvent } from '../types/festival';
import { calculateAllEventsForYear } from '../utils/festivalCalculator';
import { exportToICS, exportToCSV, exportToJSON } from '../utils/dataExporter';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';

interface ProfileSettingsViewProps {
  user: UserProfile;
  events: FestivalEvent[];
  targetYear: number;
  onUpdateUser: (user: UserProfile) => void;
  onSelectEvent: (event: FestivalEvent) => void;
  onRemoveBookmark: (id: string) => void;
  onRemoveReminder: (id: string) => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  user,
  events,
  targetYear,
  onUpdateUser,
  onSelectEvent,
  onRemoveBookmark,
  onRemoveReminder,
}) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const bookmarkedEvents = events.filter((e) => user.bookmarks.includes(e.id));
  const allCalculated = calculateAllEventsForYear(events, targetYear);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      fullName: fullName.trim() || 'Người yêu văn hóa',
      email: email.trim(),
      phone: phone.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Profile Summary */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-black text-amber-300 shadow-md">
          {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-black">{user.fullName || 'Người Dùng'}</h1>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                user.role === 'admin'
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-emerald-400 text-slate-950'
              }`}
            >
              {user.role === 'admin' ? 'Quản Trị Viên (Admin CMS)' : 'Độc Giả Di Sản'}
            </span>
          </div>
          <p className="text-xs text-blue-200">{user.email} • {user.phone || '0987xxxxxx'}</p>
          <div className="flex flex-wrap gap-1.5 pt-2 justify-center sm:justify-start">
            {user.interests.map((i) => (
              <span
                key={i}
                className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md text-blue-100"
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
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" /> Cập Nhật Thông Tin Cá Nhân
            </h2>

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> Đã lưu thông tin cá nhân thành công!
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Địa chỉ Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                Lưu thay đổi
              </button>
            </form>
          </div>

          {/* Export Data Suite */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-600" /> Trích Xuất Dữ Liệu Nghiên Cứu
            </h2>
            <p className="text-xs text-slate-500">
              Tải toàn bộ cơ sở dữ liệu lễ hội đã quy đổi cho năm {targetYear} sang các định dạng chuẩn:
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => exportToICS(allCalculated)}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition flex items-center justify-between text-xs font-bold text-slate-800"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Đồng bộ Lịch iCalendar (.ics)</span>
                </div>
                <span className="text-[10px] text-blue-600">Google / Apple Cal</span>
              </button>

              <button
                onClick={() => exportToCSV(allCalculated)}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition flex items-center justify-between text-xs font-bold text-slate-800"
              >
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Bảng tính Excel / CSV</span>
                </div>
                <span className="text-[10px] text-emerald-600">Excel / Sheets</span>
              </button>

              <button
                onClick={() => exportToJSON(allCalculated)}
                className="w-full p-3 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition flex items-center justify-between text-xs font-bold text-slate-800"
              >
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-amber-600" />
                  <span>Dữ liệu cấu trúc JSON</span>
                </div>
                <span className="text-[10px] text-amber-600">Lập trình viên / API</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Bookmarks & Reminders */}
        <div className="lg:col-span-7 space-y-6">
          {/* Bookmarks Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" /> Lễ Hội Đã Lưu ({bookmarkedEvents.length})
              </h2>
              {bookmarkedEvents.length > 0 && (
                <button
                  onClick={() => {
                    const bookmarkedCalculated = allCalculated.filter((c) =>
                      user.bookmarks.includes(c.event.id)
                    );
                    exportToICS(bookmarkedCalculated);
                  }}
                  className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Xuất iCal riêng mục này
                </button>
              )}
            </div>

            {bookmarkedEvents.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                Bạn chưa lưu lễ hội nào. Hãy bấm biểu tượng Bookmark trên trang chủ hoặc lịch để lưu!
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarkedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-blue-50/30 transition flex items-center justify-between gap-3"
                  >
                    <div
                      onClick={() => onSelectEvent(ev)}
                      className="cursor-pointer flex-1 truncate"
                    >
                      <h4 className="font-extrabold text-sm text-slate-900 hover:text-blue-600 truncate">
                        {ev.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {ev.region} • {ev.province} • Dân tộc {ev.ethnicGroup}
                      </p>
                      <span className="text-[11px] text-blue-700 font-bold">
                        Căn cứ: {ev.legalBasis.documentNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectEvent(ev)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition"
                      >
                        Chi tiết
                      </button>
                      <button
                        onClick={() => onRemoveBookmark(ev.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Xóa khỏi danh sách lưu"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reminders Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" /> Cài Đặt Nhắc Nhở Trẩy Hội ({user.reminders.length})
            </h2>

            {user.reminders.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                Chưa có lịch nhắc nhở nào được cài đặt.
              </div>
            ) : (
              <div className="space-y-2.5">
                {user.reminders.map((rem) => {
                  const ev = events.find((e) => e.id === rem.festivalId);
                  if (!ev) return null;
                  return (
                    <div
                      key={rem.festivalId}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs"
                    >
                      <div>
                        <strong className="text-slate-900 block font-bold">{ev.name}</strong>
                        <span className="text-blue-700 font-semibold text-[11px]">
                          Thông báo trước {rem.daysBefore} ngày diễn ra
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveReminder(rem.festivalId)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        title="Hủy thông báo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-950 text-xs leading-relaxed flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Lưu ý: </strong>
          {LEGAL_DISCLAIMER}
        </p>
      </div>
    </div>
  );
};
