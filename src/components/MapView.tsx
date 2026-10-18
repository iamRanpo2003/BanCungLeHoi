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
import { FestivalEvent, Region } from '../types/festival';
import { calculateEventForYear } from '../utils/festivalCalculator';
import { LEGAL_DISCLAIMER } from '../data/legalReferences';

interface MapViewProps {
  events: FestivalEvent[];
  targetYear: number;
  onSelectEvent: (event: FestivalEvent) => void;
}

// User location simulator options
const USER_LOCATIONS = [
  { name: 'Hà Nội (Thủ đô)', lat: 21.0285, lng: 105.8542 },
  { name: 'Đà Nẵng (Miền Trung)', lat: 16.0544, lng: 108.2022 },
  { name: 'TP. Hồ Chí Minh (Miền Nam)', lat: 10.8231, lng: 106.6297 },
  { name: 'Buôn Ma Thuột (Tây Nguyên)', lat: 12.6667, lng: 108.05 },
  { name: 'Cần Thơ (Tây Nam Bộ)', lat: 10.0452, lng: 105.7469 },
];

// Khoảng cách theo công thức Haversine (km)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Bán kính Trái đất (km)
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

// Map coordinates to SVG percentage
function projectToSvg(lat: number, lng: number): { x: number; y: number } {
  // Vietnam bounding box approximately:
  // Lat: 8.5 (Ca Mau) to 23.4 (Ha Giang)
  // Lng: 102.1 (Dien Bien) to 109.5 (Phu Yen)
  const minLat = 8.5;
  const maxLat = 23.5;
  const minLng = 102.0;
  const maxLng = 110.0;

  const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 88 - 6; // flip Y
  const x = ((lng - minLng) / (maxLng - minLng)) * 85 + 7;
  return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
}

