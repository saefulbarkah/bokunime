'use client';
import CardAnimeSlider from '@/components/CardAnimeSlider';
import { useNewRelease } from '@/hooks/api';
import React from 'react';

export const NewRelease = () => {
  const { data, isLoading } = useNewRelease();

  if (isLoading) return <p>loading....</p>;
  console.log(data);
  return (
    <div className="flex flex-col gap-2">
      <div className="container">
        <h2 className="text-paragraph text-white capitalize font-semibold">
          New Release
        </h2>
      </div>
      <CardAnimeSlider item={data.collection} />
    </div>
  );
};
