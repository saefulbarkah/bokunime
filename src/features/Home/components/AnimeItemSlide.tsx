import { animeTypes } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SwiperSlide } from 'swiper/react';

export const AnimeItemSlide = ({ item }: { item?: Partial<animeTypes>[] }) => {
  return (
    <>
      {item?.map((itm, id) => (
        <SwiperSlide key={id}>
          <Link
            href={'/stream/' + itm.slug}
            className="flex flex-col gap-2 items-center"
          >
            <div className="relative h-[250px] w-full">
              {itm.type ? (
                <div className="absolute top-0 right-0 translate-y-1 -translate-x-1 bg-blue-700 rounded-md z-10 px-2 py-1 flex items-center justify-center">
                  <p className="text-sm text-white font-semibold">{itm.type}</p>
                </div>
              ) : null}
              <Image
                src={`${itm.thumbnail}`}
                alt="sada"
                fill
                className="object-cover rounded"
                unoptimized={true}
              />
              {itm.status ? (
                <div className="absolute bottom-0 left-0 bg-black/70 backdrop-blur-sm  z-10 w-full h-7 flex items-center justify-center">
                  <p className="text-sm text-white">{itm.status}</p>
                </div>
              ) : null}
            </div>
            <p className="text-center text-md line-clamp-2">{itm.title}</p>
          </Link>
        </SwiperSlide>
      ))}
    </>
  );
};

AnimeItemSlide.displayName = 'SwiperSlide';
