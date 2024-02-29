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
  customQuickMessages: [
    'Hey there, I am using Situation Gate!',
    'mike',
    'jones',
    'how are you today?',
    'I am busy right now!',
    'I am in a meeting right now!',
    'I am driving right now!',
    'I am in class right now!',
    'I am in a movie right now!',
    'I am in a show right now!',
    'I am in a play right now!',
    'I am in a concert right now!',
    'I am in a game right now!',
    'I am in a match right',
  ],
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
