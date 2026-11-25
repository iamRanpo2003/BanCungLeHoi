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
    title: string;
    audienceSentence: string;
    ctaStart: string;
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
      legal: 'Nguồn và Ghi nhận',
      about: 'Giới thiệu',
      admin: 'Quản trị CMS',
      searchPlaceholder: 'Tìm kiếm lễ hội, di sản...',
      accessibility: 'Trợ năng',
    },

    hero: {
      title: 'Tra cứu ngày Âm – Dương, nghi thức và căn cứ pháp lý lễ hội truyền thống Việt Nam',
      audienceSentence:
        'Dành cho người dân, du khách trong và ngoài nước (song ngữ Việt – Anh), người cao tuổi hoặc khiếm thị và người tìm hiểu văn hóa.',
      ctaStart: 'Bắt đầu dùng ngay',
      searchHint: 'Nhập tên lễ hội, tỉnh thành, dân tộc (Hùng Vương, Gióng, Katê...)',
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
      title: 'Nguồn và Ghi nhận',
      subtitle: 'Bảng thống kê toàn bộ nguồn dữ liệu đang dùng (tên, đơn vị phát hành, năm, đường dẫn), ghi nhận người đóng góp tư liệu và căn cứ pháp lý',
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
      legal: 'Sources & Attribution',
      about: 'About Project',
      admin: 'CMS Manager',
      searchPlaceholder: 'Search festivals, heritage...',
      accessibility: 'A11y',
    },

    hero: {
      title: 'Look up Lunar–Solar dates, rituals, and legal records of Vietnamese traditional festivals',
      audienceSentence:
        'Built for local residents, domestic and international visitors (Vietnamese–English), elderly or low-vision users, and cultural learners.',
      ctaStart: 'Start Using Now',
      searchHint: 'Search festival name, province, or ethnic group (Hung King, Giong, Kate...)',
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
      title: 'Sources & Attribution',
      subtitle: 'Complete list of data sources (name, publisher, year, URL), contributor acknowledgments, and [CẦN BỔ SUNG] markers for unrecorded source fields',
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
