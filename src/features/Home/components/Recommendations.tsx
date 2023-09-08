'use client';
import CardAnimeSlider from '@/components/Slider';
import { useRec } from '@/hooks/api';
import React from 'react';
import { AnimeItemSlide } from './AnimeItemSlide';
import Loading from '@/components/Loading';

type TRec = {
  data: any;
  isLoading: boolean;
};

export const Recommendations = ({ data, isLoading }: TRec) => {
  if (isLoading) return <Loading className="min-h-[calc(100vh-400px)]" />;

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
