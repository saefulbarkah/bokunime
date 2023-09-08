'use client';
import { Input, InputProps } from '@/components/ui/input';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

function Search({ children, placeholder, ...props }: InputProps) {
  return (
    <div className="relative">
      <Input
        placeholder={placeholder || 'Search anime, movies, etc ....'}
        className="pl-12 h-[47px] text-md"
        {...props}
      />
      <div className="absolute inset-y-0 h-full flex items-center translate-x-3">
        <FiSearch fontSize={22} className={'text-secondary'} />
      </div>
    </div>
  );
}

export default Search;
