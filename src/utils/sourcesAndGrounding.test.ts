import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  MISSING_SOURCE_LABEL,
  buildAllAppSources,
  buildContributorAcknowledgments,
} from '../data/sourcesRegistry';
import { FESTIVALS_DATA } from '../data/festivalsData';
import {
  AUTHORITATIVE_SOURCES,
  LEGAL_DOCUMENTS,
  MEDIA_AND_ETHICS_CREDITS,
} from '../data/legalReferences';
import { INITIAL_STORIES } from '../data/communityData';
import {
  NO_INFO_VI,
  buildGroundedAppContext,
  getOfficialSourceSuggestions,
  normalizeGroundedGeminiPayload,
  parseGeminiJsonText,
} from './geminiGrounding';

test('sourcesRegistry lists all codebase sources with 4 fields and [CẦN BỔ SUNG] without inventing fields', () => {
  const sources = buildAllAppSources();
  const expectedCount =
    AUTHORITATIVE_SOURCES.length +
    LEGAL_DOCUMENTS.length +
    FESTIVALS_DATA.length +
    MEDIA_AND_ETHICS_CREDITS.length +
    FESTIVALS_DATA.length;

  assert.equal(sources.length, expectedCount);

  for (const s of sources) {
    assert.ok(s.name.trim().length > 0, `Missing name on ${s.id}`);
    assert.ok(s.publisher.trim().length > 0, `Missing publisher on ${s.id}`);
    assert.ok(s.year.trim().length > 0, `Missing year on ${s.id}`);
    assert.ok(s.url.trim().length > 0, `Missing url on ${s.id}`);
  }

  // Per-festival legal dossiers have no individual decision URL stored in codebase -> must be [CẦN BỔ SUNG]
  const dossiers = sources.filter((s) => s.category === 'festival-dossier');
  assert.equal(dossiers.length, FESTIVALS_DATA.length);
  assert.equal(
    dossiers.every((d) => d.url === MISSING_SOURCE_LABEL),
    true,
    'Festival dossiers without stored URLs must not fabricate links'
  );

  // Portals and Pexels photos have no publication year stored in codebase -> must be [CẦN BỔ SUNG]
  const portals = sources.filter((s) => s.category === 'official-portal');
  assert.equal(
    portals.every((p) => p.year === MISSING_SOURCE_LABEL),
    true,
    'Official portals without stored year must display [CẦN BỔ SUNG]'
  );

  const photos = sources.filter((s) => s.category === 'media-photo');
  assert.equal(photos.length, FESTIVALS_DATA.length);
  assert.equal(
    photos.every((p) => p.year === MISSING_SOURCE_LABEL && p.url.startsWith('https://www.pexels.com/photo/')),
    true
  );
});

test('contributor acknowledgments list all community story contributors transparently', () => {
  const contribs = buildContributorAcknowledgments();
  assert.equal(contribs.length, INITIAL_STORIES.length);
  for (const c of contribs) {
    assert.ok(c.contributorName.length > 0);
    assert.ok(c.contribution.length > 0);
    assert.ok(c.sourceReference.length > 0);
    assert.equal(c.url, MISSING_SOURCE_LABEL);
  }
});

test('buildGroundedAppContext includes all festivals, legal docs, and official portals', () => {
  const ctx = buildGroundedAppContext({
    id: FESTIVALS_DATA[0].id,
    name: FESTIVALS_DATA[0].name,
    province: FESTIVALS_DATA[0].province,
    legalDocument: FESTIVALS_DATA[0].legalBasis.documentNumber,
  });

  assert.ok(ctx.includes('=== HỒ SƠ ĐANG XEM TRỰC TIẾP ==='));
  assert.ok(ctx.includes(`=== DANH SÁCH ${FESTIVALS_DATA.length} LỄ HỘI`));
  for (const fest of FESTIVALS_DATA) {
    assert.ok(ctx.includes(fest.name), `Context missing festival ${fest.name}`);
  }
  for (const doc of LEGAL_DOCUMENTS) {
    assert.ok(ctx.includes(doc.code), `Context missing legal doc ${doc.code}`);
  }
  for (const portal of AUTHORITATIVE_SOURCES) {
    assert.ok(ctx.includes(portal.url), `Context missing official portal ${portal.url}`);
  }
});

test('normalizeGroundedGeminiPayload preserves grounded answers with sources and enforces fallback on missing info', () => {
  const groundedRaw = JSON.stringify({
    foundInAppData: true,
    answer: 'Lễ hội Đền Hùng diễn ra vào mùng 10 tháng 3 Âm lịch tại Phú Thọ.',
    sourcesUsed: ['Hồ sơ lễ hội "Giỗ Tổ Hùng Vương - Lễ hội Đền Hùng" | Quyết định 1712/QĐ-BVHTTDL'],
    suggestedOfficialSources: [],
  });
  const ok = normalizeGroundedGeminiPayload(groundedRaw, 'vi', 'gemini-4-hydrogen');
  assert.equal(ok.foundInAppData, true);
  assert.ok(ok.answer.includes('mùng 10 tháng 3 Âm lịch'));
  assert.equal(ok.sourcesUsed.length, 1);

  // Out-of-scope / not found must contain exact "Ứng dụng chưa có thông tin này" + official suggestions
  const missingRaw = JSON.stringify({
    foundInAppData: false,
    answer: `${NO_INFO_VI}. Lễ hội hoa anh đào Nhật Bản không nằm trong dữ liệu ứng dụng.`,
    sourcesUsed: ['Kho dữ liệu 18 lễ hội & 7 văn bản pháp lý Bancunglehoi'],
    suggestedOfficialSources: [],
  });
  const notFound = normalizeGroundedGeminiPayload(missingRaw, 'vi', 'gemini-4-hydrogen');
  assert.equal(notFound.foundInAppData, false);
  assert.ok(notFound.answer.includes(NO_INFO_VI));
  assert.ok(notFound.sourcesUsed.length >= 1);
  assert.equal(notFound.suggestedOfficialSources.length, getOfficialSourceSuggestions().length);

  // Even if model sets foundInAppData=true but provides empty sourcesUsed, treat as unverified/not found
  const noSourcesRaw = JSON.stringify({
    foundInAppData: true,
    answer: 'Suy đoán không có nguồn.',
    sourcesUsed: [],
    suggestedOfficialSources: [],
  });
  const forcedFallback = normalizeGroundedGeminiPayload(noSourcesRaw, 'vi', 'gemini-4-hydrogen');
  assert.equal(forcedFallback.foundInAppData, false);
  assert.ok(forcedFallback.answer.includes(NO_INFO_VI));

  // Fenced JSON parsing
  const fenced = '```json\n{"foundInAppData":true,"answer":"Test","sourcesUsed":["Nguồn A"],"suggestedOfficialSources":[]}\n```';
  const parsedFenced = parseGeminiJsonText(fenced);
  assert.equal(parsedFenced?.foundInAppData, true);
  assert.equal(parsedFenced?.answer, 'Test');
});

test('server.ts does not leak error messages, raw errors, or GEMINI_API_KEY in logs or responses', () => {
  const serverCode = fs.readFileSync(path.join(process.cwd(), 'server.ts'), 'utf8');
  assert.equal(/upstreamReason/.test(serverCode), false, 'upstreamReason must not be exposed to client');
  assert.equal(/console\.error\([^)]*safeMessage/.test(serverCode), false);
  assert.equal(/console\.error\([^)]*err\b/.test(serverCode), false);
  assert.equal(/process\.env\.GEMINI_API_KEY/.test(serverCode), true);
});
