import { create } from 'zustand';

interface Member {
  id: string;
  name: string;
  role: string;
}

type MemberState = {
  members: Member[];
  setMembers: (members: Member[]) => void;
};

export const useMemberStore = create<MemberState>((set) => ({
  members: [],
  setMembers: (members) => set({ members }),
}));
