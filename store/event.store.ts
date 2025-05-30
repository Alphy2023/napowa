import { create } from 'zustand';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

type EventState = {
  events: Event[];
  setEvents: (events: Event[]) => void;
};

export const useEventStore = create<EventState>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
}));
