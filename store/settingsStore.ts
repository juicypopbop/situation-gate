import { create } from 'zustand';

export interface SettingsState {
  customQuickMessage: string;
  setCustomQuickMessage: (message: string) => void;
}

const useSettingsStore = create<SettingsState>((set, get) => ({
  customQuickMessage: 'Hey there, I am using Situation Gate!',
  setCustomQuickMessage: (message: string) =>
    set(() => ({
      customQuickMessage: message,
    })),
}));

export default useSettingsStore;
