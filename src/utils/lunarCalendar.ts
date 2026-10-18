/**
 * Thuật toán tính Âm lịch Việt Nam chuẩn múi giờ GMT+7 (Hà Nội)
 * Dựa trên các công thức thiên văn của Jean Meeus và thuật toán Lịch Âm của Hồ Ngọc Đức.
 */

// Đổi ngày Dương lịch (dd, mm, yyyy) sang số ngày Julius
export function jdFromDate(d: number, m: number, y: number): number {
  const a = Math.floor((14 - m) / 12);
  const y2 = y + 4800 - a;
  const m2 = m + 12 * a - 3;
  let jd =
    d +
    Math.floor((153 * m2 + 2) / 5) +
    365 * y2 +
    Math.floor(y2 / 4) -
    Math.floor(y2 / 100) +
    Math.floor(y2 / 400) -
    32045;
  if (jd < 2299161) {
    jd = d + Math.floor((153 * m2 + 2) / 5) + 365 * y2 + Math.floor(y2 / 4) - 32083;
  }
  return jd;
}

// Đổi số ngày Julius sang ngày Dương lịch (dd, mm, yyyy)
export function jdToDate(jd: number): { day: number; month: number; year: number } {
  let a: number, b: number, c: number, d: number, e: number, m: number;
  if (jd > 2299160) {
    const alpha = Math.floor((jd - 1867216.25) / 36524.25);
    a = jd + 1 + alpha - Math.floor(alpha / 4);
  } else {
    a = jd;
  }
  b = a + 1524;
  c = Math.floor((b - 122.1) / 365.25);
  d = Math.floor(365.25 * c);
  e = Math.floor((b - d) / 30.6001);
  const day = b - d - Math.floor(30.6001 * e);
  if (e < 14) {
    m = e - 1;
  } else {
    m = e - 13;
  }
  let year: number;
  if (m > 2) {
    year = c - 4716;
  } else {
    year = c - 4715;
  }
  return { day, month: m, year };
}

// Tìm điểm Sóc (New Moon) gần nhất với k
export function getNewMoonDay(k: number, timeZone = 7): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;
  let Jd1 =
    2415020.75933 +
    29.53058868 * k +
    0.0001178 * T2 -
    0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  const C1 =
    (0.1734 - 0.000393 * T) * Math.sin(M * dr) +
    0.0021 * Math.sin(2 * dr * M);
  const C2 = -0.4068 * Math.sin(Mpr * dr) + 0.0102 * Math.sin(2 * dr * Mpr);
  const C3 =
    0.0161 * Math.sin(2 * dr * F) -
    0.0004 * Math.sin(2 * dr * F + M * dr) +
    0.0004 * Math.sin(2 * dr * F - M * dr);
  const C4 =
    -0.0051 * Math.sin((M + Mpr) * dr) +
    0.0074 * Math.sin((M - Mpr) * dr) +
    0.0004 * Math.sin((2 * F + Mpr) * dr);
  const C5 =
    -0.0004 * Math.sin((2 * F - Mpr) * dr) -
    0.0006 * Math.sin((2 * M + Mpr) * dr) +
    0.001 * Math.sin((2 * M - Mpr) * dr);
  const C6 = 0.0005 * Math.sin((2 * Mpr + M) * dr);
  const deltaT = 0;
  const JdNew = Jd1 + C1 + C2 + C3 + C4 + C5 + C6 - deltaT;
  return Math.floor(JdNew + 0.5 + timeZone / 24);
}

// Kinh độ mặt trời (Sun Longitude) tại một số ngày Julius
export function getSunLongitude(dayNumber: number, timeZone = 7): number {
  const T = (dayNumber - 0.5 - timeZone / 24 - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  const DL =
    (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M) +
    (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
    0.00029 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));
  return Math.floor((L / Math.PI) * 6); // 0-11
}

// Chuyển đổi Dương lịch sang Âm lịch Việt Nam
export function solarToLunar(
  d: number,
  m: number,
  y: number,
  timeZone = 7
): {
  day: number;
  month: number;
  year: number;
  isLeap: boolean;
  canChiDay: string;
  canChiMonth: string;
  canChiYear: string;
  solarTerm: string;
} {
  const dayNumber = jdFromDate(d, m, y);
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }
  let a11 = getLunarMonth11(y, timeZone);
  let b11 = a11;
  let lunarYear: number;
  if (a11 >= monthStart) {
    lunarYear = y;
    a11 = getLunarMonth11(y - 1, timeZone);
  } else {
    lunarYear = y + 1;
    b11 = getLunarMonth11(y + 1, timeZone);
  }
  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let isLeap = false;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) {
        isLeap = true;
      }
    }
  }
  if (lunarMonth > 12) {
    lunarMonth = lunarMonth - 12;
  }
  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }

  const canChiYear = getCanChiYear(lunarYear);
  const canChiMonth = getCanChiMonth(lunarMonth, lunarYear);
  const canChiDay = getCanChiDay(dayNumber);
  const solarTerm = getSolarTerm(dayNumber, timeZone);

  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeap,
    canChiDay,
    canChiMonth,
    canChiYear,
    solarTerm,
  };
}

