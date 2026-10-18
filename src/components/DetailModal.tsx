import React, { useState } from 'react';
import {
  X,
  Calendar,
  MapPin,
  FileText,
  Bookmark,
  Share2,
  Navigation,
  Clock,
  Award,
  Bell,
  Download,
  Info,
  Check,
} from 'lucide-react';
import { FestivalEvent } from '../types/festival';
import { calculateEventForYear } from '../utils/festivalCalculator';
import { exportToICS } from '../utils/dataExporter';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';

interface DetailModalProps {
  event: FestivalEvent | null;
  onClose: () => void;
  targetYear: number;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  reminderDays: number;
  onSetReminder: (id: string, days: number) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  event,
  onClose,
  targetYear,
  isBookmarked,
  onToggleBookmark,
  reminderDays,
  onSetReminder,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rituals' | 'legal' | 'directions'>('overview');
  const [showShareToast, setShowShareToast] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<number>(reminderDays);

  if (!event) return null;

  const calculated = calculateEventForYear(event, targetYear);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Lễ hội ${event.name} (${calculated.lunarStartDateText}) - Diễn ra ngày ${calculated.solarStartDate} tại ${event.locationName}, ${event.province}. Tra cứu tại bancunglehoi.ai.studio`
      );
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  const handleReminderChange = (days: number) => {
    setSelectedReminder(days);
    onSetReminder(event.id, days);
  };

  const handleExportSingleICS = () => {
    exportToICS([calculated]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col">
        {/* Hero Image & Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close & Actions */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(event.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition ${
                isBookmarked
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title={isBookmarked ? 'Bỏ lưu lễ hội' : 'Lưu vào danh sách yêu thích'}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition"
              title="Sao chép thông tin chia sẻ"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition"
              aria-label="Đóng chi tiết"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Badges on Hero */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-600 text-white">
                {event.category}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/20 backdrop-blur-md text-blue-100">
                {event.region} • {event.province}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-600/80 backdrop-blur-md text-white">
                Dân tộc: {event.ethnicGroup}
              </span>
              {event.unescoRecognized && (
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-xs">
                  <Award className="w-3.5 h-3.5" /> Di sản UNESCO
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
              {event.name}
            </h1>
            {event.alternateNames && event.alternateNames.length > 0 && (
              <p className="text-xs sm:text-sm text-slate-200 mt-1 italic">
                Còn gọi là: {event.alternateNames.join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Share Toast */}
        {showShareToast && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-2 font-medium text-center flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> Đã sao chép liên kết và thông tin lễ hội vào khay nhớ tạm!
          </div>
        )}

        {/* Quick Time & Location Bar */}
        <div className="bg-blue-50/80 border-b border-blue-100 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-blue-950 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="font-bold text-blue-900">Năm {targetYear}: </span>
              <span className="text-slate-700">Dương lịch: </span>
              <strong className="text-blue-700 font-extrabold">
                {calculated.solarStartDate}
                {calculated.solarStartDate !== calculated.solarEndDate && ` đến ${calculated.solarEndDate}`}
              </strong>
              <span className="mx-1 text-slate-300">|</span>
              <span className="text-slate-600">Âm lịch: </span>
              <strong>{calculated.lunarStartDateText}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
            <span>{event.locationName}, {event.province}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Tổng quan & Lịch sử
          </button>
          <button
            onClick={() => setActiveTab('rituals')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'rituals'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Nghi thức (Lễ & Hội)
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'legal'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Căn cứ pháp lý
          </button>
          <button
            onClick={() => setActiveTab('directions')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'directions'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Đường đi & Lưu ý
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" /> Nguồn gốc lịch sử & Thần tích
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {event.historicalOrigin}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" /> Giá trị văn hóa & Ý nghĩa nhân văn
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {event.culturalMeaning}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rituals' && (
            <div className="space-y-6">
              {/* Phần Lễ */}
              <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200/60">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                  <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wider">
                    Phần Lễ (Nghi thức truyền thống trang nghiêm)
                  </h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {event.mainRituals.le.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-bold text-amber-700 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phần Hội */}
              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-200/60">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider">
                    Phần Hội (Diễn xướng nghệ thuật & Trò chơi dân gian)
                  </h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {event.mainRituals.hoi.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-bold text-blue-700 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'legal' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Văn bản pháp luật công nhận & Căn cứ tổ chức</span>
                </div>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Số hiệu văn bản:</span>
                    <strong className="text-slate-800">{event.legalBasis.documentNumber}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Cơ quan ban hành:</span>
                    <strong className="text-slate-800">{event.legalBasis.issuingAuthority}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Ngày ban hành:</span>
                    <strong className="text-slate-800">{event.legalBasis.issueDate}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Cấp xếp hạng:</span>
                    <span className="font-bold text-emerald-700">{event.legalBasis.recognitionType}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block text-xs font-bold text-slate-700 mb-1">Trích đoạn căn cứ pháp lý:</span>
                  <p className="text-xs text-slate-600 italic bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                    "{event.legalBasis.excerpt}"
                  </p>
                </div>
              </div>

              {/* Mandatory Legal Disclaimer */}
              <div className="flex items-start gap-2 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs leading-relaxed">
                <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <p>
                  <strong>Khuyến cáo pháp lý: </strong>
                  {LEGAL_DISCLAIMER}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'directions' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-600" /> Hướng dẫn di chuyển & Lộ trình
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {event.directionsGuide}
                </p>
                <div className="pt-2 text-xs text-slate-500">
                  Tọa độ định vị: <strong>{event.coordinates.lat.toFixed(4)}, {event.coordinates.lng.toFixed(4)}</strong>
                </div>
              </div>

              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-2">
                <h4 className="text-xs font-bold text-emerald-950 uppercase flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" /> Lưu ý văn minh trẩy hội & Phong tục
                </h4>
                <ul className="text-xs text-slate-700 space-y-1.5">
                  {event.visitorAdvice.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Quick Actions at bottom of body: Reminder & Export */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            {/* Reminder Setting */}
            <div className="flex items-center gap-2 text-xs">
              <Bell className="w-4 h-4 text-slate-500" />
              <span className="text-slate-600 font-medium">Nhắc nhở trước:</span>
              <select
                value={selectedReminder}
                onChange={(e) => handleReminderChange(Number(e.target.value))}
                className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value={0}>Không đặt</option>
                <option value={1}>Trước 1 ngày</option>
                <option value={3}>Trước 3 ngày</option>
                <option value={7}>Trước 1 tuần</option>
              </select>
            </div>

            {/* Export single iCal */}
            <button
              onClick={handleExportSingleICS}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5" /> Đồng bộ Google Calendar (.ics)
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Mã định danh: <span className="font-mono">{event.id}</span>
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
