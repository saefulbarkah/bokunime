import React from 'react';
import { useBookmark } from '@/hooks/useBookmark';
import Image from 'next/image';
import Link from 'next/link';
import { FiInfo } from 'react-icons/fi';
import { animeTypes } from '@/types';

interface T {
  items?: Partial<animeTypes>[];
  isSearch?: string;
}

export default function BookmarkItems({ items, isSearch }: T) {
  return (
    <>
      {items?.length === 0 && isSearch === '' ? (
        <>
          <div className="flex flex-col gap-2 items-center justify-center h-[calc(100vh-400px)]">
            <i className="text-[40px]">
              <FiInfo />
            </i>
            <h2 className="text-center">
              Daftar bookmark Anda saat ini kosong
            </h2>
          </div>
        </>
      ) : (
        <>
          {isSearch && items?.length === 0 ? (
            <>
              <div className="flex flex-col gap-2 items-center justify-center h-[calc(100vh-400px)]">
                <i className="text-[40px]">
                  <FiInfo />
                </i>
                <h2 className="text-center">Hasil tidak di temukan</h2>
              </div>
            </>
          ) : null}
          <div className="grid grid-cols-3 gap-5">
            {items?.map((item, id) => (
              <React.Fragment key={id}>
                <Link
                  className="flex flex-col gap-2 group"
                  href={`/anime/${item.slug}`}
                >
                  <div className="relative h-[165px] w-full">
                    <Image
                      fill
                      unoptimized={true}
                      src={`${item.thumbnail}`}
                      alt={`${item.title}`}
                      className="object-cover rounded-lg"
                    />
                    {item.status ? (
                      <div className="absolute bottom-0 w-full z-10 h-[25px] bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <p className="text-sm text-white">{item.status}</p>
                      </div>
                    ) : null}
                    {item.type ? (
                      <div className="absolute top-0 z-10 p-2 rounded-tr-lg bg-indigo-500 right-0 backdrop-blur-sm flex items-center justify-center">
                        <p className="text-sm text-white uppercase font-semibold">
                          {item.type}
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <p className="text-md text-center line-clamp-2 group-hover:text-primary">
                    {item.title}
                  </p>
                </Link>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </>
  );
}
