'use client';
import { useAnime } from '@/hooks/api';
import { episodeType } from '@/types';
import React from 'react';
import { Player } from './components/Player';
import { Rating } from '@/components/Rating';
import SaveBookmark from '@/components/SaveBookmark';
import { Skeleton } from '@/components/ui/skeleton';
import { Dvider } from '@/components/ui/Dvider';
import Link from 'next/link';
import { MenuContent } from './components/MenuContent';
import { RecomendationSeries } from './components/RecSeries';

export default function Streaming({ data }: { data: episodeType }) {
  const { data: series, isLoading: seriesLoading } = useAnime({
    slug: data.series.slug,
  });

  return (
    <div className="relative">
      <Player src={data.streamURL} />
      <div className="container mt-2">
        <div className="flex justify-between mb-3">
          <h2 className="w-[80%] text-white">{data.titleEpisode}</h2>
          <Rating rating={data.rating} />
        </div>
        <Dvider />
        <div className="flex flex-col gap-[13px]">
          <div className="flex justify-between mt-5 items-center">
            <div className="flex gap-2 items-center">
              <h2 className="">{data.releaseYear}</h2>
              <span>|</span>
              <div className="bg-card px-4 py-1 rounded">
                <p className="text-sm uppercase">{data.type}</p>
              </div>
              {data.season ? (
                <div className="bg-card px-4 py-1 rounded">
                  <p className="text-sm capitalize">{data.season}</p>
                </div>
              ) : null}
            </div>
            {seriesLoading ? (
              <Skeleton className="w-[35px] h-[35px]" />
            ) : (
              <SaveBookmark data={{ ...series, slug: data.series.slug }} />
            )}
          </div>
          <h2 className="text-md">
            Genres :{' '}
            {data.genres.slice(0, 4).map((item, id) => (
              <span key={id}>
                {item}
                {id < 3 && ', '}
              </span>
            ))}
            {data.genres.length > 4 && <span>, ...</span>}
          </h2>
          <div className="flex gap-2 text-md">
            <h2>Series</h2>
            <span>:</span>
            <Link
              href={'/anime/' + data.series.slug}
              className="truncate text-primary font-semibold"
            >
              {data.series.name}
            </Link>
          </div>
          <div className="flex gap-2 text-md">
            <p>Durasi</p>
            <span>:</span>
            {data.duration ? <p>{data.duration}</p> : <p>??</p>}
          </div>
        </div>
      </div>
      {/* Tab Content */}
      <MenuContent data={data} series={series!} isLoading={seriesLoading} />
      <RecomendationSeries data={data.recommendationSeries} />
    </div>
  );
}
