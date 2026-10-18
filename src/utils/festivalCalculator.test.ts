import test from 'node:test';
import assert from 'node:assert/strict';
import { FESTIVALS_DATA } from '../data/festivalsData.ts';
import { calculateEventForYear, calculateAllEventsForYear } from './festivalCalculator.ts';

test('Gio To Hung Vuong in year 2026 converts to 2026-04-26', () => {
  const hungVuong = FESTIVALS_DATA.find((f) => f.id === 'gio-to-hung-vuong');
  assert.ok(hungVuong, 'Hung Vuong festival should exist in database');

  const simulatedToday = new Date('2026-01-01');
  const calculated = calculateEventForYear(hungVuong!, 2026, simulatedToday);

  assert.equal(calculated.solarStartDate, '2026-04-26');
  assert.equal(calculated.solarEndDate, '2026-04-26');
  assert.ok(calculated.lunarStartDateText.includes('10/03 Âm lịch'));
  assert.equal(calculated.isUpcoming, true);
  assert.equal(calculated.daysRemaining, 115);
});

test('Solar festival Quoc Khanh 2/9 in year 2026 retains 2026-09-02', () => {
  const quocKhanh = FESTIVALS_DATA.find((f) => f.id === 'ngay-quoc-khanh-viet-nam');
  assert.ok(quocKhanh);

  const simulatedToday = new Date('2026-09-02');
  const calculated = calculateEventForYear(quocKhanh!, 2026, simulatedToday);

  assert.equal(calculated.solarStartDate, '2026-09-02');
  assert.equal(calculated.isToday, true);
});

test('Calculate all events for year returns sorted results', () => {
  const all2026 = calculateAllEventsForYear(FESTIVALS_DATA, 2026);
  assert.ok(all2026.length > 5);

  // Check chronological order
  for (let i = 0; i < all2026.length - 1; i++) {
    assert.ok(
      all2026[i].solarStartDate <= all2026[i + 1].solarStartDate,
      `Order violation between ${all2026[i].event.name} (${all2026[i].solarStartDate}) and ${all2026[i + 1].event.name} (${all2026[i + 1].solarStartDate})`
    );
  }
});
