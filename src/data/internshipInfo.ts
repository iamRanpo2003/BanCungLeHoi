import { InternshipConfig } from '../types/festival';

export const DEFAULT_INTERNSHIP_INFO: InternshipConfig = {
  studentName: 'Nguyễn Văn Hải',
  studentId: 'PK02752',
  groupNumber: 'Nhóm 03',
  program: 'Chương trình Thực tập sinh Đợt 15',
  school: 'Trường Cao đẳng FPT Polytechnic',
  partnerCompany: 'Công ty Cổ phần Công nghệ IMTA TECH',
  batch: 'Đợt 15 (2026)',
};

const STORAGE_KEY = 'bancunglehoi_internship_info';

export function getInternshipInfo(): InternshipConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_INTERNSHIP_INFO, ...JSON.parse(saved) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_INTERNSHIP_INFO;
}

export function saveInternshipInfo(info: Partial<InternshipConfig>): InternshipConfig {
  const current = getInternshipInfo();
  const updated = { ...current, ...info };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // fallback
  }
  return updated;
}
