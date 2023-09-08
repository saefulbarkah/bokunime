'use client';
import CardAnimeSlider from '@/components/Slider';
import { usePopular } from '@/hooks/api/usePopular';
import React from 'react';
import { AnimeItemSlide } from './AnimeItemSlide';
import Loading from '@/components/Loading';

type TPopular = {
  data: any;
  isLoading: boolean;
};

export const Popular = ({ data, isLoading }: TPopular) => {
  if (isLoading) return <Loading className="min-h-[calc(100vh-400px)]" />;

  return (
    <div className="flex flex-col gap-2">
      <div className="container">
        <h2 className="text-paragraph text-white capitalize font-semibold">
          Anime Populer
        </h2>
      </div>
      <CardAnimeSlider>
        <AnimeItemSlide item={data} />
      </CardAnimeSlider>
    </div>
  );
};
