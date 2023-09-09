'use client';
import React, { useRef, useState } from 'react';
import Search from './Search';
import Image from 'next/image';
import Link from 'next/link';
import { Dvider } from './ui/Dvider';
import { useFilterAnime } from '@/hooks/api/useFilterAnime';
import Loading from './Loading';

const animationDuration = 150;

export const FilterAnime = () => {
  const { setQuery, query, data, isFetching: isLoading } = useFilterAnime();

  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRemoveNode, setRemoveNode] = useState<boolean>(false);

  React.useEffect(() => {
    if (query === '') return setIsOpen(false);
    setIsOpen(true);
  }, [query]);

  React.useEffect(() => {
    const handleToggleSearch = (e: MouseEvent) => {
      if (!containerRef.current) return null;
      const isContainSearch = containerRef.current.contains(e.target as Node);
      if (!isContainSearch) return setIsOpen(false);
    };
    window.addEventListener('click', handleToggleSearch);
    return () => window.removeEventListener('click', handleToggleSearch);
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      const removed = setTimeout(() => {
        if (!isOpen) return setRemoveNode(true);
      }, animationDuration + 500);
      return () => clearTimeout(removed);
    } else {
      return setRemoveNode(false);
    }
  }, [isOpen]);

  return (
    <div className="relative container" ref={containerRef}>
      <Search
        onChange={(e) => setQuery(e.target.value)}
        onClick={() => {
          if (query !== '') return setIsOpen(true);
        }}
      />
      {isRemoveNode ? null : (
        <div
          className={`absolute container left-0 right-0 mx-auto translate-y-2 z-50 h-full ${
            isOpen ? '' : 'pointer-events-none'
          }`}
        >
          <div
            className={`h-[calc(100vh-200px)] overflow-auto customScroll bg-background backdrop-blur-md container py-5 rounded-lg shadow-2xl shadow-primary/20 transition-all duration-[150ms]  ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="mb-5 pb-2">
              <h2 className="truncate">
                Cari : <span>{`"${query}"`}</span>
              </h2>
              <div className="mt-2">
                <Dvider />
              </div>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center h-[300px]">
                <Loading />
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-5">
                  {data?.collection.map((item, id) => (
                    <React.Fragment key={id}>
                      <Link
                        className="flex gap-2 group"
                        onClick={() => {
                          setIsOpen(false), setQuery('');
                        }}
                        href={'/anime/' + item.slug}
                      >
                        <Image
                          src={`${item.thumbnail}`}
                          unoptimized
                          alt="asda"
                          width={70}
                          height={70}
                          className="object-contain"
                        />
                        <div className="flex flex-col gap-2 flex-1 group-hover:bg-white/5 p-2 rounded">
                          <h2 className="text-white line-clamp-2">
                            {item.title}
                          </h2>
                          <div className="text-sm flex gap-1">
                            <p>Status :</p>
                            <p>{item.status}</p>
                          </div>
                          <div className="text-sm flex gap-1">
                            <p>type :</p>
                            <p>{item.type}</p>
                          </div>
                        </div>
                      </Link>
                      <Dvider />
                    </React.Fragment>
                  ))}
                  {data?.collection.length === 0 ? (
                    <div className="flex justify-center items-center h-[300px]">
                      <p>Hasil tidak di temukan</p>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
