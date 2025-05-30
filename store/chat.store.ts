import { create } from 'zustand';

interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  updatedAt: string;
}

type ChatState = {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  setChats: (chats) => set({ chats }),
}));
