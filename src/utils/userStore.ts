import { UserProfile } from '../types/festival';

export const DEFAULT_USER: UserProfile = {
  id: 'usr-default',
  fullName: 'Nguyễn Viết Hải',
  email: 'hai2752003hai@gmail.com',
  phone: '0987654321',
  role: 'user',
  interests: ['Lễ hội', 'Sự kiện lịch sử', 'Văn hóa 54 dân tộc', 'Di sản UNESCO'],
  bookmarks: ['gio-to-hung-vuong', 'hoi-giong-phu-dong-soc-son', 'khong-gian-van-hoa-cong-chieng-tay-nguyen'],
  reminders: [
    { festivalId: 'gio-to-hung-vuong', daysBefore: 3 },
    { festivalId: 'le-hoi-kate-dong-bao-cham', daysBefore: 1 },
  ],
  contributions: ['story-1'],
};

const USER_STORAGE_KEY = 'bancunglehoi_user_profile';

export function getUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return DEFAULT_USER;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

export function toggleBookmark(festivalId: string): boolean {
  const user = getUserProfile();
  const exists = user.bookmarks.includes(festivalId);
  if (exists) {
    user.bookmarks = user.bookmarks.filter((id) => id !== festivalId);
  } else {
    user.bookmarks.push(festivalId);
  }
  saveUserProfile(user);
  return !exists;
}

export function setFestivalReminder(festivalId: string, daysBefore: number): void {
  const user = getUserProfile();
  user.reminders = user.reminders.filter((r) => r.festivalId !== festivalId);
  if (daysBefore > 0) {
    user.reminders.push({ festivalId, daysBefore });
  }
  saveUserProfile(user);
}

export function switchUserRole(role: 'user' | 'admin'): UserProfile {
  const user = getUserProfile();
  user.role = role;
  saveUserProfile(user);
  return user;
}
