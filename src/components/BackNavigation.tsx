'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';

export const BackNavigation = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="p-0">
      <FiChevronLeft fontSize={43} />
    </button>
  );
};
