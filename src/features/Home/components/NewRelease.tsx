'use client';
import CardAnimeSlider from '@/components/Slider';
import { useNewRelease } from '@/hooks/api';
import React from 'react';
import { AnimeItemSlide } from './AnimeItemSlide';
import Loading from '@/components/Loading';

type TRelease = {
  data: any;
  isLoading: boolean;
};

export const NewRelease = ({ data, isLoading }: TRelease) => {
  if (isLoading) return <Loading className="min-h-[calc(100vh-400px)]" />;

  return (
    <div className="flex flex-col gap-2">
      <div className="container">
        <h2 className="text-paragraph text-white capitalize font-semibold">
          Rilisan terbaru
        </h2>
      </div>
      <CardAnimeSlider>
        <AnimeItemSlide item={data?.collection} />
      </CardAnimeSlider>
    </div>
  );
};
