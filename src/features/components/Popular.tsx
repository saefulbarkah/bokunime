'use client';
import CardAnimeSlider from '@/components/CardAnimeSlider';
import { usePopular } from '@/hooks/api/usePopular';
import React from 'react';

export const Popular = () => {
  const { data, isLoading } = usePopular();
  if (isLoading) return <p>loading....</p>;
  console.log(data);

  return (
    <div className="flex flex-col gap-2">
      <div className="container">
        <h2 className="text-paragraph text-white capitalize font-semibold">
          Popular Anime
        </h2>
      </div>
      <CardAnimeSlider item={data} />
    </div>
  );
};
