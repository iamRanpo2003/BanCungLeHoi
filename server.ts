import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, Type } from '@google/genai';
import {
  buildGroundedAppContext,
  normalizeGroundedGeminiPayload,
  NO_INFO_VI,
  type GroundedFestivalInput,
} from './src/utils/geminiGrounding.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const GEMINI_MODEL = 'gemini-4-hydrogen';

interface CulturalGuideRequest {
  question?: unknown;
  lang?: unknown;
  festival?: {
    id?: unknown;
    name?: unknown;
    province?: unknown;
    ethnicGroup?: unknown;
    timingNote?: unknown;
    historicalOrigin?: unknown;
    culturalMeaning?: unknown;
    mainRitualsLe?: unknown;
    mainRitualsHoi?: unknown;
    directionsGuide?: unknown;
    visitorAdvice?: unknown;
    legalDocument?: unknown;
    issuingAuthority?: unknown;
    issueDate?: unknown;
  };
}

function cleanText(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLen);
}

function cleanStringArray(value: unknown, maxItems: number, maxLen: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => cleanText(item, maxLen))
    .filter(Boolean)
    .slice(0, maxItems);
}

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '24kb' }));

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY?.trim()),
      model: GEMINI_MODEL,
    });
  });

  app.post('/api/gemini/cultural-guide', async (req, res) => {
    const body = (req.body || {}) as CulturalGuideRequest;
    const question = cleanText(body.question, 400);
    const lang = body.lang === 'en' ? 'en' : 'vi';

    if (question.length < 3) {
      res.status(400).json({
        error:
          lang === 'vi'
            ? 'Vui lòng nhập câu hỏi tối thiểu 3 ký tự về lễ hội hoặc văn hóa Việt Nam.'
            : 'Please enter a question of at least 3 characters about Vietnamese festivals or culture.',
      });
      return;
    }

    // Read API key strictly from server environment variable; never expose or log it.
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === 'undefined' || apiKey === 'null') {
      res.status(503).json({
        error:
          lang === 'vi'
            ? 'Chức năng hỏi đáp Gemini chưa được cấu hình khóa API trên máy chủ (GEMINI_API_KEY). Bạn vẫn có thể tra cứu đầy đủ dữ liệu lễ hội trên ứng dụng.'
            : 'Gemini Q&A is not configured on the server (missing GEMINI_API_KEY). All curated festival records remain accessible.',
        code: 'GEMINI_NOT_CONFIGURED',
      });
      return;
    }

    const festival = body.festival;
    const festName = cleanText(festival?.name, 160);
    const activeFestival: GroundedFestivalInput | undefined = festName
      ? {
          id: cleanText(festival?.id, 100),
          name: festName,
          province: cleanText(festival?.province, 160),
          ethnicGroup: cleanText(festival?.ethnicGroup, 100),
          timingNote: cleanText(festival?.timingNote, 200),
          historicalOrigin: cleanText(festival?.historicalOrigin, 600),
          culturalMeaning: cleanText(festival?.culturalMeaning, 600),
          mainRitualsLe: cleanStringArray(festival?.mainRitualsLe, 8, 220),
          mainRitualsHoi: cleanStringArray(festival?.mainRitualsHoi, 8, 220),
          directionsGuide: cleanText(festival?.directionsGuide, 400),
          visitorAdvice: cleanStringArray(festival?.visitorAdvice, 6, 220),
          legalDocument: cleanText(festival?.legalDocument, 200),
          issuingAuthority: cleanText(festival?.issuingAuthority, 200),
          issueDate: cleanText(festival?.issueDate, 80),
        }
      : undefined;

    const groundedContext = buildGroundedAppContext(activeFestival);

    const systemInstruction =
      lang === 'vi'
        ? [
            'Bạn là trợ lý tra cứu dữ liệu nội bộ của ứng dụng Bancunglehoi.',
            'QUY TẮC TUYỆT ĐỐI:',
            '1. CHỈ được trả lời dựa trên TÀI LIỆU NGUỒN CỦA ỨNG DỤNG được cung cấp trong ngữ cảnh. TUYỆT ĐỐI KHÔNG dùng kiến thức bên ngoài để bổ sung hoặc suy đoán chi tiết không có trong dữ liệu.',
            `2. Nếu dữ liệu trong ứng dụng KHÔNG chứa thông tin để trả lời câu hỏi (ví dụ: lễ hội không nằm trong danh sách, câu hỏi thời tiết, nhân vật/lịch sử/ẩm thực/số liệu không ghi trong tài liệu), hãy đặt foundInAppData = false, viết answer bắt đầu chính xác bằng "${NO_INFO_VI}", và liệt kê các nguồn chính thống phù hợp trong suggestedOfficialSources.`,
            '3. Dù trả lời có hay không có thông tin, luôn điền sourcesUsed với tên các nguồn cụ thể trong ứng dụng đã dùng/đã đối chiếu.',
            '4. Ngắn gọn, trung thực, rõ ràng (tối đa 220 từ).',
          ].join('\n')
        : [
            'You are the internal data lookup assistant for Bancunglehoi.',
            'STRICT GROUNDING RULES:',
            '1. Answer ONLY using facts explicitly stated in the APP DATA SOURCES below. NEVER add outside knowledge or speculate beyond the provided records.',
            `2. If the provided app data does NOT contain the requested information, set foundInAppData = false, begin answer with "${NO_INFO_VI}" followed by the concise English notice, and suggest relevant official portals in suggestedOfficialSources.`,
            '3. Always populate sourcesUsed with the exact source titles from the provided app data.',
            '4. Keep answers concise and factual (under 220 words).',
          ].join('\n');

    const userPrompt = [
      '=== TÀI LIỆU NGUỒN CỦA ỨNG DỤNG (DỮ LIỆU ĐƯỢC PHÉP SỬ DỤNG DUY NHẤT) ===',
      groundedContext,
      '',
      `=== CÂU HỎI CỦA NGƯỜI DÙNG (${lang.toUpperCase()}) ===`,
      question,
    ].join('\n');

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
      });

      const candidateModels = [GEMINI_MODEL, 'gemini-3.1-flash-lite'];
      let response: Awaited<ReturnType<typeof ai.models.generateContent>> | null = null;
      let usedModel = GEMINI_MODEL;
      let lastErr: unknown = null;

      for (const modelName of candidateModels) {
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            response = await ai.models.generateContent({
              model: modelName,
              contents: userPrompt,
              config: {
                systemInstruction,
                temperature: 0.1,
                responseMimeType: 'application/json',
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    foundInAppData: { type: Type.BOOLEAN },
                    answer: { type: Type.STRING },
                    sourcesUsed: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    suggestedOfficialSources: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: ['foundInAppData', 'answer', 'sourcesUsed', 'suggestedOfficialSources'],
                },
              },
            });
            usedModel = modelName;
            break;
          } catch (err) {
            lastErr = err;
            const errStatus =
              typeof (err as { status?: unknown })?.status === 'number'
                ? (err as { status: number }).status
                : 0;
            const errMsg = err instanceof Error ? err.message : '';
            const isTransient =
              errStatus === 503 || errStatus === 429 || /UNAVAILABLE|high demand/i.test(errMsg);
            if (!isTransient) {
              throw err;
            }
            if (attempt === 0) {
              await new Promise((r) => setTimeout(r, 450));
            }
          }
        }
        if (response) break;
      }

      if (!response) {
        throw lastErr ?? new Error('Gemini service unavailable');
      }

      const rawText = response.text?.trim() || '';
      if (!rawText) {
        res.status(502).json({
          error:
            lang === 'vi'
              ? 'Gemini không trả về nội dung văn bản. Vui lòng thử lại.'
              : 'Gemini returned an empty response. Please try again.',
        });
        return;
      }

      const normalized = normalizeGroundedGeminiPayload(rawText, lang, usedModel);
      res.json(normalized);
    } catch (err) {
      const status =
        typeof (err as { status?: unknown })?.status === 'number'
          ? (err as { status: number }).status
          : 502;
      // Never print error messages/headers/keys to console logs or browser payloads
      console.error(`[Gemini API error] status=${status}`);

      let userError =
        lang === 'vi'
          ? 'Không thể kết nối tới dịch vụ Gemini lúc này. Vui lòng thử lại sau ít phút.'
          : 'Unable to reach the Gemini service right now. Please try again shortly.';

      if (status === 400 || status === 403) {
        userError =
          lang === 'vi'
            ? `Khóa GEMINI_API_KEY trên máy chủ chưa hợp lệ hoặc thiếu quyền (HTTP ${status}).`
            : `Server GEMINI_API_KEY is invalid or lacks permissions (HTTP ${status}).`;
      } else if (status === 429) {
        userError =
          lang === 'vi'
            ? 'Dịch vụ Gemini đang tạm thời vượt hạn mức gọi (HTTP 429). Vui lòng thử lại sau.'
            : 'Gemini rate limit temporarily exceeded (HTTP 429). Please retry shortly.';
      } else if (status === 503) {
        userError =
          lang === 'vi'
            ? 'Máy chủ Gemini đang quá tải tạm thời (HTTP 503). Vui lòng thử lại sau vài giây.'
            : 'Gemini upstream model is temporarily busy (HTTP 503). Please retry shortly.';
      } else if (status === 404) {
        userError =
          lang === 'vi'
            ? 'Mô hình Gemini được cấu hình chưa khả dụng (HTTP 404).'
            : 'Configured Gemini model is unavailable (HTTP 404).';
      }

      res.status(status >= 400 && status < 600 ? status : 502).json({
        error: userError,
        upstreamStatus: status,
      });
    }
  });

  return app;
}

async function startServer() {
  const app = createApp();
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir, { maxAge: '1d' }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bancunglehoi server running at http://0.0.0.0:${PORT}`);
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  startServer().catch(() => {
    console.error('Failed to start Bancunglehoi server.');
    process.exit(1);
  });
}
