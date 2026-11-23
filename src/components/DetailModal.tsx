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
  Volume2,
  VolumeX,
  Camera,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { FestivalEvent, AppLanguage, AccessibilitySettings } from '../types/festival';
import { calculateEventForYear } from '../utils/festivalCalculator';
import { exportToICS } from '../utils/dataExporter';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';
import { getTranslation } from '../utils/i18n';
import { tts } from '../utils/textToSpeech';
import { isValidPublicUrl } from '../utils/urlValidator';
import { getMediaAttribution } from '../utils/mediaAttribution';
import { GeminiCulturalAssistant } from './GeminiCulturalAssistant';

interface DetailModalProps {
  event: FestivalEvent | null;
  onClose: () => void;
  targetYear: number;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  reminderDays: number;
  onSetReminder: (id: string, days: number) => void;
  lang?: AppLanguage;
  a11y?: AccessibilitySettings;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  event,
  onClose,
  targetYear,
  isBookmarked,
  onToggleBookmark,
  reminderDays,
  onSetReminder,
  lang = 'vi',
  a11y,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rituals' | 'legal' | 'directions' | 'gemini'>('overview');
  const [showShareToast, setShowShareToast] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<number>(reminderDays);
  const [isSpeakingThis, setIsSpeakingThis] = useState(false);

  const t = getTranslation(lang);

  React.useEffect(() => {
    const unsub = tts.subscribe((status) => {
      setIsSpeakingThis(status.isSpeaking);
    });
    return () => {
      unsub();
      tts.stop();
    };
  }, []);

  if (!event) return null;

  const calculated = calculateEventForYear(event, targetYear);

  // English fallback or overrides
  const eventName = lang === 'en' && event.en?.name ? event.en.name : event.name;
  const eventOrigin = lang === 'en' && event.en?.historicalOrigin ? event.en.historicalOrigin : event.historicalOrigin;
  const eventMeaning = lang === 'en' && event.en?.culturalMeaning ? event.en.culturalMeaning : event.culturalMeaning;
  const ritualsLe = lang === 'en' && event.en?.mainRituals?.le ? event.en.mainRituals.le : event.mainRituals.le;
  const ritualsHoi = lang === 'en' && event.en?.mainRituals?.hoi ? event.en.mainRituals.hoi : event.mainRituals.hoi;
  const visitorTips = lang === 'en' && event.en?.visitorAdvice ? event.en.visitorAdvice : event.visitorAdvice;
  const mediaAttr = getMediaAttribution(event.imageUrl, event.imageSourceNote);

