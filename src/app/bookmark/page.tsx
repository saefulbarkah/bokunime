'use client';

import { BackNavigation } from '@/components/BackNavigation';
import Loading from '@/components/Loading';
import Search from '@/components/Search';
import dynamic from 'next/dynamic';
import React from 'react';

const RenderBookmark = dynamic(
  () => import('@/features/Bookmark/components/BookmarkItems'),
  {
    ssr: false,
    loading: () => <Loading className="h-[calc(100vh-200px)]" />,
  }
);

export default function page() {
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
          <Search placeholder="Temukan anime di bookmark" />
        </div>
        <div className="mt-5">
          <RenderBookmark />
        </div>
      </div>
    </div>
  );
}
