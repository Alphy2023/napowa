import { create } from 'zustand';

interface Settings {
  theme: 'light' | 'dark';
  language: string;
  notificationsEnabled: boolean;
}

type SettingsState = {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {
    theme: 'light',
    language: 'en',
    notificationsEnabled: true,
  },
  updateSettings: (newSettings) =>
    set((state) => ({ settings: { ...state.settings, ...newSettings } })),
}));
