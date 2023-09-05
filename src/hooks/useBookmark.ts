'use client';
import { useBookmarkState } from '@/stores/bookmark';
import useStore from '@/stores/useStore';
import { animeTypes } from '@/types';
import React, { useEffect } from 'react';

export const useBookmark = (data: Partial<animeTypes> | undefined) => {
  const bookmark = useStore(useBookmarkState, (state) => state.bookmark);
  const addToBookmark = useBookmarkState((state) => state.addToBookmark);
  const [isAlreadySave, setAlreadySave] = React.useState(false);

  useEffect(() => {
    const isSave = bookmark?.some((itm) => itm.title === data?.title);
    if (isSave) return setAlreadySave(true);
    setAlreadySave(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmark]);

  return { bookmark, isAlreadySave, addToBookmark };
};
