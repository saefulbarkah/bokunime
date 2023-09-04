'use client';
import CardAnimeSlider from '@/components/Slider';
import { useRec } from '@/hooks/api';
import React from 'react';
import { AnimeItemSlide } from './AnimeItemSlide';

export const Recommendations = () => {
  const { data, isLoading } = useRec();

  if (isLoading) return <p>loading....</p>;

  return (
    <div className="flex flex-col gap-10">
      {data?.map((item: any, idx: any) => (
        <div key={idx}>
          <div className="container">
            <h2 className="text-paragraph text-white capitalize font-semibold">
              {item.genre}
            </h2>
          </div>
          <div className="mt-5">
            <CardAnimeSlider>
              <AnimeItemSlide item={item.data} />
            </CardAnimeSlider>
          </div>
        </div>
      ))}
    </div>
  );
};
