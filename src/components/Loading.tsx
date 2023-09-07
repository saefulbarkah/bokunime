import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface LoadingProps extends React.HTMLAttributes<HTMLElement> {}

const Loading: FC<LoadingProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'w-full flex items-center justify-center leading-none',
        className
      )}
    >
      <i className={cn('text-primary text-[40px] animate-spin')}>
        <AiOutlineLoading3Quarters />
      </i>
    </div>
  );
};

export default Loading;
