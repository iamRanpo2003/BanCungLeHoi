import type { FestivalEvent, CalculatedEventInstance } from '../types/festival.ts';
import { lunarToSolar, solarToLunar } from './lunarCalendar.ts';

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * Tính toán mốc thời gian Dương lịch chính xác cho một lễ hội trong năm Dương lịch đã chọn.
 */
export function calculateEventForYear(
  event: FestivalEvent,
  targetYear: number,
  today = new Date()
): CalculatedEventInstance {
  let solarStartDateStr = '';
  let solarEndDateStr = '';
  let lunarStartDateText = '';
  let lunarEndDateText: string | undefined = undefined;

  if (event.timingType === 'lunar' && event.lunarRule) {
    const { month, day, endMonth, endDay } = event.lunarRule;

    // Tính ngày Dương lịch bắt đầu tương ứng với ngày Âm lịch trong năm đó
    const solarStart = lunarToSolar(day, month, targetYear);
    solarStartDateStr = `${solarStart.year}-${padZero(solarStart.month)}-${padZero(solarStart.day)}`;
    lunarStartDateText = `${padZero(day)}/${padZero(month)} Âm lịch (${event.lunarRule.recurringNote})`;

    if (endDay && endMonth) {
      const solarEnd = lunarToSolar(endDay, endMonth, targetYear);
      solarEndDateStr = `${solarEnd.year}-${padZero(solarEnd.month)}-${padZero(solarEnd.day)}`;
      lunarEndDateText = `${padZero(endDay)}/${padZero(endMonth)} Âm lịch`;
    } else {
      solarEndDateStr = solarStartDateStr;
    }
  } else if (event.solarRule) {
    const { month, day, endMonth, endDay } = event.solarRule;
    solarStartDateStr = `${targetYear}-${padZero(month)}-${padZero(day)}`;
    solarEndDateStr =
      endDay && endMonth
        ? `${targetYear}-${padZero(endMonth)}-${padZero(endDay)}`
        : solarStartDateStr;

    // Quy đổi ngược lại để hiển thị cả ngày Âm lịch song hành
    const lunar = solarToLunar(day, month, targetYear);
    lunarStartDateText = `${padZero(lunar.day)}/${padZero(lunar.month)} Âm lịch (${lunar.canChiYear})`;
  } else {
    // Fallback
    solarStartDateStr = `${targetYear}-01-01`;
    solarEndDateStr = `${targetYear}-01-01`;
    lunarStartDateText = 'Đang cập nhật';
  }

  // So sánh với ngày hôm nay
  const todayStr = `${today.getFullYear()}-${padZero(today.getMonth() + 1)}-${padZero(today.getDate())}`;
  const isToday =
    todayStr >= solarStartDateStr && todayStr <= solarEndDateStr;

  const startDateObj = new Date(solarStartDateStr);
  const todayDateObj = new Date(todayStr);
  const diffTime = startDateObj.getTime() - todayDateObj.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isUpcoming = daysRemaining >= 0;

  return {
    event,
    solarStartDate: solarStartDateStr,
    solarEndDate: solarEndDateStr,
    lunarStartDateText,
    lunarEndDateText,
    isToday,
    isUpcoming,
    daysRemaining,
  };
}

/**
 * Tính toán toàn bộ danh sách lễ hội cho một năm, sắp xếp theo thứ tự thời gian Dương lịch.
 */
export function calculateAllEventsForYear(
  events: FestivalEvent[],
  targetYear: number,
  today = new Date()
): CalculatedEventInstance[] {
  return events
    .map((e) => calculateEventForYear(e, targetYear, today))
    .sort((a, b) => a.solarStartDate.localeCompare(b.solarStartDate));
}

/**
 * Lọc các lễ hội diễn ra trong một tháng Dương lịch cụ thể.
 */
export function getEventsForSolarMonth(
  events: FestivalEvent[],
  targetYear: number,
  targetMonth: number, // 1-12
  today = new Date()
): CalculatedEventInstance[] {
  const monthStr = `${targetYear}-${padZero(targetMonth)}`;
  const all = calculateAllEventsForYear(events, targetYear, today);
  return all.filter((item) => {
    return (
      item.solarStartDate.startsWith(monthStr) ||
      item.solarEndDate.startsWith(monthStr)
    );
  });
}
