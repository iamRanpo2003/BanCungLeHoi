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

export const LegalReferencesView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

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
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Scale className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 font-sans">
              Nguồn Tham Khảo & Căn Cứ Pháp Lý
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Hệ thống văn bản quy phạm pháp luật, nghị định, thông tư của Nhà nước và Công ước quốc tế UNESCO
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo số hiệu, tên luật..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-600"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">Tất cả loại văn bản</option>
            <option value="Luật">Luật</option>
            <option value="Nghị định">Nghị định</option>
            <option value="Thông tư">Thông tư</option>
            <option value="Quyết định">Quyết định</option>
            <option value="Công ước quốc tế">Công ước quốc tế</option>
          </select>
        </div>
      </div>

      {/* Prominent Mandatory Legal Disclaimer */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 text-amber-950 text-xs sm:text-sm leading-relaxed flex items-start gap-3 shadow-2xs">
        <Info className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h2 className="font-extrabold text-sm text-amber-900 uppercase tracking-wider mb-1">
            Khuyến cáo pháp lý bắt buộc:
          </h2>
          <p>{LEGAL_DISCLAIMER}</p>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-blue-300 transition space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-blue-600 text-white">
                  {doc.type}
                </span>
                <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  {doc.code}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Ban hành: <strong>{doc.date}</strong>
              </span>
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-900 leading-snug">
                {doc.title}
              </h2>
              <p className="text-xs text-blue-700 font-bold mt-1">
                Cơ quan ban hành: {doc.issuingBody}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {doc.summary}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Các điều khoản & nội dung trọng tâm:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {doc.keyArticles.map((art, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-blue-50/40 p-2.5 rounded-xl border border-blue-100">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{art}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
