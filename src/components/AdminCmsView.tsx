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
import { FestivalEvent, CommunityStory, EventCategory, Region } from '../types/festival';
import { getStoredStories, updateStoryStatus } from '../data/communityData';

interface AdminCmsViewProps {
  events: FestivalEvent[];
  onAddEvent: (event: FestivalEvent) => void;
  onUpdateEvent: (event: FestivalEvent) => void;
  onDeleteEvent: (id: string) => void;
  onSelectEvent: (event: FestivalEvent) => void;
}

export const AdminCmsView: React.FC<AdminCmsViewProps> = ({
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onSelectEvent,
}) => {
  const [activeTab, setActiveTab] = useState<'moderation' | 'festivals' | 'analytics'>('moderation');
  const [stories, setStories] = useState<CommunityStory[]>(() => getStoredStories());
  const [searchEventText, setSearchEventText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Event Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<EventCategory>('Lễ hội');
  const [ethnicGroup, setEthnicGroup] = useState('Kinh');
  const [region, setRegion] = useState<Region>('Bắc');
  const [province, setProvince] = useState('');
  const [locationName, setLocationName] = useState('');
  const [timingType, setTimingType] = useState<'lunar' | 'solar'>('lunar');
  const [lunarMonth, setLunarMonth] = useState(1);
  const [lunarDay, setLunarDay] = useState(15);
  const [recurringNote, setRecurringNote] = useState('Rằm tháng Giêng Âm lịch');
  const [historicalOrigin, setHistoricalOrigin] = useState('');
  const [culturalMeaning, setCulturalMeaning] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [issuingAuthority, setIssuingAuthority] = useState('Bộ Văn hóa, Thể thao và Du lịch');
  const [imageUrl, setImageUrl] = useState('');

  const pendingStories = stories.filter((s) => s.status === 'pending');

  const handleApproveStory = (storyId: string) => {
    updateStoryStatus(storyId, 'approved');
    setStories(getStoredStories());
  };

  const handleRejectStory = (storyId: string) => {
    const reason = prompt('Nhập lý do từ chối kiểm duyệt (ví dụ: Thiếu nguồn tài liệu xác thực):') || 'Không phù hợp tiêu chí';
    updateStoryStatus(storyId, 'rejected', reason);
    setStories(getStoredStories());
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: FestivalEvent = {
      id: `fest-${Date.now()}`,
      name,
      category,
      ethnicGroup,
      region,
      province,
      locationName,
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
      historicalOrigin,
      culturalMeaning,
      mainRituals: {
        le: ['Lễ dâng hương khai hội', 'Tế lễ cổ truyền'],
        hoi: ['Trò chơi dân gian', 'Giao lưu văn nghệ cộng đồng'],
      },
      legalBasis: {
        documentNumber: documentNumber || 'Quyết định số .../QĐ-BVHTTDL',
        issuingAuthority: issuingAuthority || 'Bộ Văn hóa, Thể thao và Du lịch',
        issueDate: '2026',
        title: `Công nhận di sản văn hóa phi vật thể: ${name}`,
        recognitionType: 'Di sản văn hóa phi vật thể Quốc gia',
        excerpt: 'Căn cứ Luật Di sản văn hóa và Nghị định số 110/2018/NĐ-CP của Chính phủ.',
      },
      directionsGuide: 'Theo chỉ dẫn giao thông địa phương.',
      visitorAdvice: ['Trang phục lịch sự', 'Giữ vệ sinh chung'],
      imageUrl:
        imageUrl.trim() ||
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      tags: [province, ethnicGroup, category],
    };

    onAddEvent(newEvent);
    setIsAddModalOpen(false);
    // Reset form
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
    return e.name.toLowerCase().includes(q) || e.province.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
              <SlidersHorizontal className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black font-sans">
              Hệ Thống Quản Trị Nội Dung (Admin CMS)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Kiểm duyệt đóng góp cộng đồng, quản lý cơ sở dữ liệu lễ hội và theo dõi căn cứ pháp lý
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Lễ hội Mới</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition flex items-center gap-2 ${
            activeTab === 'moderation'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Hàng đợi kiểm duyệt ({pendingStories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('festivals')}
          className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition flex items-center gap-2 ${
            activeTab === 'festivals'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Danh mục Lễ hội ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Thống kê & Quan tâm</span>
        </button>
      </div>

      {/* Tab: Moderation Queue */}
      {activeTab === 'moderation' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Bài viết & Tư liệu do độc giả đóng góp đang chờ duyệt
              </h2>
              <p className="text-xs text-slate-500">
                Tuân thủ Nghị định 110/2018/NĐ-CP và Luật Di sản văn hóa khi xét duyệt
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-extrabold rounded-full">
              {pendingStories.length} yêu cầu
            </span>
          </div>

          {pendingStories.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-400 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-slate-700">Tất cả bài viết đã được kiểm duyệt!</p>
              <p className="text-xs text-slate-500">Không có bài viết mới nào đang chờ xử lý.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white p-6 rounded-3xl border border-amber-200 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs text-blue-700 font-bold">
                        {story.festivalName} • {story.province} (Dân tộc {story.ethnicGroup})
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-0.5">{story.title}</h3>
                    </div>
                    <div className="text-xs text-slate-500 text-right">
                      <span className="block font-bold text-slate-800">{story.authorName}</span>
                      <span className="text-[11px] text-slate-400">{story.authorRole}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl">
                    {story.content}
                  </p>

                  {story.sourceReference && (
                    <div className="text-xs text-slate-500 italic">
                      Căn cứ nguồn tài liệu: <strong>{story.sourceReference}</strong>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => handleRejectStory(story.id)}
                      className="px-4 py-2 border border-rose-200 hover:bg-rose-50 text-rose-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                    >
                      <X className="w-4 h-4" /> Từ chối
                    </button>
                    <button
                      onClick={() => handleApproveStory(story.id)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" /> Phê duyệt công khai
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Festival CRUD List */}
      {activeTab === 'festivals' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm sự kiện theo tên hoặc tỉnh thành..."
                value={searchEventText}
                onChange={(e) => setSearchEventText(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
              />
            </div>

            <span className="text-xs text-slate-500 font-semibold">
              Tổng số: <strong>{filteredEvents.length}</strong> sự kiện di sản
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[11px]">
                  <th className="py-3 px-2">Tên Lễ Hội / Sự Kiện</th>
                  <th className="py-3 px-2">Thể Loại</th>
                  <th className="py-3 px-2">Vùng / Tỉnh</th>
                  <th className="py-3 px-2">Dân Tộc</th>
                  <th className="py-3 px-2">Căn Cứ Pháp Lý</th>
                  <th className="py-3 px-2 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredEvents.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-2 font-bold text-slate-900">
                      <span
                        onClick={() => onSelectEvent(ev)}
                        className="hover:text-blue-600 cursor-pointer"
                      >
                        {ev.name}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[10px]">
                        {ev.category}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-slate-600">
                      {ev.region} • {ev.province}
                    </td>
                    <td className="py-3 px-2 text-slate-600">{ev.ethnicGroup}</td>
                    <td className="py-3 px-2 text-slate-500 truncate max-w-[200px]" title={ev.legalBasis.documentNumber}>
                      {ev.legalBasis.documentNumber}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectEvent(ev)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc muốn xóa "${ev.name}" khỏi hệ thống?`)) {
                              onDeleteEvent(ev.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Xóa sự kiện"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase">Lượt Tra Cứu Toàn Hệ Thống</span>
              <div className="text-3xl font-black text-blue-700">128,450</div>
              <p className="text-[11px] text-emerald-600 font-bold">+18.5% so với mùa lễ hội trước</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase">Lễ Hội Được Quan Tâm Nhất</span>
              <div className="text-lg font-black text-slate-900 truncate">Giỗ Tổ Hùng Vương</div>
              <p className="text-[11px] text-slate-500">34,120 lượt lưu lịch & tra cứu</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase">Tỉ Lệ Chuẩn Hóa Căn Cứ Pháp Lý</span>
              <div className="text-3xl font-black text-emerald-600">100%</div>
              <p className="text-[11px] text-slate-500">Đầy đủ số hiệu văn bản pháp luật</p>
            </div>
          </div>
        </div>
      )}

      {/* Add New Festival Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white relative">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-blue-100 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold font-sans">
                Thêm Lễ Hội / Sự Kiện Truyền Thống Mới
              </h2>
              <p className="text-xs text-blue-100 mt-0.5">
                Cập nhật thông tin chính thống vào cơ sở dữ liệu quốc gia
              </p>
            </div>

            <form onSubmit={handleCreateEvent} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Tên chính thức lễ hội / sự kiện *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Lễ hội Tịch Điền Đọi Sơn"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Thể loại</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Lễ hội">Lễ hội</option>
                    <option value="Sự kiện lịch sử">Sự kiện lịch sử</option>
                    <option value="Danh nhân">Danh nhân</option>
                    <option value="Phong tục">Phong tục</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Vùng miền</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Bắc">Miền Bắc</option>
                    <option value="Trung">Miền Trung</option>
                    <option value="Tây Nguyên">Tây Nguyên</option>
                    <option value="Nam">Miền Nam</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Tỉnh thành</label>
                  <input
                    type="text"
                    required
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="Hà Nam"
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Dân tộc</label>
                  <input
                    type="text"
                    required
                    value={ethnicGroup}
                    onChange={(e) => setEthnicGroup(e.target.value)}
                    placeholder="Kinh"
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Địa điểm tổ chức cụ thể
                </label>
                <input
                  type="text"
                  required
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Xã Tiên Sơn, thị xã Duy Tiên..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Loại lịch tính</label>
                  <select
                    value={timingType}
                    onChange={(e) => setTimingType(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="lunar">Âm lịch</option>
                    <option value="solar">Dương lịch</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Ngày (Âm hoặc Dương)</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={lunarDay}
                    onChange={(e) => setLunarDay(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Tháng (Âm hoặc Dương)</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={lunarMonth}
                    onChange={(e) => setLunarMonth(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-center font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Nguồn gốc lịch sử & Thần tích
                </label>
                <textarea
                  rows={2}
                  required
                  value={historicalOrigin}
                  onChange={(e) => setHistoricalOrigin(e.target.value)}
                  placeholder="Tóm lược thần tích và bối cảnh lịch sử ra đời..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Căn cứ pháp lý (Số ký hiệu văn bản) *
                </label>
                <input
                  type="text"
                  required
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  placeholder="Ví dụ: Quyết định số 268/QĐ-BVHTTDL ngày 20/01/2013"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Lưu sự kiện mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
