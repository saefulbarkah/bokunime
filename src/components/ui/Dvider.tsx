import { cn } from '@/lib/utils';
import React, { HTMLAttributes, PropsWithChildren } from 'react';

interface T extends HTMLAttributes<HTMLElement> {}

export const Dvider = ({ className, ...props }: T) => {
  return (
    <div
      className={cn('w-full bg-secondary/10 h-[2px]', className)}
      {...props}
    />
  );
};
