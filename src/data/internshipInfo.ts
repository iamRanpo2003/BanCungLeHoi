import { InternshipConfig } from '../types/festival';

export const DEFAULT_INTERNSHIP_INFO: InternshipConfig = {
  studentName: 'Nguyễn Viết Hải',
  studentId: 'PH63500',
  groupNumber: 'Nhóm 01',
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
      const parsed = JSON.parse(saved);
      if (parsed.studentId === 'PK02752') parsed.studentId = 'PH63500';
      if (parsed.groupNumber === 'Nhóm 03') parsed.groupNumber = 'Nhóm 01';
      return { ...DEFAULT_INTERNSHIP_INFO, ...parsed };
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
