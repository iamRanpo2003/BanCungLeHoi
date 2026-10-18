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
import { FestivalEvent, Region, EventCategory } from '../types/festival';
import { solarToLunar, lunarToSolar } from '../utils/lunarCalendar';
import { calculateAllEventsForYear } from '../utils/festivalCalculator';
import { exportToICS, exportToCSV } from '../utils/dataExporter';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';

interface CalendarTimelineViewProps {
  events: FestivalEvent[];
  targetYear: number;
  setTargetYear: (year: number) => void;
  onSelectEvent: (event: FestivalEvent) => void;
  initialCategoryFilter?: EventCategory;
}

export const CalendarTimelineView: React.FC<CalendarTimelineViewProps> = ({
  events,
  targetYear,
  setTargetYear,
  onSelectEvent,
  initialCategoryFilter,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // 1-12
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>(
    initialCategoryFilter || 'All'
  );
  const [selectedProvince, setSelectedProvince] = useState<string>('All');

  // Interactive conversion tool state
  const [converterOpen, setConverterOpen] = useState(false);
  const [convType, setConvType] = useState<'lunarToSolar' | 'solarToLunar'>('lunarToSolar');
  const [convLunarDay, setConvLunarDay] = useState(10);
  const [convLunarMonth, setConvLunarMonth] = useState(3);
  const [convLunarYear, setConvLunarYear] = useState(targetYear);
  const [convSolarDay, setConvSolarDay] = useState(18);
  const [convSolarMonth, setConvSolarMonth] = useState(10);
  const [convSolarYear, setConvSolarYear] = useState(targetYear);

  // Provinces list from current events
  const provinces = Array.from(new Set(events.map((e) => e.province))).sort();

  // Tính toán tất cả sự kiện trong targetYear
  const allCalculated = calculateAllEventsForYear(events, targetYear);

  // Lọc theo bộ lọc
  const filteredEvents = allCalculated.filter((item) => {
    if (selectedRegion !== 'All' && item.event.region !== selectedRegion) return false;
    if (selectedCategory !== 'All' && item.event.category !== selectedCategory) return false;
    if (selectedProvince !== 'All' && !item.event.province.includes(selectedProvince)) return false;
    return true;
  });

  // Số ngày trong tháng đã chọn
  const daysInMonth = new Date(targetYear, selectedMonth, 0).getDate();
  const firstDayOfWeek = new Date(targetYear, selectedMonth - 1, 1).getDay(); // 0: CN, 1: T2 ...

  // Chuyển đổi công cụ tức thời
  let convertedResultText = '';
  if (convType === 'lunarToSolar') {
    const res = lunarToSolar(convLunarDay, convLunarMonth, convLunarYear);
    convertedResultText = `Ngày ${convLunarDay}/${convLunarMonth} Âm lịch năm ${convLunarYear} = Dương lịch: Thứ ..., ngày ${res.day}/${res.month}/${res.year}`;
  } else {
    const res = solarToLunar(convSolarDay, convSolarMonth, convSolarYear);
    convertedResultText = `Ngày ${convSolarDay}/${convSolarMonth}/${convSolarYear} Dương lịch = Âm lịch: Ngày ${res.day} tháng ${res.month} năm ${res.canChiYear} (${res.solarTerm})`;
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

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <CalendarIcon className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-black text-slate-900 font-sans">
                Lịch Lễ Hội & Sự Kiện Theo Dòng Thời Gian
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Hệ thống tự động quy đổi Âm lịch sang Dương lịch chính xác cho từng năm
            </p>
          </div>

          {/* Year selector & Quick Exporters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setTargetYear(targetYear - 1)}
                className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white"
                title="Năm trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 text-sm font-extrabold text-blue-900">
                Năm {targetYear}
              </span>
              <button
                onClick={() => setTargetYear(targetYear + 1)}
                className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white"
                title="Năm kế tiếp"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Export Data Buttons */}
            <button
              onClick={() => exportToICS(filteredEvents)}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition"
              title="Xuất file iCal (.ics) để thêm vào Google Calendar hoặc điện thoại"
            >
              <Download className="w-3.5 h-3.5" /> Xuất iCal
            </button>
            <button
              onClick={() => exportToCSV(filteredEvents)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              title="Xuất bảng Excel/CSV để nghiên cứu và trích xuất dữ liệu"
            >
              <Download className="w-3.5 h-3.5" /> Xuất CSV
            </button>

            {/* Open Lunar-Solar Converter Tool */}
            <button
              onClick={() => setConverterOpen(!converterOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition ${
                converterOpen
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" /> Công cụ Quy đổi Âm - Dương
            </button>
          </div>
        </div>

        {/* Interactive Converter Drawer / Panel */}
        {converterOpen && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-200 text-xs text-slate-800 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-amber-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Mô hình quy đổi Lịch Âm - Dương & Tính toán sự kiện định kỳ (Hồ Ngọc Đức)
              </span>
              <div className="flex gap-1 bg-white p-1 rounded-lg border border-amber-200">
                <button
                  onClick={() => setConvType('lunarToSolar')}
                  className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                    convType === 'lunarToSolar' ? 'bg-amber-500 text-white' : 'text-slate-600'
                  }`}
                >
                  Âm sang Dương
                </button>
                <button
                  onClick={() => setConvType('solarToLunar')}
                  className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                    convType === 'solarToLunar' ? 'bg-amber-500 text-white' : 'text-slate-600'
                  }`}
                >
                  Dương sang Âm
                </button>
              </div>
            </div>

            {convType === 'lunarToSolar' ? (
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  <span>Ngày Âm:</span>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={convLunarDay}
                    onChange={(e) => setConvLunarDay(Number(e.target.value))}
                    className="w-16 bg-white px-2 py-1.5 border border-amber-300 rounded-lg text-center font-bold"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span>Tháng Âm:</span>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={convLunarMonth}
                    onChange={(e) => setConvLunarMonth(Number(e.target.value))}
                    className="w-16 bg-white px-2 py-1.5 border border-amber-300 rounded-lg text-center font-bold"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span>Năm Dương lịch cần xem:</span>
                  <input
                    type="number"
                    value={convLunarYear}
                    onChange={(e) => setConvLunarYear(Number(e.target.value))}
                    className="w-20 bg-white px-2 py-1.5 border border-amber-300 rounded-lg text-center font-bold"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  <span>Ngày Dương:</span>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={convSolarDay}
                    onChange={(e) => setConvSolarDay(Number(e.target.value))}
                    className="w-16 bg-white px-2 py-1.5 border border-amber-300 rounded-lg text-center font-bold"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span>Tháng Dương:</span>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={convSolarMonth}
                    onChange={(e) => setConvSolarMonth(Number(e.target.value))}
                    className="w-16 bg-white px-2 py-1.5 border border-amber-300 rounded-lg text-center font-bold"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span>Năm Dương:</span>
                  <input
                    type="number"
                    value={convSolarYear}
                    onChange={(e) => setConvSolarYear(Number(e.target.value))}
                    className="w-20 bg-white px-2 py-1.5 border border-amber-300 rounded-lg text-center font-bold"
                  />
                </div>
              </div>
            )}

            <div className="bg-white p-3 rounded-xl border border-amber-300 font-bold text-amber-900 text-xs sm:text-sm">
              Kết quả: {convertedResultText}
            </div>
          </div>
        )}

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Lọc:
            </span>

            {/* Region Filter */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as any)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">Toàn quốc (3 Miền)</option>
              <option value="Bắc">Miền Bắc</option>
              <option value="Trung">Miền Trung</option>
              <option value="Tây Nguyên">Tây Nguyên</option>
              <option value="Nam">Miền Nam</option>
            </select>

            {/* Province Filter */}
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">Tất cả tỉnh thành</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">Tất cả chủ đề</option>
              <option value="Lễ hội">Lễ hội truyền thống</option>
              <option value="Sự kiện lịch sử">Sự kiện lịch sử</option>
              <option value="Danh nhân">Danh nhân đất Việt</option>
              <option value="Phong tục">Phong tục tập quán</option>
            </select>
          </div>

          {/* View Mode Toggle: Grid vs Timeline */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'grid' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> Lịch Tháng
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'timeline' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-3.5 h-3.5" /> Dòng Thời Gian
            </button>
          </div>
        </div>
      </div>

      {/* Main View: Month Grid or Timeline */}
      {viewMode === 'grid' ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          {/* Month Navigation Tabs */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <button
              onClick={handlePrevMonth}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-xl"
            >
              <ChevronLeft className="w-4 h-4" /> Tháng trước
            </button>

            <div className="text-center">
              <span className="text-lg font-black text-blue-950 font-sans">
                Tháng {selectedMonth} / {targetYear}
              </span>
              <p className="text-[11px] text-slate-500">
                (Click vào ngày có dấu chấm hoặc thẻ lễ hội để xem chi tiết nghi thức)
              </p>
            </div>

            <button
              onClick={handleNextMonth}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 hover:bg-slate-50 rounded-xl"
            >
              Tháng sau <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick 12 Months Bar */}
          <div className="flex overflow-x-auto gap-1 pb-1">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                  selectedMonth === m
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Tháng {m}
              </button>
            ))}
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-400 uppercase py-2 border-y border-slate-100">
            <span className="text-rose-500">CN</span>
            <span>T2</span>
            <span>T3</span>
            <span>T4</span>
            <span>T5</span>
            <span>T6</span>
            <span className="text-blue-600">T7</span>
          </div>

          {/* Month Grid Cells */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Empty offset days */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="min-h-[90px] sm:min-h-[110px] bg-slate-50/40 rounded-xl" />
            ))}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `${targetYear}-${selectedMonth < 10 ? '0' : ''}${selectedMonth}-${
                dayNum < 10 ? '0' : ''
              }${dayNum}`;

              // Tính âm lịch của ngày này
              const lunar = solarToLunar(dayNum, selectedMonth, targetYear);

              // Tìm sự kiện diễn ra ngày này
              const dayEvents = filteredEvents.filter((item) => {
                return dateStr >= item.solarStartDate && dateStr <= item.solarEndDate;
              });

              const isFirstOrFifteen = lunar.day === 1 || lunar.day === 15;

              return (
                <div
                  key={dayNum}
                  className={`min-h-[90px] sm:min-h-[110px] p-1.5 sm:p-2 rounded-xl border transition flex flex-col justify-between ${
                    dayEvents.length > 0
                      ? 'bg-blue-50/40 border-blue-200 hover:border-blue-400 shadow-2xs'
                      : 'bg-white border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-sm sm:text-base font-extrabold ${
                        dayEvents.length > 0 ? 'text-blue-700' : 'text-slate-800'
                      }`}
                    >
                      {dayNum}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-1 rounded-sm ${
                        isFirstOrFifteen
                          ? 'bg-amber-100 text-amber-800 font-bold'
                          : 'text-slate-600'
                      }`}
                      title={`Ngày ${lunar.day}/${lunar.month} Âm lịch (${lunar.canChiDay})`}
                    >
                      {lunar.day}/{lunar.month}
                    </span>
                  </div>

                  {/* Day Events Badges */}
                  <div className="space-y-1 mt-1 flex-1 overflow-hidden">
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.event.id}
                        onClick={() => onSelectEvent(ev.event)}
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 truncate cursor-pointer shadow-2xs"
                        title={`${ev.event.name} (${ev.event.province}) - Bấm xem chi tiết`}
                      >
                        {ev.event.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Timeline View */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-black text-slate-900 font-sans">
              Dòng Thời Gian Lễ Hội Toàn Bộ Năm {targetYear} ({filteredEvents.length} sự kiện)
            </h2>
            <span className="text-xs text-slate-500">
              Sắp xếp tuần tự theo ngày Dương lịch tương ứng
            </span>
          </div>

          <div className="relative border-l-2 border-blue-200 ml-4 pl-6 space-y-8">
            {filteredEvents.map((item) => (
              <div key={item.event.id} className="relative group">
                {/* Timeline Dot */}
                <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-xs group-hover:scale-125 transition" />

                <div className="bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-200 p-5 rounded-2xl transition space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-blue-600 text-white">
                        {item.solarStartDate}
                        {item.solarStartDate !== item.solarEndDate && ` → ${item.solarEndDate}`}
                      </span>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        {item.lunarStartDateText}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {item.event.region} • {item.event.province}
                    </span>
                  </div>

                  <div>
                    <h3
                      onClick={() => onSelectEvent(item.event)}
                      className="text-lg font-black text-slate-900 hover:text-blue-600 transition cursor-pointer"
                    >
                      {item.event.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {item.event.historicalOrigin}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Căn cứ pháp lý: <strong>{item.event.legalBasis.documentNumber}</strong></span>
                    </div>

                    <button
                      onClick={() => onSelectEvent(item.event)}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Xem nghi thức & đường đi &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
