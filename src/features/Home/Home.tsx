'use client';
import React from 'react';
import { Discover } from './components/Discover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recommendations } from './components/Recommendations';
import { NewRelease } from './components/NewRelease';
import { Popular } from './components/Popular';
import { useNewRelease, usePopular, useRec } from '@/hooks/api';
import { FilterAnime } from '@/components/FilterAnime';
import { useFilterAnime } from '@/hooks/api/useFilterAnime';

const TabMenus = () => {
  const menus = [
    { value: 'recommendation', label: 'Rekomendasi' },
    { value: 'new-release', label: 'Rilisan terbaru' },
    { value: 'popular', label: 'Populer' },
  ];

  return (
    <TabsList className="bg-transparent dark:bg-background w-full justify-start py-[30px] container">
      {menus.map((item, idx) => (
        <TabsTrigger
          value={item.value}
          key={idx}
          className="group data-[state=active]:bg-card rounded-xl data-[state=active]:text-primary font-semibold text-md relative pl-5 justify-start"
        >
          <div className="absolute group-data-[state=active]:bg-primary rounded-full w-[5px] h-[5px] left-0 translate-x-2"></div>
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default function Home() {
  const { data: dataNew, isLoading: loadingNewRelease } = useNewRelease();
  const { data: dataPopular, isLoading: loadingPopluar } = usePopular();
  const { data: dataRec, isLoading: loadingRec } = useRec();

  return (
    <div>
      <Discover />

      {/* Main content */}
      <div className="mt-[25px]">
        <Tabs defaultValue="recommendation" className="w-full">
          <div className="sticky top-0 z-50 bg-background pt-[10px]">
            <FilterAnime />
            <TabMenus />
          </div>
          <TabsContent value="recommendation">
            <Recommendations data={dataRec} isLoading={loadingRec} />
          </TabsContent>
          <TabsContent value="new-release">
            <NewRelease data={dataNew} isLoading={loadingNewRelease} />
          </TabsContent>
          <TabsContent value="popular">
            <Popular data={dataPopular} isLoading={loadingNewRelease} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
