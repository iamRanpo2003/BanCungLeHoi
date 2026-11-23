import { AppLanguage } from '../types/festival';

export interface TranslationDictionary {
  brandName: string;
  brandTagline: string;
  subBanner: string;
  subBannerMeta: string;
  quickSearchPlaceholder: string;

  nav: {
    home: string;
    calendar: string;
    map: string;
    community: string;
    legal: string;
    about: string;
    admin: string;
    searchPlaceholder: string;
    accessibility: string;
  };

  hero: {
    badge: string;
    title: string;
    subtitle: string;
    whatDoesTitle: string;
    whatDoesText: string;
    whoForTitle: string;
    whoForText: string;
    searchHint: string;
    ctaCalendar: string;
  };

  widget: {
    solarToday: string;
    lunarToday: string;
    gmtStandard: string;
    hoangDaoTitle: string;
    hoangDaoNote: string;
  };

  calendar: {
    title: string;
    subtitle: string;
    exportICS: string;
    exportCSV: string;
    gridMonthly: string;
    timelineFullYear: string;
    filterAllRegions: string;
    filterAllProvinces: string;
    filterAllCategories: string;
  };

  converter: {
    tabTitle: string;
    boxTitle: string;
    lunarToSolar: string;
    solarToLunar: string;
    dayLunar: string;
    monthLunar: string;
    daySolar: string;
    monthSolar: string;
    year: string;
    resultLabel: string;
  };

  detail: {
    overview: string;
    rituals: string;
    legal: string;
    directions: string;
    askGemini: string;
    listenAudio: string;
    stopAudio: string;
  };

  community: {
    title: string;
    subtitle: string;
    contributeBtn: string;
  };

  map: {
    title: string;
    subtitle: string;
    yourLocation: string;
  };

  legal: {
    title: string;
    subtitle: string;
  };

  a11y: {
    title: string;
    fontSize: string;
    highContrast: string;
    highContrastActive: string;
    readAloud: string;
    reading: string;
    resetDefaults: string;
  };
}

