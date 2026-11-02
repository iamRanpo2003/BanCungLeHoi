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
    brandTagline: 'Lịch lễ hội truyền thống toàn quốc',
    subBanner: 'Nền tảng dữ liệu Lễ hội Truyền thống & Di sản 54 Dân tộc Việt Nam',
    subBannerMeta: 'Dữ liệu chuẩn hóa Bộ VHTTDL & Quy đổi Âm - Dương Lịch chuẩn GMT+7',
    quickSearchPlaceholder: 'Tìm lễ hội, đền chùa, dân tộc, tỉnh thành...',

    nav: {
      home: 'Trang chủ',
      calendar: 'Lịch Lễ Hội',
      map: 'Bản đồ Di sản',
      community: 'Cộng đồng',
      legal: 'Căn cứ Pháp lý',
      about: 'Giới thiệu',
      admin: 'Quản trị CMS',
      searchPlaceholder: 'Tìm kiếm lễ hội, di sản...',
      accessibility: 'Trợ năng (A11y)',
    },

    hero: {
      badge: 'Nền tảng tri thức & Lịch lễ hội quốc gia',
      title: 'Khám phá & Trẩy hội cùng 54 Dân tộc Việt Nam',
      subtitle:
        'Tra cứu chuẩn xác ngày Âm - Dương các lễ hội truyền thống, sự kiện lịch sử, nghi thức và căn cứ pháp lý chính thức từ Bộ Văn hóa, Thể thao và Du lịch.',
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
      filterAllRegions: 'Toàn quốc (3 Miền)',
      filterAllProvinces: 'Tất cả tỉnh thành',
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
      listenAudio: 'Nghe đọc',
      stopAudio: 'Dừng đọc',
    },

    community: {
      title: 'Khám Phá & Đóng Góp Cộng Đồng',
      subtitle: 'Không gian chia sẻ trải nghiệm trẩy hội, hình ảnh check-in và tư liệu lịch sử dân gian 54 dân tộc',
      contributeBtn: 'Đóng góp câu chuyện văn hóa',
    },

    map: {
      title: 'Bản Đồ Di Sản & Lễ Hội Toàn Quốc',
      subtitle: 'Định vị các điểm di tích, gợi ý lễ hội gần vị trí người dùng nhất và hướng dẫn đường đi',
      yourLocation: 'Vị trí của bạn:',
    },

    legal: {
      title: 'Nguồn Tham Khảo & Căn Cứ Pháp Lý',
      subtitle: 'Hệ thống văn bản quy phạm pháp luật, nghị định, thông tư của Nhà nước và Công ước quốc tế UNESCO',
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
    brandTagline: 'National Cultural Heritage & Festival Calendar',
    subBanner: 'Platform for Traditional Festivals & Cultural Heritage of 54 Ethnic Groups of Vietnam',
    subBannerMeta: 'Standardized by Ministry of Culture, Sports & Tourism • GMT+7 Astronomical Engine',
    quickSearchPlaceholder: 'Search festivals, pagodas, ethnic groups, provinces...',

    nav: {
      home: 'Home',
      calendar: 'Festivals Calendar',
      map: 'Heritage Map',
      community: 'Community',
      legal: 'Legal Basis',
      about: 'About Project',
      admin: 'CMS Admin',
      searchPlaceholder: 'Search festivals, heritage...',
      accessibility: 'Accessibility (A11y)',
    },

    hero: {
      badge: 'National Heritage & Cultural Knowledge Portal',
      title: 'Explore & Experience Heritage with 54 Ethnic Groups of Vietnam',
      subtitle:
        'Accurate search for traditional festivals, historical events, rituals, and official legal bases certified by the Ministry of Culture, Sports and Tourism.',
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
      filterAllRegions: 'All Regions (North, Central, South)',
      filterAllProvinces: 'All Provinces',
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
      listenAudio: 'Listen',
      stopAudio: 'Stop',
    },

    community: {
      title: 'Community Stories & Contributions',
      subtitle: 'A collaborative space sharing travelogues, photos, and folk historical records of 54 ethnic groups',
      contributeBtn: 'Share Cultural Story',
    },

    map: {
      title: 'National Heritage & Festival Map',
      subtitle: 'Locate heritage sites, discover nearest festivals, and find verified travel routes',
      yourLocation: 'Your Location:',
    },

    legal: {
      title: 'Legal References & Regulatory Framework',
      subtitle: 'State legislative laws, governmental decrees, circulars, and UNESCO Conventions',
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
