import test from 'node:test';
import assert from 'node:assert';
import { TRANSLATIONS, getTranslation } from './i18n.ts';
import {
  DEFAULT_CONVERTER_DRAFT,
  DEFAULT_STORY_DRAFT,
  DEFAULT_ADMIN_DRAFT,
  DEFAULT_A11Y,
} from './storage.ts';

test('i18n contains full matching keys for Vietnamese and English', () => {
  const vi = getTranslation('vi');
  const en = getTranslation('en');

  assert.ok(vi.nav.home, 'VI should have nav.home');
  assert.ok(en.nav.home, 'EN should have nav.home');
  assert.strictEqual(vi.nav.home, 'Trang chủ');
  assert.strictEqual(en.nav.home, 'Home');

  assert.ok(vi.a11y.readAloud, 'VI should have a11y.readAloud');
  assert.ok(en.a11y.readAloud, 'EN should have a11y.readAloud');

  assert.ok(vi.converter.lunarToSolar, 'VI should have converter labels');
  assert.ok(en.converter.lunarToSolar, 'EN should have converter labels');

  assert.ok(vi.detail.overview, 'VI should have detail.overview');
  assert.ok(en.detail.overview, 'EN should have detail.overview');
});

test('Default drafts are properly structured for persistence', () => {
  assert.strictEqual(DEFAULT_CONVERTER_DRAFT.convType, 'lunarToSolar');
  assert.strictEqual(DEFAULT_CONVERTER_DRAFT.lunarDay, 10);
  assert.strictEqual(DEFAULT_CONVERTER_DRAFT.lunarMonth, 3);

  assert.strictEqual(DEFAULT_STORY_DRAFT.title, '');
  assert.strictEqual(DEFAULT_STORY_DRAFT.ethnicGroup, 'Kinh');

  assert.strictEqual(DEFAULT_ADMIN_DRAFT.category, 'Lễ hội');
  assert.strictEqual(DEFAULT_A11Y.fontSize, 'normal');
  assert.strictEqual(DEFAULT_A11Y.highContrast, false);
});
