import type { AppLanguage, FestivalEvent } from '../types/festival.ts';
import { FESTIVALS_DATA } from '../data/festivalsData.ts';
import { AUTHORITATIVE_SOURCES, LEGAL_DOCUMENTS } from '../data/legalReferences.ts';

export interface GroundedFestivalInput {
  id?: string;
  name?: string;
  province?: string;
  ethnicGroup?: string;
  timingNote?: string;
  historicalOrigin?: string;
  culturalMeaning?: string;
  mainRitualsLe?: string[];
  mainRitualsHoi?: string[];
  directionsGuide?: string;
  visitorAdvice?: string[];
  legalDocument?: string;
  issuingAuthority?: string;
  issueDate?: string;
}

export interface GroundedGeminiResponse {
  answer: string;
  foundInAppData: boolean;
  sourcesUsed: string[];
  suggestedOfficialSources: string[];
  model: string;
  generatedAt: string;
}

export const NO_INFO_VI = 'Ứng dụng chưa có thông tin này';
export const NO_INFO_EN =
  'This application does not currently have this information (Ứng dụng chưa có thông tin này)';

export function getOfficialSourceSuggestions(): string[] {
  return AUTHORITATIVE_SOURCES.map((s) => `${s.name} (${s.url})`);
}

function formatFestivalRecordForPrompt(ev: FestivalEvent): string {
  const timing =
    ev.lunarRule?.recurringNote ||
    ev.solarRule?.recurringNote ||
    (ev.timingType === 'lunar' ? 'Theo Âm lịch' : 'Theo Dương lịch');

  return [
    `[NGUỒN: Hồ sơ lễ hội "${ev.name}" | ${ev.legalBasis.documentNumber} (${ev.legalBasis.issuingAuthority}, ${ev.legalBasis.issueDate})]`,
    `- Tên sự kiện: ${ev.name}${ev.en?.name ? ` (${ev.en.name})` : ''}`,
    ev.alternateNames?.length ? `- Tên khác: ${ev.alternateNames.join(', ')}` : '',
    `- Phân loại: ${ev.category} | Vùng: ${ev.region} | Dân tộc: ${ev.ethnicGroup}`,
    `- Địa danh (cập nhật 2025): ${ev.province}${ev.district ? ` (${ev.district})` : ''}`,
    `- Địa điểm: ${ev.locationName}`,
    `- Thời gian: ${timing}`,
    `- Nguồn gốc lịch sử: ${ev.historicalOrigin}`,
    `- Ý nghĩa văn hóa: ${ev.culturalMeaning}`,
    `- Phần Lễ: ${ev.mainRituals.le.join('; ')}`,
    `- Phần Hội: ${ev.mainRituals.hoi.join('; ')}`,
    `- Đường đi: ${ev.directionsGuide}`,
    `- Lưu ý khách tham quan: ${ev.visitorAdvice.join('; ')}`,
    `- Căn cứ pháp lý: ${ev.legalBasis.title} (${ev.legalBasis.documentNumber}, ${ev.legalBasis.issuingAuthority}, ${ev.legalBasis.issueDate}). Trích: ${ev.legalBasis.excerpt}`,
  ]
    .filter(Boolean)
    .join('\n');
}

