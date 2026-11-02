import { AppLanguage } from '../types/festival';

export interface TTSStatus {
  isSpeaking: boolean;
  isPaused: boolean;
  currentText: string;
}

class TextToSpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<(status: TTSStatus) => void> = new Set();
  public isSpeaking: boolean = false;
  public isPaused: boolean = false;
  public currentText: string = '';
  private currentLang: string = 'vi-VN';
  private currentRate: number = 1.0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public setLanguage(lang: string): void {
    this.currentLang = lang;
  }

  public setRate(rate: number): void {
    this.currentRate = Math.max(0.6, Math.min(1.5, rate));
  }

  public subscribe(listener: (status: TTSStatus) => void): () => void {
    this.listeners.add(listener);
    // Send initial status
    listener({
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      currentText: this.currentText,
    });
    return () => this.listeners.delete(listener);
  }

  private notify(speaking: boolean, paused: boolean, text: string) {
    this.isSpeaking = speaking;
    this.isPaused = paused;
    this.currentText = text;
    const status: TTSStatus = { isSpeaking: speaking, isPaused: paused, currentText: text };
    this.listeners.forEach((fn) => {
      try {
        fn(status);
      } catch (e) {
        console.error('Error in TTS subscriber:', e);
      }
    });
  }

  public speak(
    text: string,
    optionsOrLang?: AppLanguage | string | { lang?: string; rate?: number },
    rateArg?: number
  ): void {
    if (!this.synth) {
      console.warn('SpeechSynthesis API not supported in this environment');
      return;
    }

    // Stop ongoing speech
    this.stop();

    if (!text || !text.trim()) return;

    let targetLang = this.currentLang;
    let targetRate = this.currentRate;

    if (typeof optionsOrLang === 'string') {
      targetLang = optionsOrLang.startsWith('en') ? 'en-US' : 'vi-VN';
      if (typeof rateArg === 'number') targetRate = rateArg;
    } else if (optionsOrLang && typeof optionsOrLang === 'object') {
      if (optionsOrLang.lang) {
        targetLang = optionsOrLang.lang.startsWith('en') ? 'en-US' : 'vi-VN';
      }
      if (typeof optionsOrLang.rate === 'number') {
        targetRate = optionsOrLang.rate;
      }
    }

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    utterance.lang = targetLang;
    utterance.rate = Math.max(0.6, Math.min(1.5, targetRate));
    utterance.pitch = 1.0;

    // Pick best matching voice if available
    const voices = this.synth.getVoices();
    if (voices && voices.length > 0) {
      const prefix = targetLang.startsWith('en') ? 'en' : 'vi';
      const matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    utterance.onstart = () => {
      this.notify(true, false, text);
    };

    utterance.onend = () => {
      this.notify(false, false, '');
      this.currentUtterance = null;
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      this.notify(false, false, '');
      this.currentUtterance = null;
    };

    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.error('Failed to trigger speech synthesis:', err);
    }
  }

  public pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
      this.notify(true, true, this.currentText);
    }
  }

  public resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.notify(true, false, this.currentText);
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false, false, '');
      this.currentUtterance = null;
    }
  }
}

export const tts = new TextToSpeechService();
