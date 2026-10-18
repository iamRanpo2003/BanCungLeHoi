import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
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

import { FestivalEvent, UserProfile, EventCategory } from './types/festival';
import { FESTIVALS_DATA } from './data/festivalsData';
import {
  getUserProfile,
  saveUserProfile,
  toggleBookmark,
  setFestivalReminder,
  switchUserRole,
} from './utils/userStore';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [user, setUser] = useState<UserProfile>(() => getUserProfile());
  const [events, setEvents] = useState<FestivalEvent[]>(FESTIVALS_DATA);
  const [targetYear, setTargetYear] = useState<number>(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<FestivalEvent | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<EventCategory | undefined>(undefined);

  // Toggle bookmark handler
  const handleToggleBookmark = (id: string) => {
    toggleBookmark(id);
    setUser(getUserProfile());
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
      setCurrentTab('admin');
    } else if (currentTab === 'admin') {
      setCurrentTab('home');
    }
  };

  // Navigate tab with optional category filter
  const handleNavigateTab = (tab: string, categoryFilter?: EventCategory) => {
    setSelectedCategoryFilter(categoryFilter);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin festival mutations
  const handleAddEvent = (newEvent: FestivalEvent) => {
    setEvents([newEvent, ...events]);
  };

  const handleUpdateEvent = (updated: FestivalEvent) => {
    setEvents(events.map((e) => (e.id === updated.id ? updated : e)));
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
    if (selectedEvent?.id === id) {
      setSelectedEvent(null);
    }
  };

  const currentReminder = selectedEvent
    ? user.reminders.find((r) => r.festivalId === selectedEvent.id)?.daysBefore || 0
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setSelectedCategoryFilter(undefined);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onToggleRole={handleToggleRole}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookmarkCount={user.bookmarks.length}
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
            setSearchQuery={setSearchQuery}
            bookmarkedIds={user.bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'calendar' && (
          <CalendarTimelineView
            events={events}
            targetYear={targetYear}
            setTargetYear={setTargetYear}
            onSelectEvent={setSelectedEvent}
            initialCategoryFilter={selectedCategoryFilter}
          />
        )}

        {currentTab === 'map' && (
          <MapView
            events={events}
            targetYear={targetYear}
            onSelectEvent={setSelectedEvent}
          />
        )}

        {currentTab === 'community' && (
          <CommunityStoriesView festivals={events} user={user} />
        )}

        {currentTab === 'profile' && (
          <ProfileSettingsView
            user={user}
            events={events}
            targetYear={targetYear}
            onUpdateUser={setUser}
            onSelectEvent={setSelectedEvent}
            onRemoveBookmark={handleToggleBookmark}
            onRemoveReminder={(id) => handleSetReminder(id, 0)}
          />
        )}

        {currentTab === 'admin' && (
          <AdminCmsView
            events={events}
            onAddEvent={handleAddEvent}
            onUpdateEvent={handleUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
            onSelectEvent={setSelectedEvent}
          />
        )}

        {currentTab === 'legal' && <LegalReferencesView />}

        {currentTab === 'about' && <AboutView />}
      </main>

      {/* Detail Modal */}
      {selectedEvent && (
        <DetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          targetYear={targetYear}
          isBookmarked={user.bookmarks.includes(selectedEvent.id)}
          onToggleBookmark={handleToggleBookmark}
          reminderDays={currentReminder}
          onSetReminder={handleSetReminder}
        />
      )}

      {/* Splash / Auth Modal */}
      <SplashAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        onSaveUser={setUser}
      />

      {/* Global Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-auto py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white">
                B
              </div>
              <div>
                <span className="font-black text-lg text-white">
                  Bancunglehoi<span className="text-blue-400">.ai.studio</span>
                </span>
                <p className="text-xs text-slate-400">
                  Lịch Lễ Hội Truyền Thống 54 Dân Tộc Toàn Quốc
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
              <button
                onClick={() => handleNavigateTab('home')}
                className="hover:text-white transition"
              >
                Trang chủ
              </button>
              <button
                onClick={() => handleNavigateTab('calendar')}
                className="hover:text-white transition"
              >
                Lịch âm - dương
              </button>
              <button
                onClick={() => handleNavigateTab('map')}
                className="hover:text-white transition"
              >
                Bản đồ di sản
              </button>
              <button
                onClick={() => handleNavigateTab('legal')}
                className="hover:text-white transition"
              >
                Căn cứ pháp lý
              </button>
              <button
                onClick={() => handleNavigateTab('about')}
                className="hover:text-white transition"
              >
                Thông tin thực tập
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © 2026 Bancunglehoi. Sản phẩm thực tập tốt nghiệp FPT Polytechnic & IMTA TECH.
            </p>
            <p className="text-amber-400/90 text-center sm:text-right text-[11px]">
              Lưu ý: Thông tin chỉ mang tính tham khảo, không thay thế văn bản pháp luật chính thức.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
