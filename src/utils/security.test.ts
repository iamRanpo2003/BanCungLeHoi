import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { isValidPublicUrl } from './urlValidator';
import {
  getMediaAttribution,
  detectExposedContactPII,
  validateCommunitySafeguards,
  validateAdminEventSafeguards,
} from './mediaAttribution';
import { FESTIVALS_DATA } from '../data/festivalsData';
import { INITIAL_STORIES } from '../data/communityData';
import {
  LEGAL_DOCUMENTS,
  AUTHORITATIVE_SOURCES,
  MEDIA_AND_ETHICS_CREDITS,
  CUSTODIAL_ETHICS_PRINCIPLES,
} from '../data/legalReferences';
import { DEFAULT_INTERNSHIP_INFO } from '../data/internshipInfo';
import { createApp } from '../../server';

// Helper for CSV Sanitization
function sanitizeCSV(str: string | undefined): string {
  if (!str) return '""';
  let val = str.replace(/"/g, '""');
  if (/^[=\+\-@\t\r]/.test(val)) {
    val = `'${val}`;
  }
  return `"${val}"`;
}

function collectFiles(dir: string, exts: string[]): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(full, exts));
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

test('CSV Injection protection prevents formula execution triggers', () => {
  const formula1 = '=cmd|"/C calc"!A0';
  const formula2 = '+1+2';
  const formula3 = '-SUM(A1:A10)';
  const formula4 = '@dangerous';
  const normal = 'Lễ hội Đền Hùng';

  assert.equal(sanitizeCSV(formula1), `"'=cmd|""/C calc""!A0"`);
  assert.equal(sanitizeCSV(formula2), `"'${formula2}"`);
  assert.equal(sanitizeCSV(formula3), `"'${formula3}"`);
  assert.equal(sanitizeCSV(formula4), `"'${formula4}"`);
  assert.equal(sanitizeCSV(normal), `"${normal}"`);
});

test('Quotes escaping in CSV avoids syntax break', () => {
  const quoteString = 'Lễ hội "Đền Trần" Nam Định';
  const escaped = sanitizeCSV(quoteString);
  assert.equal(escaped, '"Lễ hội ""Đền Trần"" Nam Định"');
});

test('Public URL validator blocks unsafe schemes and private/dev-only hosts', () => {
  assert.equal(isValidPublicUrl('javascript:alert(1)'), false);
  assert.equal(isValidPublicUrl('data:text/html,<script>alert(1)</script>'), false);
  assert.equal(isValidPublicUrl('vbscript:msgbox(1)'), false);
  assert.equal(isValidPublicUrl('file:///etc/passwd'), false);
  assert.equal(isValidPublicUrl(''), false);
  assert.equal(isValidPublicUrl('not a url'), false);

  // Private / local / preview-only hosts must be rejected
  assert.equal(isValidPublicUrl('http://localhost:3000'), false);
  assert.equal(isValidPublicUrl('https://127.0.0.1/admin'), false);
  assert.equal(isValidPublicUrl('http://192.168.1.10/api'), false);
  assert.equal(isValidPublicUrl('http://10.0.0.1/secret'), false);
  assert.equal(isValidPublicUrl('http://172.16.0.5/internal'), false);
  assert.equal(isValidPublicUrl('https://mybox.local/dashboard'), false);
  assert.equal(isValidPublicUrl('https://ais-dev-abc123.run.app'), false);

  // Real public URLs are allowed
  assert.equal(isValidPublicUrl('https://images.unsplash.com/photo-123'), true);
  assert.equal(isValidPublicUrl('https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=130228'), true);
});

test('Source code, server.ts, and config contain zero hardcoded API keys or secrets', () => {
  const rootDir = process.cwd();
  const files = [
    ...collectFiles(path.join(rootDir, 'src'), ['.ts', '.tsx']),
    path.join(rootDir, 'server.ts'),
    path.join(rootDir, 'index.html'),
    path.join(rootDir, 'vite.config.ts'),
  ].filter((f) => !f.endsWith('.test.ts'));

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    assert.equal(/AIza[0-9A-Za-z_-]{20,}/.test(content), false, `API key pattern found in ${file}`);
    assert.equal(/sk-[0-9A-Za-z]{20,}/.test(content), false, `Secret key pattern found in ${file}`);
    if (!file.endsWith('server.ts')) {
      assert.equal(/process\.env\.GEMINI_API_KEY/.test(content), false, `Client env reference found in ${file}`);
    }
  }

  const envExample = fs.readFileSync(path.join(rootDir, '.env.example'), 'utf8');
  assert.equal(/MY_GEMINI_API_KEY|MY_APP_URL/.test(envExample), false);
  assert.equal(/^GEMINI_API_KEY=\S+/m.test(envExample), false);
});

