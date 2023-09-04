import { Input } from '@/components/ui/input';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

function Search({ children }: React.PropsWithChildren) {
  return (
    <div className="sticky top-0 z-50 bg-background pt-[10px]">
      <div className="relative">
        <Input
          placeholder="Search anime, movies, etc ...."
          className="pl-12 h-[47px] text-md"
        />
        <div className="absolute inset-y-0 h-full flex items-center translate-x-3">
          <FiSearch fontSize={22} className={'text-secondary'} />
        </div>
      </div>
      {children}
    </div>
  );
}

export default Search;
