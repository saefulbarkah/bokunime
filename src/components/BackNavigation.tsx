'use client';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';

export const BackNavigation = ({
  className,
  size = 43,
  ...props
}: React.HTMLAttributes<Element> & { size?: number }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={cn('', className)}
      {...props}
    >
      <FiChevronLeft fontSize={size} />
    </button>
  );
};
