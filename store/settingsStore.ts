import { create } from 'zustand';

export interface SettingsState {
  defaultQuickMessage: string;
  setDefaultQuickMessage: (message: string) => void;
}

const useSettingsStore = create<SettingsState>((set, get) => ({
  defaultQuickMessage: 'Hey there, I am using Situation Gate!',
  setDefaultQuickMessage: (message: string) =>
    set(() => ({
      defaultQuickMessage: message,
    })),
}));

export default useSettingsStore;