export const MapView: React.FC<MapViewProps> = ({ events, targetYear, onSelectEvent }) => {
  const [selectedUserLocation, setSelectedUserLocation] = useState(USER_LOCATIONS[0]);
  const [activeEvent, setActiveEvent] = useState<FestivalEvent>(events[0]);
  const [filterRegion, setFilterRegion] = useState<Region | 'All'>('All');

  const filteredEvents = events.filter((e) => {
    if (filterRegion !== 'All' && e.region !== filterRegion) return false;
    return true;
  });

  // Calculate distance for all events
  const eventsWithDistance = filteredEvents.map((e) => {
    const dist = calculateDistance(
      selectedUserLocation.lat,
      selectedUserLocation.lng,
      e.coordinates.lat,
      e.coordinates.lng
    );
    return { event: e, distance: dist };
  }).sort((a, b) => a.distance - b.distance);

  const activeCalculated = calculateEventForYear(activeEvent, targetYear);
  const activeDistance = calculateDistance(
    selectedUserLocation.lat,
    selectedUserLocation.lng,
    activeEvent.coordinates.lat,
    activeEvent.coordinates.lng
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Compass className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 font-sans">
              Bản Đồ Di Sản & Lễ Hội Toàn Quốc
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Định vị các điểm di tích, gợi ý lễ hội gần vị trí người dùng nhất và hướng dẫn đường đi
          </p>
        </div>

        {/* User location simulator */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-bold">Vị trí của bạn:</span>
            <select
              value={selectedUserLocation.name}
              onChange={(e) => {
                const found = USER_LOCATIONS.find((l) => l.name === e.target.value);
                if (found) setSelectedUserLocation(found);
              }}
              className="bg-transparent font-bold text-blue-700 focus:outline-none cursor-pointer"
            >
              {USER_LOCATIONS.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">Toàn quốc (3 Miền)</option>
              <option value="Bắc">Miền Bắc</option>
              <option value="Trung">Miền Trung</option>
              <option value="Tây Nguyên">Tây Nguyên</option>
              <option value="Nam">Miền Nam</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Map + Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive SVG Digital Map (7 cols) */}
        <div className="lg:col-span-7 bg-gradient-to-b from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-5 shadow-lg border border-slate-800 text-white flex flex-col justify-between relative overflow-hidden min-h-[520px]">
          {/* Map Top Indicator */}
          <div className="flex items-center justify-between z-10 text-xs">
            <span className="font-extrabold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Bản đồ số định vị di sản Việt Nam
            </span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg text-blue-200 text-[11px]">
              {filteredEvents.length} điểm di tích
            </span>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full h-[450px] my-2 select-none">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-2xl"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Vietnam S-Shape stylized geometric boundary & coastal lines */}
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#2563eb" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Vietnam S-shape stylized polygon */}
              <path
                d="M 32 8 
                   L 55 10 
                   L 60 16 
                   L 58 24 
                   L 48 30 
                   L 54 40 
                   L 60 48 
                   L 65 60 
                   L 68 70 
                   L 60 85 
                   L 45 92 
                   L 38 88 
                   L 32 80 
                   L 42 75 
                   L 50 62 
                   L 45 46 
                   L 35 32 
                   L 26 22 
                   L 25 14 Z"
                fill="url(#mapGradient)"
                stroke="#60a5fa"
                strokeWidth="0.8"
                strokeDasharray="2,1"
              />

              {/* Hoang Sa & Truong Sa Archipelagos (Chủ quyền Biển Đảo Việt Nam) */}
              <g className="text-amber-300">
                <circle cx="82" cy="42" r="1.5" fill="#f59e0b" />
                <circle cx="85" cy="45" r="1.2" fill="#f59e0b" />
                <text x="75" y="38" fill="#fbbf24" fontSize="2.8" fontWeight="bold">
                  Q.Đ Hoàng Sa
                </text>

                <circle cx="85" cy="78" r="1.5" fill="#f59e0b" />
                <circle cx="89" cy="82" r="1.2" fill="#f59e0b" />
                <text x="77" y="74" fill="#fbbf24" fontSize="2.8" fontWeight="bold">
                  Q.Đ Trường Sa
                </text>
              </g>

              {/* User location pin */}
              {(() => {
                const userPt = projectToSvg(selectedUserLocation.lat, selectedUserLocation.lng);
                return (
                  <g key="user-pin">
                    <circle cx={userPt.x} cy={userPt.y} r="3.5" fill="#10b981" opacity="0.3" className="animate-ping" />
                    <circle cx={userPt.x} cy={userPt.y} r="2" fill="#10b981" stroke="#ffffff" strokeWidth="0.5" />
                    <text x={userPt.x + 3} y={userPt.y - 2} fill="#34d399" fontSize="2.6" fontWeight="bold">
                      Vị trí của bạn
                    </text>
                  </g>
                );
              })()}

              {/* Festival Location Markers */}
              {filteredEvents.map((e) => {
                const pt = projectToSvg(e.coordinates.lat, e.coordinates.lng);
                const isSelected = activeEvent.id === e.id;
                return (
                  <g
                    key={e.id}
                    className="cursor-pointer transition duration-200"
                    onClick={() => setActiveEvent(e)}
                  >
                    {isSelected && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="4"
                        fill="#38bdf8"
                        opacity="0.4"
                        className="animate-pulse"
                      />
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? "2.5" : "1.8"}
                      fill={isSelected ? "#f59e0b" : "#3b82f6"}
                      stroke="#ffffff"
                      strokeWidth="0.6"
                    />
                    <text
                      x={pt.x + 2.5}
                      y={pt.y + 1}
                      fill={isSelected ? "#fbbf24" : "#93c5fd"}
                      fontSize={isSelected ? "2.6" : "2"}
                      fontWeight={isSelected ? "bold" : "normal"}
                      className="pointer-events-none drop-shadow-xs"
                    >
                      {e.province}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Footer Note */}
          <div className="z-10 bg-black/40 backdrop-blur-md p-2.5 rounded-xl text-[11px] text-slate-300 flex items-center justify-between">
            <span>Bấm vào dấu chấm tròn trên bản đồ để chọn lễ hội di sản tương ứng</span>
            <span className="text-emerald-400 font-bold">Chấm xanh: Vị trí của bạn</span>
          </div>
        </div>

        {/* Selected Festival Details & Nearest Festivals (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Card */}
          <div className="bg-white rounded-3xl p-5 border border-blue-200 shadow-md space-y-4">
            <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={activeEvent.imageUrl}
                alt={activeEvent.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                {activeEvent.category}
              </div>
              <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                <Navigation className="w-3 h-3" /> Cách ~{activeDistance} km
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                <span>{activeEvent.region}</span>
                <span>•</span>
                <span>{activeEvent.province}</span>
                <span>•</span>
                <span>Dân tộc {activeEvent.ethnicGroup}</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1">{activeEvent.name}</h3>
              <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                {activeEvent.historicalOrigin}
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>
                  Ngày {targetYear}: <strong>{activeCalculated.solarStartDate}</strong> ({activeCalculated.lunarStartDateText.split('(')[0]})
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{activeEvent.locationName}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate" title={activeEvent.legalBasis.documentNumber}>
                  Căn cứ: <strong>{activeEvent.legalBasis.documentNumber}</strong>
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectEvent(activeEvent)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Xem toàn bộ nghi thức & hướng dẫn đường đi</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Nearest Festivals to User */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600" /> Lễ hội gần {selectedUserLocation.name.split('(')[0]} nhất:
            </h4>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {eventsWithDistance.slice(0, 5).map(({ event: ev, distance }) => (
                <div
                  key={ev.id}
                  onClick={() => setActiveEvent(ev)}
                  className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between text-xs ${
                    activeEvent.id === ev.id
                      ? 'bg-blue-50 border-blue-300 font-bold text-blue-900'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="truncate mr-2">
                    <span className="block truncate font-bold">{ev.name}</span>
                    <span className="text-[11px] text-slate-500 font-normal">{ev.locationName}, {ev.province}</span>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-blue-700 font-extrabold text-[11px]">
                    ~{distance} km
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Legal Advisory Note */}
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
