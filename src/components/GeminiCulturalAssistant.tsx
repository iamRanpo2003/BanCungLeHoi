import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  BookOpen,
  ExternalLink,
  Info,
} from 'lucide-react';
import { AppLanguage, FestivalEvent } from '../types/festival';

interface GeminiCulturalAssistantProps {
  lang?: AppLanguage;
  festival?: FestivalEvent;
  compact?: boolean;
}

interface GeminiResponsePayload {
  answer: string;
  foundInAppData: boolean;
  sourcesUsed: string[];
  suggestedOfficialSources: string[];
  model: string;
  generatedAt: string;
}

export const GeminiCulturalAssistant: React.FC<GeminiCulturalAssistantProps> = ({
  lang = 'vi',
  festival,
  compact = false,
}) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeminiResponsePayload | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const suggestedQuestions = festival
    ? lang === 'vi'
      ? [
          `Phần Lễ và phần Hội tại ${festival.name} gồm những hoạt động nào?`,
          `Du khách cần lưu ý gì khi tham dự?`,
          `Căn cứ pháp lý và địa danh năm 2025 của lễ hội này là gì?`,
        ]
      : [
          `What rituals and festivities are recorded for ${festival.en?.name || festival.name}?`,
          `What visitor tips are documented in the app?`,
          `What is the 2025 province and legal basis in the record?`,
        ]
    : lang === 'vi'
    ? [
        'Hội Gióng ở đền Phù Đổng và đền Sóc diễn ra khi nào và theo căn cứ pháp lý nào?',
        'Nghị quyết 202/2025/QH15 thay đổi địa danh Lễ hội Đền Trần ra sao?',
        'Theo Nghị định 110/2018/NĐ-CP, người tham gia lễ hội cần chấp hành quy định gì?',
      ]
    : [
        'When does Giong Festival take place and what is its legal record?',
        'How did Resolution 202/2025/QH15 affect Tran Temple Festival’s province?',
        'What rules apply to festival attendees under Decree 110/2018/ND-CP?',
      ];

  const submitQuestion = async (rawQuestion: string) => {
    const trimmed = rawQuestion.trim();
    if (trimmed.length < 3 || loading) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/cultural-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: trimmed,
          lang,
          festival: festival
            ? {
                id: festival.id,
                name: lang === 'en' && festival.en?.name ? festival.en.name : festival.name,
                province: festival.province,
                ethnicGroup: festival.ethnicGroup,
                timingNote:
                  festival.lunarRule?.recurringNote || festival.solarRule?.recurringNote || '',
                historicalOrigin:
                  lang === 'en' && festival.en?.historicalOrigin
                    ? festival.en.historicalOrigin
                    : festival.historicalOrigin,
                culturalMeaning:
                  lang === 'en' && festival.en?.culturalMeaning
                    ? festival.en.culturalMeaning
                    : festival.culturalMeaning,
                mainRitualsLe: festival.mainRituals.le,
                mainRitualsHoi: festival.mainRituals.hoi,
                directionsGuide: festival.directionsGuide,
                visitorAdvice: festival.visitorAdvice,
                legalDocument: festival.legalBasis.documentNumber,
                issuingAuthority: festival.legalBasis.issuingAuthority,
                issueDate: festival.legalBasis.issueDate,
              }
            : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setResult(null);
        setErrorMsg(
          data?.error ||
            (lang === 'vi'
              ? 'Không thể xử lý yêu cầu Gemini lúc này.'
              : 'Unable to process the Gemini request right now.')
        );
        return;
      }

      setResult(data as GeminiResponsePayload);
    } catch {
      setResult(null);
      setErrorMsg(
        lang === 'vi'
          ? 'Lỗi kết nối tới máy chủ ứng dụng (/api/gemini/cultural-guide).'
          : 'Network error reaching application server (/api/gemini/cultural-guide).'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuestion(question);
  };

  return (
    <section
      aria-label={lang === 'vi' ? 'Trợ lý hỏi đáp văn hóa Gemini' : 'Gemini Cultural Q&A Assistant'}
      className={`rounded-3xl border border-amber-300/90 bg-gradient-to-br from-amber-50/70 via-white to-red-50/40 ${
        compact ? 'p-4 sm:p-5 space-y-4' : 'p-5 sm:p-7 space-y-4 shadow-xs'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-red-700 text-amber-100 shadow-xs shrink-0">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-stone-900 font-serif">
              {lang === 'vi'
                ? 'Hỏi Đáp Dữ Liệu Lễ Hội Cùng Gemini'
                : 'Ask Gemini About App Festival Data'}
            </h3>
            <p className="text-base text-stone-600 leading-relaxed">
              {festival
                ? lang === 'vi'
                  ? `Chỉ trả lời từ hồ sơ "${festival.name}" và dữ liệu hiện có trong ứng dụng.`
                  : `Answers strictly from "${festival.en?.name || festival.name}" and curated app records.`
                : lang === 'vi'
                ? 'Chỉ trả lời dựa trên dữ liệu lễ hội & văn bản pháp lý có sẵn trong ứng dụng.'
                : 'Answers strictly from festival dossiers and legal documents inside the app.'}
            </p>
          </div>
        </div>

        <span className="text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 px-2.5 py-1 rounded-md">
          {lang === 'vi' ? 'Giới hạn trong dữ liệu ứng dụng' : 'Grounded in App Data'}
        </span>
      </div>

      {/* Quick question chips */}
      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            type="button"
            disabled={loading}
            onClick={() => {
              setQuestion(q);
              submitQuestion(q);
            }}
            className="min-h-[44px] text-left text-sm font-medium px-3.5 py-2 rounded-xl bg-white hover:bg-amber-100/70 text-stone-800 hover:text-red-900 border border-amber-200 transition cursor-pointer disabled:opacity-60"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Question form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
        <label htmlFor={festival ? `gemini-q-${festival.id}` : 'gemini-q-home'} className="sr-only">
          {lang === 'vi' ? 'Câu hỏi về lễ hội và văn hóa Việt Nam' : 'Question about Vietnamese festivals'}
        </label>
        <input
          id={festival ? `gemini-q-${festival.id}` : 'gemini-q-home'}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={400}
          placeholder={
            lang === 'vi'
              ? 'Nhập câu hỏi về các lễ hội hoặc văn bản pháp lý trong ứng dụng...'
              : 'Ask about festivals or legal documents stored in this app...'
          }
          className="flex-1 min-h-[44px] text-base bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
        />
        <button
          type="submit"
          disabled={loading || question.trim().length < 3}
          className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-700 hover:bg-red-800 disabled:bg-stone-300 text-white text-base font-bold rounded-xl shadow-xs transition cursor-pointer shrink-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{lang === 'vi' ? 'Đang tra cứu...' : 'Searching...'}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{lang === 'vi' ? 'Gửi câu hỏi' : 'Ask Gemini'}</span>
            </>
          )}
        </button>
      </form>

      {/* Error message */}
      {errorMsg && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-base flex items-start gap-2.5"
        >
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* Grounded Answer + Sources Used */}
      {result && (
        <div className="bg-white rounded-2xl border border-amber-300 p-4 sm:p-5 space-y-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
            <div
              className={`flex items-center gap-2 text-sm font-bold ${
                result.foundInAppData ? 'text-emerald-800' : 'text-amber-900'
              }`}
            >
              {result.foundInAppData ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
              )}
              <span>
                {result.foundInAppData
                  ? lang === 'vi'
                    ? 'Trả lời từ dữ liệu có sẵn trong ứng dụng'
                    : 'Answered strictly from in-app records'
                  : lang === 'vi'
                  ? 'Ngoài phạm vi dữ liệu ứng dụng'
                  : 'Outside current in-app dataset'}
              </span>
            </div>
            <span className="text-xs font-mono text-stone-500">{result.model}</span>
          </div>

          <p className="text-base text-stone-800 whitespace-pre-line leading-relaxed">
            {result.answer}
          </p>

          {/* Always attach Sources Used */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-sm font-extrabold text-stone-900">
              <BookOpen className="w-4 h-4 text-red-700 shrink-0" />
              <span>{lang === 'vi' ? 'Nguồn đã dùng:' : 'Sources Used:'}</span>
            </div>
            <ul className="space-y-1 text-base text-stone-700 list-disc pl-5">
              {result.sourcesUsed.map((src, idx) => (
                <li key={idx}>{src}</li>
              ))}
            </ul>
          </div>

          {/* Official portal suggestions when out of scope or suggested */}
          {result.suggestedOfficialSources.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-amber-950">
                <ExternalLink className="w-4 h-4 text-amber-800 shrink-0" />
                <span>
                  {lang === 'vi'
                    ? 'Nguồn chính thống gợi ý để tra cứu thêm:'
                    : 'Suggested Official Sources for Further Lookup:'}
                </span>
              </div>
              <ul className="space-y-1 text-base text-amber-950 list-disc pl-5">
                {result.suggestedOfficialSources.map((src, idx) => (
                  <li key={idx}>{src}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Pre-query scope notice */}
      {!result && !errorMsg && (
        <div className="flex items-start gap-2 text-base text-stone-600 leading-relaxed">
          <BookOpen className="w-4 h-4 text-amber-700 shrink-0 mt-1" />
          <p>
            {lang === 'vi'
              ? 'Mỗi câu trả lời luôn đính kèm tên nguồn đã dùng trong ứng dụng. Nếu câu hỏi nằm ngoài dữ liệu hiện có, hệ thống sẽ báo "Ứng dụng chưa có thông tin này" và gợi ý nguồn chính thống.'
              : 'Every reply cites exact in-app sources used. If a topic is outside the dataset, the app responds that the information is unavailable and suggests official portals.'}
          </p>
        </div>
      )}
    </section>
  );
};
