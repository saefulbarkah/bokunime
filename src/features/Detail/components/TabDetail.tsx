import { ReadMore } from '@/components/ReadMore';
import { Dvider } from '@/components/ui/Dvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { animeTypes } from '@/types';
import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
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
    <div>
      <h2 className="font-semibold text-paragraph text-white">
        Daftar Episode
      </h2>
      <div className="mt-5">
        <Table className="overflow-x-hidden">
          <TableHeader>
            <TableRow className="text-md ">
              <TableHead className="w-[50px] text-white">Eps</TableHead>
              <TableHead className="text-white">Judul</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.episodeLists?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.episode}</TableCell>
                <TableCell>
                  <div className="bg-card rounded hover:bg-danger hover:text-white p-2 w-full transition">
                    <Link href={'/episode/' + item.slug}>
                      <p className="truncate w-[300px]">{item.title}</p>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
