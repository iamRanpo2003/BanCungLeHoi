export type Region = 'Bắc' | 'Trung' | 'Nam' | 'Tây Nguyên';

export type EventCategory =
  | 'Lễ hội'
  | 'Sự kiện lịch sử'
  | 'Danh nhân'
  | 'Phong tục';

export interface RitualInfo {
  le: string[]; // Phần Lễ (nghi thức trang trọng, dâng hương, tế tự, rước kiệu...)
  hoi: string[]; // Phần Hội (trò chơi dân gian, diễn xướng nghệ thuật, ẩm thực...)
}

export interface FestivalTranslation {
  name: string;
  alternateNames?: string[];
  category: string;
  ethnicGroup: string;
  region: string;
  province: string;
  locationName: string;
  recurringNote?: string;
  historicalOrigin: string;
  culturalMeaning: string;
  mainRituals: RitualInfo;
  legalRecognitionType?: string;
  directionsGuide: string;
  visitorAdvice: string[];
  tags: string[];
}

export interface FestivalEvent {
  id: string;
  name: string;
  alternateNames?: string[];
  category: EventCategory;
  ethnicGroup: string; // Dân tộc (Kinh, H'Mông, Tày, Thái, Chăm, Khmer, Ba Na, Gia Rai...)
  region: Region;
  province: string; // 34 tỉnh, thành phố sau sắp xếp năm 2025 (kèm tên cũ nếu sáp nhập)
  district?: string;
  locationName: string; // Tên di tích, đền, chùa, địa danh diễn ra
  coordinates: {
    lat: number;
    lng: number;
  };
  timingType: 'lunar' | 'solar';
  lunarRule?: {
    month: number;
    day: number;
    endMonth?: number;
    endDay?: number;
    recurringNote: string; // e.g. "Mùng 10 tháng 3 Âm lịch hàng năm"
  };
  solarRule?: {
    month: number;
    day: number;
    endMonth?: number;
    endDay?: number;
    recurringNote: string;
  };
  historicalOrigin: string; // Nguồn gốc lịch sử, thần tích
  culturalMeaning: string; // Ý nghĩa văn hóa, giá trị nhân văn
  mainRituals: RitualInfo; // Nghi thức chính
  legalBasis: {
    documentNumber: string; // Số ký hiệu văn bản pháp luật
    issuingAuthority: string; // Cơ quan ban hành (Bộ VHTTDL, Thủ tướng Chính phủ, UBND tỉnh...)
    issueDate: string; // Ngày ban hành
    title: string; // Trích yếu văn bản
    recognitionType: string; // "Di sản văn hóa phi vật thể Quốc gia", "Di sản văn hóa phi vật thể đại diện của nhân loại (UNESCO)", "Di tích Quốc gia đặc biệt"...
    excerpt: string; // Trích đoạn quy định căn cứ pháp lý
  };
  directionsGuide: string; // Hướng dẫn đường đi, giao thông
  visitorAdvice: string[]; // Lưu ý cho du khách trẩy hội (trang phục, nếp sống văn minh...)
  imageUrl: string;
  imageSourceNote?: string;
  custodianCleared?: boolean;
  unescoRecognized?: boolean;
  nationalHeritage?: boolean;
  tags: string[];
  en?: FestivalTranslation; // Bản dịch tiếng Anh cho người nước ngoài
}

export interface CalculatedEventInstance {
  event: FestivalEvent;
  solarStartDate: string; // YYYY-MM-DD
  solarEndDate: string; // YYYY-MM-DD
  lunarStartDateText: string; // "10/03/2026 (Bính Ngọ)"
  lunarEndDateText?: string;
  isToday: boolean;
  isUpcoming: boolean;
  daysRemaining: number;
}

export interface CommunityStory {
  id: string;
  title: string;
  authorName: string;
  authorRole: string; // "Nhà nghiên cứu văn hóa", "Du khách trẩy hội", "Người dân địa phương"
  authorEmail?: string;
  festivalId?: string;
  festivalName: string;
  province: string;
  ethnicGroup: string;
  content: string;
  images: string[];
  status: 'approved' | 'pending' | 'rejected';
  submittedAt: string;
  rejectionReason?: string;
  likes: number;
  tags: string[];
  sourceReference?: string;
  mediaLicenseConfirmed?: boolean;
  restrictedContentExcluded?: boolean;
  privacyConsentConfirmed?: boolean;
  postAnonymously?: boolean;
  isSample?: boolean;
}

export interface LegalDocument {
  id: string;
  code: string;
  title: string;
  issuingBody: string;
  date: string;
  type: 'Luật' | 'Nghị định' | 'Thông tư' | 'Quyết định' | 'Công ước quốc tế';
  summary: string;
  keyArticles: string[];
  linkRef?: string;
  enSummary?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  interests: string[];
  bookmarks: string[]; // Festival IDs
  reminders: {
    festivalId: string;
    daysBefore: number; // 1, 3, 7
  }[];
  contributions: string[]; // Story IDs
}

export interface InternshipConfig {
  studentName: string;
  studentId: string;
  groupNumber: string;
  program: string;
  school: string;
  partnerCompany: string;
  batch: string;
}

export type AppLanguage = 'vi' | 'en';

export type FontSizeScale = 'normal' | 'large' | 'xlarge';

export interface AccessibilitySettings {
  fontSize: FontSizeScale;
  highContrast: boolean;
  speechRate: number; // 0.8, 1.0, 1.25
  isSpeaking?: boolean;
}
