import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Search,
  ExternalLink,
  Info,
  CheckCircle,
  Landmark,
  Scale,
  Camera,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  LEGAL_DOCUMENTS,
  LEGAL_DISCLAIMER,
  AUTHORITATIVE_SOURCES,
  MEDIA_AND_ETHICS_CREDITS,
  CUSTODIAL_ETHICS_PRINCIPLES,
} from '../data/legalReferences';
import { FESTIVALS_DATA } from '../data/festivalsData';
import { AppLanguage, FestivalEvent } from '../types/festival';
import { getTranslation } from '../utils/i18n';
import { isValidPublicUrl } from '../utils/urlValidator';
import { getMediaAttribution } from '../utils/mediaAttribution';

interface LegalReferencesViewProps {
  lang?: AppLanguage;
  events?: FestivalEvent[];
}

export const LegalReferencesView: React.FC<LegalReferencesViewProps> = ({
  lang = 'vi',
  events = FESTIVALS_DATA,
}) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showPhotoCredits, setShowPhotoCredits] = useState(true);
  const t = getTranslation(lang);

  const filteredDocs = LEGAL_DOCUMENTS.filter((doc) => {
    if (selectedType !== 'All' && doc.type !== selectedType) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.code.toLowerCase().includes(q) ||
      doc.issuingBody.toLowerCase().includes(q) ||
      doc.summary.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-50 text-red-700">
              <Scale className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-stone-900 font-serif">
              {t.legal.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {t.legal.subtitle}
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'vi' ? 'Tìm theo số hiệu, tên luật...' : 'Search by code, title...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-red-600"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-semibold text-stone-700 focus:outline-none"
          >
            <option value="All">{lang === 'vi' ? 'Tất cả loại văn bản' : 'All Document Types'}</option>
            <option value="Luật">{lang === 'vi' ? 'Luật' : 'Laws'}</option>
            <option value="Nghị định">{lang === 'vi' ? 'Nghị định' : 'Decrees'}</option>
            <option value="Thông tư">{lang === 'vi' ? 'Thông tư' : 'Circulars'}</option>
            <option value="Quyết định">{lang === 'vi' ? 'Quyết định' : 'Decisions'}</option>
            <option value="Công ước quốc tế">{lang === 'vi' ? 'Công ước quốc tế' : 'International Conventions'}</option>
          </select>
        </div>
      </div>

      {/* Dedicated Authoritative Official Sources Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/90 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-red-700" />
            <h2 className="text-lg font-black text-stone-900 font-serif">
              {lang === 'vi'
                ? 'Mục Nguồn Tài Liệu & Tham Khảo Chính Thống'
                : 'Authoritative Official Sources'}
            </h2>
          </div>
          <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md">
            {lang === 'vi' ? 'Chỉ dẫn nguồn .gov.vn & UNESCO' : 'Verified .gov.vn & UNESCO Sources'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {lang === 'vi'
            ? 'Mọi dữ liệu lịch sử, địa danh sau sắp xếp đơn vị hành chính năm 2025 (Nghị quyết 202/2025/QH15) và số hiệu công nhận di sản trong Bancunglehoi đều đối chiếu trực tiếp từ các cổng thông tin chính thức dưới đây:'
            : 'All historical dossiers, 2025 administrative boundaries (Resolution 202/2025/QH15), and statutory recognition numbers in Bancunglehoi are cross-referenced against the official portals below:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {AUTHORITATIVE_SOURCES.map((src) => (
            <div
              key={src.id}
              className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 flex flex-col justify-between gap-2.5"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-red-800 uppercase tracking-wider">
                    {src.organization}
                  </span>
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
                <h3 className="font-black text-sm text-stone-900 font-serif">
                  {lang === 'en' ? src.nameEn : src.name}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'en' ? src.scopeEn : src.scope}
                </p>
              </div>
              {isValidPublicUrl(src.url) && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-800 hover:text-red-900 hover:underline pt-1"
                >
                  <span>{src.url}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Dedicated Media Attribution, Audio Source & Custodial Ethics Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/90 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-700" />
            <h2 className="text-lg font-black text-stone-900 font-serif">
              {lang === 'vi'
                ? 'Mục Ghi Nhận Nguồn Ảnh, Âm Thanh & Đạo Đức Tư Liệu'
                : 'Media, Audio, Algorithm Attribution & Custodial Ethics'}
            </h2>
          </div>
          <span className="text-[11px] font-bold bg-amber-100 text-amber-950 border border-amber-300 px-2.5 py-1 rounded-md">
            {lang === 'vi' ? 'Không dùng ảnh AI thay hiện vật/di tích' : 'Zero AI Artifact Imagery'}
          </span>
        </div>

        {/* 4 Safeguard Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {CUSTODIAL_ETHICS_PRINCIPLES.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5"
            >
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <h3 className="font-extrabold text-xs sm:text-sm text-stone-900 font-serif">
                  {lang === 'en' ? item.titleEn : item.titleVi}
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pl-6">
                {lang === 'en' ? item.descEn : item.descVi}
              </p>
            </div>
          ))}
        </div>

        {/* Credits for Photography, Audio Synthesis, Calendar Algorithm, Libraries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {MEDIA_AND_ETHICS_CREDITS.map((credit) => (
            <div
              key={credit.id}
              className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-1.5"
            >
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-900">
                {lang === 'en' ? credit.categoryEn : credit.categoryVi}
              </span>
              <h3 className="font-black text-xs sm:text-sm text-stone-900 font-serif">
                {lang === 'en' ? credit.titleEn : credit.titleVi}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'en' ? credit.detailEn : credit.detailVi}
              </p>
              {credit.url && isValidPublicUrl(credit.url) && (
                <a
                  href={credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-800 hover:underline pt-0.5"
                >
                  <span>{credit.url}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Complete Per-Festival Photo Attribution Registry */}
        <div className="border border-stone-200 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowPhotoCredits(!showPhotoCredits)}
            className="w-full px-4 py-3 bg-stone-50 hover:bg-amber-50/60 flex items-center justify-between text-xs font-bold text-stone-900 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-red-700" />
              <span>
                {lang === 'vi'
                  ? `Bảng ghi nhận nguồn ảnh chụp thật (${events.length} lễ hội đã số hóa)`
                  : `Real Photo Attribution Registry (${events.length} digitized events)`}
              </span>
            </div>
            {showPhotoCredits ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showPhotoCredits && (
            <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 border-t border-stone-200">
              {events.map((ev) => {
                const attr = getMediaAttribution(ev.imageUrl, ev.imageSourceNote);
                const evTitle = lang === 'en' && ev.en?.name ? ev.en.name : ev.name;
                return (
                  <div
                    key={ev.id}
                    className="p-2.5 rounded-xl bg-stone-50/80 border border-stone-200/80 text-[11px] space-y-1 min-w-0"
                  >
                    <div className="font-bold text-stone-900 truncate" title={evTitle}>
                      {evTitle}
                    </div>
                    <div className="text-stone-600 truncate">
                      {lang === 'vi' ? attr.license : attr.licenseEn}
                    </div>
                    {attr.sourceUrl && isValidPublicUrl(attr.sourceUrl) && (
                      <a
                        href={attr.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-red-800 font-bold hover:underline truncate max-w-full"
                      >
                        <span className="truncate">
                          {attr.photoId ? `Pexels #${attr.photoId}` : attr.provider}
                        </span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Prominent Mandatory Legal Disclaimer */}
      <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-5 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3 shadow-2xs">
        <Info className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <h2 className="font-extrabold text-sm text-amber-900 uppercase tracking-wider mb-1">
            {lang === 'vi' ? 'Khuyến cáo pháp lý bắt buộc:' : 'Mandatory Legal Notice:'}
          </h2>
          <p>{LEGAL_DISCLAIMER}</p>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-xs hover:border-red-300 transition space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-red-700 text-white">
                  {doc.type}
                </span>
                <span className="font-mono text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                  {doc.code}
                </span>
              </div>
              <div className="text-xs text-stone-500">
                {lang === 'vi' ? 'Cơ quan ban hành: ' : 'Issuing authority: '}
                <strong className="text-stone-800">{doc.issuingBody}</strong> • {doc.date}
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 font-serif mb-2">
                {doc.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-amber-50/30 p-4 rounded-2xl border border-amber-100">
                {doc.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
              <span className="text-stone-400 font-mono text-[11px]">ID: {doc.id}</span>
              {isValidPublicUrl(doc.linkRef) && (
                <a
                  href={doc.linkRef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-red-800 hover:text-red-900 hover:underline"
                >
                  <span>{lang === 'vi' ? 'Xem văn bản gốc (Cơ sở dữ liệu Quốc gia)' : 'View official full text'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
