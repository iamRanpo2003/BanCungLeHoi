import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  List,
  Grid,
  MapPin,
  FileText,
  Clock,
  Sparkles,
  Info,
  ArrowRightLeft,
} from 'lucide-react';
import { FestivalEvent, Region, EventCategory, AppLanguage } from '../types/festival';
import { solarToLunar, lunarToSolar } from '../utils/lunarCalendar';
import { calculateAllEventsForYear } from '../utils/festivalCalculator';
import { exportToICS, exportToCSV } from '../utils/dataExporter';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';
import { getSavedConverterDraft, saveConverterDraft } from '../utils/storage';
import { getTranslation } from '../utils/i18n';

interface CalendarTimelineViewProps {
  events: FestivalEvent[];
  targetYear: number;
  setTargetYear: (year: number) => void;
  onSelectEvent: (event: FestivalEvent) => void;
  initialCategoryFilter?: EventCategory;
  lang?: AppLanguage;
}

export const CalendarTimelineView: React.FC<CalendarTimelineViewProps> = ({
  events,
  targetYear,
  setTargetYear,
  onSelectEvent,
  initialCategoryFilter,
  lang = 'vi',
}) => {
  const t = getTranslation(lang);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // 1-12
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>(
    initialCategoryFilter || 'All'
  );
  const [selectedProvince, setSelectedProvince] = useState<string>('All');

  // Interactive conversion tool state initialized with persistent draft!
  const [converterOpen, setConverterOpen] = useState(false);
  const savedConv = getSavedConverterDraft();
  const [convType, setConvType] = useState<'lunarToSolar' | 'solarToLunar'>(savedConv.convType);
  const [convLunarDay, setConvLunarDay] = useState(savedConv.lunarDay);
  const [convLunarMonth, setConvLunarMonth] = useState(savedConv.lunarMonth);
  const [convLunarYear, setConvLunarYear] = useState(savedConv.lunarYear || targetYear);
  const [convSolarDay, setConvSolarDay] = useState(savedConv.solarDay);
  const [convSolarMonth, setConvSolarMonth] = useState(savedConv.solarMonth);
  const [convSolarYear, setConvSolarYear] = useState(savedConv.solarYear || targetYear);

  // Sync draft whenever user edits converter values
  const updateConverter = (partial: Partial<typeof savedConv>) => {
    const updated = {
      convType,
      lunarDay: convLunarDay,
      lunarMonth: convLunarMonth,
      lunarYear: convLunarYear,
      solarDay: convSolarDay,
      solarMonth: convSolarMonth,
      solarYear: convSolarYear,
      ...partial,
    };
    if (partial.convType !== undefined) setConvType(partial.convType);
    if (partial.lunarDay !== undefined) setConvLunarDay(partial.lunarDay);
    if (partial.lunarMonth !== undefined) setConvLunarMonth(partial.lunarMonth);
    if (partial.lunarYear !== undefined) setConvLunarYear(partial.lunarYear);
    if (partial.solarDay !== undefined) setConvSolarDay(partial.solarDay);
    if (partial.solarMonth !== undefined) setConvSolarMonth(partial.solarMonth);
    if (partial.solarYear !== undefined) setConvSolarYear(partial.solarYear);
    saveConverterDraft(updated);
  };

  // Provinces list from current events
  const provinces = Array.from(new Set(events.map((e) => e.province))).sort();

  // All calculated events in targetYear
  const allCalculated = calculateAllEventsForYear(events, targetYear);

  // Filtered by criteria
  const filteredEvents = allCalculated.filter((item) => {
    if (selectedRegion !== 'All' && item.event.region !== selectedRegion) return false;
    if (selectedCategory !== 'All' && item.event.category !== selectedCategory) return false;
    if (selectedProvince !== 'All' && !item.event.province.includes(selectedProvince)) return false;
    return true;
  });

  // Days in month
  const daysInMonth = new Date(targetYear, selectedMonth, 0).getDate();
  const firstDayOfWeek = new Date(targetYear, selectedMonth - 1, 1).getDay(); // 0: CN, 1: T2 ...

  // Instant calculation for conversion tool
  let convertedResultText = '';
  if (convType === 'lunarToSolar') {
    const res = lunarToSolar(convLunarDay, convLunarMonth, convLunarYear);
    if (res.year > 0) {
      const targetDate = new Date(res.year, res.month - 1, res.day);
      const weekdayStr =
        lang === 'vi'
          ? (targetDate.getDay() === 0 ? 'Chủ Nhật' : `Thứ ${targetDate.getDay() + 1}`)
          : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][targetDate.getDay()];
      convertedResultText =
        lang === 'vi'
          ? `Ngày ${convLunarDay}/${convLunarMonth} Âm lịch năm ${convLunarYear} = Dương lịch: ${weekdayStr}, ngày ${res.day}/${res.month}/${res.year}`
          : `Lunar date ${convLunarDay}/${convLunarMonth}/${convLunarYear} = Solar: ${weekdayStr}, ${res.day}/${res.month}/${res.year}`;
    } else {
      convertedResultText = lang === 'vi' ? 'Ngày âm lịch không hợp lệ' : 'Invalid lunar date';
    }
  } else {
    const res = solarToLunar(convSolarDay, convSolarMonth, convSolarYear);
    const targetDate = new Date(convSolarYear, convSolarMonth - 1, convSolarDay);
    const weekdayStr =
      lang === 'vi'
        ? (targetDate.getDay() === 0 ? 'Chủ Nhật' : `Thứ ${targetDate.getDay() + 1}`)
        : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][targetDate.getDay()];
    convertedResultText =
      lang === 'vi'
        ? `${weekdayStr}, ngày ${convSolarDay}/${convSolarMonth}/${convSolarYear} Dương lịch = Âm lịch: Ngày ${res.day} tháng ${res.month} (${res.canChiDay}) năm ${res.canChiYear} • Tiết: ${res.solarTerm}`
        : `${weekdayStr}, ${convSolarDay}/${convSolarMonth}/${convSolarYear} Solar = Lunar: Day ${res.day} Month ${res.month} (${res.canChiDay}) Year ${res.canChiYear} • Solar Term: ${res.solarTerm}`;
  }

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setTargetYear(targetYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setTargetYear(targetYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const monthNames =
    lang === 'vi'
      ? ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const weekDayHeaders =
    lang === 'vi'
      ? ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="bg-white p-6 rounded-3xl border border-amber-200/90 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-red-50 text-red-700">
                <CalendarIcon className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-black text-stone-900 font-serif">
                {t.calendar.title}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t.calendar.subtitle}
            </p>
          </div>

          {/* Year selector & Quick Exporters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-stone-100 p-1 rounded-xl">
              <button
                onClick={() => setTargetYear(targetYear - 1)}
                className="p-1.5 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-white"
                title="Năm trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 text-sm font-extrabold text-red-950 font-mono">
                {lang === 'vi' ? `Năm ${targetYear}` : `Year ${targetYear}`}
              </span>
              <button
                onClick={() => setTargetYear(targetYear + 1)}
                className="p-1.5 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-white"
                title="Năm sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Open Converter Button */}
            <button
              onClick={() => setConverterOpen(!converterOpen)}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-amber-100 text-amber-950 border border-amber-300 hover:bg-amber-200 transition"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-800" />
              <span>{t.converter.tabTitle}</span>
            </button>

            {/* Export ICS */}
            <button
              onClick={() => exportToICS(filteredEvents)}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-red-700 text-white hover:bg-red-800 transition shadow-xs"
              title="Xuất file iCalendar .ics"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.calendar.exportICS}</span>
            </button>
          </div>
        </div>

        {/* Converter Tool Card (Collapsible, Persisted) */}
        {converterOpen && (
          <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{t.converter.boxTitle}</span>
                <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-mono">
                  {lang === 'vi' ? 'Dữ liệu được tự động lưu' : 'Auto-saved'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateConverter({ convType: 'lunarToSolar' })}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold transition ${
                    convType === 'lunarToSolar'
                      ? 'bg-red-700 text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-amber-100'
                  }`}
                >
                  {t.converter.lunarToSolar}
                </button>
                <button
                  onClick={() => updateConverter({ convType: 'solarToLunar' })}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold transition ${
                    convType === 'solarToLunar'
                      ? 'bg-red-700 text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-amber-100'
                  }`}
                >
                  {t.converter.solarToLunar}
                </button>
              </div>
            </div>

            {/* Converter Inputs */}
            {convType === 'lunarToSolar' ? (
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-bold mb-1">{t.converter.dayLunar}</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={convLunarDay}
                    onChange={(e) => updateConverter({ lunarDay: Number(e.target.value) })}
                    className="w-full bg-white px-3 py-2 border border-amber-300 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-bold mb-1">{t.converter.monthLunar}</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={convLunarMonth}
                    onChange={(e) => updateConverter({ lunarMonth: Number(e.target.value) })}
                    className="w-full bg-white px-3 py-2 border border-amber-300 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-bold mb-1">{t.converter.year}</label>
                  <input
                    type="number"
                    value={convLunarYear}
                    onChange={(e) => updateConverter({ lunarYear: Number(e.target.value) })}
                    className="w-full bg-white px-3 py-2 border border-amber-300 rounded-xl font-bold font-mono"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-bold mb-1">{t.converter.daySolar}</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={convSolarDay}
                    onChange={(e) => updateConverter({ solarDay: Number(e.target.value) })}
                    className="w-full bg-white px-3 py-2 border border-amber-300 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-bold mb-1">{t.converter.monthSolar}</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={convSolarMonth}
                    onChange={(e) => updateConverter({ solarMonth: Number(e.target.value) })}
                    className="w-full bg-white px-3 py-2 border border-amber-300 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-bold mb-1">{t.converter.year}</label>
                  <input
                    type="number"
                    value={convSolarYear}
                    onChange={(e) => updateConverter({ solarYear: Number(e.target.value) })}
                    className="w-full bg-white px-3 py-2 border border-amber-300 rounded-xl font-bold font-mono"
                  />
                </div>
              </div>
            )}

            {/* Result Box */}
            <div className="p-3 bg-white rounded-xl border border-amber-300 text-xs text-stone-800 font-medium leading-relaxed">
              <strong className="text-red-800 block text-xs uppercase mb-0.5">
                {t.converter.resultLabel}:
              </strong>
              {convertedResultText}
            </div>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Region Filter */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as Region | 'All')}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 font-semibold text-stone-700 focus:outline-none"
            >
              <option value="All">{t.calendar.filterAllRegions}</option>
              <option value="Bắc">{lang === 'vi' ? 'Miền Bắc' : 'Northern'}</option>
              <option value="Trung">{lang === 'vi' ? 'Miền Trung' : 'Central'}</option>
              <option value="Nam">{lang === 'vi' ? 'Miền Nam (bao gồm Tây Nam Bộ)' : 'Southern & Mekong Delta'}</option>
              <option value="Tây Nguyên">{lang === 'vi' ? 'Tây Nguyên' : 'Central Highlands'}</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as EventCategory | 'All')}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 font-semibold text-stone-700 focus:outline-none"
            >
              <option value="All">{t.calendar.filterAllCategories}</option>
              <option value="Lễ hội">{lang === 'vi' ? 'Lễ hội' : 'Festivals'}</option>
              <option value="Sự kiện lịch sử">{lang === 'vi' ? 'Sự kiện lịch sử' : 'History'}</option>
              <option value="Danh nhân">{lang === 'vi' ? 'Danh nhân' : 'Figures'}</option>
              <option value="Phong tục">{lang === 'vi' ? 'Phong tục' : 'Customs'}</option>
            </select>

            {/* Province Filter */}
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 font-semibold text-stone-700 focus:outline-none max-w-[240px]"
            >
              <option value="All">{t.calendar.filterAllProvinces}</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Grid vs Timeline toggle */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg transition ${
                viewMode === 'grid'
                  ? 'bg-white text-red-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{t.calendar.gridMonthly}</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg transition ${
                viewMode === 'timeline'
                  ? 'bg-white text-red-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{t.calendar.timelineFullYear}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Month Carousel in Grid View */}
      {viewMode === 'grid' && (
        <div className="flex items-center justify-between bg-white px-6 py-3 rounded-2xl border border-amber-200/80 shadow-xs">
          <button
            onClick={handlePrevMonth}
            className="p-2 text-stone-700 hover:text-red-700 rounded-xl hover:bg-stone-50 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h2 className="text-lg font-black text-stone-900 font-serif">
              {monthNames[selectedMonth - 1]} - {targetYear}
            </h2>
            <p className="text-[11px] text-stone-500">
              {lang === 'vi' ? 'Quy đổi song song Âm - Dương' : 'Dual Lunar - Solar Synchronization'}
            </p>
          </div>
          <button
            onClick={handleNextMonth}
            className="p-2 text-stone-700 hover:text-red-700 rounded-xl hover:bg-stone-50 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Grid Calendar Presentation */}
      {viewMode === 'grid' ? (
        <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xs overflow-x-auto">
          <div className="min-w-[640px]">
          {/* Day of week headers */}
          <div className="grid grid-cols-7 border-b border-stone-200 bg-amber-50/50 text-center py-2.5 text-xs font-bold text-stone-700">
            {weekDayHeaders.map((d, idx) => (
              <span key={d} className={idx === 0 ? 'text-red-700' : ''}>
                {d}
              </span>
            ))}
          </div>

          {/* Calendar cell boxes */}
          <div className="grid grid-cols-7 divide-x divide-y divide-stone-100 min-h-[460px]">
            {/* Blank leading slots */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div key={`blank-${idx}`} className="bg-stone-50/40 p-2 min-h-[90px]" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const lunarInfo = solarToLunar(day, selectedMonth, targetYear);
              const dayEvents = filteredEvents.filter((item) => {
                const sParts = item.solarStartDate.split('/');
                return Number(sParts[0]) === day && Number(sParts[1]) === selectedMonth;
              });

              const isFirstOrFifteen = lunarInfo.day === 1 || lunarInfo.day === 15;

              return (
                <div
                  key={`day-${day}`}
                  className="p-2 min-h-[90px] hover:bg-amber-50/40 transition flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-extrabold text-stone-900 group-hover:text-red-700">
                      {day}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1 rounded ${
                        isFirstOrFifteen
                          ? 'bg-amber-500 text-stone-950 font-black'
                          : 'text-stone-500'
                      }`}
                      title={`Âm lịch: Ngày ${lunarInfo.day}/${lunarInfo.month}`}
                    >
                      {lunarInfo.day === 1 ? `${lunarInfo.day}/${lunarInfo.month}` : lunarInfo.day}
                    </span>
                  </div>

                  {/* Festivals on this day */}
                  <div className="space-y-1 my-1">
                    {dayEvents.map((evItem) => {
                      const fName =
                        lang === 'en' && evItem.event.en?.name
                          ? evItem.event.en.name
                          : evItem.event.name;
                      return (
                        <button
                          key={evItem.event.id}
                          onClick={() => onSelectEvent(evItem.event)}
                          title={`${fName} (${evItem.lunarStartDateText})`}
                          className="w-full text-left text-[10px] font-bold p-1 rounded bg-red-50 hover:bg-red-700 hover:text-white text-red-900 border border-red-200 transition truncate block"
                        >
                          {fName}
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-[9px] text-stone-500 truncate">
                    {lunarInfo.solarTerm || ''}
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </div>
      ) : (
        /* Timeline List Presentation */
        <div className="space-y-3">
          {filteredEvents.map((item) => {
            const fName =
              lang === 'en' && item.event.en?.name ? item.event.en.name : item.event.name;
            const fOrigin =
              lang === 'en' && item.event.en?.historicalOrigin
                ? item.event.en.historicalOrigin
                : item.event.historicalOrigin;
            return (
              <div
                key={item.event.id}
                onClick={() => onSelectEvent(item.event)}
                className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-2xs hover:shadow-md hover:border-red-300 transition cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-700 text-amber-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] uppercase font-bold">
                      {lang === 'vi' ? 'Dương lịch' : 'Solar'}
                    </span>
                    <span className="text-sm font-black">{item.solarStartDate}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-800">
                      <span>{item.event.province}</span>
                      <span>•</span>
                      <span>
                        {lang === 'vi' ? `Dân tộc ${item.event.ethnicGroup}` : `Ethnic ${item.event.ethnicGroup}`}
                      </span>
                      <span>•</span>
                      <span className="text-amber-700 font-bold">
                        {lang === 'vi' ? `Âm lịch: ${item.lunarStartDateText}` : `Lunar: ${item.lunarStartDateText}`}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-stone-900 font-serif">{fName}</h3>
                    <p className="text-xs text-stone-600 line-clamp-1">{fOrigin}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent(item.event);
                    }}
                    className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl transition"
                  >
                    {lang === 'vi' ? 'Xem chi tiết' : 'Details'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
