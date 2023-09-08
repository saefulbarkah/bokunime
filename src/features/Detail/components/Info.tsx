'use client';
import SaveBookmark from '@/components/SaveBookmark';
import { animeTypes } from '@/types';
import { useParams } from 'next/navigation';
import React from 'react';

export const Info = ({ data }: { data: Partial<animeTypes> }) => {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="flex items-center justify-between container">
      <div>
        {/* info  */}
        <div className=" mt-[10px]">
          <div className="flex gap-2 items-center text-sm">
            <p>{data.releaseDate}</p>
            <p>|</p>
            <span className="bg-card py-[3px] px-[5px] rounded">
              {data.status}
            </span>
            <span className="bg-card py-[3px] px-[5px] rounded">
              {data.type}
            </span>
            <span className="bg-card py-[3px] px-[5px] rounded">
              {data.studio}
            </span>
          </div>
        </div>

        {/* genre lists */}
        <div className=" flex gap-2 mt-[10px] text-sm items-center">
          <p>Genre</p>
          <p>:</p>
          {data.genres?.map((item, idx) => (
            <React.Fragment key={idx}>
              {idx <= 2 ? (
                <p className="bg-card py-[3px] px-[10px]">{item}</p>
              ) : null}
            </React.Fragment>
          ))}
          {data.genres?.length !== 0 && data.genres!.length > 2 ? (
            <p className="bg-card py-[3px] px-[10px]">
              +{data.genres!.length - 3}
            </p>
          ) : null}
        </div>
      </div>
      <SaveBookmark data={{ ...data, slug }} />
    </div>
  );
};
