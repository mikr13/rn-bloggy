import type { Blog } from '@/types/blog';
import { randomUUID } from 'expo-crypto';
import { create, type StateCreator } from 'zustand';

export type LoaderState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const createLoadSlice: StateCreator<LoaderState> = (set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
});

type BlogState = {
  blogs: Blog[];
  addBlog: (blog: Omit<Blog, "id">) => void;
  editBlog: (blog: Blog) => void;
  deleteBlog: (id: string) => void;
}

const createBlogSlice: StateCreator<BlogState> = (set) => ({
  blogs: [
    { id: randomUUID(), title: 'Hello', content: 'World', imageURL: 'https://picsum.photos/500/300' },
    { id: randomUUID(), title: 'Hello 2', content: 'World', imageURL: 'https://picsum.photos/500/300' }
  ],
  addBlog: (blog: Omit<Blog, "id">) => set((state) => ({
    blogs: [...state.blogs, {
      ...blog,
      id: randomUUID(),
      image: "https://picsum.photos/500/300",
    }]
  })),
  editBlog: (blog: Blog) => set((state) => ({ blogs: state.blogs.map((b) => b.id === blog.id ? blog : b) })),
  deleteBlog: (id: string) => set((state) => ({ blogs: state.blogs.filter((b) => b.id !== id) })),
});

export const useStore = create<LoaderState & BlogState>()((...args) => ({
  ...createLoadSlice(...args),
  ...createBlogSlice(...args),
}))
