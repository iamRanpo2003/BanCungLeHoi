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
} from 'lucide-react';
import { LEGAL_DOCUMENTS, LEGAL_DISCLAIMER } from '../data/legalReferences';
import { AppLanguage } from '../types/festival';
import { getTranslation } from '../utils/i18n';

interface LegalReferencesViewProps {
  lang?: AppLanguage;
}

export const LegalReferencesView: React.FC<LegalReferencesViewProps> = ({ lang = 'vi' }) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const t = getTranslation(lang);

  const filteredDocs = LEGAL_DOCUMENTS.filter((doc) => {
    if (selectedType !== 'All' && doc.type !== selectedType) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.code.toLowerCase().includes(q) ||
      doc.issuingBody.toLowerCase().includes(q)
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
              <a
                href={doc.linkRef || '#'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-red-800 hover:text-red-900 hover:underline"
              >
                <span>{lang === 'vi' ? 'Xem văn bản gốc (Cơ sở dữ liệu Quốc gia)' : 'View official full text'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
