'use client';
import CardAnimeSlider from '@/components/Slider';
import { useNewRelease } from '@/hooks/api';
import React from 'react';
import { AnimeItemSlide } from './AnimeItemSlide';

export const NewRelease = () => {
  const { data, isLoading } = useNewRelease();

  if (isLoading) return <p>loading....</p>;
  return (
    <div className="flex flex-col gap-2">
      <div className="container">
        <h2 className="text-paragraph text-white capitalize font-semibold">
          New Release
        </h2>
      </div>
      <CardAnimeSlider>
        <AnimeItemSlide item={data?.collection} />
      </CardAnimeSlider>
    </div>
  );
};
