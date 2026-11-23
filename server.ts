import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI } from '@google/genai';

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
    legalDocument?: unknown;
  };
}

function cleanText(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLen);
}

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '16kb' }));

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

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === 'undefined' || apiKey === 'null') {
      res.status(503).json({
        error:
          lang === 'vi'
            ? 'Chức năng hỏi đáp Gemini chưa được cấu hình khóa API trên máy chủ (GEMINI_API_KEY). Bạn vẫn có thể tra cứu đầy đủ toàn bộ dữ liệu lễ hội đã biên tập trên cổng thông tin.'
            : 'Gemini Q&A is not configured on the server (missing GEMINI_API_KEY). All curated festival records remain fully accessible.',
        code: 'GEMINI_NOT_CONFIGURED',
      });
      return;
    }

    const festival = body.festival;
    const festName = cleanText(festival?.name, 160);
    const festProvince = cleanText(festival?.province, 160);
    const festEthnic = cleanText(festival?.ethnicGroup, 100);
    const festTiming = cleanText(festival?.timingNote, 200);
    const festOrigin = cleanText(festival?.historicalOrigin, 500);
    const festMeaning = cleanText(festival?.culturalMeaning, 500);
    const festLegal = cleanText(festival?.legalDocument, 200);

    const hasFestivalContext = Boolean(festName);

    const contextBlock = hasFestivalContext
      ? [
          `Hồ sơ di sản đã rà soát trong Cổng Bancunglehoi:`,
          `- Tên sự kiện: ${festName}`,
          festProvince ? `- Địa danh (cập nhật sắp xếp hành chính 2025): ${festProvince}` : '',
          festEthnic ? `- Cộng đồng dân tộc: ${festEthnic}` : '',
          festTiming ? `- Thời gian: ${festTiming}` : '',
          festOrigin ? `- Nguồn gốc lịch sử: ${festOrigin}` : '',
          festMeaning ? `- Ý nghĩa văn hóa: ${festMeaning}` : '',
          festLegal ? `- Căn cứ văn bản tham chiếu: ${festLegal}` : '',
        ]
          .filter(Boolean)
          .join('\n')
      : 'Người dùng đang hỏi chung về lễ hội truyền thống, phong tục, di sản văn hóa hoặc quy tắc ứng xử văn minh tại Việt Nam (theo Nghị quyết 202/2025/QH15 về sắp xếp đơn vị hành chính cấp tỉnh và bỏ cấp huyện nếu nhắc tới địa danh năm 2025).';

    const prompt =
      lang === 'vi'
        ? `Bạn là trợ lý biên tập văn hóa Việt Nam của cổng tra cứu mở Bancunglehoi. Hãy trả lời câu hỏi của người dùng một cách chuẩn mực, chính xác, tôn trọng lịch sử và bản sắc dân tộc Việt Nam.

${contextBlock}

Câu hỏi của người dùng: "${question}"

Yêu cầu trình bày bắt buộc (ngắn gọn, rõ ràng, dưới 220 từ):
1. Nếu có hồ sơ lễ hội đính kèm, ưu tiên đối chiếu thông tin từ hồ sơ trên trước.
2. Ghi rõ 2 phần ngắn bằng gạch đầu dòng:
   - [Đã đối chiếu hồ sơ cổng]: Thông tin khớp trực tiếp với hồ sơ lễ hội hoặc quy tắc chung đã biết chắc chắn.
   - [Mở rộng do Gemini tổng hợp — chưa kiểm chứng thủ công]: Các gợi ý lịch trình, trang phục, ẩm thực hoặc bối cảnh mở rộng. Tuyệt đối không bịa số hiệu văn bản pháp luật nếu không có trong hồ sơ.`
        : `You are a Vietnamese cultural guide assistant for the open portal Bancunglehoi. Answer clearly, accurately, and respectfully about Vietnamese cultural heritage.

${contextBlock}

User question: "${question}"

Required concise structure (under 220 words):
1. Prioritize information from the reviewed portal record if provided.
2. Explicitly separate two short sections:
   - [Aligned with Reviewed Record]: Facts directly grounded in the curated portal profile.
   - [AI-Synthesized Context — Unverified Extension]: Additional visitor etiquette or background tips. Never invent statutory decision numbers.`;

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
              contents: prompt,
            });
            usedModel = modelName;
            break;
          } catch (err) {
            lastErr = err;
            const errStatus = typeof (err as { status?: unknown })?.status === 'number'
              ? (err as { status: number }).status
              : 0;
            const errMsg = err instanceof Error ? err.message : '';
            const isTransient = errStatus === 503 || errStatus === 429 || /UNAVAILABLE|high demand/i.test(errMsg);
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

      const answer = response.text?.trim();
      if (!answer) {
        res.status(502).json({
          error:
            lang === 'vi'
              ? 'Gemini không trả về nội dung văn bản. Vui lòng thử đặt câu hỏi cụ thể hơn.'
              : 'Gemini returned an empty response. Please try a more specific question.',
        });
        return;
      }

      res.json({
        answer,
        model: usedModel,
        reviewedBasis: hasFestivalContext
          ? lang === 'vi'
            ? `Đã đối chiếu khung ngữ cảnh với hồ sơ "${festName}" trên Bancunglehoi.`
            : `Contextualized against the curated Bancunglehoi profile for "${festName}".`
          : lang === 'vi'
          ? 'Câu trả lời tổng hợp dựa trên kiến thức văn hóa phổ thông, không thay thế hồ sơ di sản.'
          : 'General cultural overview, not a substitute for official heritage records.',
        unverifiedNotice:
          lang === 'vi'
            ? `Nội dung do Gemini (${usedModel}) sinh ra đã có khung đối chiếu; riêng các chi tiết mở rộng ngoài hồ sơ gốc chưa qua kiểm chứng thủ công, cần đối chiếu văn bản chính thống tại mục Nguồn & Pháp lý.`
            : `Gemini (${usedModel}) output follows a reviewed prompt frame; extended details outside the curated dossier have not been manually audited—verify against official citations in Sources & Legal Basis.`,
        generatedAt: new Date().toISOString(),
      });
    } catch (err) {
      const rawMessage = err instanceof Error ? err.message : 'Unknown upstream error';
      const safeMessage = rawMessage.replace(/AIza[0-9A-Za-z_-]{10,}/g, '[REDACTED_KEY]');
      const status = typeof (err as { status?: unknown })?.status === 'number'
        ? ((err as { status: number }).status)
        : 502;
      console.error('[Gemini API error]:', status, safeMessage);

      let userError =
        lang === 'vi'
          ? 'Không thể kết nối tới dịch vụ Gemini lúc này. Vui lòng thử lại sau ít phút.'
          : 'Unable to reach the Gemini service right now. Please try again shortly.';

      if (status === 400 || status === 403 || /API_KEY_INVALID|PERMISSION_DENIED/i.test(safeMessage)) {
        userError =
          lang === 'vi'
            ? 'Khóa GEMINI_API_KEY trên máy chủ chưa hợp lệ hoặc đã bị thu hồi / thiếu quyền (HTTP ' + status + '). Vui lòng kiểm tra hoặc thay khóa mới trong phần Settings > Secrets.'
            : 'Server GEMINI_API_KEY is invalid, revoked, or lacks permissions (HTTP ' + status + '). Please verify or rotate it in Settings > Secrets.';
      } else if (status === 429 || /RESOURCE_EXHAUSTED/i.test(safeMessage)) {
        userError =
          lang === 'vi'
            ? 'Dịch vụ Gemini đang tạm thời vượt hạn mức gọi (HTTP 429). Vui lòng thử lại sau ít phút.'
            : 'Gemini rate limit temporarily exceeded (HTTP 429). Please retry shortly.';
      } else if (status === 503 || /UNAVAILABLE|high demand/i.test(safeMessage)) {
        userError =
          lang === 'vi'
            ? 'Máy chủ Gemini đang quá tải tạm thời (HTTP 503). Hệ thống đã tự động thử lại nhưng chưa nhận được phản hồi, vui lòng thử lại sau vài giây.'
            : 'Gemini upstream model is temporarily experiencing high demand (HTTP 503). Please retry in a few seconds.';
      } else if (status === 404 || /NOT_FOUND/i.test(safeMessage)) {
        userError =
          lang === 'vi'
            ? 'Mô hình Gemini được cấu hình chưa khả dụng với khóa hiện tại (HTTP 404).'
            : 'Configured Gemini model is unavailable for this API key (HTTP 404).';
      }

      res.status(status >= 400 && status < 600 ? status : 502).json({
        error: userError,
        upstreamStatus: status,
        upstreamReason: safeMessage.slice(0, 180),
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
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