export const TRANSLATIONS: Record<AppLanguage, TranslationDictionary> = {
  vi: {
    brandName: 'Bancunglehoi',
    brandTagline: 'Tra cứu lễ hội & di sản văn hóa Việt Nam',
    subBanner: 'Cổng tra cứu công khai Lễ hội Truyền thống & Di sản Văn hóa Việt Nam (Không cần đăng nhập)',
    subBannerMeta: 'Tham chiếu văn bản Bộ VHTTDL & Quy đổi Âm - Dương Lịch chuẩn GMT+7',
    quickSearchPlaceholder: 'Tìm lễ hội, đền chùa, dân tộc, tỉnh thành...',

    nav: {
      home: 'Trang chủ',
      calendar: 'Lịch Lễ Hội',
      map: 'Bản đồ Di sản',
      community: 'Cộng đồng',
      legal: 'Nguồn & Ghi nhận',
      about: 'Giới thiệu',
      admin: 'Quản trị CMS',
      searchPlaceholder: 'Tìm kiếm lễ hội, di sản...',
      accessibility: 'Trợ năng',
    },

    hero: {
      badge: 'Cổng tra cứu mở • Công khai không cần đăng nhập',
      title: 'Khám phá Lễ hội Truyền thống Các Dân tộc Việt Nam',
      subtitle:
        'Tra cứu ngày Âm – Dương chính xác của 18 lễ hội, phong tục và sự kiện lịch sử tiêu biểu khắp Việt Nam, kèm nghi thức và căn cứ pháp lý chính thống.',
      whatDoesTitle: 'Ứng dụng này làm gì?',
      whatDoesText:
        'Tra cứu lịch Âm–Dương từng năm, định vị bản đồ di sản 2025, đọc nghi thức Lễ & Hội, hỏi đáp trợ lý văn hóa và xem nguồn pháp lý.',
      whoForTitle: 'Dành cho ai?',
      whoForText:
        'Người dân & du khách trẩy hội, du khách quốc tế (song ngữ Việt–Anh), người cao tuổi / khiếm thị (chữ lớn, tương phản cao, đọc to) và người tìm hiểu văn hóa.',
      searchHint: 'Nhập tên lễ hội (Hùng Vương, Gióng, Katê, Chùa Hương, Ok Om Bok...)',
      ctaCalendar: 'Xem lịch',
    },

    widget: {
      solarToday: 'Dương Lịch Hôm Nay',
      lunarToday: 'Âm Lịch',
      gmtStandard: 'Giờ chuẩn Việt Nam (GMT+7)',
      hoangDaoTitle: 'Giờ Hoàng Đạo trong ngày',
      hoangDaoNote: 'Theo thuật toán thiên văn chuẩn xác Jean Meeus & Hồ Ngọc Đức',
    },

    calendar: {
      title: 'Lịch Lễ Hội & Sự Kiện Theo Dòng Thời Gian',
      subtitle: 'Hệ thống tự động quy đổi Âm lịch sang Dương lịch chính xác cho từng năm',
      exportICS: 'Xuất iCal (.ics)',
      exportCSV: 'Xuất Excel (.csv)',
      gridMonthly: 'Lịch lưới theo tháng',
      timelineFullYear: 'Dòng thời gian cả năm',
      filterAllRegions: 'Toàn quốc (Các vùng miền)',
      filterAllProvinces: 'Tất cả tỉnh/khu vực',
      filterAllCategories: 'Tất cả chủ đề',
    },

    converter: {
      tabTitle: 'Quy đổi Âm - Dương',
      boxTitle: 'Mô hình quy đổi Lịch Âm - Dương Thiên văn GMT+7 (Hồ Ngọc Đức & Jean Meeus)',
      lunarToSolar: 'Âm sang Dương',
      solarToLunar: 'Dương sang Âm',
      dayLunar: 'Ngày Âm (1-30)',
      monthLunar: 'Tháng Âm (1-12)',
      daySolar: 'Ngày Dương (1-31)',
      monthSolar: 'Tháng Dương (1-12)',
      year: 'Năm',
      resultLabel: 'Kết quả quy đổi thiên văn',
    },

    detail: {
      overview: 'Tổng quan & Lịch sử',
      rituals: 'Nghi thức (Lễ & Hội)',
      legal: 'Căn cứ pháp lý',
      directions: 'Đường đi & Lưu ý',
      askGemini: 'Hỏi Gemini',
      listenAudio: 'Nghe đọc',
      stopAudio: 'Dừng đọc',
    },

    community: {
      title: 'Khám Phá & Đóng Góp Cộng Đồng',
      subtitle: 'Không gian mở chia sẻ trải nghiệm trẩy hội, hình ảnh và tư liệu văn hóa (công khai, không yêu cầu đăng nhập)',
      contributeBtn: 'Đóng góp câu chuyện văn hóa',
    },

    map: {
      title: 'Bản Đồ Di Sản & Lễ Hội Tiêu Biểu',
      subtitle: 'Định vị tọa độ các điểm di tích trong cơ sở dữ liệu, ước tính khoảng cách và hướng dẫn đường đi',
      yourLocation: 'Vị trí tham chiếu:',
    },

    legal: {
      title: 'Nguồn, Ghi Nhận & Căn Cứ Pháp Lý',
      subtitle: 'Ghi nhận bản quyền ảnh thật, âm thanh, thuật toán, nguyên tắc tôn trọng người giữ tư liệu và văn bản pháp luật chính thống',
    },

    a11y: {
      title: 'Chế độ Trợ Năng & Giọng Đọc',
      fontSize: 'Cỡ chữ',
      highContrast: 'Tương phản cao',
      highContrastActive: 'Tương phản: BẬT',
      readAloud: 'Đọc trang này',
      reading: 'Đang đọc',
      resetDefaults: 'Khôi phục mặc định',
    },
  },

  en: {
    brandName: 'Bancunglehoi',
    brandTagline: 'Vietnamese Cultural Heritage & Festival Portal',
    subBanner: 'Open Public Portal for Vietnamese Traditional Festivals & Cultural Heritage (No Login Required)',
    subBannerMeta: 'Referenced from Ministry of Culture, Sports & Tourism • GMT+7 Astronomical Engine',
    quickSearchPlaceholder: 'Search festivals, pagodas, ethnic groups, provinces...',

    nav: {
      home: 'Home',
      calendar: 'Festivals Calendar',
      map: 'Heritage Map',
      community: 'Community',
      legal: 'Sources & Credits',
      about: 'About Project',
      admin: 'CMS Manager',
      searchPlaceholder: 'Search festivals, heritage...',
      accessibility: 'A11y',
    },

    hero: {
      badge: 'Open Public Access • No Login Required',
      title: 'Explore Traditional Festivals of Vietnam’s Ethnic Communities',
      subtitle:
        'Look up accurate Lunar–Solar dates for 18 digitized traditional festivals, customs, and historical events across Vietnam, with rituals and official legal references.',
      whatDoesTitle: 'What this app does',
      whatDoesText:
        'Converts Lunar–Solar dates, locates 2025 heritage provinces on an interactive map, explains rituals, answers cultural questions, and cites legal sources.',
      whoForTitle: 'Who it is for',
      whoForText:
        'Festival-goers & travelers, international visitors (VI/EN bilingual), elderly or low-vision readers (large text, high contrast, voice reader), and students.',
      searchHint: 'Enter festival name (Hung King, Giong, Kate, Huong Pagoda, Ok Om Bok...)',
      ctaCalendar: 'View Calendar',
    },

    widget: {
      solarToday: 'Solar Date Today',
      lunarToday: 'Lunar Date',
      gmtStandard: 'Vietnam Standard Time (GMT+7)',
      hoangDaoTitle: 'Auspicious Solar Hours (Hoang Dao)',
      hoangDaoNote: 'Astronomical calculations by Jean Meeus & Dr. Ho Ngoc Duc algorithms',
    },

    calendar: {
      title: 'Festival Calendar & Chronological Timeline',
      subtitle: 'Automatic precise synchronization of Lunar and Solar calendars across all years',
      exportICS: 'Export iCal (.ics)',
      exportCSV: 'Export Excel (.csv)',
      gridMonthly: 'Monthly Grid',
      timelineFullYear: 'Annual Timeline',
      filterAllRegions: 'All Regions',
      filterAllProvinces: 'All Provinces / Areas',
      filterAllCategories: 'All Categories',
    },

    converter: {
      tabTitle: 'Lunar-Solar Converter',
      boxTitle: 'Astronomical GMT+7 Lunar-Solar Calculation Engine (Jean Meeus & Ho Ngoc Duc)',
      lunarToSolar: 'Lunar to Solar',
      solarToLunar: 'Solar to Lunar',
      dayLunar: 'Lunar Day (1-30)',
      monthLunar: 'Lunar Month (1-12)',
      daySolar: 'Solar Day (1-31)',
      monthSolar: 'Solar Month (1-12)',
      year: 'Year',
      resultLabel: 'Astronomical Conversion Result',
    },

    detail: {
      overview: 'Overview & History',
      rituals: 'Rituals & Festivities',
      legal: 'Legal Basis',
      directions: 'Directions & Tips',
      askGemini: 'Ask Gemini',
      listenAudio: 'Listen',
      stopAudio: 'Stop',
    },

    community: {
      title: 'Community Stories & Contributions',
      subtitle: 'Open collaborative space for sharing festival experiences and cultural notes (public access, no login needed)',
      contributeBtn: 'Share Cultural Story',
    },

    map: {
      title: 'Interactive Heritage & Festival Map',
      subtitle: 'Locate digitized heritage sites, estimate distances from reference cities, and view travel routes',
      yourLocation: 'Reference City:',
    },

    legal: {
      title: 'Sources, Attribution & Legal Basis',
      subtitle: 'Credits for licensed real photography, browser audio synthesis, calendar algorithms, custodian safeguards, and official legal documents',
    },

    a11y: {
      title: 'Accessibility & Voice Reader',
      fontSize: 'Font Size',
      highContrast: 'High Contrast',
      highContrastActive: 'High Contrast: ON',
      readAloud: 'Read Page Aloud',
      reading: 'Reading',
      resetDefaults: 'Reset Defaults',
    },
  },
};

export function getTranslation(lang: AppLanguage): TranslationDictionary {
  return TRANSLATIONS[lang] || TRANSLATIONS.vi;
}
