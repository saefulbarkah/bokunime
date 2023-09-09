'use client';

import { BackNavigation } from '@/components/BackNavigation';
import Loading from '@/components/Loading';
import Search from '@/components/Search';
import { useBookmark } from '@/hooks/useBookmark';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';

const RenderBookmark = dynamic(
  () => import('@/features/Bookmark/components/BookmarkItems'),
  {
    ssr: false,
    loading: () => <Loading className="h-[calc(100vh-200px)]" />,
  }
);

export default function Page() {
  const [searchBookmark, setSearch] = React.useState('');
  const { bookmark } = useBookmark();

  const filteredBookmark = useMemo(() => {
    if (!searchBookmark) return bookmark;
    return bookmark?.filter((item) =>
      item.title?.toLowerCase().includes(searchBookmark.toLowerCase())
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBookmark, bookmark]);

  const onSearchBookmark = (val: string) => {
    setSearch(val);
  };


  return (
    <div className="min-h-screen">
      <div className="pt-[30px] container">
        {/* title */}
        <div className="flex items-center">
          <BackNavigation />
          <h2 className="text-center font-bold text-heading-1 text-white flex-1">
            Bookmark
          </h2>
        </div>
        <div className="mt-5">
          <Search
            placeholder="Temukan anime di bookmark"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onSearchBookmark(e.target.value);
            }}
          />
        </div>
        <div className="mt-5">
          <RenderBookmark items={filteredBookmark} isSearch={searchBookmark} />
        </div>
      </div>
    </div>
  );
}
