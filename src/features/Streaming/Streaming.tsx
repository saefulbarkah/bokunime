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
import {
  EpisodeLists,
  Information,
  tabMenuDetail,
  tabMenuTypes,
} from '../TabContent/TabContent';
import { Tab, TabContent, TabList, TabTrigger } from '@/components/Tab';

export default function Streaming({ data }: { data: episodeType }) {
  const { data: series, isLoading: seriesLoading } = useAnime({
    slug: data.series.slug,
  });

  const tabMenu: tabMenuTypes[] = [
    ...tabMenuDetail,
    {
      value: 'downloads',
      label: 'Downloads',
    },
  ];
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
      <Tab className="mt-5" defaultValue="information">
        <TabList>
          <TabTrigger menus={tabMenu} />
        </TabList>

        {seriesLoading ? (
          <div className="relative flex flex-col gap-2 mt-5 container">
            <Skeleton className="w-[40%] h-[20px]" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-full h-[15px]" />
              <Skeleton className="w-full h-[15px]" />
              <Skeleton className="w-full h-[15px]" />
            </div>
          </div>
        ) : (
          <>
            <TabContent value="information">
              <Information synopsis={series?.synopsis} />
            </TabContent>
            <TabContent value="episode-lists">
              <EpisodeLists episodeLists={series?.episodeLists!} />
            </TabContent>
          </>
        )}
        <TabContent value="downloads">
          <div className="flex flex-col gap-5">
            {data.downloads.map((item, id) => (
              <React.Fragment key={id}>
                <div className="bg-indigo-700 text-white px-2 py-2 text-md rounded">
                  <h2>{item.format}</h2>
                </div>
                {item.data.map((itm, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col gap-3 px-2">
                      <div className="flex gap-2 text-md items-center">
                        <h2 className="w-[50px]">{itm.resolution}</h2>
                        <div className="grid grid-cols-3 gap-[10px] flex-1">
                          {itm.servers.map((server, idx) => (
                            <Link
                              href={server.link}
                              target="_blank"
                              className="bg-card py-[5px] flex items-center justify-center rounded px-[5px] hover:bg-danger hover:text-white transition"
                              key={idx}
                            >
                              <p className="text-sm">{server.serverName}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <Dvider />
                    </div>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </div>
        </TabContent>
      </Tab>
    </div>
  );
}
