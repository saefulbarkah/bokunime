import { useBookmark } from '@/hooks/useBookmark';
import React from 'react';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

export default function SaveBookmark({ data }: { data: any }) {
  const { isAlreadySave, addToBookmark } = useBookmark({
    data,
  });
  return (
    <button
      className={`text-[35px] ${
        isAlreadySave ? 'text-danger' : 'text-secondary'
      }`}
      onClick={() => addToBookmark(data)}
    >
      {isAlreadySave ? <BsBookmarkFill /> : <BsBookmark />}
    </button>
  );
}