// Chuyển đổi Âm lịch sang Dương lịch Việt Nam
export function lunarToSolar(
  lunarDay: number,
  lunarMonth: number,
  lunarYear: number,
  isLeapMonth = false,
  timeZone = 7
): { day: number; month: number; year: number } {
  let a11: number;
  if (lunarMonth < 11) {
    a11 = getLunarMonth11(lunarYear - 1, timeZone);
  } else {
    a11 = getLunarMonth11(lunarYear, timeZone);
  }
  const b11 = getLunarMonth11(lunarYear + (lunarMonth < 11 ? 0 : 1), timeZone);
  let off = lunarMonth - 11;
  if (off < 0) {
    off += 12;
  }
  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, timeZone);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) leapMonth += 12;
    if (isLeapMonth && lunarMonth !== leapMonth) {
      return { day: 0, month: 0, year: 0 };
    }
    if (isLeapMonth || off >= leapOff) {
      off += 1;
    }
  }
  const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  const monthStart = getNewMoonDay(k + off, timeZone);
  return jdToDate(monthStart + lunarDay - 1);
}

function getLunarMonth11(y: number, timeZone = 7): number {
  const off = jdFromDate(31, 12, y) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

function getLeapMonthOffset(a11: number, timeZone = 7): number {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);
  return i - 1;
}

// Can - Chi helper calculations
const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export function getCanChiYear(year: number): string {
  const can = CAN[(year + 6) % 10];
  const chi = CHI[(year + 8) % 12];
  return `${can} ${chi}`;
}

export function getCanChiDay(jd: number): string {
  const can = CAN[(jd + 9) % 10];
  const chi = CHI[(jd + 1) % 12];
  return `${can} ${chi}`;
}

export function getCanChiMonth(lunarMonth: number, lunarYear: number): string {
  const canIdx = ((lunarYear % 5) * 2 + lunarMonth + 1) % 10;
  const chiIdx = (lunarMonth + 1) % 12;
  return `${CAN[canIdx]} ${CHI[chiIdx]}`;
}

const SOLAR_TERMS = [
  'Xuân phân',
  'Thanh minh',
  'Cốc vũ',
  'Lập hạ',
  'Tiểu mãn',
  'Mang chủng',
  'Hạ chí',
  'Tiểu thử',
  'Đại thử',
  'Lập thu',
  'Xử thử',
  'Bạch lộ',
  'Thu phân',
  'Hàn lộ',
  'Sương giáng',
  'Lập đông',
  'Tiểu tuyết',
  'Đại tuyết',
  'Đông chí',
  'Tiểu hàn',
  'Đại hàn',
  'Lập xuân',
  'Vũ thủy',
  'Kinh trập',
];

export function getSolarTerm(jd: number, timeZone = 7): string {
  const termIdx = Math.floor(getSunLongitude(jd, timeZone) * 2);
  return SOLAR_TERMS[termIdx % 24] || 'Tiết xuân';
}

/**
 * Giờ Hoàng đạo theo Chi của ngày
 */
export function getHoangDaoHours(chiOfDay: string): string[] {
  const map: Record<string, string[]> = {
    'Tý': ['Tý (23-1h)', 'Sửu (1-3h)', 'Mão (5-7h)', 'Ngọ (11-13h)', 'Thân (15-17h)', 'Dậu (17-19h)'],
    'Sửu': ['Dần (3-5h)', 'Mão (5-7h)', 'Tỵ (9-11h)', 'Thân (15-17h)', 'Tuất (19-21h)', 'Hợi (21-23h)'],
    'Dần': ['Tý (23-1h)', 'Sửu (1-3h)', 'Thìn (7-9h)', 'Tỵ (9-11h)', 'Mùi (13-15h)', 'Tuất (19-21h)'],
    'Mão': ['Tý (23-1h)', 'Dần (3-5h)', 'Mão (5-7h)', 'Ngọ (11-13h)', 'Mùi (13-15h)', 'Dậu (17-19h)'],
    'Thìn': ['Dần (3-5h)', 'Thìn (7-9h)', 'Tỵ (9-11h)', 'Thân (15-17h)', 'Dậu (17-19h)', 'Hợi (21-23h)'],
    'Tỵ': ['Sửu (1-3h)', 'Thìn (7-9h)', 'Ngọ (11-13h)', 'Mùi (13-15h)', 'Tuất (19-21h)', 'Hợi (21-23h)'],
    'Ngọ': ['Tý (23-1h)', 'Sửu (1-3h)', 'Mão (5-7h)', 'Ngọ (11-13h)', 'Thân (15-17h)', 'Dậu (17-19h)'],
    'Mùi': ['Dần (3-5h)', 'Mão (5-7h)', 'Tỵ (9-11h)', 'Thân (15-17h)', 'Tuất (19-21h)', 'Hợi (21-23h)'],
    'Thân': ['Tý (23-1h)', 'Sửu (1-3h)', 'Thìn (7-9h)', 'Tỵ (9-11h)', 'Mùi (13-15h)', 'Tuất (19-21h)'],
    'Dậu': ['Tý (23-1h)', 'Dần (3-5h)', 'Mão (5-7h)', 'Ngọ (11-13h)', 'Mùi (13-15h)', 'Dậu (17-19h)'],
    'Tuất': ['Dần (3-5h)', 'Thìn (7-9h)', 'Tỵ (9-11h)', 'Thân (15-17h)', 'Dậu (17-19h)', 'Hợi (21-23h)'],
    'Hợi': ['Sửu (1-3h)', 'Thìn (7-9h)', 'Ngọ (11-13h)', 'Mùi (13-15h)', 'Tuất (19-21h)', 'Hợi (21-23h)'],
  };
  const chi = chiOfDay.split(' ')[1] || chiOfDay;
  return map[chi] || ['Dần (3-5h)', 'Mão (5-7h)', 'Ngọ (11-13h)', 'Thân (15-17h)'];
}
