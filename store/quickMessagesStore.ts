import { create } from 'zustand';

export interface QuickMessagesState {
  customQuickMessages: string[];
  selectedQuickMessage: number;
  setCustomQuickMessages: (messages: string[]) => void;
  addCustomQuickMessage: (message: string) => void;
  deleteCustomQuickMessage: (index: number) => void;
  editCustomQuickMessage: (index: number, newMessage: string) => void;
  setSelectedQuickMessage: (index: number) => void;
  getSelectedQuickMessage: () => string;
}

const useQuickMessagesStore = create<QuickMessagesState>((set, get) => ({
  customQuickMessages: ['Hey there, I am using Situation Gate!'],
  selectedQuickMessage: 0,
  setCustomQuickMessages: (messages: string[]) =>
    set(() => ({
      customQuickMessages: messages,
    })),
  addCustomQuickMessage: (message: string) =>
    set((state) => ({
      customQuickMessages: [...state.customQuickMessages, message],
    })),
  deleteCustomQuickMessage: (index: number) =>
    set((state) => ({
      customQuickMessages: state.customQuickMessages.filter((_, i) => i !== index),
    })),
  editCustomQuickMessage: (index: number, newMessage: string) =>
    set((state) => {
      const newMessages = [...state.customQuickMessages];
      newMessages[index] = newMessage;
      return { customQuickMessages: newMessages };
    }),
  setSelectedQuickMessage: (index: number) =>
    set(() => ({
      selectedQuickMessage: index,
    })),
  getSelectedQuickMessage: () => get().customQuickMessages[get().selectedQuickMessage],
}));

export default useQuickMessagesStore;
