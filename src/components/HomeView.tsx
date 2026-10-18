import React from 'react';
import {
  Calendar as CalendarIcon,
  Search,
  Sparkles,
  Award,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  Landmark,
  Bookmark,
  Info,
} from 'lucide-react';
import { FestivalEvent, EventCategory } from '../types/festival';
import { solarToLunar, getHoangDaoHours } from '../utils/lunarCalendar';
import { calculateAllEventsForYear } from '../utils/festivalCalculator';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';

interface HomeViewProps {
  events: FestivalEvent[];
  targetYear: number;
  onSelectEvent: (event: FestivalEvent) => void;
  onNavigateTab: (tab: string, categoryFilter?: EventCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  events,
  targetYear,
  onSelectEvent,
  onNavigateTab,
  searchQuery,
  setSearchQuery,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  // Hôm nay
  const today = new Date();
  const currentSolarDay = today.getDate();
  const currentSolarMonth = today.getMonth() + 1;
  const currentSolarYear = today.getFullYear();

  // Tính lịch âm hôm nay
  const todayLunar = solarToLunar(currentSolarDay, currentSolarMonth, currentSolarYear);
  const hoangDaoHours = getHoangDaoHours(todayLunar.canChiDay);

  // Tính tất cả lễ hội trong năm hiện tại
  const allCalculated = calculateAllEventsForYear(events, targetYear, today);

  // Lọc theo search nếu có
  const filteredCalculated = allCalculated.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.event.name.toLowerCase().includes(q) ||
      item.event.province.toLowerCase().includes(q) ||
      item.event.ethnicGroup.toLowerCase().includes(q) ||
      item.event.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  // Tìm sự kiện diễn ra hôm nay hoặc sự kiện sắp tới gần nhất
  const todayEvents = filteredCalculated.filter((i) => i.isToday);
  const upcomingEvents = filteredCalculated.filter((i) => !i.isToday && i.daysRemaining >= 0);
  const spotlightEvent = todayEvents.length > 0 ? todayEvents[0] : upcomingEvents[0] || filteredCalculated[0];

  const quickCategories: {
    category: EventCategory;
    title: string;
    desc: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
    count: number;
  }[] = [
    {
      category: 'Lễ hội',
      title: 'Lễ hội Truyền thống',
      desc: 'Hội làng, lễ hội nông nghiệp, hội xuân 3 miền',
      icon: Landmark,
      color: 'text-blue-700',
      bg: 'bg-blue-50 border-blue-200 hover:border-blue-400',
      count: events.filter((e) => e.category === 'Lễ hội').length,
    },
    {
      category: 'Sự kiện lịch sử',
      title: 'Sự kiện Lịch sử',
      desc: 'Chiến thắng oanh liệt, ngày kỷ niệm non sông',
      icon: Clock,
      color: 'text-indigo-700',
      bg: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400',
      count: events.filter((e) => e.category === 'Sự kiện lịch sử').length,
    },
    {
      category: 'Danh nhân',
      title: 'Danh nhân Đất Việt',
      desc: 'Tưởng niệm các bậc tiền nhân, anh hùng dân tộc',
      icon: Award,
      color: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-200 hover:border-amber-400',
      count: events.filter((e) => e.category === 'Danh nhân').length,
    },
    {
      category: 'Phong tục',
      title: 'Phong tục Tập quán',
      desc: 'Tín ngưỡng và bản sắc văn hóa 54 dân tộc',
      icon: Compass,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
      count: events.filter((e) => e.category === 'Phong tục').length,
    },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-blue-700/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Nền tảng tri thức & Lịch lễ hội quốc gia</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Khám phá & Trẩy hội cùng <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-blue-200">
              54 Dân tộc Việt Nam
            </span>
          </h1>

          <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
            Tra cứu chuẩn xác ngày Âm - Dương các lễ hội truyền thống, sự kiện lịch sử,
            nghi thức và căn cứ pháp lý chính thức từ Bộ Văn hóa, Thể thao và Du lịch.
          </p>

          {/* Quick Search in Hero */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Nhập tên lễ hội (Hùng Vương, Gióng, Katê, Chùa Hương, Ok Om Bok...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-900 placeholder-slate-400 pl-11 pr-28 py-3.5 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400/40 font-medium text-sm"
              />
              <button
                onClick={() => onNavigateTab('calendar')}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Xem lịch
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Watermark / Circle */}
        <div className="absolute -right-12 -bottom-12 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      </section>

      {/* Dual Lunar - Solar Live Today Widget */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-blue-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Box 1: Solar */}
        <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex flex-col items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <span className="text-[10px] font-bold uppercase tracking-wider">Tháng {currentSolarMonth}</span>
            <span className="text-2xl font-black leading-none">{currentSolarDay}</span>
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Dương Lịch Hôm Nay</span>
            <div className="text-base font-extrabold text-slate-900">
              Thứ {today.getDay() === 0 ? 'Chủ Nhật' : today.getDay() + 1}, {currentSolarDay}/{currentSolarMonth}/{currentSolarYear}
            </div>
            <p className="text-xs text-slate-500">Giờ chuẩn Việt Nam (GMT+7)</p>
          </div>
        </div>

        {/* Box 2: Lunar */}
        <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex flex-col items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
            <span className="text-[10px] font-bold uppercase tracking-wider">Âm Lịch</span>
            <span className="text-xl font-black leading-none">{todayLunar.day}</span>
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
              Tháng {todayLunar.month} {todayLunar.isLeap ? '(Nhuận)' : ''}
            </span>
            <div className="text-sm font-extrabold text-slate-900">
              Ngày {todayLunar.canChiDay}
            </div>
            <p className="text-xs text-slate-600">
              Năm <strong>{todayLunar.canChiYear}</strong> • Tiết: <strong>{todayLunar.solarTerm}</strong>
            </p>
          </div>
        </div>

        {/* Box 3: Hoang Dao Hours */}
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
            Giờ Hoàng Đạo trong ngày
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {hoangDaoHours.slice(0, 4).map((h, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200"
              >
                {h}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Theo thuật toán thiên văn chuẩn xác Jean Meeus & Hồ Ngọc Đức
          </p>
        </div>
      </section>

      {/* Featured Spotlight Festival */}
      {spotlightEvent && (
        <section className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-xs">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-2/5 h-56 sm:h-64 rounded-2xl overflow-hidden relative shadow-md shrink-0">
              <img
                src={spotlightEvent.event.imageUrl}
                alt={spotlightEvent.event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                {spotlightEvent.isToday ? 'ĐANG DIỄN RA HÔM NAY' : 'SỰ KIỆN NỔI BẬT SẮP TỚI'}
              </div>
              {spotlightEvent.event.unescoRecognized && (
                <div className="absolute bottom-3 left-3 bg-amber-500 text-slate-950 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                  <Award className="w-3.5 h-3.5" /> UNESCO
                </div>
              )}
            </div>

            <div className="w-full md:w-3/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                <span>{spotlightEvent.event.region}</span>
                <span>•</span>
                <span>{spotlightEvent.event.province}</span>
                <span>•</span>
                <span>Dân tộc {spotlightEvent.event.ethnicGroup}</span>
              </div>

              <h2
                onClick={() => onSelectEvent(spotlightEvent.event)}
                className="text-xl sm:text-2xl font-black text-slate-900 hover:text-blue-600 transition cursor-pointer"
              >
                {spotlightEvent.event.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                {spotlightEvent.event.historicalOrigin}
              </p>

              <div className="bg-white p-3 rounded-xl border border-blue-100 flex flex-wrap gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Thời gian Dương lịch {targetYear}:</span>
                  <strong className="text-blue-700 font-bold">{spotlightEvent.solarStartDate}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Thời gian Âm lịch:</span>
                  <strong className="text-slate-800 font-bold">{spotlightEvent.lunarStartDateText}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Căn cứ pháp lý:</span>
                  <span className="text-slate-700 font-semibold">{spotlightEvent.event.legalBasis.documentNumber}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectEvent(spotlightEvent.event)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Xem nguồn gốc & nghi thức</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onToggleBookmark(spotlightEvent.event.id)}
                  className={`p-2.5 border rounded-xl transition ${
                    bookmarkedIds.includes(spotlightEvent.event.id)
                      ? 'bg-amber-50 text-amber-600 border-amber-300'
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                  }`}
                  title="Lưu sự kiện"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      bookmarkedIds.includes(spotlightEvent.event.id) ? 'fill-current' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4 Quick Categories Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-sans">
              Danh mục Tra cứu Nhanh
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Khám phá theo các chủ đề di sản và giá trị văn hóa tiêu biểu
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('calendar')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Toàn bộ sự kiện</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.category}
                onClick={() => onNavigateTab('calendar', cat.category)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-2xs hover:shadow-md ${cat.bg}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-white shadow-2xs ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-white text-slate-700 shadow-2xs">
                    {cat.count} mục
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">{cat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{cat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* National Cultural Heritage Metrics */}
      <section className="bg-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-300">
            Dữ liệu di sản quốc gia Việt Nam
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Bảo tồn & Lan tỏa Giá trị Văn hóa 54 Dân tộc
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="block text-3xl sm:text-4xl font-black text-amber-400">54</span>
              <span className="text-xs text-blue-100 font-medium">Dân tộc anh em</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="block text-3xl sm:text-4xl font-black text-emerald-400">63</span>
              <span className="text-xs text-blue-100 font-medium">Tỉnh thành toàn quốc</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="block text-3xl sm:text-4xl font-black text-blue-300">500+</span>
              <span className="text-xs text-blue-100 font-medium">Lễ hội trong danh mục</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span className="block text-3xl sm:text-4xl font-black text-rose-300">15+</span>
              <span className="text-xs text-blue-100 font-medium">Di sản UNESCO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Festivals List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-sans">
              Lễ hội & Sự kiện Nổi bật Năm {targetYear}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Quy đổi ngày Dương lịch và Âm lịch tương ứng theo từng mốc thời gian
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('calendar')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Mở lịch xem theo tháng</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCalculated.slice(0, 6).map((item) => (
            <div
              key={item.event.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={item.event.imageUrl}
                  alt={item.event.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-600 text-white uppercase">
                    {item.event.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 backdrop-blur-xs text-white">
                    {item.event.province}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(item.event.id);
                  }}
                  className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition ${
                    bookmarkedIds.includes(item.event.id)
                      ? 'bg-amber-500 text-white'
                      : 'bg-black/40 text-white hover:bg-black/60'
                  }`}
                  title="Lưu lễ hội"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      bookmarkedIds.includes(item.event.id) ? 'fill-current' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-blue-700 font-semibold mb-1">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>DL: {item.solarStartDate}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-600">ÂL: {item.lunarStartDateText.split('(')[0]}</span>
                  </div>
                  <h3
                    onClick={() => onSelectEvent(item.event)}
                    className="font-extrabold text-slate-900 text-base line-clamp-1 group-hover:text-blue-600 transition cursor-pointer"
                  >
                    {item.event.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                    {item.event.historicalOrigin}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate max-w-[180px]">
                    <FileText className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate" title={item.event.legalBasis.documentNumber}>
                      {item.event.legalBasis.documentNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectEvent(item.event)}
                    className="text-blue-600 font-bold hover:underline shrink-0"
                  >
                    Chi tiết &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mandatory Legal Advisory Banner */}
      <section className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Lưu ý quan trọng: </strong>
          <span>{LEGAL_DISCLAIMER}</span>
        </div>
      </section>
    </div>
  );
};
