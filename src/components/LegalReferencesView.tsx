import React, { useState } from 'react';
import {
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
  Database,
  Users,
  Award,
} from 'lucide-react';
import {
  LEGAL_DOCUMENTS,
  LEGAL_DISCLAIMER,
  AUTHORITATIVE_SOURCES,
  MEDIA_AND_ETHICS_CREDITS,
  CUSTODIAL_ETHICS_PRINCIPLES,
} from '../data/legalReferences';
import { FESTIVALS_DATA } from '../data/festivalsData';
import { getStoredStories } from '../data/communityData';
import { getInternshipInfo } from '../data/internshipInfo';
import {
  buildAllAppSources,
  buildContributorAcknowledgments,
  MISSING_SOURCE_LABEL,
  SourceEntryCategory,
} from '../data/sourcesRegistry';
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
  const [sourceCategory, setSourceCategory] = useState<'all' | SourceEntryCategory>('all');
  const [showPhotoCredits, setShowPhotoCredits] = useState(true);
  const t = getTranslation(lang);

  const allRegistrySources = buildAllAppSources(events);
  const filteredRegistrySources =
    sourceCategory === 'all'
      ? allRegistrySources
      : allRegistrySources.filter((s) => s.category === sourceCategory);

  const contributors = buildContributorAcknowledgments(getStoredStories());
  const internship = getInternshipInfo();

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

  const categoryLabels: { id: 'all' | SourceEntryCategory; labelVi: string; labelEn: string }[] = [
    { id: 'all', labelVi: `Tất cả (${allRegistrySources.length})`, labelEn: `All (${allRegistrySources.length})` },
    { id: 'official-portal', labelVi: 'Cổng chính thống', labelEn: 'Official Portals' },
    { id: 'legal-document', labelVi: 'Văn bản pháp luật', labelEn: 'Legal Docs' },
    { id: 'festival-dossier', labelVi: 'Hồ sơ lễ hội', labelEn: 'Festival Dossiers' },
    { id: 'media-photo', labelVi: 'Nguồn ảnh', labelEn: 'Photos' },
    { id: 'algorithm-tech', labelVi: 'Thuật toán & Công nghệ', labelEn: 'Algorithms & Tech' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 sm:p-8 rounded-3xl border border-amber-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-50 text-red-700 shrink-0">
              <Scale className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-stone-900 font-serif">
              {t.legal.title}
            </h1>
          </div>
          <p className="text-base text-stone-600 mt-1 leading-relaxed">
            {t.legal.subtitle}
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'vi' ? 'Tìm theo số hiệu, tên luật...' : 'Search by code, title...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-h-[44px] text-base pl-10 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:border-red-600"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="min-h-[44px] text-base bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 font-semibold text-stone-700 focus:outline-none"
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

      {/* Complete Data Sources Registry Table (4 required fields + [CẦN BỔ SUNG]) */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-300 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-red-700 shrink-0" />
            <h2 className="text-lg font-black text-stone-900 font-serif">
              {lang === 'vi'
                ? 'Danh Mục Toàn Bộ Nguồn Dữ Liệu Đang Dùng'
                : 'Complete Data Sources Registry'}
            </h2>
          </div>
          <span className="text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 px-2.5 py-1 rounded-md">
            {lang === 'vi'
              ? 'Trường thiếu ghi rõ [CẦN BỔ SUNG]'
              : 'Missing fields marked [CẦN BỔ SUNG]'}
          </span>
        </div>

        <p className="text-base text-stone-600 leading-relaxed">
          {lang === 'vi'
            ? 'Liệt kê trung thực toàn bộ nguồn dữ liệu hiện có trong mã nguồn ứng dụng (Tên, Đơn vị phát hành, Năm và Đường dẫn). Các trường thông tin chưa có trong dữ liệu gốc được giữ trống và đánh dấu [CẦN BỔ SUNG].'
            : 'Complete registry of every data source currently in the application codebase (Name, Publisher, Year, and URL). Fields absent from existing source data are explicitly marked [CẦN BỔ SUNG].'}
        </p>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2">
          {categoryLabels.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSourceCategory(cat.id)}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-bold transition cursor-pointer border ${
                sourceCategory === cat.id
                  ? 'bg-red-700 text-white border-red-700 shadow-xs'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-amber-50'
              }`}
            >
              {lang === 'en' ? cat.labelEn : cat.labelVi}
            </button>
          ))}
        </div>

        {/* Wide table wrapped in dedicated horizontal scroll container for 360px phones */}
        <div className="w-full overflow-x-auto rounded-2xl border border-stone-200">
          <table className="w-full min-w-[840px] text-left border-collapse">
            <thead>
              <tr className="bg-amber-50/90 border-b border-amber-200 text-sm font-black text-stone-900">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4 min-w-[230px]">{lang === 'vi' ? 'Tên nguồn' : 'Source Name'}</th>
                <th className="py-3 px-4 min-w-[180px]">{lang === 'vi' ? 'Đơn vị phát hành' : 'Publisher'}</th>
                <th className="py-3 px-4">{lang === 'vi' ? 'Năm' : 'Year'}</th>
                <th className="py-3 px-4 min-w-[220px]">{lang === 'vi' ? 'Đường dẫn' : 'URL'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-base text-stone-700">
              {filteredRegistrySources.map((entry, idx) => (
                <tr key={entry.id} className="hover:bg-amber-50/30 align-top">
                  <td className="py-3 px-4 font-mono text-sm text-stone-500">{idx + 1}</td>
                  <td className="py-3 px-4 font-semibold text-stone-900">
                    {lang === 'en' ? entry.nameEn : entry.name}
                  </td>
                  <td className="py-3 px-4">
                    {entry.publisher === MISSING_SOURCE_LABEL ? (
                      <span className="inline-block font-mono text-sm font-bold bg-amber-100 text-amber-950 border border-amber-300 px-2 py-0.5 rounded">
                        {MISSING_SOURCE_LABEL}
                      </span>
                    ) : (
                      entry.publisher
                    )}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {entry.year === MISSING_SOURCE_LABEL ? (
                      <span className="inline-block font-mono text-sm font-bold bg-amber-100 text-amber-950 border border-amber-300 px-2 py-0.5 rounded">
                        {MISSING_SOURCE_LABEL}
                      </span>
                    ) : (
                      entry.year
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {entry.url !== MISSING_SOURCE_LABEL && isValidPublicUrl(entry.url) ? (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-red-800 font-bold hover:underline break-words"
                      >
                        <span>{entry.url}</span>
                        <ExternalLink className="w-4 h-4 shrink-0" />
                      </a>
                    ) : (
                      <span className="inline-block font-mono text-sm font-bold bg-amber-100 text-amber-950 border border-amber-300 px-2 py-0.5 rounded">
                        {MISSING_SOURCE_LABEL}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Contributor Acknowledgments Section */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-200/90 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-red-700 shrink-0" />
            <h2 className="text-lg font-black text-stone-900 font-serif">
              {lang === 'vi'
                ? 'Ghi Nhận Cho Người Đóng Góp Tư Liệu'
                : 'Acknowledgments for Material Contributors'}
            </h2>
          </div>
        </div>

        {/* System compiler / internship credit */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
          <div className="flex items-center gap-2 font-extrabold text-stone-900 text-base">
            <Award className="w-4 h-4 text-red-700 shrink-0" />
            <span>
              {lang === 'vi'
                ? 'Biên tập & số hóa hệ thống ban đầu'
                : 'Initial Curation & Digital Compilation'}
            </span>
          </div>
          <p className="text-base text-stone-700 leading-relaxed">
            {lang === 'vi'
              ? `Sản phẩm thực tập của ${internship.studentName}, mã sinh viên ${internship.studentId}, ${internship.groupNumber}, ${internship.program} ${internship.school} và ${internship.partnerCompany} (Năm 2026).`
              : `Internship product by ${internship.studentName}, student ID ${internship.studentId}, ${internship.groupNumber}, ${internship.program} ${internship.school} and ${internship.partnerCompany} (2026).`}
          </p>
        </div>

        {/* Community & Sample Contributors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contributors.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-extrabold text-base text-stone-900">
                  {item.contributorName}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-200">
                  {item.role}
                </span>
              </div>
              <p className="text-base text-stone-700 leading-relaxed">
                {item.contribution}
              </p>
              <div className="text-sm text-stone-600 space-y-1">
                <div>
                  <strong>{lang === 'vi' ? 'Nguồn ghi nhận: ' : 'Reference: '}</strong>
                  {item.sourceReference}
                </div>
                <div>
                  <strong>{lang === 'vi' ? 'Năm: ' : 'Year: '}</strong>
                  {item.year} •{' '}
                  <strong>{lang === 'vi' ? 'Đường dẫn: ' : 'URL: '}</strong>
                  {item.url !== MISSING_SOURCE_LABEL && isValidPublicUrl(item.url) ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-800 font-bold hover:underline"
                    >
                      {item.url}
                    </a>
                  ) : (
                    <span className="font-mono font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                      {MISSING_SOURCE_LABEL}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dedicated Authoritative Official Sources Section */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-200/90 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-red-700 shrink-0" />
            <h2 className="text-lg font-black text-stone-900 font-serif">
              {lang === 'vi'
                ? 'Cổng Thông Tin Pháp Lý & Di Sản Chính Thống'
                : 'Authoritative Official Sources'}
            </h2>
          </div>
          <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md">
            {lang === 'vi' ? 'Chỉ dẫn nguồn .gov.vn & UNESCO' : 'Verified .gov.vn & UNESCO Sources'}
          </span>
        </div>

        <p className="text-base text-stone-600 leading-relaxed">
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
                  <span className="text-xs font-bold text-red-800 uppercase tracking-wider">
                    {src.organization}
                  </span>
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
                <h3 className="font-black text-base text-stone-900 font-serif">
                  {lang === 'en' ? src.nameEn : src.name}
                </h3>
                <p className="text-base text-stone-600 leading-relaxed">
                  {lang === 'en' ? src.scopeEn : src.scope}
                </p>
              </div>
              {isValidPublicUrl(src.url) && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center gap-1.5 text-base font-bold text-red-800 hover:text-red-900 hover:underline pt-1"
                >
                  <span>{src.url}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Dedicated Media Attribution, Audio Source & Custodial Ethics Section */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-200/90 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-700 shrink-0" />
            <h2 className="text-lg font-black text-stone-900 font-serif">
              {lang === 'vi'
                ? 'Nguyên Tắc Bảo Vệ Tư Liệu, Ảnh Thật & Âm Thanh'
                : 'Media, Audio, Algorithm Attribution & Custodial Ethics'}
            </h2>
          </div>
          <span className="text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 px-2.5 py-1 rounded-md">
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
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <h3 className="font-extrabold text-base text-stone-900 font-serif">
                  {lang === 'en' ? item.titleEn : item.titleVi}
                </h3>
              </div>
              <p className="text-base text-stone-600 leading-relaxed pl-7">
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
              <span className="inline-block text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-900">
                {lang === 'en' ? credit.categoryEn : credit.categoryVi}
              </span>
              <h3 className="font-black text-base text-stone-900 font-serif">
                {lang === 'en' ? credit.titleEn : credit.titleVi}
              </h3>
              <p className="text-base text-stone-600 leading-relaxed">
                {lang === 'en' ? credit.detailEn : credit.detailVi}
              </p>
              {credit.url && isValidPublicUrl(credit.url) && (
                <a
                  href={credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center gap-1 text-base font-bold text-red-800 hover:underline pt-0.5"
                >
                  <span>{credit.url}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
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
            className="min-h-[44px] w-full px-4 py-3 bg-stone-50 hover:bg-amber-50/60 flex items-center justify-between text-base font-bold text-stone-900 transition cursor-pointer"
          >
            <div className="flex items-center gap-2 text-left">
              <Camera className="w-4 h-4 text-red-700 shrink-0" />
              <span>
                {lang === 'vi'
                  ? `Bảng ghi nhận nguồn ảnh chụp thật (${events.length} lễ hội đã số hóa)`
                  : `Real Photo Attribution Registry (${events.length} digitized events)`}
              </span>
            </div>
            {showPhotoCredits ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0" />}
          </button>

          {showPhotoCredits && (
            <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 border-t border-stone-200">
              {events.map((ev) => {
                const attr = getMediaAttribution(ev.imageUrl, ev.imageSourceNote);
                const evTitle = lang === 'en' && ev.en?.name ? ev.en.name : ev.name;
                return (
                  <div
                    key={ev.id}
                    className="p-3 rounded-xl bg-stone-50/80 border border-stone-200/80 text-sm space-y-1 min-w-0"
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
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
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
      <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-5 text-amber-950 text-base leading-relaxed flex items-start gap-3 shadow-2xs">
        <Info className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <h2 className="font-extrabold text-base text-amber-900 uppercase tracking-wider mb-1">
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
            className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-200/80 shadow-xs hover:border-red-300 transition space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-red-700 text-white">
                  {doc.type}
                </span>
                <span className="font-mono text-xs font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                  {doc.code}
                </span>
              </div>
              <div className="text-sm text-stone-600">
                {lang === 'vi' ? 'Cơ quan ban hành: ' : 'Issuing authority: '}
                <strong className="text-stone-800">{doc.issuingBody}</strong> • {doc.date}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-stone-900 font-serif mb-2">
                {doc.title}
              </h3>
              <p className="text-base text-stone-700 leading-relaxed bg-amber-50/30 p-4 rounded-2xl border border-amber-100">
                {doc.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm pt-1">
              <span className="text-stone-500 font-mono text-xs">ID: {doc.id}</span>
              {isValidPublicUrl(doc.linkRef) && (
                <a
                  href={doc.linkRef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center gap-1.5 text-base font-bold text-red-800 hover:text-red-900 hover:underline"
                >
                  <span>{lang === 'vi' ? 'Xem văn bản gốc (Cơ sở dữ liệu Quốc gia)' : 'View official full text'}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
