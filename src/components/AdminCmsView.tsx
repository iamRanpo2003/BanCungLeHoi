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
    });
  };

  const pendingStories = stories.filter((s) => s.status === 'pending');

  const handleApproveStory = (storyId: string) => {
    updateStoryStatus(storyId, 'approved');
    setStories(getStoredStories());
  };

  const handleRejectStory = (storyId: string) => {
    const reason = prompt(
      lang === 'vi'
        ? 'Nhập lý do từ chối kiểm duyệt (ví dụ: Thiếu nguồn tài liệu xác thực):'
        : 'Enter rejection reason:'
    ) || 'Không phù hợp tiêu chí';
    updateStoryStatus(storyId, 'rejected', reason);
    setStories(getStoredStories());
  };

  const isValidHttpUrl = (urlStr: string): boolean => {
    try {
      const parsed = new URL(urlStr);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const safeImage =
      imageUrl.trim() && isValidHttpUrl(imageUrl.trim())
        ? imageUrl.trim()
        : 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80';

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
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {lang === 'vi'
              ? 'Kiểm duyệt bài viết cộng đồng, số hóa lễ hội mới và quản lý nguồn dữ liệu chuẩn hóa'
              : 'Moderate community submissions, digitize new festivals, and manage standardized databases'}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-red-700/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'vi' ? 'Thêm mới lễ hội / sự kiện' : 'Add New Festival'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'moderation'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{lang === 'vi' ? 'Kiểm duyệt cộng đồng' : 'Community Moderation'}</span>
          {pendingStories.length > 0 && (
            <span className="bg-amber-400 text-stone-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">
              {pendingStories.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('festivals')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'festivals'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <FileText className="w-4 h-4" />
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
              <h3 className="font-bold text-stone-900">
                {lang === 'vi' ? 'Không có bài viết nào chờ kiểm duyệt' : 'No pending submissions in queue'}
              </h3>
              <p className="text-xs text-stone-500">
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
                      <p className="text-xs text-stone-500">
                        {lang === 'vi' ? 'Tác giả:' : 'Author:'} <strong>{story.authorName}</strong> ({story.authorRole}) • Lễ hội: <strong>{story.festivalName}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApproveStory(story.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'vi' ? 'Phê duyệt xuất bản' : 'Approve'}</span>
                      </button>
                      <button
                        onClick={() => handleRejectStory(story.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-xs"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>{lang === 'vi' ? 'Từ chối' : 'Reject'}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed bg-amber-50/40 p-3 rounded-xl border border-amber-100">
                    {story.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Festivals List Tab */}
      {activeTab === 'festivals' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={lang === 'vi' ? 'Tìm trong danh sách quản lý...' : 'Search in festival list...'}
                value={searchEventText}
                onChange={(e) => setSearchEventText(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2 border border-stone-200 rounded-xl bg-stone-50 focus:outline-none focus:border-red-600"
              />
            </div>
            <span className="text-xs font-bold text-stone-500">
              {lang === 'vi' ? `Tổng số: ${filteredEvents.length} sự kiện` : `Total: ${filteredEvents.length} events`}
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="py-3 flex items-center justify-between gap-4 hover:bg-stone-50 px-2 rounded-xl transition"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-stone-900 font-serif">
                      {ev.name}
                    </span>
                    <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                      {ev.category}
                    </span>
                    <span className="text-[10px] text-stone-500">
                      {ev.province} • {ev.ethnicGroup}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-mono">
                    ID: {ev.id} • {ev.legalBasis.documentNumber}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectEvent(ev)}
                    className="p-1.5 text-stone-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    title={lang === 'vi' ? 'Xem chi tiết' : 'Preview'}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(lang === 'vi' ? `Bạn có chắc muốn xóa lễ hội "${ev.name}"?` : `Delete festival "${ev.name}"?`)) {
                        onDeleteEvent(ev.id);
                      }
                    }}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                    title={lang === 'vi' ? 'Xóa lễ hội' : 'Delete'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  {lang === 'vi' ? 'Tên lễ hội / Sự kiện *' : 'Festival Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleDraftUpdate('name', e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-red-600"
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
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-semibold"
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
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-semibold"
                  >
                    <option value="Bắc">Bắc</option>
                    <option value="Trung">Trung</option>
                    <option value="Nam">Nam</option>
                    <option value="Tây Nguyên">Tây Nguyên</option>
                    <option value="Tây Nam Bộ">Tây Nam Bộ</option>
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
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium"
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
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium"
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
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium"
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
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-medium"
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
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 font-medium"
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
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {lang === 'vi' ? 'Link ảnh đại diện lễ hội' : 'Image URL'}
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => handleDraftUpdate('imageUrl', e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-600 font-bold rounded-xl"
                >
                  {lang === 'vi' ? 'Đóng' : 'Close'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl shadow-xs"
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
