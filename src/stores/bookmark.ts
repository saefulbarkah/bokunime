import { animeTypes } from '@/types';
import { StateCreator, create } from 'zustand';
import { PersistOptions, persist } from 'zustand/middleware';

interface T {
  bookmark: Partial<animeTypes>[];
  addToBookmark: (d: Partial<animeTypes>) => void;
  clearBookmark: () => void;
}

type MyPersists = (
  config: StateCreator<T>,
  options: PersistOptions<T>
) => StateCreator<T>;

export const useBookmarkState = create<T>(
  (persist as MyPersists)(
    (set) => ({
      bookmark: [],
      addToBookmark: (d) =>
        set((state) => {
          const isItemInBookmark = state.bookmark.some(
            (item) => item.title === d.title
          );
          if (isItemInBookmark) {
            // Remove the item with the same slug
            return {
              bookmark: state.bookmark.filter((item) => item.title !== d.title),
            };
          } else {
            // Add the new item to the bookmark
            return {
              bookmark: [...state.bookmark, { ...d }],
            };
          }
        }),
      clearBookmark: () => set({ bookmark: [] }),
    }),
    {
      name: 'bookmark',
    }
  )
);
