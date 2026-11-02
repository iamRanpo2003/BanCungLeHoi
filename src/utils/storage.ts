import {
  FestivalEvent,
  UserProfile,
  AppLanguage,
  AccessibilitySettings,
  CommunityStory,
} from '../types/festival';
import { FESTIVALS_DATA } from '../data/festivalsData';
import { DEFAULT_USER } from './userStore';

// Keys for LocalStorage
const KEYS = {
  EVENTS_DB: 'bancunglehoi_events_db',
  USER_PROFILE: 'bancunglehoi_user_profile',
  COMMUNITY_STORIES: 'bancunglehoi_community_stories',
  APP_LANGUAGE: 'bancunglehoi_language',
  A11Y_SETTINGS: 'bancunglehoi_a11y_settings',
  STORY_FORM_DRAFT: 'bancunglehoi_story_form_draft',
  ADMIN_EVENT_DRAFT: 'bancunglehoi_admin_event_draft',
  CONVERTER_STATE: 'bancunglehoi_converter_state',
  SEARCH_QUERY: 'bancunglehoi_search_query',
  ACTIVE_TAB: 'bancunglehoi_active_tab',
};

// --- Language ---
export function getSavedLanguage(): AppLanguage {
  try {
    const saved = localStorage.getItem(KEYS.APP_LANGUAGE);
    if (saved === 'en' || saved === 'vi') return saved;
  } catch {}
  return 'vi';
}

export function saveLanguage(lang: AppLanguage): void {
  try {
    localStorage.setItem(KEYS.APP_LANGUAGE, lang);
  } catch {}
}

// --- Accessibility Settings ---
export const DEFAULT_A11Y: AccessibilitySettings = {
  fontSize: 'normal',
  highContrast: false,
  speechRate: 1.0,
};

export function getSavedA11y(): AccessibilitySettings {
  try {
    const saved = localStorage.getItem(KEYS.A11Y_SETTINGS);
    if (saved) {
      return { ...DEFAULT_A11Y, ...JSON.parse(saved) };
    }
  } catch {}
  return DEFAULT_A11Y;
}

export function saveA11y(settings: AccessibilitySettings): void {
  try {
    localStorage.setItem(KEYS.A11Y_SETTINGS, JSON.stringify(settings));
  } catch {}
}

// --- Events Database (CRUD persistence for additions, edits, deletions) ---
export function getSavedEvents(): FestivalEvent[] {
  try {
    const saved = localStorage.getItem(KEYS.EVENTS_DB);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return FESTIVALS_DATA;
}

export function saveEvents(events: FestivalEvent[]): void {
  try {
    localStorage.setItem(KEYS.EVENTS_DB, JSON.stringify(events));
  } catch {}
}

// --- Drafts for User Input Fields ---
export interface StoryFormDraft {
  title: string;
  authorName: string;
  authorRole: string;
  festivalId: string;
  province: string;
  ethnicGroup: string;
  content: string;
  sourceReference: string;
  imageUrl: string;
}

export const DEFAULT_STORY_DRAFT: StoryFormDraft = {
  title: '',
  authorName: '',
  authorRole: 'Du khách trẩy hội',
  festivalId: '',
  province: '',
  ethnicGroup: 'Kinh',
  content: '',
  sourceReference: '',
  imageUrl: '',
};

export function getSavedStoryDraft(): StoryFormDraft {
  try {
    const saved = localStorage.getItem(KEYS.STORY_FORM_DRAFT);
    if (saved) {
      return { ...DEFAULT_STORY_DRAFT, ...JSON.parse(saved) };
    }
  } catch {}
  return DEFAULT_STORY_DRAFT;
}

export function saveStoryDraft(draft: StoryFormDraft): void {
  try {
    localStorage.setItem(KEYS.STORY_FORM_DRAFT, JSON.stringify(draft));
  } catch {}
}

export function clearStoryDraft(): void {
  try {
    localStorage.removeItem(KEYS.STORY_FORM_DRAFT);
  } catch {}
}

// --- Admin Event Draft ---
export interface AdminEventDraft {
  name: string;
  category: string;
  ethnicGroup: string;
  region: string;
  province: string;
  locationName: string;
  timingType: 'lunar' | 'solar';
  lunarMonth: number;
  lunarDay: number;
  recurringNote: string;
  historicalOrigin: string;
  culturalMeaning: string;
  documentNumber: string;
  issuingAuthority: string;
  imageUrl: string;
}

export const DEFAULT_ADMIN_DRAFT: AdminEventDraft = {
  name: '',
  category: 'Lễ hội',
  ethnicGroup: 'Kinh',
  region: 'Bắc',
  province: '',
  locationName: '',
  timingType: 'lunar',
  lunarMonth: 1,
  lunarDay: 15,
  recurringNote: 'Rằm tháng Giêng Âm lịch',
  historicalOrigin: '',
  culturalMeaning: '',
  documentNumber: '',
  issuingAuthority: 'Bộ Văn hóa, Thể thao và Du lịch',
  imageUrl: '',
};

export function getSavedAdminDraft(): AdminEventDraft {
  try {
    const saved = localStorage.getItem(KEYS.ADMIN_EVENT_DRAFT);
    if (saved) {
      return { ...DEFAULT_ADMIN_DRAFT, ...JSON.parse(saved) };
    }
  } catch {}
  return DEFAULT_ADMIN_DRAFT;
}

export function saveAdminDraft(draft: AdminEventDraft): void {
  try {
    localStorage.setItem(KEYS.ADMIN_EVENT_DRAFT, JSON.stringify(draft));
  } catch {}
}

export function clearAdminDraft(): void {
  try {
    localStorage.removeItem(KEYS.ADMIN_EVENT_DRAFT);
  } catch {}
}

// --- Converter State ---
export interface ConverterDraft {
  convType: 'lunarToSolar' | 'solarToLunar';
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  solarDay: number;
  solarMonth: number;
  solarYear: number;
}

export const DEFAULT_CONVERTER_DRAFT: ConverterDraft = {
  convType: 'lunarToSolar',
  lunarDay: 10,
  lunarMonth: 3,
  lunarYear: 2026,
  solarDay: 18,
  solarMonth: 10,
  solarYear: 2026,
};

export function getSavedConverterDraft(): ConverterDraft {
  try {
    const saved = localStorage.getItem(KEYS.CONVERTER_STATE);
    if (saved) {
      return { ...DEFAULT_CONVERTER_DRAFT, ...JSON.parse(saved) };
    }
  } catch {}
  return DEFAULT_CONVERTER_DRAFT;
}

export function saveConverterDraft(draft: ConverterDraft): void {
  try {
    localStorage.setItem(KEYS.CONVERTER_STATE, JSON.stringify(draft));
  } catch {}
}

// --- Search Query Persistence ---
export function getSavedSearchQuery(): string {
  try {
    return localStorage.getItem(KEYS.SEARCH_QUERY) || '';
  } catch {
    return '';
  }
}

export function saveSearchQuery(q: string): void {
  try {
    localStorage.setItem(KEYS.SEARCH_QUERY, q);
  } catch {}
}

// --- Active Tab Persistence ---
export function getSavedActiveTab(): string {
  try {
    return localStorage.getItem(KEYS.ACTIVE_TAB) || 'home';
  } catch {
    return 'home';
  }
}

export function saveActiveTab(tab: string): void {
  try {
    localStorage.setItem(KEYS.ACTIVE_TAB, tab);
  } catch {}
}
