'use client';
import Link from 'next/link';
import React from 'react';
import { FiHome, FiCalendar, FiBookmark } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

function NavItems() {
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
    {
      icon: <FiBookmark />,
      path: '/bookmark',
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
