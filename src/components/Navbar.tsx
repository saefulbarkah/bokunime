'use client';
import Link from 'next/link';
import React from 'react';
import { FiHome, FiCalendar, FiBookmark } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useBookmark } from '@/hooks/useBookmark';

function NavItems() {
  const { bookmark } = useBookmark({});
  const pathName = usePathname();
  const items = [
    {
      icon: <FiHome />,
      path: '/',
    },
    {
      icon: <FiCalendar />,
      path: '/release-schedule',
    },
  ];

  return (
    <div className="flex items-center justify-around w-full">
      {items.map((item) => (
        <Link
          href={item.path}
          key={item.path}
          className={`text-[30px] ${
            pathName === item.path ? 'text-primary' : 'text-secondary'
          }`}
        >
          {item.icon}
        </Link>
      ))}

      <Link
        href={'/bookmark'}
        className={`text-[30px] relative ${
          pathName === '/bookmark' ? 'text-primary' : 'text-secondary'
        }`}
      >
        <FiBookmark />
        {bookmark ? (
          bookmark.length !== 0 ? (
            <div className="absolute top-0 right-0 translate-x-1 -translate-y-1 bg-danger text-white w-[10px] rounded-full h-[10px] flex items-center justify-center animate-pulse"></div>
          ) : null
        ) : null}
      </Link>
    </div>
  );
}

function Navbar() {
  return (
    <div className="fixed bottom-0 z-50 w-full sm:w-[28rem]">
      <div className="w-full bg-background/80 h-14 backdrop-blur-md border-t-[1px] border-secondary/20 shadow-md">
        <div className="container h-full flex items-center">
          <NavItems />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
