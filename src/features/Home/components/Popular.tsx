'use client';
import CardAnimeSlider from '@/components/Slider';
import { usePopular } from '@/hooks/api/usePopular';
import React from 'react';
import { AnimeItemSlide } from './AnimeItemSlide';
import Loading from '@/components/Loading';

export const Popular = () => {
  const { data, isLoading } = usePopular();
  if (isLoading) return <Loading classParent="min-h-[calc(100vh-400px)]" />;

  return (
    <div className="flex flex-col gap-2">
      <div className="container">
        <h2 className="text-paragraph text-white capitalize font-semibold">
          Popular Anime
        </h2>
      </div>
      <CardAnimeSlider>
        <AnimeItemSlide item={data} />
      </CardAnimeSlider>
    </div>
  );
};
