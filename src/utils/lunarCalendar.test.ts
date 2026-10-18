import test from 'node:test';
import assert from 'node:assert/strict';
import {
  solarToLunar,
  lunarToSolar,
  getCanChiYear,
  jdFromDate,
  jdToDate,
} from './lunarCalendar.ts';

test('Julian day bidirectional conversion', () => {
  const d = 18, m = 10, y = 2026;
  const jd = jdFromDate(d, m, y);
  const back = jdToDate(jd);
  assert.equal(back.day, d);
  assert.equal(back.month, m);
  assert.equal(back.year, y);
});

test('Tet Nguyen Dan 2026 conversion: 1/1 lunar year Binh Ngo', () => {
  // Lunar 1/1/2026 corresponds to 17/2/2026 solar
  const solar = lunarToSolar(1, 1, 2026);
  assert.equal(solar.day, 17);
  assert.equal(solar.month, 2);
  assert.equal(solar.year, 2026);

  // Convert back
  const lunar = solarToLunar(17, 2, 2026);
  assert.equal(lunar.day, 1);
  assert.equal(lunar.month, 1);
  assert.equal(lunar.year, 2026);
  assert.equal(lunar.canChiYear, 'Bính Ngọ');
});

test('Gio To Hung Vuong (10/3 lunar) calculation for 2026', () => {
  // In 2026, 10/3 lunar
  const solar = lunarToSolar(10, 3, 2026);
  assert.equal(solar.year, 2026);
  assert.equal(solar.month, 4);
  assert.equal(solar.day, 26);

  // Check reverse conversion
  const lunar = solarToLunar(26, 4, 2026);
  assert.equal(lunar.day, 10);
  assert.equal(lunar.month, 3);
  assert.equal(lunar.year, 2026);
});

test('Mid-Autumn Festival (Tet Trung Thu 15/8 lunar) for 2026', () => {
  const solar = lunarToSolar(15, 8, 2026);
  assert.equal(solar.year, 2026);
  assert.equal(solar.month, 9);
  assert.equal(solar.day, 25);

  const lunar = solarToLunar(25, 9, 2026);
  assert.equal(lunar.day, 15);
  assert.equal(lunar.month, 8);
});

test('Can Chi Year calculations for standard milestone years', () => {
  assert.equal(getCanChiYear(2024), 'Giáp Thìn');
  assert.equal(getCanChiYear(2025), 'Ất Tỵ');
  assert.equal(getCanChiYear(2026), 'Bính Ngọ');
  assert.equal(getCanChiYear(2027), 'Đinh Mùi');
});
