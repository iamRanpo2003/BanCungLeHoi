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
} from 'lucide-react';
import { UserProfile } from '../types/festival';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: UserProfile;
  onOpenAuth: () => void;
  onToggleRole: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  onOpenAuth,
  onToggleRole,
  searchQuery,
  setSearchQuery,
  bookmarkCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Compass },
    { id: 'calendar', label: 'Lịch Lễ Hội', icon: Calendar },
    { id: 'map', label: 'Bản đồ Di sản', icon: MapPin },
    { id: 'community', label: 'Cộng đồng', icon: Users },
    { id: 'legal', label: 'Căn cứ Pháp lý', icon: FileText },
    { id: 'about', label: 'Giới thiệu', icon: ShieldCheck },
  ];

  if (user.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Quản trị CMS', icon: SlidersHorizontal });
  }

  const handleSelectTab = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-xs">
      {/* Top Banner Disclaimer & Info */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Bancunglehoi.ai.studio - Nền tảng dữ liệu Lễ hội Truyền thống & Di sản 54 Dân tộc Việt Nam</span>
          </div>
          <div className="text-blue-200 hidden sm:block">
            <span>Dữ liệu chuẩn hóa Bộ VHTTDL & Quy đổi Âm - Dương Lịch chuẩn GMT+7</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo and Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => handleSelectTab('home')}
            title="Về Trang chủ Bancunglehoi"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Calendar className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-blue-950 font-sans">
                  Bancung<span className="text-blue-600">lehoi</span>
                </span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  VN
                </span>
              </div>
              <p className="text-[11px] text-slate-700 hidden sm:block font-medium">
                Lịch lễ hội truyền thống toàn quốc
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-700 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm lễ hội, đền chùa, dân tộc, tỉnh thành..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-800 placeholder-slate-400 pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-800 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            {/* Bookmarks Counter */}
            <button
              onClick={() => handleSelectTab('profile')}
              title="Danh sách lễ hội đã lưu"
              className="relative p-2 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Role switch toggle badge */}
            <button
              onClick={onToggleRole}
              title={`Chế độ hiện tại: ${user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}. Bấm để chuyển đổi.`}
              className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition ${
                user.role === 'admin'
                  ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  user.role === 'admin' ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              />
              <span>{user.role === 'admin' ? 'CMS Quản trị' : 'Người dùng'}</span>
            </button>

            {/* User Profile / Auth Button */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-3 py-2 rounded-xl shadow-xs transition"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline max-w-[120px] truncate">{user.fullName || 'Tài khoản'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl lg:hidden"
              aria-label="Mở danh mục menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {/* Mobile Search */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-700 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm lễ hội, di sản..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
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
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
            <span>Vai trò: <strong>{user.role === 'admin' ? 'Quản trị viên (CMS)' : 'Độc giả'}</strong></span>
            <button
              onClick={onToggleRole}
              className="text-blue-600 font-bold hover:underline"
            >
              Chuyển sang {user.role === 'admin' ? 'Người dùng' : 'Quản trị viên'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
