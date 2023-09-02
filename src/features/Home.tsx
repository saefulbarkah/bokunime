'use client';
import React from 'react';
import { Discover } from './components/Discover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recommendations } from './components/Recommendations';
import { NewRelease } from './components/NewRelease';
import { Popular } from './components/Popular';

const TabMenus = () => {
  const menus = [
    { value: 'recommendation', label: 'Recommendation' },
    { value: 'new-release', label: 'New release' },
    { value: 'popular', label: 'Popular' },
  ];
  return (
    <>
      {menus.map((item, idx) => (
        <TabsTrigger
          value={item.value}
          key={idx}
          className="group data-[state=active]:bg-transparent data-[state=active]:text-primary font-semibold text-md relative pl-5"
        >
          <div className="absolute group-data-[state=active]:bg-primary rounded-full w-[5px] h-[5px] left-0 translate-x-2"></div>
          {item.label}
        </TabsTrigger>
      ))}
    </>
  );
};

export default function Home() {
  return (
    <div>
      <Discover />

      {/* Main content */}
      <div className="mt-[25px]">
        <Tabs defaultValue="recommendation" className="w-full">
          <TabsList className="bg-transparent dark:bg-transparent w-full ">
            <TabMenus />
          </TabsList>
          <TabsContent value="recommendation">
            <Recommendations />
          </TabsContent>
          <TabsContent value="new-release">
            <NewRelease />
          </TabsContent>
          <TabsContent value="popular">
            <Popular />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
