import { ReadMore } from '@/components/ReadMore';
import { Dvider } from '@/components/ui/Dvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { animeTypes } from '@/types';
import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

interface T {
  data: Partial<animeTypes>;
}

const DetailContent = ({ data }: T) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <h2 className="text-paragraph font-semibold text-white">Synopsis</h2>
      <Dvider />
      <div className="">
        <ReadMore text={data.synopsis} limit={150} />
      </div>
    </div>
  );
};

const EpisodeLists = ({ data }: { data: Partial<animeTypes> }) => {
  return (
    <div className="mt-5 flex flex-col gap-2">
      <div className="flex gap-[10px]">
        <div className="w-[50px] text-center">
          <p>Eps.</p>
        </div>
        <div className="flex-1">
          <p>Judul</p>
        </div>
      </div>
      <Dvider className="h-[1px]" />
      <div className="flex flex-col gap-[15px]">
        {data.episodeLists?.map((item, id) => (
          <React.Fragment key={id}>
            <div className="flex gap-[10px] items-center">
              <div className="w-[50px] text-center">{item.episode}</div>
              <Link
                href={'/stream/' + item.slug}
                className="flex-1 truncate bg-card p-2 rounded-md text-sm hover:bg-danger hover:text-white transition"
              >
                {item.title}
              </Link>
            </div>
            <Dvider className="h-[1px]" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const TabDetail = ({ data }: T) => {
  const menus = [
    { value: 'info', label: 'Informasi' },
    { value: 'episode-list', label: 'Daftar Episode' },
  ];

  return (
    <Tabs defaultValue="info" className="mt-[20px] ">
      <div className="container">
        <TabsList className="bg-transparent w-full justify-start dark:bg-transparent gap-[19px]">
          {menus.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="relative">
                <TabsTrigger
                  className="group outline-none text-md px-0 data-[state=active]:bg-transparent data-[state=active]:text-primary dark:bg-transparent"
                  value={item.value}
                >
                  {item.label}
                  <div className="absolute group-data-[state=active]:bg-primary bottom-0 w-full h-[2px] translate-y-1"></div>
                </TabsTrigger>
              </div>
            </React.Fragment>
          ))}
        </TabsList>
      </div>
      <Dvider />
      <TabsContent value="info" className="container mt-[32px]">
        <DetailContent data={data} />
      </TabsContent>
      <TabsContent value="episode-list" className="container mt-[32px]">
        <EpisodeLists data={data} />
      </TabsContent>
    </Tabs>
  );
};
