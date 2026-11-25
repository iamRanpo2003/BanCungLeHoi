import React, { useState } from 'react';
import {
  SlidersHorizontal,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Edit,
  Eye,
  FileText,
  BarChart3,
  Users,
  ShieldCheck,
  Search,
  Check,
  X,
  AlertTriangle,
  Camera,
} from 'lucide-react';
import { FestivalEvent, CommunityStory, EventCategory, Region, AppLanguage } from '../types/festival';
import { getStoredStories, updateStoryStatus } from '../data/communityData';
import {
  getSavedAdminDraft,
  saveAdminDraft,
  clearAdminDraft,
  AdminEventDraft,
} from '../utils/storage';
import { getTranslation } from '../utils/i18n';
import { getMediaAttribution, validateAdminEventSafeguards } from '../utils/mediaAttribution';

interface AdminCmsViewProps {
  events: FestivalEvent[];
  onAddEvent: (event: FestivalEvent) => void;
  onUpdateEvent: (event: FestivalEvent) => void;
  onDeleteEvent: (id: string) => void;
  onSelectEvent: (event: FestivalEvent) => void;
  lang?: AppLanguage;
}

export const AdminCmsView: React.FC<AdminCmsViewProps> = ({
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onSelectEvent,
  lang = 'vi',
}) => {
  const t = getTranslation(lang);
  const [activeTab, setActiveTab] = useState<'moderation' | 'festivals' | 'analytics'>('moderation');
  const [stories, setStories] = useState<CommunityStory[]>(() => getStoredStories());
  const [searchEventText, setSearchEventText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [rejectingStoryId, setRejectingStoryId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // New Event Form State with LocalStorage Draft Persistence!
  const savedAdmin = getSavedAdminDraft();
  const [name, setName] = useState(savedAdmin.name || '');
  const [category, setCategory] = useState<EventCategory>((savedAdmin.category as EventCategory) || 'Lễ hội');
  const [ethnicGroup, setEthnicGroup] = useState(savedAdmin.ethnicGroup || 'Kinh');
  const [region, setRegion] = useState<Region>((savedAdmin.region as Region) || 'Bắc');
  const [province, setProvince] = useState(savedAdmin.province || '');
  const [locationName, setLocationName] = useState(savedAdmin.locationName || '');
  const [timingType, setTimingType] = useState<'lunar' | 'solar'>(savedAdmin.timingType || 'lunar');
  const [lunarMonth, setLunarMonth] = useState(savedAdmin.lunarMonth || 1);
  const [lunarDay, setLunarDay] = useState(savedAdmin.lunarDay || 15);
  const [recurringNote, setRecurringNote] = useState(savedAdmin.recurringNote || 'Rằm tháng Giêng Âm lịch');
  const [historicalOrigin, setHistoricalOrigin] = useState(savedAdmin.historicalOrigin || '');
  const [culturalMeaning, setCulturalMeaning] = useState(savedAdmin.culturalMeaning || '');
  const [documentNumber, setDocumentNumber] = useState(savedAdmin.documentNumber || '');
  const [issuingAuthority, setIssuingAuthority] = useState(
    savedAdmin.issuingAuthority || 'Bộ Văn hóa, Thể thao và Du lịch'
  );
  const [imageUrl, setImageUrl] = useState(savedAdmin.imageUrl || '');
  const [imageSourceNote, setImageSourceNote] = useState(savedAdmin.imageSourceNote || '');
  const [consentRealMediaAttribution, setConsentRealMediaAttribution] = useState(false);
  const [consentCustodianNonDisclosure, setConsentCustodianNonDisclosure] = useState(false);
  const [adminFormError, setAdminFormError] = useState('');

  const handleDraftUpdate = (field: keyof AdminEventDraft, val: any) => {
    if (field === 'name') setName(val);
    if (field === 'category') setCategory(val);
    if (field === 'ethnicGroup') setEthnicGroup(val);
    if (field === 'region') setRegion(val);
    if (field === 'province') setProvince(val);
    if (field === 'locationName') setLocationName(val);
    if (field === 'timingType') setTimingType(val);
    if (field === 'lunarMonth') setLunarMonth(val);
    if (field === 'lunarDay') setLunarDay(val);
    if (field === 'recurringNote') setRecurringNote(val);
    if (field === 'historicalOrigin') setHistoricalOrigin(val);
    if (field === 'culturalMeaning') setCulturalMeaning(val);
    if (field === 'documentNumber') setDocumentNumber(val);
    if (field === 'issuingAuthority') setIssuingAuthority(val);
    if (field === 'imageUrl') setImageUrl(val);
    if (field === 'imageSourceNote') setImageSourceNote(val);

    saveAdminDraft({
      name: field === 'name' ? val : name,
      category: field === 'category' ? val : category,
      ethnicGroup: field === 'ethnicGroup' ? val : ethnicGroup,
      region: field === 'region' ? val : region,
      province: field === 'province' ? val : province,
      locationName: field === 'locationName' ? val : locationName,
      timingType: field === 'timingType' ? val : timingType,
      lunarMonth: field === 'lunarMonth' ? val : lunarMonth,
      lunarDay: field === 'lunarDay' ? val : lunarDay,
      recurringNote: field === 'recurringNote' ? val : recurringNote,
      historicalOrigin: field === 'historicalOrigin' ? val : historicalOrigin,
      culturalMeaning: field === 'culturalMeaning' ? val : culturalMeaning,
      documentNumber: field === 'documentNumber' ? val : documentNumber,
      issuingAuthority: field === 'issuingAuthority' ? val : issuingAuthority,
      imageUrl: field === 'imageUrl' ? val : imageUrl,
      imageSourceNote: field === 'imageSourceNote' ? val : imageSourceNote,
    });
  };

  const pendingStories = stories.filter((s) => s.status === 'pending');

  const handleApproveStory = (storyId: string) => {
    updateStoryStatus(storyId, 'approved');
    setStories(getStoredStories());
  };

  const handleConfirmRejectStory = (storyId: string) => {
    const reason = rejectionReason.trim() || 'Không phù hợp tiêu chí';
    updateStoryStatus(storyId, 'rejected', reason);
    setStories(getStoredStories());
    setRejectingStoryId(null);
    setRejectionReason('');
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminFormError('');

    const validation = validateAdminEventSafeguards({
      consentRealMediaAttribution,
      consentCustodianNonDisclosure,
      customImageUrl: imageUrl,
      imageSourceNote,
    });

    if (!validation.valid) {
      setAdminFormError(lang === 'vi' ? (validation.errorVi || '') : (validation.errorEn || ''));
      return;
    }

    const hasCustomImage = Boolean(imageUrl.trim());
    const safeImage = hasCustomImage
      ? imageUrl.trim()
      : 'https://images.pexels.com/photos/35343332/pexels-photo-35343332.jpeg?auto=compress&cs=tinysrgb&w=1200';

    const newEvent: FestivalEvent = {
      id: `fest-${Date.now()}`,
      name: name.trim(),
      category,
      ethnicGroup: ethnicGroup.trim(),
      region,
      province: province.trim(),
      locationName: locationName.trim(),
      coordinates: { lat: 21.0, lng: 105.8 },
      timingType,
      lunarRule:
        timingType === 'lunar'
          ? {
              month: lunarMonth,
              day: lunarDay,
              recurringNote,
            }
          : undefined,
      solarRule:
        timingType === 'solar'
          ? {
              month: lunarMonth,
              day: lunarDay,
              recurringNote,
            }
          : undefined,
      historicalOrigin: historicalOrigin.trim(),
      culturalMeaning: culturalMeaning.trim(),
      mainRituals: {
        le: ['Lễ dâng hương khai hội', 'Tế lễ cổ truyền'],
        hoi: ['Trò chơi dân gian', 'Giao lưu văn nghệ cộng đồng'],
      },
      legalBasis: {
        documentNumber: documentNumber.trim() || 'Quyết định cấp Bộ VHTTDL',
        issuingAuthority: issuingAuthority.trim(),
        issueDate: '2026',
        title: name.trim() || 'Quyết định công nhận di sản văn hóa',
        recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
        excerpt: 'Căn cứ Luật Di sản văn hóa và Nghị định số 110/2018/NĐ-CP của Chính phủ.',
      },
      tags: [province.trim(), ethnicGroup.trim(), category],
      imageUrl: safeImage,
      imageSourceNote:
        imageSourceNote.trim() ||
        (hasCustomImage ? 'Ảnh thật có phép & ghi nguồn bởi biên tập viên' : 'Pexels #35343332 (Giấy phép Pexels)'),
      custodianCleared: consentCustodianNonDisclosure,
      visitorAdvice: [
        'Trang phục lịch sự, trang nghiêm tại khu vực thờ tự',
        'Tuân thủ quy định bảo vệ cảnh quan và vệ sinh môi trường',
      ],
      directionsGuide: `Tọa lạc tại ${locationName.trim()}, tỉnh ${province.trim()}. Du khách có thể di chuyển bằng đường bộ thuận tiện.`,
    };

    onAddEvent(newEvent);
    clearAdminDraft();
    setIsAddModalOpen(false);
    setName('');
    setProvince('');
    setLocationName('');
    setHistoricalOrigin('');
    setCulturalMeaning('');
    setDocumentNumber('');
    setImageUrl('');
    setImageSourceNote('');
    setConsentRealMediaAttribution(false);
    setConsentCustodianNonDisclosure(false);
  };

  const filteredEvents = events.filter((e) => {
    if (!searchEventText.trim()) return true;
    const q = searchEventText.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.province.toLowerCase().includes(q) ||
      e.ethnicGroup.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-900">
              <SlidersHorizontal className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-stone-900 font-serif">
              {lang === 'vi' ? 'Hệ Thống Quản Trị Nội Dung (CMS)' : 'Content Management System (CMS)'}
            </h1>
          </div>
          <p className="text-base text-stone-600 mt-1">
            {lang === 'vi'
              ? 'Chế độ quản trị thử nghiệm công khai (không cần đăng nhập): kiểm duyệt bài viết và số hóa lễ hội lưu cục bộ trên trình duyệt.'
              : 'Public trial CMS (no login required): moderate submissions and digitize festivals stored locally in your browser.'}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-red-700 hover:bg-red-800 text-white font-bold text-sm sm:text-base rounded-xl shadow-md shadow-red-700/20 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>{lang === 'vi' ? 'Thêm mới lễ hội / sự kiện' : 'Add New Festival'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`flex items-center gap-2 px-4 py-2 min-h-[44px] text-sm font-bold rounded-xl transition ${
            activeTab === 'moderation'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
          }`}
        >
          <Users className="w-4 h-4 shrink-0" />
          <span>{lang === 'vi' ? 'Kiểm duyệt cộng đồng' : 'Community Moderation'}</span>
          {pendingStories.length > 0 && (
            <span className="bg-amber-400 text-stone-950 px-1.5 py-0.2 rounded-full text-xs font-black">
              {pendingStories.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('festivals')}
          className={`flex items-center gap-2 px-4 py-2 min-h-[44px] text-sm font-bold rounded-xl transition ${
            activeTab === 'festivals'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
          }`}
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span>{lang === 'vi' ? `Quản lý lễ hội (${events.length})` : `Manage Festivals (${events.length})`}</span>
        </button>
      </div>

      {/* Moderation Tab */}
      {activeTab === 'moderation' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900 font-serif">
              {lang === 'vi'
                ? `Hàng chờ kiểm duyệt (${pendingStories.length} bài viết chờ duyệt)`
                : `Editorial Queue (${pendingStories.length} pending submissions)`}
            </h2>
          </div>

          {pendingStories.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-stone-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-stone-900 text-base">
                {lang === 'vi' ? 'Không có bài viết nào chờ kiểm duyệt' : 'No pending submissions in queue'}
              </h3>
              <p className="text-base text-stone-600">
                {lang === 'vi'
                  ? 'Tất cả câu chuyện do cộng đồng chia sẻ đã được xử lý xong.'
                  : 'All community contributions have been reviewed.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white p-5 rounded-2xl border border-amber-300 shadow-2xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
                    <div>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                        {story.province} • Dân tộc {story.ethnicGroup}
                      </span>
                      <h3 className="font-extrabold text-base text-stone-900 font-serif mt-1">
                        {story.title}
                      </h3>
                      <p className="text-base text-stone-600">
                        {lang === 'vi' ? 'Tác giả:' : 'Author:'} <strong>{story.authorName}</strong> ({story.authorRole}) • Lễ hội: <strong>{story.festivalName}</strong>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleApproveStory(story.id)}
                        className="flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-xs"
                      >
                        <Check className="w-4 h-4" />
                        <span>{lang === 'vi' ? 'Phê duyệt xuất bản' : 'Approve'}</span>
                      </button>
                      <button
                        onClick={() => {
                          setRejectingStoryId(story.id);
                          setRejectionReason('');
                        }}
                        className="flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-sm rounded-xl shadow-xs"
                      >
                        <X className="w-4 h-4" />
                        <span>{lang === 'vi' ? 'Từ chối' : 'Reject'}</span>
                      </button>
                    </div>
                  </div>

                  {rejectingStoryId === story.id && (
                    <div className="bg-red-50/70 p-3 rounded-xl border border-red-200 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                      <input
                        type="text"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder={
                          lang === 'vi'
                            ? 'Nhập lý do từ chối (ví dụ: Thiếu nguồn xác thực)...'
                            : 'Enter rejection reason...'
                        }
                        className="flex-1 min-h-[44px] text-base bg-white border border-red-200 rounded-lg px-3 py-2 focus:outline-none focus:border-red-600"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleConfirmRejectStory(story.id)}
                          className="min-h-[44px] px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-bold rounded-lg"
                        >
                          {lang === 'vi' ? 'Xác nhận từ chối' : 'Confirm Reject'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setRejectingStoryId(null)}
                          className="min-h-[44px] px-3.5 py-2 bg-white border border-stone-200 text-stone-700 text-sm font-bold rounded-lg"
                        >
                          {lang === 'vi' ? 'Hủy' : 'Cancel'}
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="text-base text-stone-700 leading-relaxed bg-amber-50/40 p-3 rounded-xl border border-amber-100">
                    {story.content}
                  </p>
                  {story.sourceReference && (
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                      <Camera className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>
                        {lang === 'vi' ? 'Nguồn tư liệu: ' : 'Source: '}
                        <strong>{story.sourceReference}</strong>
                      </span>
                      {story.images?.[0] && (
                        <span>
                          •{' '}
                          {lang === 'vi'
                            ? getMediaAttribution(story.images[0], story.sourceReference).captionVi
                            : getMediaAttribution(story.images[0], story.sourceReference).captionEn}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Festivals List Tab */}
      {activeTab === 'festivals' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 w-full sm:max-w-sm">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={lang === 'vi' ? 'Tìm trong danh sách quản lý...' : 'Search in festival list...'}
                value={searchEventText}
                onChange={(e) => setSearchEventText(e.target.value)}
                className="w-full min-h-[44px] text-base pl-9 pr-4 py-2 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:border-red-600"
              />
            </div>
            <span className="text-sm font-bold text-stone-600">
              {lang === 'vi' ? `Tổng số: ${filteredEvents.length} sự kiện` : `Total: ${filteredEvents.length} events`}
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50 px-2 rounded-xl transition"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold text-stone-900 font-serif">
                      {ev.name}
                    </span>
                    <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                      {ev.category}
                    </span>
                    <span className="text-xs text-stone-600">
                      {ev.province} • {ev.ethnicGroup}
                    </span>
                  </div>
                  <p className="text-base text-stone-600 font-mono break-words">
                    ID: {ev.id} • {ev.legalBasis.documentNumber}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => onSelectEvent(ev)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-700 hover:text-red-700 hover:bg-red-50 rounded-lg border border-stone-200 sm:border-0"
                    title={lang === 'vi' ? 'Xem chi tiết' : 'Preview'}
                    aria-label={lang === 'vi' ? 'Xem chi tiết' : 'Preview'}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {confirmDeleteId === ev.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          onDeleteEvent(ev.id);
                          setConfirmDeleteId(null);
                        }}
                        className="min-h-[44px] px-3 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-bold rounded-lg"
                      >
                        {lang === 'vi' ? 'Xác nhận xóa' : 'Confirm'}
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="min-h-[44px] px-3 py-2 bg-stone-100 text-stone-700 text-sm font-bold rounded-lg"
                      >
                        {lang === 'vi' ? 'Hủy' : 'Cancel'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(ev.id)}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center text-red-700 hover:text-red-800 hover:bg-red-50 rounded-lg border border-stone-200 sm:border-0"
                      title={lang === 'vi' ? 'Xóa lễ hội' : 'Delete'}
                      aria-label={lang === 'vi' ? 'Xóa lễ hội' : 'Delete'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Festival Modal with Draft Persistence */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-amber-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-red-700" />
                <h2 className="text-lg font-black text-stone-900 font-serif">
                  {lang === 'vi' ? 'Số Hóa Lễ Hội Mới' : 'Digitize New Festival'}
                </h2>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-mono font-bold">
                  {lang === 'vi' ? 'Bản nháp tự lưu' : 'Auto-saved'}
                </span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-sm">
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  {lang === 'vi' ? 'Tên lễ hội / Sự kiện *' : 'Festival Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleDraftUpdate('name', e.target.value)}
                  className="w-full min-h-[44px] text-base bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {lang === 'vi' ? 'Phân loại' : 'Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => handleDraftUpdate('category', e.target.value as EventCategory)}
                    className="w-full min-h-[44px] text-base bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-semibold"
                  >
                    <option value="Lễ hội">Lễ hội</option>
                    <option value="Sự kiện lịch sử">Sự kiện lịch sử</option>
                    <option value="Danh nhân">Danh nhân</option>
                    <option value="Phong tục">Phong tục</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {lang === 'vi' ? 'Vùng miền' : 'Region'}
                  </label>
                  <select
                    value={region}
                    onChange={(e) => handleDraftUpdate('region', e.target.value as Region)}
                    className="w-full min-h-[44px] text-base bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-semibold"
                  >
                    <option value="Bắc">Bắc</option>
                    <option value="Trung">Trung</option>
                    <option value="Nam">Nam (bao gồm Tây Nam Bộ)</option>
                    <option value="Tây Nguyên">Tây Nguyên</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {lang === 'vi' ? 'Dân tộc' : 'Ethnic Group'}
                  </label>
                  <input
                    type="text"
                    required
                    value={ethnicGroup}
                    onChange={(e) => handleDraftUpdate('ethnicGroup', e.target.value)}
                    className="w-full min-h-[44px] text-base bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {lang === 'vi' ? 'Tỉnh / Thành phố *' : 'Province *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={province}
                    onChange={(e) => handleDraftUpdate('province', e.target.value)}
                    className="w-full min-h-[44px] text-base bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {lang === 'vi' ? 'Địa điểm cụ thể (Đền, Chùa, Di tích)' : 'Specific Location'}
                  </label>
                  <input
                    type="text"
                    required
                    value={locationName}
                    onChange={(e) => handleDraftUpdate('locationName', e.target.value)}
                    className="w-full min-h-[44px] text-base bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  {lang === 'vi' ? 'Nguồn gốc lịch sử & Thần tích *' : 'Historical Origin & Legend *'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={historicalOrigin}
                  onChange={(e) => handleDraftUpdate('historicalOrigin', e.target.value)}
                  className="w-full text-base bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  {lang === 'vi' ? 'Ý nghĩa văn hóa & Nhân văn *' : 'Cultural Meaning *'}
                </label>
                <textarea
                  required
                  rows={2}
                  value={culturalMeaning}
                  onChange={(e) => handleDraftUpdate('culturalMeaning', e.target.value)}
                  className="w-full text-base bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {lang === 'vi' ? 'Số hiệu văn bản pháp lý công nhận' : 'Document Number'}
                  </label>
                  <input
                    type="text"
                    value={documentNumber}
                    onChange={(e) => handleDraftUpdate('documentNumber', e.target.value)}
                    className="w-full min-h-[44px] text-base bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {lang === 'vi' ? 'Link ảnh thật đại diện (tùy chọn)' : 'Real Photo URL (optional)'}
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={imageUrl}
                    onChange={(e) => handleDraftUpdate('imageUrl', e.target.value)}
                    className="w-full min-h-[44px] text-base bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  {lang === 'vi'
                    ? 'Nguồn gốc & Giấy phép ảnh thật (bắt buộc nếu nhập link ảnh riêng)'
                    : 'Photo Attribution & License Note (required for custom photo URL)'}
                </label>
                <input
                  type="text"
                  placeholder={
                    lang === 'vi'
                      ? 'VD: Ảnh Pexels #35343332 / Tác giả ... đã cấp phép sử dụng'
                      : 'e.g., Pexels #... / Photographer name & license'
                  }
                  value={imageSourceNote}
                  onChange={(e) => handleDraftUpdate('imageSourceNote', e.target.value)}
                  className="w-full min-h-[44px] text-base bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 space-y-2">
                <label className="flex items-start gap-2 text-[11px] text-stone-700 leading-relaxed cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentRealMediaAttribution}
                    onChange={(e) => setConsentRealMediaAttribution(e.target.checked)}
                    className="mt-0.5 rounded border-stone-300 text-red-700 focus:ring-red-600 shrink-0"
                  />
                  <span>
                    {lang === 'vi'
                      ? 'Ảnh đại diện là ảnh chụp thật có phép & ghi nguồn hợp lệ; KHÔNG dùng ảnh do AI tạo thay cho hiện vật, di tích hay nghệ nhân thật.'
                      : 'Confirmed real permitted photo with attribution; NO AI-generated image replacing real artifacts, monuments, or artisans.'}
                  </span>
                </label>
                <label className="flex items-start gap-2 text-[11px] text-stone-700 leading-relaxed cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentCustodianNonDisclosure}
                    onChange={(e) => setConsentCustodianNonDisclosure(e.target.checked)}
                    className="mt-0.5 rounded border-stone-300 text-red-700 focus:ring-red-600 shrink-0"
                  />
                  <span>
                    {lang === 'vi'
                      ? 'Đã loại trừ mọi phần tư liệu mật hoặc chi tiết mà người giữ tư liệu / nghệ nhân yêu cầu không công bố.'
                      : 'Confirmed restricted/sacred details custodians asked not to publish have been excluded.'}
                  </span>
                </label>
              </div>

              {adminFormError && (
                <div
                  role="alert"
                  className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-[11px] font-semibold flex items-start gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                  <span>{adminFormError}</span>
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="min-h-[44px] px-4 py-2 border border-stone-200 text-stone-700 font-bold text-sm rounded-xl"
                >
                  {lang === 'vi' ? 'Đóng' : 'Close'}
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-sm rounded-xl shadow-xs cursor-pointer"
                >
                  {lang === 'vi' ? 'Lưu và số hóa vào hệ thống' : 'Save & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