  const handleShare = () => {
    if (navigator.clipboard) {
      const currentHref = typeof window !== 'undefined' && isValidPublicUrl(window.location.href)
        ? window.location.href
        : 'Ứng dụng Bancunglehoi';
      navigator.clipboard.writeText(
        `Lễ hội ${eventName} (${calculated.lunarStartDateText}) - Diễn ra ngày ${calculated.solarStartDate} tại ${event.locationName}, ${event.province}. Nguồn: ${currentHref}`
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

  // Text to speech narrative
  const handleToggleNarrator = () => {
    if (isSpeakingThis) {
      tts.stop();
      setIsSpeakingThis(false);
    } else {
      const speechText =
        lang === 'vi'
          ? `Lễ hội ${eventName}. Địa điểm tổ chức tại ${event.locationName}, tỉnh ${event.province}, của đồng bào dân tộc ${event.ethnicGroup}. Thời gian năm ${targetYear}: Dương lịch từ ngày ${calculated.solarStartDate} đến ngày ${calculated.solarEndDate}, âm lịch ngày ${calculated.lunarStartDateText}. Nguồn gốc lịch sử: ${eventOrigin}. Ý nghĩa nhân văn: ${eventMeaning}.`
          : `Festival ${eventName}. Located at ${event.locationName}, ${event.province} province, belonging to the ${event.ethnicGroup} ethnic group. Year ${targetYear} dates: Solar date ${calculated.solarStartDate} to ${calculated.solarEndDate}, lunar date ${calculated.lunarStartDateText}. Historical origin: ${eventOrigin}. Cultural meaning: ${eventMeaning}.`;

      tts.speak(speechText, {
        lang: lang === 'vi' ? 'vi-VN' : 'en-US',
        rate: a11y?.speechRate || 1.0,
      });
      setIsSpeakingThis(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-amber-200 max-h-[92vh] flex flex-col">
        {/* Hero Image & Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
          <img
            src={event.imageUrl}
            alt={eventName}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Close & Action Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {/* TTS Narrator Button */}
            <button
              onClick={handleToggleNarrator}
              className={`p-2.5 rounded-full backdrop-blur-md transition flex items-center gap-1.5 text-xs font-bold ${
                isSpeakingThis
                  ? 'bg-amber-500 text-stone-950 shadow-lg ring-2 ring-amber-300'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title={
                isSpeakingThis
                  ? (lang === 'vi' ? 'Dừng đọc âm thanh' : 'Stop audio narration')
                  : (lang === 'vi' ? 'Nghe đọc thông tin lễ hội' : 'Listen to festival details')
              }
            >
              {isSpeakingThis ? <VolumeX className="w-5 h-5 text-stone-950" /> : <Volume2 className="w-5 h-5 text-white" />}
              <span className="hidden sm:inline">
                {isSpeakingThis ? (lang === 'vi' ? 'Dừng đọc' : 'Stop') : (lang === 'vi' ? 'Nghe đọc' : 'Listen')}
              </span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(event.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition ${
                isBookmarked
                  ? 'bg-red-700 text-white shadow-lg shadow-red-700/30'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title={isBookmarked ? 'Bỏ lưu lễ hội' : 'Lưu vào danh sách yêu thích'}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition"
              title="Sao chép thông tin chia sẻ"
            >
              <Share2 className="w-5 h-5" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition cursor-pointer"
              aria-label="Đóng chi tiết"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Badges on Hero */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-red-700 text-white">
                {event.category}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/20 backdrop-blur-md text-amber-100">
                {event.region} • {event.province}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-700/80 backdrop-blur-md text-white">
                {lang === 'vi' ? `Dân tộc: ${event.ethnicGroup}` : `Ethnic: ${event.ethnicGroup}`}
              </span>
              {event.unescoRecognized && (
                <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-amber-500 text-stone-950 flex items-center gap-1 shadow-xs">
                  <Award className="w-3.5 h-3.5" /> UNESCO
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight drop-shadow-md font-serif">
              {eventName}
            </h1>
            {event.alternateNames && event.alternateNames.length > 0 && (
              <p className="text-xs sm:text-sm text-stone-300 mt-1 italic">
                {lang === 'vi' ? 'Còn gọi là: ' : 'Also known as: '}
                {event.alternateNames.join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Share Toast */}
        {showShareToast && (
          <div className="bg-emerald-700 text-white text-xs px-4 py-2 font-medium text-center flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            {lang === 'vi'
              ? 'Đã sao chép liên kết và thông tin lễ hội vào khay nhớ tạm!'
              : 'Copied festival details and link to clipboard!'}
          </div>
        )}

        {/* Quick Time & Location Bar */}
        <div className="bg-amber-50/90 border-b border-amber-200/80 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-amber-950 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-red-700 shrink-0" />
            <div>
              <span className="font-bold text-red-950">
                {lang === 'vi' ? `Năm ${targetYear}: ` : `Year ${targetYear}: `}
              </span>
              <span className="text-stone-700">{lang === 'vi' ? 'Dương lịch: ' : 'Solar: '}</span>
              <strong className="text-red-800 font-extrabold">
                {calculated.solarStartDate}
                {calculated.solarStartDate !== calculated.solarEndDate && ` - ${calculated.solarEndDate}`}
              </strong>
              <span className="mx-1 text-stone-300">|</span>
              <span className="text-stone-600">{lang === 'vi' ? 'Âm lịch: ' : 'Lunar: '}</span>
              <strong>{calculated.lunarStartDateText}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-700 shrink-0" />
            <span>
              {event.locationName}, {event.province}
            </span>
          </div>
        </div>

        {/* Media & Audio Attribution Bar (Real photography + local TTS, zero AI artifacts) */}
        <div className="bg-stone-50 border-b border-stone-200 px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-600">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Camera className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>
              {lang === 'vi' ? mediaAttr.captionVi : mediaAttr.captionEn}
            </span>
            {mediaAttr.sourceUrl && isValidPublicUrl(mediaAttr.sourceUrl) && (
              <a
                href={mediaAttr.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-red-800 font-bold hover:underline"
              >
                <span>{lang === 'vi' ? '(Xem nguồn gốc ảnh)' : '(View photo source)'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-1 text-stone-500">
            <Volume2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>
              {lang === 'vi'
                ? 'Âm thanh: Web Speech API cục bộ (không sao chép ghi âm bản quyền)'
                : 'Audio: Local browser Web Speech API'}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-stone-200 bg-white px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap shrink-0 ${
              activeTab === 'overview'
                ? 'border-red-700 text-red-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {t.detail.overview}
          </button>
          <button
            onClick={() => setActiveTab('rituals')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap shrink-0 ${
              activeTab === 'rituals'
                ? 'border-red-700 text-red-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {t.detail.rituals}
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap shrink-0 ${
              activeTab === 'legal'
                ? 'border-red-700 text-red-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {t.detail.legal}
          </button>
          <button
            onClick={() => setActiveTab('directions')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap shrink-0 ${
              activeTab === 'directions'
                ? 'border-red-700 text-red-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {t.detail.directions}
          </button>
          <button
            onClick={() => setActiveTab('gemini')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap shrink-0 ${
              activeTab === 'gemini'
                ? 'border-red-700 text-red-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {t.detail.askGemini}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-700" />
                  <span>{lang === 'vi' ? 'Nguồn gốc lịch sử & Thần tích' : 'Historical Origin & Legends'}</span>
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed bg-amber-50/40 p-4 rounded-2xl border border-amber-100">
                  {eventOrigin}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'vi' ? 'Giá trị văn hóa & Ý nghĩa nhân văn' : 'Cultural Value & Significance'}</span>
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed bg-amber-50/40 p-4 rounded-2xl border border-amber-100">
                  {eventMeaning}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-amber-100 text-amber-900 text-xs font-semibold rounded-lg"
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
              <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-red-700"></span>
                  <h3 className="text-sm font-bold text-red-950 uppercase tracking-wider">
                    {lang === 'vi'
                      ? 'Phần Lễ (Nghi thức truyền thống trang nghiêm)'
                      : 'Ceremonial Rites (Solemn Traditional Ceremonies)'}
                  </h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                  {ritualsLe.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-bold text-red-700 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phần Hội */}
              <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                  <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wider">
                    {lang === 'vi'
                      ? 'Phần Hội (Diễn xướng dân gian & Trò chơi cổ truyền)'
                      : 'Festive Games & Folk Performances'}
                  </h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                  {ritualsHoi.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-bold text-amber-700 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'legal' && (
            <div className="space-y-4">
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>{lang === 'vi' ? 'Văn bản pháp luật công nhận & Căn cứ tổ chức' : 'Legal Recognition & Statutory Basis'}</span>
                </div>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">{lang === 'vi' ? 'Số hiệu văn bản:' : 'Document No:'}</span>
                    <strong className="text-stone-800 font-mono">{event.legalBasis.documentNumber}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">{lang === 'vi' ? 'Cơ quan ban hành:' : 'Issuing Authority:'}</span>
                    <strong className="text-stone-800">{event.legalBasis.issuingAuthority}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">{lang === 'vi' ? 'Ngày ban hành:' : 'Issue Date:'}</span>
                    <strong className="text-stone-800">{event.legalBasis.issueDate}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">{lang === 'vi' ? 'Cấp xếp hạng:' : 'Classification:'}</span>
                    <span className="font-bold text-emerald-800">{event.legalBasis.recognitionType}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block text-xs font-bold text-stone-700 mb-1">
                    {lang === 'vi' ? 'Trích đoạn căn cứ pháp lý:' : 'Statutory Excerpt:'}
                  </span>
                  <p className="text-xs text-stone-700 italic bg-white p-3 rounded-xl border border-stone-200 leading-relaxed">
                    "{event.legalBasis.excerpt}"
                  </p>
                </div>
              </div>

              {/* Mandatory Legal Disclaimer */}
              <div className="flex items-start gap-2 p-3.5 bg-amber-50 rounded-xl border border-amber-300 text-amber-950 text-xs leading-relaxed">
                <Info className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                <p>
                  <strong>{lang === 'vi' ? 'Khuyến cáo pháp lý: ' : 'Legal Disclaimer: '}</strong>
                  {LEGAL_DISCLAIMER}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'directions' && (
            <div className="space-y-4">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                <h4 className="text-xs font-bold text-stone-800 uppercase flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-red-700" />
                  <span>{lang === 'vi' ? 'Hướng dẫn di chuyển & Lộ trình' : 'Route & Directions Guide'}</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {event.directionsGuide}
                </p>
                <div className="pt-2 text-xs text-stone-500">
                  {lang === 'vi' ? 'Tọa độ định vị: ' : 'GPS Coordinates: '}
                  <strong>{event.coordinates.lat.toFixed(4)}, {event.coordinates.lng.toFixed(4)}</strong>
                </div>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2">
                <h4 className="text-xs font-bold text-emerald-950 uppercase flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <span>{lang === 'vi' ? 'Lưu ý văn minh trẩy hội & Phong tục' : 'Etiquette & Visitor Guidelines'}</span>
                </h4>
                <ul className="text-xs text-stone-800 space-y-1.5">
                  {visitorTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'gemini' && (
            <GeminiCulturalAssistant lang={lang} festival={event} compact />
          )}

          {/* Quick Actions at bottom: Reminder & Export */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
            {/* Reminder Setting */}
            <div className="flex items-center gap-2 text-xs">
              <Bell className="w-4 h-4 text-stone-500" />
              <span className="text-stone-600 font-medium">
                {lang === 'vi' ? 'Nhắc nhở trước:' : 'Reminder before:'}
              </span>
              <select
                value={selectedReminder}
                onChange={(e) => handleReminderChange(Number(e.target.value))}
                className="bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:border-red-600"
              >
                <option value={0}>{lang === 'vi' ? 'Không đặt' : 'None'}</option>
                <option value={1}>{lang === 'vi' ? 'Trước 1 ngày' : '1 day before'}</option>
                <option value={3}>{lang === 'vi' ? 'Trước 3 ngày' : '3 days before'}</option>
                <option value={7}>{lang === 'vi' ? 'Trước 1 tuần' : '1 week before'}</option>
              </select>
            </div>

            {/* Export single iCal */}
            <button
              onClick={handleExportSingleICS}
              className="flex items-center gap-1.5 text-xs font-bold text-red-800 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Đồng bộ Google Calendar (.ics)' : 'Export to Calendar (.ics)'}</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex items-center justify-between">
          <p className="text-[11px] text-stone-500 hidden sm:block">
            {lang === 'vi' ? 'Mã định danh: ' : 'Festival ID: '}
            <span className="font-mono">{event.id}</span>
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
          >
            {lang === 'vi' ? 'Đóng cửa sổ' : 'Close window'}
          </button>
        </div>
      </div>
    </div>
  );
};
