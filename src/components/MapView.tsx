import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  FileText,
  Calendar,
  Compass,
  Award,
  Info,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { FestivalEvent, Region, AppLanguage } from '../types/festival';
import { calculateEventForYear } from '../utils/festivalCalculator';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';
import { getTranslation } from '../utils/i18n';

interface MapViewProps {
  events: FestivalEvent[];
  targetYear: number;
  onSelectEvent: (event: FestivalEvent) => void;
  lang?: AppLanguage;
}

const USER_LOCATIONS = [
  { name: 'Hà Nội (Thủ đô)', lat: 21.0285, lng: 105.8542 },
  { name: 'Đà Nẵng (Miền Trung)', lat: 16.0544, lng: 108.2022 },
  { name: 'TP. Hồ Chí Minh (Miền Nam)', lat: 10.8231, lng: 106.6297 },
  { name: 'Buôn Ma Thuột (Tây Nguyên)', lat: 12.6667, lng: 108.05 },
  { name: 'Cần Thơ (Tây Nam Bộ)', lat: 10.0452, lng: 105.7469 },
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function projectToSvg(lat: number, lng: number): { x: number; y: number } {
  const minLat = 8.5;
  const maxLat = 23.5;
  const minLng = 102.0;
  const maxLng = 110.0;

  const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 88 - 6;
  const x = ((lng - minLng) / (maxLng - minLng)) * 85 + 7;
  return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
}

export const MapView: React.FC<MapViewProps> = ({
  events,
  targetYear,
  onSelectEvent,
  lang = 'vi',
}) => {
  const t = getTranslation(lang);
  const [selectedUserLocation, setSelectedUserLocation] = useState(USER_LOCATIONS[0]);
  const [activeEvent, setActiveEvent] = useState<FestivalEvent>(events[0]);
  const [filterRegion, setFilterRegion] = useState<Region | 'All'>('All');

  const filteredEvents = events.filter((e) => {
    if (filterRegion !== 'All' && e.region !== filterRegion) return false;
    return true;
  });

  const eventsWithDistance = filteredEvents
    .map((e) => {
      const dist = calculateDistance(
        selectedUserLocation.lat,
        selectedUserLocation.lng,
        e.coordinates.lat,
        e.coordinates.lng
      );
      return { event: e, distance: dist };
    })
    .sort((a, b) => a.distance - b.distance);

  const activeCalculated = calculateEventForYear(activeEvent, targetYear);
  const activeDistance = calculateDistance(
    selectedUserLocation.lat,
    selectedUserLocation.lng,
    activeEvent.coordinates.lat,
    activeEvent.coordinates.lng
  );

  const activeName = lang === 'en' && activeEvent.en?.name ? activeEvent.en.name : activeEvent.name;
  const activeOrigin = lang === 'en' && activeEvent.en?.historicalOrigin ? activeEvent.en.historicalOrigin : activeEvent.historicalOrigin;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-50 text-red-700">
              <Compass className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-stone-900 font-serif">
              {t.map.title}
            </h1>
          </div>
          <p className="text-base text-stone-600 mt-1">
            {t.map.subtitle}
          </p>
        </div>

        {/* User location simulator */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm text-stone-700 bg-amber-50/70 px-3 py-1.5 min-h-[44px] rounded-xl border border-amber-200 w-full sm:w-auto">
            <Navigation className="w-4 h-4 text-red-700 shrink-0" />
            <span className="font-bold shrink-0">{t.map.yourLocation}</span>
            <select
              value={selectedUserLocation.name}
              onChange={(e) => {
                const found = USER_LOCATIONS.find((l) => l.name === e.target.value);
                if (found) setSelectedUserLocation(found);
              }}
              className="bg-transparent font-bold text-red-800 focus:outline-none cursor-pointer min-h-[40px] text-base min-w-0 flex-1"
            >
              {USER_LOCATIONS.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl text-sm">
            <button
              onClick={() => setFilterRegion('All')}
              className={`px-3 py-2 min-h-[44px] rounded-lg font-bold transition ${
                filterRegion === 'All' ? 'bg-red-700 text-white shadow-xs' : 'text-stone-700'
              }`}
            >
              {lang === 'vi' ? 'Toàn quốc' : 'All'}
            </button>
            <button
              onClick={() => setFilterRegion('Bắc')}
              className={`px-3 py-2 min-h-[44px] rounded-lg font-bold transition ${
                filterRegion === 'Bắc' ? 'bg-red-700 text-white shadow-xs' : 'text-stone-700'
              }`}
            >
              {lang === 'vi' ? 'Bắc' : 'North'}
            </button>
            <button
              onClick={() => setFilterRegion('Trung')}
              className={`px-3 py-2 min-h-[44px] rounded-lg font-bold transition ${
                filterRegion === 'Trung' ? 'bg-red-700 text-white shadow-xs' : 'text-stone-700'
              }`}
            >
              {lang === 'vi' ? 'Trung' : 'Central'}
            </button>
            <button
              onClick={() => setFilterRegion('Tây Nguyên')}
              className={`px-3 py-2 min-h-[44px] rounded-lg font-bold transition ${
                filterRegion === 'Tây Nguyên' ? 'bg-red-700 text-white shadow-xs' : 'text-stone-700'
              }`}
            >
              {lang === 'vi' ? 'Tây Nguyên' : 'Highlands'}
            </button>
            <button
              onClick={() => setFilterRegion('Nam')}
              className={`px-3 py-2 min-h-[44px] rounded-lg font-bold transition ${
                filterRegion === 'Nam' ? 'bg-red-700 text-white shadow-xs' : 'text-stone-700'
              }`}
            >
              {lang === 'vi' ? 'Nam' : 'South'}
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Interactive SVG Map (Left) & Active Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Map Representation (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>{lang === 'vi' ? 'Chấm đỏ: Điểm di sản • Vòng vàng: Vị trí người dùng' : 'Red points: Heritage • Gold ring: User location'}</span>
            <span className="font-bold text-red-800">{filteredEvents.length} {lang === 'vi' ? 'điểm đến' : 'locations'}</span>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[4/5] bg-stone-900 rounded-2xl overflow-hidden border border-amber-900/40 shadow-inner flex items-center justify-center p-4">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full filter drop-shadow-md"
              style={{ overflow: 'visible' }}
            >
              {/* Vietnam map contour stylized */}
              <path
                d="M 45 6 Q 60 10 58 18 Q 50 25 54 36 Q 66 45 74 58 Q 78 70 70 80 Q 64 88 56 94 Q 48 97 40 93 Q 44 82 52 74 Q 54 62 48 48 Q 42 34 38 22 Q 36 12 45 6 Z"
                fill="#27272a"
                stroke="#d97706"
                strokeWidth="0.8"
                strokeDasharray="2,1"
              />

              {/* User location indicator */}
              {(() => {
                const userCoord = projectToSvg(selectedUserLocation.lat, selectedUserLocation.lng);
                return (
                  <g key="user-pos" className="animate-pulse">
                    <circle
                      cx={userCoord.x}
                      cy={userCoord.y}
                      r="4"
                      fill="#eab308"
                      opacity="0.3"
                    />
                    <circle cx={userCoord.x} cy={userCoord.y} r="2" fill="#facc15" />
                    <text
                      x={userCoord.x + 3}
                      y={userCoord.y + 1}
                      fontSize="2.4"
                      fill="#fef08a"
                      fontWeight="bold"
                    >
                      {selectedUserLocation.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })()}

              {/* Event pins */}
              {filteredEvents.map((e) => {
                const p = projectToSvg(e.coordinates.lat, e.coordinates.lng);
                const isActive = activeEvent.id === e.id;
                return (
                  <g
                    key={e.id}
                    onClick={() => setActiveEvent(e)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? '3.5' : '2'}
                      fill={isActive ? '#ef4444' : '#b91c1c'}
                      stroke="#ffffff"
                      strokeWidth={isActive ? '0.8' : '0.4'}
                      className="transition-all"
                    />
                    {isActive && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="5.5"
                        fill="none"
                        stroke="#f87171"
                        strokeWidth="0.4"
                        className="animate-ping"
                      />
                    )}
                    <text
                      x={p.x + 2.5}
                      y={p.y - 1}
                      fontSize="2"
                      fill={isActive ? '#fef08a' : '#d4d4d8'}
                      fontWeight={isActive ? 'bold' : 'normal'}
                      className="pointer-events-none select-none drop-shadow"
                    >
                      {lang === 'en' && e.en?.name ? e.en.name.slice(0, 16) : e.name.slice(0, 16)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right: Active Event Details & Nearest List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-800 uppercase tracking-wider">
                {lang === 'vi' ? 'Điểm di sản đang chọn' : 'Selected Heritage Point'}
              </span>
              <span className="text-xs font-extrabold bg-amber-100 text-amber-950 px-2.5 py-1 rounded-full">
                {lang === 'vi' ? `Cách bạn ~${activeDistance} km` : `~${activeDistance} km away`}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-red-800">
                <span>{activeEvent.region}</span>
                <span>•</span>
                <span>{activeEvent.province}</span>
                <span>•</span>
                <span>{lang === 'vi' ? `Dân tộc ${activeEvent.ethnicGroup}` : `Ethnic ${activeEvent.ethnicGroup}`}</span>
              </div>
              <h3 className="text-lg font-black text-stone-900 mt-1 font-serif">{activeName}</h3>
              <p className="text-base text-stone-700 line-clamp-3 mt-1 leading-relaxed">
                {activeOrigin}
              </p>
            </div>

            <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200 text-sm space-y-1.5">
              <div className="flex items-center gap-1.5 text-stone-800">
                <Calendar className="w-4 h-4 text-red-700 shrink-0" />
                <span>
                  {lang === 'vi' ? `Năm ${targetYear}: ` : `Year ${targetYear}: `}
                  <strong>{activeCalculated.solarStartDate}</strong> ({activeCalculated.lunarStartDateText.split('(')[0]})
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-800">
                <MapPin className="w-4 h-4 text-red-700 shrink-0" />
                <span>{activeEvent.locationName}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-700">
                <FileText className="w-4 h-4 text-stone-500 shrink-0" />
                <span className="truncate" title={activeEvent.legalBasis.documentNumber}>
                  {lang === 'vi' ? 'Căn cứ: ' : 'Legal basis: '}
                  <strong>{activeEvent.legalBasis.documentNumber}</strong>
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectEvent(activeEvent)}
              className="w-full min-h-[44px] py-2.5 px-4 bg-red-700 hover:bg-red-800 text-white font-bold text-sm sm:text-base rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{lang === 'vi' ? 'Xem toàn bộ nghi thức & hướng dẫn đường đi' : 'View Rituals & Directions Guide'}</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Nearest Festivals to User */}
          <div className="bg-white rounded-3xl p-5 border border-amber-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 font-serif">
              <Compass className="w-4 h-4 text-red-700" />
              <span>
                {lang === 'vi'
                  ? `Lễ hội gần ${selectedUserLocation.name.split('(')[0]} nhất:`
                  : `Festivals closest to ${selectedUserLocation.name.split('(')[0]}:`}
              </span>
            </h4>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {eventsWithDistance.slice(0, 5).map(({ event: ev, distance }) => {
                const evName = lang === 'en' && ev.en?.name ? ev.en.name : ev.name;
                return (
                  <div
                    key={ev.id}
                    onClick={() => setActiveEvent(ev)}
                    className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between text-xs ${
                      activeEvent.id === ev.id
                        ? 'bg-amber-100/70 border-amber-400 font-bold text-amber-950'
                        : 'bg-stone-50 border-stone-200 hover:bg-amber-50 text-stone-700'
                    }`}
                  >
                    <div className="truncate mr-2">
                      <span className="block truncate font-bold">{evName}</span>
                      <span className="text-[11px] text-stone-500 font-normal">
                        {ev.locationName}, {ev.province}
                      </span>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 rounded-md bg-white border border-stone-200 text-red-800 font-extrabold text-[11px]">
                      ~{distance} km
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Legal Advisory Note */}
      <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-5 text-amber-950 text-base leading-relaxed flex items-start gap-3">
        <Info className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <h2 className="font-extrabold text-sm text-amber-900 uppercase tracking-wider mb-1">
            {lang === 'vi' ? 'Khuyến cáo pháp lý bắt buộc:' : 'Mandatory Legal Notice:'}
          </h2>
          <p className="text-base">{LEGAL_DISCLAIMER}</p>
        </div>
      </div>
    </div>
  );
};