function formatCustomFestivalForPrompt(fest: GroundedFestivalInput): string {
  return [
    `[NGUỒN: Hồ sơ người dùng chọn "${fest.name}"${fest.legalDocument ? ` | ${fest.legalDocument}` : ''}]`,
    fest.name ? `- Tên sự kiện: ${fest.name}` : '',
    fest.province ? `- Địa danh: ${fest.province}` : '',
    fest.ethnicGroup ? `- Dân tộc: ${fest.ethnicGroup}` : '',
    fest.timingNote ? `- Thời gian: ${fest.timingNote}` : '',
    fest.historicalOrigin ? `- Nguồn gốc lịch sử: ${fest.historicalOrigin}` : '',
    fest.culturalMeaning ? `- Ý nghĩa văn hóa: ${fest.culturalMeaning}` : '',
    fest.mainRitualsLe?.length ? `- Phần Lễ: ${fest.mainRitualsLe.join('; ')}` : '',
    fest.mainRitualsHoi?.length ? `- Phần Hội: ${fest.mainRitualsHoi.join('; ')}` : '',
    fest.directionsGuide ? `- Đường đi: ${fest.directionsGuide}` : '',
    fest.visitorAdvice?.length ? `- Lưu ý khách tham quan: ${fest.visitorAdvice.join('; ')}` : '',
    fest.legalDocument
      ? `- Căn cứ pháp lý: ${fest.legalDocument}${fest.issuingAuthority ? ` (${fest.issuingAuthority})` : ''}`
      : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildGroundedAppContext(
  activeFestival?: GroundedFestivalInput,
  allFestivals: FestivalEvent[] = FESTIVALS_DATA
): string {
  const sections: string[] = [];

  if (activeFestival?.name) {
    sections.push('=== HỒ SƠ ĐANG XEM TRỰC TIẾP ===');
    sections.push(formatCustomFestivalForPrompt(activeFestival));
  }

  sections.push(`=== DANH SÁCH ${allFestivals.length} LỄ HỘI & SỰ KIỆN TRONG ỨNG DỤNG ===`);
  for (const ev of allFestivals) {
    if (activeFestival?.id && ev.id === activeFestival.id) continue;
    sections.push(formatFestivalRecordForPrompt(ev));
  }

  sections.push('=== VĂN BẢN PHÁP LUẬT & CÔNG ƯỚC TRONG ỨNG DỤNG ===');
  for (const doc of LEGAL_DOCUMENTS) {
    sections.push(
      [
        `[NGUỒN: ${doc.code} — ${doc.title} (${doc.issuingBody}, ${doc.date}) | ${doc.linkRef}]`,
        `- Tóm tắt: ${doc.summary}`,
        `- Điểm chính: ${doc.keyArticles.join('; ')}`,
      ].join('\n')
    );
  }

  sections.push('=== CỔNG NGUỒN CHÍNH THỐNG ĐƯỢC PHÉP GỢI Ý TRA CỨU THÊM ===');
  for (const src of AUTHORITATIVE_SOURCES) {
    sections.push(`- ${src.name} (${src.organization}): ${src.url} — Phạm vi: ${src.scope}`);
  }

  return sections.join('\n\n');
}

export function parseGeminiJsonText(rawText: string): {
  foundInAppData?: boolean;
  answer?: string;
  sourcesUsed?: unknown;
  suggestedOfficialSources?: unknown;
} | null {
  const trimmed = rawText.trim();
  if (!trimmed) return null;

  try {
    return JSON.parse(trimmed);
  } catch {
    const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fencedMatch?.[1]) {
      try {
        return JSON.parse(fencedMatch[1].trim());
      } catch {
        return null;
      }
    }
    const braceStart = trimmed.indexOf('{');
    const braceEnd = trimmed.lastIndexOf('}');
    if (braceStart >= 0 && braceEnd > braceStart) {
      try {
        return JSON.parse(trimmed.slice(braceStart, braceEnd + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

export function normalizeGroundedGeminiPayload(
  rawText: string,
  lang: AppLanguage,
  model: string
): GroundedGeminiResponse {
  const parsed = parseGeminiJsonText(rawText);
  const defaultOfficials = getOfficialSourceSuggestions();

  if (!parsed) {
    const fallbackText = rawText.trim();
    const saysNotFound = /chưa có thông tin này|does not.*have this information/i.test(fallbackText);
    return {
      answer: saysNotFound
        ? fallbackText
        : `${lang === 'vi' ? NO_INFO_VI : NO_INFO_EN}.`,
      foundInAppData: false,
      sourcesUsed: ['Kho dữ liệu 18 lễ hội & 7 văn bản pháp lý Bancunglehoi'],
      suggestedOfficialSources: defaultOfficials,
      model,
      generatedAt: new Date().toISOString(),
    };
  }

  const sourcesUsed = Array.isArray(parsed.sourcesUsed)
    ? parsed.sourcesUsed
        .filter((s): s is string => typeof s === 'string' && s.trim().length > 0)
        .map((s) => s.trim())
    : [];

  const suggestedOfficialSources = Array.isArray(parsed.suggestedOfficialSources)
    ? parsed.suggestedOfficialSources
        .filter((s): s is string => typeof s === 'string' && s.trim().length > 0)
        .map((s) => s.trim())
    : [];

  const rawAnswer = typeof parsed.answer === 'string' ? parsed.answer.trim() : '';
  const modelSaidNotFound =
    parsed.foundInAppData === false ||
    /ứng dụng chưa có thông tin này/i.test(rawAnswer);

  const foundInAppData = !modelSaidNotFound && Boolean(rawAnswer) && sourcesUsed.length > 0;

  let finalAnswer = rawAnswer;
  if (!foundInAppData) {
    if (lang === 'vi') {
      finalAnswer = rawAnswer.includes(NO_INFO_VI)
        ? rawAnswer
        : `${NO_INFO_VI}. Vui lòng tra cứu thêm tại các nguồn chính thống được gợi ý bên dưới.`;
    } else {
      finalAnswer = rawAnswer.includes(NO_INFO_VI)
        ? rawAnswer
        : `${NO_INFO_EN}. Please check the official sources suggested below.`;
    }
  }

  return {
    answer: finalAnswer,
    foundInAppData,
    sourcesUsed:
      sourcesUsed.length > 0
        ? sourcesUsed
        : ['Kho dữ liệu lễ hội & văn bản pháp lý Bancunglehoi'],
    suggestedOfficialSources: !foundInAppData
      ? suggestedOfficialSources.length > 0
        ? suggestedOfficialSources
        : defaultOfficials
      : suggestedOfficialSources,
    model,
    generatedAt: new Date().toISOString(),
  };
}
