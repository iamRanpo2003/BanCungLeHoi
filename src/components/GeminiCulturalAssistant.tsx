import React, { useState } from 'react';
import { Sparkles, Send, ShieldAlert, CheckCircle2, AlertCircle, Loader2, BookOpen } from 'lucide-react';
import { AppLanguage, FestivalEvent } from '../types/festival';

interface GeminiCulturalAssistantProps {
  lang?: AppLanguage;
  festival?: FestivalEvent;
  compact?: boolean;
}

interface GeminiResponsePayload {
  answer: string;
  model: string;
  reviewedBasis: string;
  unverifiedNotice: string;
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
          `Ý nghĩa quan trọng nhất của phần Lễ và phần Hội tại ${festival.name} là gì?`,
          `Du khách nước ngoài cần lưu ý trang phục và ứng xử gì khi tham dự?`,
          `Địa danh tổ chức sau sắp xếp hành chính năm 2025 thuộc tỉnh/thành nào?`,
        ]
      : [
          `What is the cultural significance of the rituals at ${festival.en?.name || festival.name}?`,
          `What etiquette and dress code should international visitors follow?`,
          `How does the 2025 provincial administrative unit apply to this location?`,
        ]
    : lang === 'vi'
    ? [
        'Sự khác nhau giữa phần Lễ và phần Hội trong lễ hội truyền thống Việt Nam là gì?',
        'Những lưu ý ứng xử văn minh tại di tích lịch sử, đền chùa theo Nghị định 110/2018/NĐ-CP?',
        'Vì sao lễ hội Đền Trần (Nam Định cũ) nay ghi nhận thuộc tỉnh Ninh Bình từ năm 2025?',
      ]
    : [
        'What is the difference between "Phần Lễ" and "Phần Hội" in Vietnamese festivals?',
        'What are respectful temple etiquette rules for foreign visitors in Vietnam?',
        'Explain Vietnam’s 2025 administrative reorganization for festival provinces.',
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
                legalDocument: festival.legalBasis.documentNumber,
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
        compact ? 'p-4 sm:p-5 space-y-3' : 'p-6 sm:p-7 space-y-4 shadow-xs'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-red-700 text-amber-100 shadow-xs shrink-0">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-black text-stone-900 font-serif">
              {lang === 'vi'
                ? 'Hỏi Đáp Văn Hóa & Lễ Hội Cùng Gemini'
                : 'Ask Gemini Cultural Guide'}
            </h3>
            <p className="text-xs text-stone-600">
              {festival
                ? lang === 'vi'
                  ? `Đặt câu hỏi trực tiếp xoay quanh "${festival.name}"`
                  : `Ask context-aware questions about "${festival.en?.name || festival.name}"`
                : lang === 'vi'
                ? 'Giải thích phong tục, nghi lễ, lịch sử và ứng xử văn minh khi trẩy hội (gọi qua máy chủ bảo mật)'
                : 'Explore rituals, etiquette, and cultural context securely via server-side Gemini'}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold bg-amber-100 text-amber-950 border border-amber-300 px-2.5 py-1 rounded-md">
          {lang === 'vi' ? 'AI tham khảo • Có ghi rõ phần chưa kiểm' : 'AI Reference • Review Notice'}
        </span>
      </div>

      {/* Quick question chips */}
      <div className="flex flex-wrap gap-1.5">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            type="button"
            disabled={loading}
            onClick={() => {
              setQuestion(q);
              submitQuestion(q);
            }}
            className="text-left text-xs font-medium px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100/70 text-stone-700 hover:text-red-900 border border-amber-200 transition cursor-pointer disabled:opacity-60"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Question form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
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
              ? 'Ví dụ: Khi vào Đền Hùng hoặc Miếu Bà nên chuẩn bị lễ vật và trang phục thế nào?'
              : 'e.g., What etiquette or attire should visitors prepare for this festival?'
          }
          className="flex-1 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
        />
        <button
          type="submit"
          disabled={loading || question.trim().length < 3}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-700 hover:bg-red-800 disabled:bg-stone-300 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition cursor-pointer shrink-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{lang === 'vi' ? 'Đang hỏi Gemini...' : 'Asking Gemini...'}</span>
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
          className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* AI Response with mandatory verification/review labeling */}
      {result && (
        <div className="bg-white rounded-2xl border border-amber-300 p-4 sm:p-5 space-y-3 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{result.reviewedBasis}</span>
            </div>
            <span className="text-[11px] font-mono text-stone-500">{result.model}</span>
          </div>

          <div className="text-xs sm:text-sm text-stone-800 whitespace-pre-line leading-relaxed">
            {result.answer}
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs leading-relaxed flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-extrabold text-amber-900 mb-0.5">
                {lang === 'vi'
                  ? 'Kiểm chứng nội dung AI (Rà soát & Phần chưa kiểm):'
                  : 'AI Content Review Notice:'}
              </strong>
              <span>{result.unverifiedNotice}</span>
            </div>
          </div>
        </div>
      )}

      {/* Pre-query verification transparency line */}
      {!result && !errorMsg && (
        <div className="flex items-start gap-2 text-[11px] text-stone-600 leading-relaxed">
          <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
          <span>
            {lang === 'vi'
              ? 'Mọi câu trả lời từ Gemini đều gắn nhãn phân biệt thông tin đã đối chiếu hồ sơ trên cổng với phần mở rộng chưa kiểm chứng thủ công.'
              : 'Every Gemini answer clearly distinguishes portal-verified dossier facts from unverified AI-synthesized context.'}
          </span>
        </div>
      )}
    </section>
  );
};
