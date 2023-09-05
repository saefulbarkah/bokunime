import { cn } from '@/lib/utils';
import React, { FC } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface LoadingProps {
  classIcon?: string;
  classParent?: string;
}

const Loading: FC<LoadingProps> = ({ classIcon, classParent }) => {
  return (
    <div
      className={cn(
        'w-full flex items-center justify-center leading-none',
        classParent
      )}
    >
      <i
        className={cn('text-primary text-[40px] animate-spin', {
          classIcon,
        })}
      >
        <AiOutlineLoading3Quarters />
      </i>
    </div>
  );
};

export default Loading;
