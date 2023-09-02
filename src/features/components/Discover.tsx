import { Input } from '@/components/ui/input';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

export const Discover = () => {
  return (
    <div className="mt-[32px] container">
      <h2 className="text-heading-1 font-bold text-white">Discover</h2>
      <p className="text-md">Find anime or movie series.</p>
      <div className="mt-[25px]">
        <div className="relative">
          <Input
            placeholder="Search anime, movies, etc ...."
            className="pl-12 h-[47px] text-md"
          />
          <div className="absolute inset-y-0 h-full flex items-center translate-x-3">
            <FiSearch fontSize={22} className={'text-secondary'} />
          </div>
        </div>
      </div>
    </div>
  );
};
