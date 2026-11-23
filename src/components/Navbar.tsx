import React, { useState } from 'react';
import {
  Calendar,
  Compass,
  MapPin,
  Users,
  ShieldCheck,
  Bookmark,
  User,
  Menu,
  X,
  FileText,
  Search,
  SlidersHorizontal,
  Languages,
  Eye,
} from 'lucide-react';
import { UserProfile, AppLanguage, AccessibilitySettings } from '../types/festival';
import { DongSonLogo } from './DongSonLogo';
import { getTranslation } from '../utils/i18n';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: UserProfile;
  onOpenAuth: () => void;
  onToggleRole: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkCount: number;
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  a11y: AccessibilitySettings;
  onToggleA11yBar: () => void;
  isA11yBarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  onOpenAuth,
  searchQuery,
  setSearchQuery,
  bookmarkCount,
  lang,
  onLanguageChange,
  a11y,
  onToggleA11yBar,
  isA11yBarOpen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = getTranslation(lang);

  // All routes are openly accessible to everyone without requiring login or hidden roles
  const navItems = [
    { id: 'home', label: t.nav.home, icon: Compass },
    { id: 'calendar', label: t.nav.calendar, icon: Calendar },
    { id: 'map', label: t.nav.map, icon: MapPin },
    { id: 'community', label: t.nav.community, icon: Users },
    { id: 'legal', label: t.nav.legal, icon: FileText },
    { id: 'about', label: t.nav.about, icon: ShieldCheck },
    { id: 'admin', label: t.nav.admin, icon: SlidersHorizontal },
  ];

  const handleSelectTab = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* Top Heritage Ribbon / Info banner */}
      <div className="heritage-gradient-bar text-amber-100 text-xs py-1.5 px-4 font-medium border-b border-amber-700/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide">
              {t.subBanner}
            </span>
          </div>
          <div className="text-amber-200/90 hidden md:flex items-center gap-4 text-[11px]">
            <span>{t.subBannerMeta}</span>
            <span className="text-amber-400 font-bold">•</span>
            <span className="text-amber-300 font-medium">Song ngữ VI / EN</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-1.5 sm:gap-3">
          {/* Logo and Brand with Dong Son emblem */}
          <div
            className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer select-none group shrink-0 min-w-0"
            onClick={() => handleSelectTab('home')}
            title="Về Trang chủ Bancunglehoi"
          >
            <div className="transform transition-transform group-hover:scale-105 shrink-0">
              <DongSonLogo size={30} highContrast={a11y.highContrast} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[15px] sm:text-xl tracking-tight text-red-950 font-serif truncate">
                  Bancung<span className="text-red-700">lehoi</span>
                </span>
                <span className="hidden 2xl:inline-block text-[10px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-red-950 px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                  {lang === 'vi' ? 'Di sản VN' : 'Heritage'}
                </span>
              </div>
              <p className="text-[10px] text-amber-900/80 hidden 2xl:block font-medium">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Quick Search Bar (shown on md-lg before full nav appears) */}
          <div className="hidden md:flex xl:hidden flex-1 max-w-xs mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-amber-700/80 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.nav.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-amber-50/50 hover:bg-amber-50 focus:bg-white text-sm text-stone-900 placeholder-stone-500 pl-9 pr-8 py-2 rounded-xl border border-amber-200 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Xóa từ khóa tìm kiếm"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-800 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-1 px-1.5 2xl:px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-red-50 text-red-800 shadow-2xs font-bold border border-red-200/80'
                      : 'text-stone-700 hover:text-red-800 hover:bg-amber-50/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-red-700' : 'text-stone-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Accessibility Drawer Toggle Button */}
            <button
              onClick={onToggleA11yBar}
              title={
                lang === 'vi'
                  ? 'Chế độ Trợ năng: Chữ lớn, tương phản cao, đọc thành tiếng'
                  : 'Accessibility Mode: Large text, high contrast, text-to-speech'
              }
              aria-label="Mở bảng điều khiển trợ năng"
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                isA11yBarOpen || a11y.highContrast || a11y.fontSize !== 'normal'
                  ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.accessibility}</span>
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={() => onLanguageChange(lang === 'vi' ? 'en' : 'vi')}
              title={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
              aria-label="Chuyển đổi ngôn ngữ"
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold bg-stone-100 text-stone-800 border border-stone-200 hover:bg-amber-50 hover:border-amber-300 transition"
            >
              <Languages className="hidden sm:block w-3.5 h-3.5 text-stone-600" />
              <span className="font-extrabold uppercase">{lang === 'vi' ? 'VI' : 'EN'}</span>
            </button>

            {/* Bookmarks Counter */}
            <button
              onClick={() => handleSelectTab('profile')}
              title={lang === 'vi' ? 'Danh sách lễ hội đã lưu & Tùy chọn cá nhân' : 'Saved festivals & Preferences'}
              className="relative p-1.5 sm:p-2 text-stone-700 hover:text-red-700 hover:bg-red-50 rounded-xl transition"
            >
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Visitor Preferences Button (No login required) */}
            <button
              onClick={onOpenAuth}
              title={lang === 'vi' ? 'Tùy chỉnh sở thích (Không cần đăng nhập)' : 'Preferences (No login required)'}
              className="flex items-center gap-1.5 bg-red-700 hover:bg-red-800 active:bg-red-900 text-white text-xs font-bold px-2 sm:px-2.5 py-1.5 rounded-xl shadow-xs transition shrink-0"
            >
              <User className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline max-w-[130px] truncate">{user.fullName || 'Khách tham quan'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl xl:hidden"
              aria-label="Mở danh mục menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-amber-200/80 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {/* Mobile Search */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.nav.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-amber-50/50 text-sm pl-9 pr-4 py-2.5 rounded-xl border border-amber-200 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-2 px-2.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-left leading-tight transition ${
                    isActive
                      ? 'bg-red-700 text-white shadow-xs font-bold'
                      : 'bg-stone-50 text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-700">
            <span>
              {lang === 'vi' ? 'Ngôn ngữ: ' : 'Language: '}
              <strong>{lang === 'vi' ? 'Tiếng Việt' : 'English'}</strong>
            </span>
            <button
              onClick={() => onLanguageChange(lang === 'vi' ? 'en' : 'vi')}
              className="text-red-700 font-bold hover:underline"
            >
              {lang === 'vi' ? 'Switch to English' : 'Đổi sang Tiếng Việt'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
