'use client';
import { Input } from '@/components/ui/input';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface TSearch
  extends React.HTMLAttributes<HTMLInputElement>,
    React.PropsWithChildren {
  onSearch?: () => void;
}

function Search({ children, placeholder, onSearch, ...props }: TSearch) {
  return (
    <div className="relative">
      <Input
        placeholder={placeholder || 'Search anime, movies, etc ....'}
        className="pl-12 h-[47px] text-md"
        onChange={onSearch}
        {...props}
      />
      <div className="absolute inset-y-0 h-full flex items-center translate-x-3">
        <FiSearch fontSize={22} className={'text-secondary'} />
      </div>
    </div>
  );
}

export default Search;
