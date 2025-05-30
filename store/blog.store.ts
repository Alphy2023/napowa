import { create } from 'zustand';

interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

type BlogState = {
  blogs: Blog[];
  setBlogs: (blogs: Blog[]) => void;
};

export const useBlogStore = create<BlogState>((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
}));
