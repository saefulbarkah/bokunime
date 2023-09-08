import Loading from '@/components/Loading';
import { Tab, TabList, TabTrigger, TabContent } from '@/components/Tab';
import { Dvider } from '@/components/ui/Dvider';
import {
  EpisodeLists,
  Information,
  tabMenuDetail,
  tabMenuTypes,
} from '@/features/TabContent/TabContent';
import { animeTypes, episodeType } from '@/types';
import Link from 'next/link';
import React from 'react';

interface T {
  data: episodeType;
  series: Partial<animeTypes>;
  isLoading: boolean;
}

export const MenuContent = ({ isLoading, series, data }: T) => {
  const tabMenu: tabMenuTypes[] = [
    ...tabMenuDetail,
    {
      value: 'downloads',
      label: 'Downloads',
    },
  ];
  return (
    <Tab
      className="mt-5 h-[300px] overflow-auto relative customScroll"
      defaultValue="information"
    >
      <TabList className="dark:bg-background">
        <TabTrigger menus={tabMenu} />
      </TabList>

      {isLoading ? (
        <Loading className="mt-[80px]" />
      ) : (
        <>
          <TabContent value="information">
            <Information synopsis={series?.synopsis} />
          </TabContent>
          <TabContent value="episode-lists">
            <EpisodeLists episodeLists={series?.episodeLists!} />
          </TabContent>
          <TabContent value="downloads">
            {data.downloads.length === 0 && (
              <p className="text-center font-semibold text-paragraph flex items-center justify-center h-[200px]">
                No download options
              </p>
            )}
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
                          <div className="grid grid-cols-3 gap-[10px] flex-1 items-center">
                            {itm.servers.map((server, idx) => (
                              <Link
                                href={server.link}
                                target="_blank"
                                className="bg-card py-[5px] flex items-center justify-center rounded px-[5px] hover:bg-danger hover:text-white transition"
                                key={idx}
                              >
                                <p className="text-sm  text-center">
                                  {server.serverName}
                                </p>
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
        </>
      )}
    </Tab>
  );
};
