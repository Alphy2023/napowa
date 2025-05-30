import { create } from 'zustand';

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

type MessageState = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
};

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
