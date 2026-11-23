import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AccessibilityBar } from './components/AccessibilityBar';
import { HomeView } from './components/HomeView';
import { CalendarTimelineView } from './components/CalendarTimelineView';
import { MapView } from './components/MapView';
import { CommunityStoriesView } from './components/CommunityStoriesView';
import { ProfileSettingsView } from './components/ProfileSettingsView';
import { AdminCmsView } from './components/AdminCmsView';
import { LegalReferencesView } from './components/LegalReferencesView';
import { AboutView } from './components/AboutView';
import { DetailModal } from './components/DetailModal';
import { SplashAuthModal } from './components/SplashAuthModal';
import { DongSonLogo } from './components/DongSonLogo';

import {
  FestivalEvent,
  UserProfile,
  EventCategory,
  AppLanguage,
  AccessibilitySettings,
} from './types/festival';
import {
  getUserProfile,
  saveUserProfile,
  toggleBookmark,
  setFestivalReminder,
  switchUserRole,
} from './utils/userStore';
import {
  getSavedEvents,
  saveEvents,
  getSavedLanguage,
  saveLanguage,
  getSavedA11y,
  saveA11y,
  getSavedSearchQuery,
  saveSearchQuery,
  getSavedActiveTab,
  saveActiveTab,
} from './utils/storage';
import { getTranslation } from './utils/i18n';
import { tts } from './utils/textToSpeech';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>(() => getSavedActiveTab());
  const [lang, setLang] = useState<AppLanguage>(() => getSavedLanguage());
  const [a11y, setA11y] = useState<AccessibilitySettings>(() => getSavedA11y());
  const [isA11yBarOpen, setIsA11yBarOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>(() => getUserProfile());
  const [events, setEvents] = useState<FestivalEvent[]>(() => getSavedEvents());
  const [targetYear, setTargetYear] = useState<number>(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<FestivalEvent | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(() => getSavedSearchQuery());
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<EventCategory | undefined>(undefined);

  const t = getTranslation(lang);

  // Sync tab persistence
  const handleTabChange = (tab: string) => {
    setSelectedCategoryFilter(undefined);
    setCurrentTab(tab);
    saveActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync search persistence
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    saveSearchQuery(q);
  };

  // Sync language persistence
  const handleLanguageChange = (newLang: AppLanguage) => {
    setLang(newLang);
    saveLanguage(newLang);
    // Adjust TTS language
    tts.setLanguage(newLang === 'vi' ? 'vi-VN' : 'en-US');
  };

  // Sync accessibility persistence
  const handleUpdateA11y = (partial: Partial<AccessibilitySettings>) => {
    setA11y((prev) => {
      const updated = { ...prev, ...partial };
      saveA11y(updated);
      if (partial.speechRate !== undefined) {
        tts.setRate(partial.speechRate);
      }
      return updated;
    });
  };

  // Toggle bookmark handler
  const handleToggleBookmark = (id: string) => {
    toggleBookmark(id);
    setUser(getUserProfile());
  };

  // Persist full user preferences update
  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    saveUserProfile(updatedUser);
  };

  // Set reminder handler
  const handleSetReminder = (id: string, days: number) => {
    setFestivalReminder(id, days);
    setUser(getUserProfile());
  };

  // Switch role handler
  const handleToggleRole = () => {
    const nextRole = user.role === 'admin' ? 'user' : 'admin';
    const updated = switchUserRole(nextRole);
    setUser(updated);
    if (nextRole === 'admin') {
      handleTabChange('admin');
    } else if (currentTab === 'admin') {
      handleTabChange('home');
    }
  };

  // Navigate tab with optional category filter
  const handleNavigateTab = (tab: string, categoryFilter?: EventCategory) => {
    setSelectedCategoryFilter(categoryFilter);
    handleTabChange(tab);
  };

  // Admin festival mutations with storage persistence
  const handleAddEvent = (newEvent: FestivalEvent) => {
    const updated = [newEvent, ...events];
    setEvents(updated);
    saveEvents(updated);
  };

  const handleUpdateEvent = (updatedEvent: FestivalEvent) => {
    const updated = events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e));
    setEvents(updated);
    saveEvents(updated);
  };

  const handleDeleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    saveEvents(updated);
    if (selectedEvent?.id === id) {
      setSelectedEvent(null);
    }
  };

  // Text-to-speech reading for current view
  const handleReadCurrentView = () => {
    let textToRead = '';
    const voiceLang = lang === 'vi' ? 'vi-VN' : 'en-US';

    if (currentTab === 'home') {
      textToRead =
        lang === 'vi'
          ? `Chào mừng bạn đến với Bạn Cùng Lễ Hội. Cổng tra cứu mở lịch lễ hội truyền thống và di sản văn hóa Việt Nam, truy cập công khai không cần đăng nhập. Hiện có ${events.length} lễ hội, phong tục và sự kiện lịch sử đã được số hóa và đối chiếu văn bản Bộ Văn hóa Thể thao và Du lịch.`
          : `Welcome to Bancunglehoi. An open public portal for Vietnamese traditional festivals and cultural heritage with no login required. Currently featuring ${events.length} digitized festivals, customs, and historical events.`;
    } else if (currentTab === 'calendar') {
      textToRead =
        lang === 'vi'
          ? `Bạn đang ở trang Lịch Lễ Hội và Sự Kiện theo dòng thời gian năm ${targetYear}. Bạn có thể xem lịch lưới theo tháng, dòng thời gian hoặc sử dụng công cụ quy đổi âm dương lịch chuẩn thiên văn GMT+7.`
          : `You are on the Festival Calendar Timeline for year ${targetYear}. You can view monthly grids, chronological timelines, or use the astronomical Lunar-Solar converter tool.`;
    } else if (currentTab === 'map') {
      textToRead =
        lang === 'vi'
          ? `Bạn đang ở trang Bản đồ Di sản Văn hóa Việt Nam. Bản đồ tương tác định vị các lễ hội theo tọa độ địa lý Bắc, Trung, Nam, Tây Nguyên và Tây Nam Bộ, tự động tính cự ly di chuyển cho du khách.`
          : `You are on the Interactive Heritage Map of Vietnam. It locates cultural festivals across North, Central, South, and Highlands regions with automatic distance calculations.`;
    } else if (currentTab === 'community') {
      textToRead =
        lang === 'vi'
          ? `Trang Cộng Đồng Chia Sẻ Trải Nghiệm Văn Hóa. Nơi người dân và du khách cùng đóng góp câu chuyện điền dã, hình ảnh trẩy hội và phong tục tập quán địa phương.`
          : `Community Stories and Cultural Contributions. A space where visitors and locals share fieldwork stories, festival photos, and regional customs.`;
    } else if (currentTab === 'legal') {
      textToRead =
        lang === 'vi'
          ? `Trang Nguồn, Ghi nhận và Căn cứ Pháp lý. Trình bày nguồn ảnh thật minh họa, giọng đọc cục bộ Web Speech API, quy ước tôn trọng người giữ tư liệu và văn bản pháp luật chính thống.`
          : `Sources, Attribution and Legal References view, detailing real photography credits, local Web Speech API narration, custodian safeguards, and official legal documents.`;
    } else if (currentTab === 'about') {
      textToRead =
        lang === 'vi'
          ? `Thông tin dự án: Sản phẩm thực tập của Nguyễn Viết Hải, mã sinh viên PH63500, Nhóm 01, Chương trình Thực tập sinh Đợt 15 Trường Cao đẳng FPT Polytechnic và Công ty Cổ phần Công nghệ IMTA TECH.`
          : `Internship project info: Internship project of Nguyen Viet Hai, Student ID PH63500, Group 01, Internship Program Batch 15, FPT Polytechnic College and IMTA TECH Joint Stock Company.`;
    } else {
      textToRead =
        lang === 'vi'
          ? `Cổng tra cứu mở lịch lễ hội truyền thống và di sản văn hóa Việt Nam.`
          : `Open public Vietnamese cultural heritage and festival portal.`;
    }

    tts.speak(textToRead, {
      lang: voiceLang,
      rate: a11y.speechRate,
    });
  };

  const currentReminder = selectedEvent
    ? user.reminders.find((r) => r.festivalId === selectedEvent.id)?.daysBefore || 0
    : 0;

  // Root class calculation for high contrast and font scaling
  const rootClasses = [
    'min-h-screen flex flex-col font-sans antialiased transition-colors duration-200',
    a11y.highContrast ? 'high-contrast bg-black text-white' : 'bg-[#fdfbf7] text-stone-900',
    a11y.fontSize === 'large'
      ? 'text-scale-large'
      : a11y.fontSize === 'xlarge'
      ? 'text-scale-xlarge'
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onToggleRole={handleToggleRole}
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        bookmarkCount={user.bookmarks.length}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        a11y={a11y}
        onToggleA11yBar={() => setIsA11yBarOpen(!isA11yBarOpen)}
        isA11yBarOpen={isA11yBarOpen}
      />

      {/* Accessibility Toolbar (Toggled or accessible by elders / visually impaired) */}
      <AccessibilityBar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        a11y={a11y}
        onUpdateA11y={handleUpdateA11y}
        isOpen={isA11yBarOpen}
        onClose={() => setIsA11yBarOpen(false)}
        onReadCurrentView={handleReadCurrentView}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        {currentTab === 'home' && (
          <HomeView
            events={events}
            targetYear={targetYear}
            onSelectEvent={setSelectedEvent}
            onNavigateTab={handleNavigateTab}
            searchQuery={searchQuery}
            setSearchQuery={handleSearchChange}
            bookmarkedIds={user.bookmarks}
            onToggleBookmark={handleToggleBookmark}
            lang={lang}
            a11y={a11y}
          />
        )}

        {currentTab === 'calendar' && (
          <CalendarTimelineView
            events={events}
            targetYear={targetYear}
            setTargetYear={setTargetYear}
            onSelectEvent={setSelectedEvent}
            initialCategoryFilter={selectedCategoryFilter}
            lang={lang}
          />
        )}

        {currentTab === 'map' && (
          <MapView
            events={events}
            targetYear={targetYear}
            onSelectEvent={setSelectedEvent}
            lang={lang}
          />
        )}

        {currentTab === 'community' && (
          <CommunityStoriesView
            festivals={events}
            user={user}
            lang={lang}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileSettingsView
            user={user}
            events={events}
            targetYear={targetYear}
            onUpdateUser={handleUpdateUser}
            onSelectEvent={setSelectedEvent}
            onRemoveBookmark={handleToggleBookmark}
            onRemoveReminder={(id) => handleSetReminder(id, 0)}
            lang={lang}
          />
        )}

        {currentTab === 'admin' && (
          <AdminCmsView
            events={events}
            onAddEvent={handleAddEvent}
            onUpdateEvent={handleUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
            onSelectEvent={setSelectedEvent}
            lang={lang}
          />
        )}

        {currentTab === 'legal' && <LegalReferencesView lang={lang} events={events} />}

        {currentTab === 'about' && <AboutView lang={lang} events={events} />}
      </main>

      {/* Detail Modal with TTS & Bilingual Content */}
      {selectedEvent && (
        <DetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          targetYear={targetYear}
          isBookmarked={user.bookmarks.includes(selectedEvent.id)}
          onToggleBookmark={handleToggleBookmark}
          reminderDays={currentReminder}
          onSetReminder={handleSetReminder}
          lang={lang}
          a11y={a11y}
        />
      )}

      {/* Splash / Auth Modal */}
      <SplashAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        onSaveUser={handleUpdateUser}
      />

      {/* Global Heritage Footer */}
      <footer className="bg-stone-950 text-stone-200 border-t-2 border-amber-600/60 mt-auto py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-800 pb-6">
            <div className="flex items-center gap-3">
              <DongSonLogo size={36} highContrast={a11y.highContrast} />
              <div>
                <span className="font-serif font-black text-lg text-white">
                  Bancung<span className="text-amber-400">lehoi</span>
                </span>
                <p className="text-xs text-stone-400">
                  {lang === 'vi'
                    ? 'Cổng Tra Cứu Mở Lễ Hội Truyền Thống & Di Sản Văn Hóa Việt Nam'
                    : 'Open Public Portal for Vietnamese Traditional Festivals & Cultural Heritage'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-stone-400">
              <button
                onClick={() => handleNavigateTab('home')}
                className="hover:text-amber-300 transition"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => handleNavigateTab('calendar')}
                className="hover:text-amber-300 transition"
              >
                {t.nav.calendar}
              </button>
              <button
                onClick={() => handleNavigateTab('map')}
                className="hover:text-amber-300 transition"
              >
                {t.nav.map}
              </button>
              <button
                onClick={() => handleNavigateTab('community')}
                className="hover:text-amber-300 transition"
              >
                {t.nav.community}
              </button>
              <button
                onClick={() => handleNavigateTab('legal')}
                className="hover:text-amber-300 transition"
              >
                {t.nav.legal}
              </button>
              <button
                onClick={() => handleNavigateTab('about')}
                className="hover:text-amber-300 transition"
              >
                {t.nav.about}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p className="text-center sm:text-left">
              {lang === 'vi'
                ? '© 2026 Bancunglehoi. Sản phẩm thực tập tốt nghiệp FPT Polytechnic & IMTA TECH.'
                : '© 2026 Bancunglehoi. Graduation internship product of FPT Polytechnic & IMTA TECH.'}
            </p>
            <p className="text-amber-400/90 text-center sm:text-right text-[11px] max-w-xl">
              {lang === 'vi'
                ? 'Lưu ý: Thông tin chỉ mang tính tham khảo, không thay thế văn bản pháp luật chính thức.'
                : 'Note: Information is for reference and community education, does not replace official legal texts.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
