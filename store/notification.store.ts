import { create } from 'zustand';

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

type NotificationState = {
  notifications: Notification[];
  setNotifications: (notifs: Notification[]) => void;
  markAsRead: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
}));
