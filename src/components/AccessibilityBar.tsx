import React from 'react';
import {
  Volume2,
  VolumeX,
  Type,
  Sun,
  Eye,
  RotateCcw,
  Languages,
  Pause,
  Play,
  FastForward,
} from 'lucide-react';
import { AppLanguage, AccessibilitySettings } from '../types/festival';
import { getTranslation } from '../utils/i18n';
import { tts } from '../utils/textToSpeech';

interface AccessibilityBarProps {
  lang: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  a11y: AccessibilitySettings;
  onUpdateA11y: (partial: Partial<AccessibilitySettings>) => void;
  isOpen: boolean;
  onClose: () => void;
  onReadCurrentView: () => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  lang,
  onLanguageChange,
  a11y,
  onUpdateA11y,
  isOpen,
  onClose,
  onReadCurrentView,
}) => {
  const t = getTranslation(lang);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [currentText, setCurrentText] = React.useState('');

  React.useEffect(() => {
    const unsub = tts.subscribe((status) => {
      setIsSpeaking(status.isSpeaking);
      setIsPaused(status.isPaused);
      setCurrentText(status.currentText);
    });
    return unsub;
  }, []);

  if (!isOpen) return null;

  const handleStopSpeech = () => {
    tts.stop();
  };

  const handleTogglePause = () => {
    if (isPaused) {
      tts.resume();
    } else {
      tts.pause();
    }
  };

  const handleSpeedCycle = () => {
    const speeds = [0.85, 1.0, 1.25];
    const nextIdx = (speeds.indexOf(a11y.speechRate) + 1) % speeds.length;
    const nextRate = speeds[nextIdx] || 1.0;
    onUpdateA11y({ speechRate: nextRate });
  };

  const handleReset = () => {
    tts.stop();
    onUpdateA11y({
      fontSize: 'normal',
      highContrast: false,
      speechRate: 1.0,
    });
  };

  return (
    <aside
      aria-label="Thanh công cụ trợ năng"
      className="bg-amber-950/95 text-amber-50 border-b-2 border-amber-500/80 px-4 py-3 shadow-xl backdrop-blur-md transition-all z-40 sticky top-[72px]"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Indicator title */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-amber-100 flex items-center gap-1.5">
              <span>{t.a11y.title}</span>
              <span className="text-[10px] font-semibold bg-amber-500/30 text-amber-200 px-1.5 py-0.5 rounded">
                WCAG AAA
              </span>
            </h2>
            <p className="text-[11px] text-amber-200/80 hidden sm:block">
              {lang === 'vi'
                ? 'Hỗ trợ phông chữ lớn, độ tương phản cao và giọng đọc tiếng Việt/Anh chuẩn'
                : 'Supports large text scaling, high-contrast mode, and bilingual text-to-speech'}
            </p>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Font Scaling Buttons */}
          <div className="flex items-center bg-amber-900/60 rounded-xl p-1 border border-amber-700/50">
            <span className="text-[11px] font-semibold text-amber-300 px-2 flex items-center gap-1">
              <Type className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.a11y.fontSize}:</span>
            </span>
            <button
              onClick={() => onUpdateA11y({ fontSize: 'normal' })}
              title="Cỡ chữ tiêu chuẩn (100%)"
              className={`px-2.5 py-1 text-xs rounded-lg font-bold transition ${
                a11y.fontSize === 'normal'
                  ? 'bg-amber-500 text-amber-950 shadow-xs'
                  : 'text-amber-200 hover:bg-amber-800/60'
              }`}
            >
              A
            </button>
            <button
              onClick={() => onUpdateA11y({ fontSize: 'large' })}
              title="Cỡ chữ lớn (+12%)"
              className={`px-2.5 py-1 text-xs rounded-lg font-bold transition ${
                a11y.fontSize === 'large'
                  ? 'bg-amber-500 text-amber-950 shadow-xs'
                  : 'text-amber-200 hover:bg-amber-800/60'
              }`}
            >
              A+
            </button>
            <button
              onClick={() => onUpdateA11y({ fontSize: 'xlarge' })}
              title="Cỡ chữ rất lớn (+25%)"
              className={`px-2.5 py-1 text-xs rounded-lg font-bold transition ${
                a11y.fontSize === 'xlarge'
                  ? 'bg-amber-500 text-amber-950 shadow-xs'
                  : 'text-amber-200 hover:bg-amber-800/60'
              }`}
            >
              A++
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => onUpdateA11y({ highContrast: !a11y.highContrast })}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition ${
              a11y.highContrast
                ? 'bg-yellow-400 text-black border-yellow-300 shadow-md ring-2 ring-yellow-300/40'
                : 'bg-amber-900/60 text-amber-200 border-amber-700/50 hover:bg-amber-800/60'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>{a11y.highContrast ? t.a11y.highContrastActive : t.a11y.highContrast}</span>
          </button>

          {/* Bilingual Quick Switcher inside A11y Bar */}
          <div className="flex items-center bg-amber-900/60 rounded-xl p-1 border border-amber-700/50">
            <span className="text-[11px] font-semibold text-amber-300 px-2 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5" />
            </span>
            <button
              onClick={() => onLanguageChange('vi')}
              className={`px-2 py-1 text-xs rounded-lg font-bold transition ${
                lang === 'vi'
                  ? 'bg-red-700 text-amber-100 shadow-xs'
                  : 'text-amber-200 hover:bg-amber-800/60'
              }`}
            >
              Tiếng Việt
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 text-xs rounded-lg font-bold transition ${
                lang === 'en'
                  ? 'bg-red-700 text-amber-100 shadow-xs'
                  : 'text-amber-200 hover:bg-amber-800/60'
              }`}
            >
              English
            </button>
          </div>

          {/* Text-to-Speech Control Group */}
          <div className="flex items-center gap-1 bg-amber-900/60 rounded-xl p-1 border border-amber-700/50">
            <button
              onClick={onReadCurrentView}
              title={lang === 'vi' ? 'Đọc nội dung trang hiện tại' : 'Read current page'}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs rounded-lg transition"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isSpeaking ? (lang === 'vi' ? 'Đọc lại' : 'Replay') : t.a11y.readAloud}</span>
            </button>

            {isSpeaking && (
              <>
                <button
                  onClick={handleTogglePause}
                  title={isPaused ? 'Tiếp tục đọc' : 'Tạm dừng đọc'}
                  className="p-1.5 text-amber-200 hover:bg-amber-800/80 rounded-lg transition"
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleStopSpeech}
                  title="Dừng đọc"
                  className="p-1.5 text-red-300 hover:bg-red-950/60 rounded-lg transition"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            <button
              onClick={handleSpeedCycle}
              title="Tốc độ đọc"
              className="px-2 py-1 text-[11px] font-semibold text-amber-300 hover:bg-amber-800/60 rounded-lg flex items-center gap-0.5"
            >
              <FastForward className="w-3 h-3" />
              <span>{a11y.speechRate}x</span>
            </button>
          </div>

          {/* Reset button */}
          <button
            onClick={handleReset}
            title={t.a11y.resetDefaults}
            className="p-1.5 text-amber-300 hover:text-white hover:bg-amber-800/60 rounded-xl transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Close bar */}
        <div>
          <button
            onClick={onClose}
            className="text-xs font-bold text-amber-300 hover:text-white px-2.5 py-1 rounded-lg hover:bg-amber-800/50 transition"
          >
            {lang === 'vi' ? 'Đóng [X]' : 'Close [X]'}
          </button>
        </div>
      </div>

      {/* Reading status marquee if currently speaking */}
      {isSpeaking && currentText && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-amber-800/60 flex items-center gap-2 text-xs text-amber-200">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-semibold text-amber-300 shrink-0">
            {lang === 'vi' ? 'Đang đọc:' : 'Reading:'}
          </span>
          <span className="truncate italic font-medium">{currentText}</span>
        </div>
      )}
    </aside>
  );
};