test('UI components contain no login password walls or broken/private links', () => {
  const rootDir = process.cwd();
  const uiFiles = [
    ...collectFiles(path.join(rootDir, 'src', 'components'), ['.tsx']),
    ...collectFiles(path.join(rootDir, 'src', 'data'), ['.ts']),
    path.join(rootDir, 'src', 'App.tsx'),
  ];

  for (const file of uiFiles) {
    const content = fs.readFileSync(file, 'utf8');
    assert.equal(/type=["']password["']/.test(content), false, `Password input found in ${file}`);
    assert.equal(/href=["']#["']/.test(content), false, `Broken href="#" found in ${file}`);
    assert.equal(/bancunglehoi\.ai\.studio/.test(content), false, `Fictional domain found in ${file}`);
    assert.equal(/ais-dev-/.test(content), false, `Private dev URL found in ${file}`);
    assert.equal(/http:\/\/localhost/.test(content), false, `Localhost URL found in ${file}`);
  }

  for (const doc of LEGAL_DOCUMENTS) {
    assert.equal(isValidPublicUrl(doc.linkRef), true, `Legal document ${doc.id} has invalid public linkRef`);
  }

  assert.equal(AUTHORITATIVE_SOURCES.length >= 5, true, 'At least 5 authoritative sources must exist');
  for (const src of AUTHORITATIVE_SOURCES) {
    assert.equal(isValidPublicUrl(src.url), true, `Authoritative source ${src.id} has invalid URL`);
    const host = new URL(src.url).hostname.toLowerCase();
    const isOfficial =
      host === 'vbpl.vn' ||
      host === 'chinhphu.vn' ||
      host.endsWith('.gov.vn') ||
      host.endsWith('.unesco.org');
    assert.equal(isOfficial, true, `Non-official source domain in ${src.url}`);
  }
});

test('Dataset metrics, 2025 administrative names, UNESCO & legal fixes, and accreditation are truthful', () => {
  assert.equal(FESTIVALS_DATA.length, 18);
  const festivalImageUrls = new Set(FESTIVALS_DATA.map((f) => f.imageUrl));
  assert.equal(festivalImageUrls.size, 18, 'All 18 festivals should have distinct image URLs');
  for (const fest of FESTIVALS_DATA) {
    assert.equal(isValidPublicUrl(fest.imageUrl), true, `Invalid festival imageUrl for ${fest.id}`);
  }

  // Verified UNESCO count: Giong, Hung Kings, Central Highlands Gongs, Quan Ho (Hoi Lim), Ba Chua Xu Sam Mountain
  assert.equal(FESTIVALS_DATA.filter((f) => f.unescoRecognized).length, 5);

  // Verified 2025 administrative reorganization + legal document corrections
  const denTran = FESTIVALS_DATA.find((f) => f.id === 'le-hoi-den-tran');
  assert.ok(denTran?.province.includes('Ninh Bình'));
  assert.ok(denTran?.legalBasis.documentNumber.includes('4205/QĐ-BVHTTDL'));

  const hoangSa = FESTIVALS_DATA.find((f) => f.id === 'le-khao-le-the-linh-hoang-sa');
  assert.ok(hoangSa?.legalBasis.documentNumber.includes('1524/QĐ-BVHTTDL'));

  const duaBo = FESTIVALS_DATA.find((f) => f.id === 'le-hoi-dua-bo-bay-nui');
  assert.ok(duaBo?.legalBasis.documentNumber.includes('246/QĐ-BVHTTDL'));

  const chuaBa = FESTIVALS_DATA.find((f) => f.id === 'le-hoi-chua-ba-thien-hau');
  assert.equal(chuaBa?.nationalHeritage, false);
  assert.ok(chuaBa?.province.includes('TP. Hồ Chí Minh'));

  for (const story of INITIAL_STORIES) {
    for (const img of story.images || []) {
      assert.equal(isValidPublicUrl(img), true, `Invalid story image URL for ${story.id}`);
    }
  }
  assert.equal(INITIAL_STORIES.every((s) => s.isSample === true && s.likes === 0), true);
  assert.equal(DEFAULT_INTERNSHIP_INFO.studentName, 'Nguyễn Viết Hải');
  assert.equal(DEFAULT_INTERNSHIP_INFO.studentId, 'PH63500');
  assert.equal(DEFAULT_INTERNSHIP_INFO.groupNumber, 'Nhóm 01');
});

test('Express backend exposes /api/health and validates Gemini prompt input', async () => {
  const app = createApp();
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));

  try {
    const addr = server.address();
    assert.ok(addr && typeof addr === 'object');
    const baseUrl = `http://127.0.0.1:${addr.port}`;

    const healthRes = await fetch(`${baseUrl}/api/health`);
    assert.equal(healthRes.status, 200);
    const healthJson = (await healthRes.json()) as { status: string; model: string };
    assert.equal(healthJson.status, 'ok');
    assert.equal(healthJson.model, 'gemini-4-hydrogen');

    const badRes = await fetch(`${baseUrl}/api/gemini/cultural-guide`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: 'hi', lang: 'vi' }),
    });
    assert.equal(badRes.status, 400);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve()))
    );
  }
});

