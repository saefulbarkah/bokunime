'use client';
import React from 'react';
import Search from '../../components/Search';
import Schedule from './components/Schedule';

function ReleaseSchedule() {
  return (
    <div className="mt-[35px]">
      <h2 className="font-bold text-heading-1 text-center">Jadwal Rilis</h2>
      <div className="sticky top-0 py-[10px] z-50 bg-background">
        <Search />
      </div>
      <Schedule />
    </div>
  );
}

export default ReleaseSchedule;
