import { ReadMore } from '@/components/ReadMore';
import { Dvider } from '@/components/ui/Dvider';
import { animeTypes } from '@/types';
import React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

interface detailProps {
  synopsis?: string;
}

const Information = ({ synopsis }: detailProps) => {
  return (
    <div className="flex flex-col gap-[10px]">
      {synopsis !== '' ? (
        <>
          <h2 className="text-paragraph font-semibold text-white">Synopsis</h2>
          <Dvider />
          <div className="">
            <ReadMore text={synopsis} limit={150} />
          </div>
        </>
      ) : null}
    </div>
  );
};

interface episodeListType extends Pick<animeTypes, 'episodeLists'> {}
const EpisodeLists = ({ episodeLists }: episodeListType) => {
  const params = useParams();
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
        {episodeLists?.map((item, id) => (
          <React.Fragment key={id}>
            <div className="flex gap-[10px] items-center">
              <div className="w-[50px] text-center">{item.episode}</div>
              <Link
                href={'/stream/' + item.slug}
                className={`flex-1 truncate bg-card p-2 rounded-md text-sm hover:bg-danger hover:text-white transition ${
                  params.slug === item.slug ? 'bg-danger text-white' : ''
                }`}
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

export type tabMenuTypes = {
  value: string;
  label: string;
};
export const tabMenuDetail: tabMenuTypes[] = [
  { value: 'information', label: 'Informasi' },
  { value: 'episode-lists', label: 'Daftar Episode' },
];

export { EpisodeLists, Information };
