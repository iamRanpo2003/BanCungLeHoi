import React from 'react';
import {
  Calendar as CalendarIcon,
  Search,
  Sparkles,
  Award,
  ChevronRight,
  Clock,
  Compass,
  Landmark,
  Bookmark,
  Info,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { FestivalEvent, EventCategory, AppLanguage, AccessibilitySettings } from '../types/festival';
import { solarToLunar, getHoangDaoHours } from '../utils/lunarCalendar';
import { calculateAllEventsForYear } from '../utils/festivalCalculator';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';
import { getTranslation } from '../utils/i18n';
import { tts } from '../utils/textToSpeech';

interface HomeViewProps {
  events: FestivalEvent[];
  targetYear: number;
  onSelectEvent: (event: FestivalEvent) => void;
  onNavigateTab: (tab: string, categoryFilter?: EventCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  lang?: AppLanguage;
  a11y?: AccessibilitySettings;
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
  lang = 'vi',
  a11y,
}) => {
  const t = getTranslation(lang);
  const [isSpeakingSpotlight, setIsSpeakingSpotlight] = React.useState(false);

  React.useEffect(() => {
    const unsub = tts.subscribe((status) => {
      setIsSpeakingSpotlight(status.isSpeaking);
    });
    return unsub;
  }, []);

  // Today dates
  const today = new Date();
  const currentSolarDay = today.getDate();
  const currentSolarMonth = today.getMonth() + 1;
  const currentSolarYear = today.getFullYear();

  // Lunar calculation today
  const todayLunar = solarToLunar(currentSolarDay, currentSolarMonth, currentSolarYear);
  const hoangDaoHours = getHoangDaoHours(todayLunar.canChiDay);

  // Calculate all events for year
  const allCalculated = calculateAllEventsForYear(events, targetYear, today);

  // Filter with search query
  const filteredCalculated = allCalculated.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = item.event.name.toLowerCase().includes(q);
    const enNameMatch = item.event.en?.name?.toLowerCase().includes(q);
    const provMatch = item.event.province.toLowerCase().includes(q);
    const ethMatch = item.event.ethnicGroup.toLowerCase().includes(q);
    const tagMatch = item.event.tags.some((tg) => tg.toLowerCase().includes(q));
    return nameMatch || enNameMatch || provMatch || ethMatch || tagMatch;
  });

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
      title: lang === 'vi' ? 'Lễ hội Truyền thống' : 'Traditional Festivals',
      desc: lang === 'vi' ? 'Hội làng, lễ hội nông nghiệp, hội xuân 3 miền' : 'Village pageants, seasonal festivals across regions',
      icon: Landmark,
      color: 'text-red-800',
      bg: 'bg-red-50/70 border-red-200 hover:border-red-400',
      count: events.filter((e) => e.category === 'Lễ hội').length,
    },
    {
      category: 'Sự kiện lịch sử',
      title: lang === 'vi' ? 'Sự kiện Lịch sử' : 'Historical Events',
      desc: lang === 'vi' ? 'Chiến thắng oanh liệt, ngày kỷ niệm non sông' : 'Milestone victories, national heritage commemorations',
      icon: Clock,
      color: 'text-amber-800',
      bg: 'bg-amber-50/70 border-amber-200 hover:border-amber-400',
      count: events.filter((e) => e.category === 'Sự kiện lịch sử').length,
    },
    {
      category: 'Danh nhân',
      title: lang === 'vi' ? 'Danh nhân Đất Việt' : 'Eminent Historical Figures',
      desc: lang === 'vi' ? 'Tưởng niệm các bậc tiền nhân, anh hùng dân tộc' : 'Commemorating national heroes and cultural figures',
      icon: Award,
      color: 'text-stone-800',
      bg: 'bg-stone-100/70 border-stone-200 hover:border-stone-400',
      count: events.filter((e) => e.category === 'Danh nhân').length,
    },
    {
      category: 'Phong tục',
      title: lang === 'vi' ? 'Phong tục Tập quán' : 'Customs & Traditions',
      desc: lang === 'vi' ? 'Tín ngưỡng và bản sắc văn hóa 54 dân tộc' : 'Spiritual beliefs and folk rituals of 54 ethnic groups',
      icon: Compass,
      color: 'text-emerald-800',
      bg: 'bg-emerald-50/70 border-emerald-200 hover:border-emerald-400',
      count: events.filter((e) => e.category === 'Phong tục').length,
    },
  ];

  const handleSpotlightSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!spotlightEvent) return;
    if (isSpeakingSpotlight) {
      tts.stop();
      setIsSpeakingSpotlight(false);
    } else {
      const spName = lang === 'en' && spotlightEvent.event.en?.name ? spotlightEvent.event.en.name : spotlightEvent.event.name;
      const spOrigin = lang === 'en' && spotlightEvent.event.en?.historicalOrigin ? spotlightEvent.event.en.historicalOrigin : spotlightEvent.event.historicalOrigin;
      const text =
        lang === 'vi'
          ? `Sự kiện tiêu biểu: Lễ hội ${spName}. Diễn ra tại ${spotlightEvent.event.locationName}, tỉnh ${spotlightEvent.event.province}. Dân tộc ${spotlightEvent.event.ethnicGroup}. Thời gian: Ngày ${spotlightEvent.solarStartDate} dương lịch, tức ngày ${spotlightEvent.lunarStartDateText} âm lịch. Tóm tắt nguồn gốc: ${spOrigin}`
          : `Featured festival: ${spName}. Located at ${spotlightEvent.event.locationName}, ${spotlightEvent.event.province}. Ethnic group ${spotlightEvent.event.ethnicGroup}. Takes place on solar date ${spotlightEvent.solarStartDate}, corresponding to lunar date ${spotlightEvent.lunarStartDateText}. Origin: ${spOrigin}`;

      tts.speak(text, {
        lang: lang === 'vi' ? 'vi-VN' : 'en-US',
        rate: a11y?.speechRate || 1.0,
      });
      setIsSpeakingSpotlight(true);
    }
  };

  const spotlightName = lang === 'en' && spotlightEvent?.event.en?.name ? spotlightEvent.event.en.name : spotlightEvent?.event.name;
  const spotlightOrigin = lang === 'en' && spotlightEvent?.event.en?.historicalOrigin ? spotlightEvent.event.en.historicalOrigin : spotlightEvent?.event.historicalOrigin;

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section with Heritage Aesthetics */}
      <section className="relative overflow-hidden rounded-3xl heritage-gradient-bar text-amber-50 p-6 sm:p-10 lg:p-12 shadow-xl border border-amber-600/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-serif">
            {lang === 'vi' ? (
              <>
                Khám phá & Trẩy hội cùng <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-300">
                  54 Dân tộc Việt Nam
                </span>
              </>
            ) : (
              <>
                Explore & Experience Heritage with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-300">
                  54 Ethnic Groups of Vietnam
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-amber-100/90 font-normal leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Quick Search in Hero */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <Search className="w-5 h-5 text-amber-700 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.hero.searchHint}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-amber-50 text-stone-900 placeholder-stone-500 pl-11 pr-28 py-3.5 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-400/40 font-medium text-sm border border-amber-300"
              />
              <button
                onClick={() => onNavigateTab('calendar')}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-700 hover:bg-red-800 text-amber-100 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                {t.hero.ctaCalendar}
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Bronze Ring */}
        <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full border-8 border-amber-400/20 pointer-events-none" />
      </section>

      {/* Dual Lunar - Solar Live Today Widget */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-amber-200/80 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Box 1: Solar */}
        <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-stone-200 pb-4 md:pb-0 md:pr-4">
          <div className="w-14 h-14 rounded-2xl bg-red-700 text-amber-100 flex flex-col items-center justify-center shrink-0 shadow-md shadow-red-700/20">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {lang === 'vi' ? `Tháng ${currentSolarMonth}` : `Month ${currentSolarMonth}`}
            </span>
            <span className="text-2xl font-black leading-none">{currentSolarDay}</span>
          </div>
          <div>
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider block">
              {t.widget.solarToday}
            </span>
            <div className="text-base font-extrabold text-stone-900">
              {lang === 'vi'
                ? `Thứ ${today.getDay() === 0 ? 'Chủ Nhật' : today.getDay() + 1}, ${currentSolarDay}/${currentSolarMonth}/${currentSolarYear}`
                : `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()]}, ${currentSolarDay}/${currentSolarMonth}/${currentSolarYear}`}
            </div>
            <p className="text-xs text-stone-500">{t.widget.gmtStandard}</p>
          </div>
        </div>

        {/* Box 2: Lunar */}
        <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-stone-200 pb-4 md:pb-0 md:pr-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-stone-950 flex flex-col items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {t.widget.lunarToday}
            </span>
            <span className="text-xl font-black leading-none">{todayLunar.day}</span>
          </div>
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
              {lang === 'vi'
                ? `Tháng ${todayLunar.month} ${todayLunar.isLeap ? '(Nhuận)' : ''}`
                : `Lunar Month ${todayLunar.month} ${todayLunar.isLeap ? '(Leap)' : ''}`}
            </span>
            <div className="text-sm font-extrabold text-stone-900">
              {lang === 'vi' ? `Ngày ${todayLunar.canChiDay}` : `Day ${todayLunar.canChiDay}`}
            </div>
            <p className="text-xs text-stone-600">
              {lang === 'vi' ? 'Năm ' : 'Year '}
              <strong>{todayLunar.canChiYear}</strong> • {lang === 'vi' ? 'Tiết: ' : 'Solar Term: '}
              <strong>{todayLunar.solarTerm}</strong>
            </p>
          </div>
        </div>

        {/* Box 3: Hoang Dao Hours */}
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            {t.widget.hoangDaoTitle}
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {hoangDaoHours.slice(0, 4).map((h, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-200"
              >
                {h}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-stone-500 pt-1">
            {t.widget.hoangDaoNote}
          </p>
        </div>
      </section>

      {/* Featured Spotlight Festival */}
      {spotlightEvent && (
        <section className="bg-gradient-to-r from-amber-50/80 via-red-50/40 to-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-xs">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-2/5 h-56 sm:h-64 rounded-2xl overflow-hidden relative shadow-md shrink-0">
              <img
                src={spotlightEvent.event.imageUrl}
                alt={spotlightName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-red-700 text-amber-100 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                {spotlightEvent.isToday
                  ? (lang === 'vi' ? 'ĐANG DIỄN RA HÔM NAY' : 'HAPPENING TODAY')
                  : (lang === 'vi' ? 'SỰ KIỆN NỔI BẬT' : 'FEATURED HERITAGE EVENT')}
              </div>
              {spotlightEvent.event.unescoRecognized && (
                <div className="absolute bottom-3 left-3 bg-amber-500 text-stone-950 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                  <Award className="w-3.5 h-3.5" /> UNESCO
                </div>
              )}
            </div>

            <div className="w-full md:w-3/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-red-800">
                  <span>{spotlightEvent.event.region}</span>
                  <span>•</span>
                  <span>{spotlightEvent.event.province}</span>
                  <span>•</span>
                  <span>
                    {lang === 'vi' ? `Dân tộc ${spotlightEvent.event.ethnicGroup}` : `Ethnic ${spotlightEvent.event.ethnicGroup}`}
                  </span>
                </div>

                {/* Narrator button for spotlight */}
                <button
                  onClick={handleSpotlightSpeak}
                  className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-200/70 hover:bg-amber-300 text-amber-950 transition"
                  title={isSpeakingSpotlight ? 'Dừng đọc' : 'Đọc tóm tắt sự kiện nổi bật'}
                >
                  {isSpeakingSpotlight ? <VolumeX className="w-3.5 h-3.5 text-red-700" /> : <Volume2 className="w-3.5 h-3.5 text-amber-800" />}
                  <span>{isSpeakingSpotlight ? (lang === 'vi' ? 'Dừng đọc' : 'Stop') : (lang === 'vi' ? 'Nghe đọc' : 'Listen')}</span>
                </button>
              </div>

              <h2
                onClick={() => onSelectEvent(spotlightEvent.event)}
                className="text-xl sm:text-2xl font-black text-stone-900 hover:text-red-700 transition cursor-pointer font-serif"
              >
                {spotlightName}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                {spotlightOrigin}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-stone-700 pt-1">
                <div>
                  <span className="text-stone-500 font-medium">
                    {lang === 'vi' ? 'Dương lịch: ' : 'Solar: '}
                  </span>
                  <span className="text-red-800 font-extrabold">{spotlightEvent.solarStartDate}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium">
                    {lang === 'vi' ? 'Âm lịch: ' : 'Lunar: '}
                  </span>
                  <span className="text-amber-800 font-extrabold">{spotlightEvent.lunarStartDateText}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectEvent(spotlightEvent.event)}
                  className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs"
                >
                  {lang === 'vi' ? 'Xem chi tiết & Nghi thức' : 'View Details & Rituals'}
                </button>
                <button
                  onClick={() => onToggleBookmark(spotlightEvent.event.id)}
                  className={`p-2 rounded-xl border transition ${
                    bookmarkedIds.includes(spotlightEvent.event.id)
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                  title={bookmarkedIds.includes(spotlightEvent.event.id) ? 'Đã lưu' : 'Lưu lại'}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(spotlightEvent.event.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Category Exploration */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-stone-900 font-serif">
              {lang === 'vi' ? 'Danh Mục Khám Phá Di Sản' : 'Heritage Discovery Categories'}
            </h2>
            <p className="text-xs text-stone-500">
              {lang === 'vi' ? 'Phân loại theo chuẩn khoa học văn hóa và nghi lễ dân gian' : 'Categorized by cultural standards and folk rituals'}
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('calendar')}
            className="flex items-center gap-1 text-xs font-bold text-red-800 hover:underline"
          >
            <span>{lang === 'vi' ? 'Xem tất cả' : 'View all'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickCategories.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.category}
                onClick={() => onNavigateTab('calendar', c.category)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${c.bg} shadow-2xs hover:shadow-md flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`p-2.5 rounded-xl bg-white shadow-2xs ${c.color}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-black text-stone-700 bg-white/80 px-2 py-0.5 rounded-full border border-stone-200/50">
                      {c.count} {lang === 'vi' ? 'sự kiện' : 'events'}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-stone-900 font-serif">{c.title}</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">{c.desc}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>{lang === 'vi' ? 'Khám phá ngay' : 'Explore now'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Grid of Festivals list */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-stone-900 font-serif">
              {lang === 'vi' ? 'Lễ Hội Tiêu Biểu Toàn Quốc' : 'National Highlights'}
            </h2>
            <p className="text-xs text-stone-500">
              {lang === 'vi'
                ? `Hiển thị ${filteredCalculated.length} sự kiện trong năm ${targetYear}`
                : `Showing ${filteredCalculated.length} festivals in year ${targetYear}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalculated.slice(0, 6).map((item) => {
            const isSaved = bookmarkedIds.includes(item.event.id);
            const festName = lang === 'en' && item.event.en?.name ? item.event.en.name : item.event.name;
            const festOrigin = lang === 'en' && item.event.en?.historicalOrigin ? item.event.en.historicalOrigin : item.event.historicalOrigin;
            return (
              <div
                key={item.event.id}
                className="bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 relative overflow-hidden bg-stone-900">
                    <img
                      src={item.event.imageUrl}
                      alt={festName}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {item.event.region} • {item.event.province}
                    </div>
                    {item.event.unescoRecognized && (
                      <div className="absolute top-2.5 right-2.5 bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <Award className="w-3 h-3" /> UNESCO
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>{lang === 'vi' ? `Dân tộc: ${item.event.ethnicGroup}` : `Ethnic: ${item.event.ethnicGroup}`}</span>
                      <span className="font-semibold text-red-800">{item.event.category}</span>
                    </div>

                    <h3
                      onClick={() => onSelectEvent(item.event)}
                      className="font-black text-base text-stone-900 hover:text-red-700 transition cursor-pointer font-serif line-clamp-1"
                    >
                      {festName}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {festOrigin}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px]">
                      {lang === 'vi' ? 'Dương lịch:' : 'Solar:'}
                    </span>
                    <strong className="text-red-800 font-extrabold">{item.solarStartDate}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleBookmark(item.event.id)}
                      className={`p-1.5 rounded-lg border transition ${
                        isSaved ? 'bg-amber-100 border-amber-300 text-amber-900' : 'border-stone-200 text-stone-500'
                      }`}
                      title={isSaved ? 'Bỏ lưu' : 'Lưu'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => onSelectEvent(item.event)}
                      className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg transition"
                    >
                      {lang === 'vi' ? 'Chi tiết' : 'Details'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mandatory Legal Disclaimer Banner at Bottom */}
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