test('Media attribution, no-AI imagery, custodian non-disclosure, and PII safeguards work correctly', () => {
  // Every festival photo and community sample photo resolves to a valid public Pexels source URL
  for (const fest of FESTIVALS_DATA) {
    const attr = getMediaAttribution(fest.imageUrl, fest.imageSourceNote);
    assert.equal(attr.provider, 'Pexels');
    assert.ok(attr.photoId && /^\d+$/.test(attr.photoId), `Missing Pexels ID on ${fest.id}`);
    assert.equal(isValidPublicUrl(attr.sourceUrl), true, `Invalid Pexels source page on ${fest.id}`);
    assert.equal(attr.isIllustrativeRealPhoto, true);
  }

  for (const story of INITIAL_STORIES) {
    assert.equal(story.authorEmail, undefined, `No private email exposed on story ${story.id}`);
    const pii = detectExposedContactPII(story.content);
    assert.equal(pii.hasEmail, false);
    assert.equal(pii.hasPhone, false);
    if (story.images[0]) {
      const attr = getMediaAttribution(story.images[0], story.sourceReference);
      assert.equal(isValidPublicUrl(attr.sourceUrl), true);
    }
  }

  // Dedicated Sources & Attribution section data must exist
  assert.equal(MEDIA_AND_ETHICS_CREDITS.length >= 4, true);
  assert.equal(CUSTODIAL_ETHICS_PRINCIPLES.length >= 4, true);

  // Safeguard validation blocks unconsented submissions, PII leaks, and uncredited external URLs
  assert.equal(
    validateCommunitySafeguards({
      consentMediaLicense: false,
      consentRestrictedExcluded: true,
      consentPrivacyNonDisclosure: true,
      content: 'Kể chuyện lễ hội mùa xuân',
    }).valid,
    false
  );
  assert.equal(
    validateCommunitySafeguards({
      consentMediaLicense: true,
      consentRestrictedExcluded: false,
      consentPrivacyNonDisclosure: true,
      content: 'Kể chuyện lễ hội mùa xuân',
    }).valid,
    false
  );
  assert.equal(
    validateCommunitySafeguards({
      consentMediaLicense: true,
      consentRestrictedExcluded: true,
      consentPrivacyNonDisclosure: false,
      content: 'Kể chuyện lễ hội mùa xuân',
    }).valid,
    false
  );
  assert.equal(
    validateCommunitySafeguards({
      consentMediaLicense: true,
      consentRestrictedExcluded: true,
      consentPrivacyNonDisclosure: true,
      content: 'Liên hệ anh A qua số 0912345678 hoặc email test@example.com',
    }).valid,
    false
  );
  assert.equal(
    validateCommunitySafeguards({
      consentMediaLicense: true,
      consentRestrictedExcluded: true,
      consentPrivacyNonDisclosure: true,
      customImageUrl: 'https://example.com/photo.jpg',
      sourceReference: '',
      content: 'Kể chuyện lễ hội mùa xuân',
    }).valid,
    false
  );
  assert.equal(
    validateCommunitySafeguards({
      consentMediaLicense: true,
      consentRestrictedExcluded: true,
      consentPrivacyNonDisclosure: true,
      customImageUrl: 'https://images.pexels.com/photos/30732172/pexels-photo-30732172.jpeg',
      sourceReference: 'Pexels #30732172',
      content: 'Trải nghiệm rước kiệu trang nghiêm.',
    }).valid,
    true
  );

  // Admin safeguard validator blocks missing confirmations or unattributed URLs
  assert.equal(
    validateAdminEventSafeguards({
      consentRealMediaAttribution: false,
      consentCustodianNonDisclosure: true,
    }).valid,
    false
  );
  assert.equal(
    validateAdminEventSafeguards({
      consentRealMediaAttribution: true,
      consentCustodianNonDisclosure: true,
      customImageUrl: 'https://example.com/fest.jpg',
      imageSourceNote: '',
    }).valid,
    false
  );
  assert.equal(
    validateAdminEventSafeguards({
      consentRealMediaAttribution: true,
      consentCustodianNonDisclosure: true,
      customImageUrl: 'https://example.com/fest.jpg',
      imageSourceNote: 'Tác giả Nguyễn Văn A cấp phép sử dụng',
    }).valid,
    true
  );
});
