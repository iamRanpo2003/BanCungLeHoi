import { CalculatedEventInstance } from '../types/festival';

export function exportToICS(events: CalculatedEventInstance[]): void {
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bancunglehoi//Lich Le Hoi Truyen Thong Viet Nam//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Lịch Lễ Hội Truyền Thống Việt Nam (Bancunglehoi)',
    'X-WR-TIMEZONE:Asia/Ho_Chi_Minh',
  ];

  events.forEach((item) => {
    const startParts = item.solarStartDate.split('-');
    const endParts = item.solarEndDate.split('-');
    const dtStart = `${startParts[0]}${startParts[1]}${startParts[2]}`;
    const dtEnd = `${endParts[0]}${endParts[1]}${endParts[2]}`;
    const nowStr = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    icsContent.push('BEGIN:VEVENT');
    icsContent.push(`UID:bancunglehoi-${item.event.id}-${item.solarStartDate}@bancunglehoi.ai.studio`);
    icsContent.push(`DTSTAMP:${nowStr}`);
    icsContent.push(`DTSTART;VALUE=DATE:${dtStart}`);
    icsContent.push(`DTEND;VALUE=DATE:${dtEnd}`);
    icsContent.push(`SUMMARY:${item.event.name}`);
    icsContent.push(
      `DESCRIPTION:${item.event.name}\\nThời gian Âm lịch: ${item.lunarStartDateText}\\nĐịa điểm: ${item.event.locationName}, ${item.event.province}\\nDân tộc: ${item.event.ethnicGroup}\\nCăn cứ pháp lý: ${item.event.legalBasis.documentNumber} (${item.event.legalBasis.issuingAuthority})\\nNguồn: Bancunglehoi (bancunglehoi.ai.studio)`
    );
    icsContent.push(`LOCATION:${item.event.locationName}, ${item.event.province}`);
    icsContent.push('STATUS:CONFIRMED');
    icsContent.push('TRANSP:TRANSPARENT');
    icsContent.push('END:VEVENT');
  });

  icsContent.push('END:VCALENDAR');

  const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `bancunglehoi_lich_le_hoi.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToCSV(events: CalculatedEventInstance[]): void {
  const headers = [
    'Mã ID',
    'Tên Lễ hội / Sự kiện',
    'Thể loại',
    'Dân tộc',
    'Vùng miền',
    'Tỉnh thành',
    'Địa điểm tổ chức',
    'Ngày bắt đầu Dương lịch',
    'Ngày kết thúc Dương lịch',
    'Thời gian Âm lịch',
    'Căn cứ pháp lý',
    'Cơ quan ban hành',
  ];

  // Hàm chống tấn công CSV Injection (Formula Injection: =, +, -, @, tab, cr)
  const sanitizeCSV = (str: string | undefined): string => {
    if (!str) return '""';
    let val = str.replace(/"/g, '""');
    if (/^[=\+\-@\t\r]/.test(val)) {
      val = `'${val}`;
    }
    return `"${val}"`;
  };

  const rows = events.map((item) => [
    sanitizeCSV(item.event.id),
    sanitizeCSV(item.event.name),
    sanitizeCSV(item.event.category),
    sanitizeCSV(item.event.ethnicGroup),
    sanitizeCSV(item.event.region),
    sanitizeCSV(item.event.province),
    sanitizeCSV(item.event.locationName),
    sanitizeCSV(item.solarStartDate),
    sanitizeCSV(item.solarEndDate),
    sanitizeCSV(item.lunarStartDateText),
    sanitizeCSV(item.event.legalBasis.documentNumber),
    sanitizeCSV(item.event.legalBasis.issuingAuthority),
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `bancunglehoi_du_lieu_le_hoi.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(events: CalculatedEventInstance[]): void {
  const data = events.map((item) => ({
    id: item.event.id,
    name: item.event.name,
    category: item.event.category,
    ethnicGroup: item.event.ethnicGroup,
    region: item.event.region,
    province: item.event.province,
    location: item.event.locationName,
    solarStartDate: item.solarStartDate,
    solarEndDate: item.solarEndDate,
    lunarTimeText: item.lunarStartDateText,
    historicalOrigin: item.event.historicalOrigin,
    culturalMeaning: item.event.culturalMeaning,
    mainRituals: item.event.mainRituals,
    legalBasis: item.event.legalBasis,
    unescoRecognized: item.event.unescoRecognized,
    nationalHeritage: item.event.nationalHeritage,
  }));

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `bancunglehoi_du_lieu_le_hoi.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
