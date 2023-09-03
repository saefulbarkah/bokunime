'use client';
import React, { useRef } from 'react';

// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { animeTypes } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { SwiperOptions } from 'swiper/types';

interface CardProps {
  item?: Partial<animeTypes>[];
}

function CardAnimeSlider({ item }: CardProps) {
  const swiper = React.useRef<SwiperRef | null>(null);

  if (!item) return null;

  return (
    <div className="relative">
      <Swiper
        slidesPerView={2.4}
        spaceBetween={20}
        modules={[Pagination]}
        slidesOffsetAfter={20}
        slidesOffsetBefore={20}
        ref={swiper}
      >
        {item.map((itm, id: any) => (
          <SwiperSlide key={id}>
            <Link
              href={'/anime/' + itm.slug}
              className="flex flex-col gap-2 items-center"
            >
              <div className="relative h-[250px] w-full">
                {itm.type ? (
                  <div className="absolute top-0 right-0 translate-y-1 -translate-x-1 bg-blue-700 rounded-md z-10 px-2 py-1 flex items-center justify-center">
                    <p className="text-sm text-white font-semibold">
                      {itm.type}
                    </p>
                  </div>
                ) : null}
                <Image
                  src={`${itm.thumbnail}`}
                  alt="sada"
                  fill
                  className="object-cover rounded"
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

        <div className="absolute top-[49%] -translate-y-1/2 z-50 flex items-center left-0  h-full pointer-events-none">
          <div className="bg-gradient-to-r from-background via-transparent  w-[60px] h-full"></div>
        </div>
        <div className="absolute top-[49%] -translate-y-1/2 z-50 flex items-center right-0  h-full pointer-events-none">
          <div className="bg-gradient-to-l from-background via-transparent  w-[60px] h-full"></div>
        </div>

        <div className="absolute top-[49%] -translate-y-1/2 z-50 flex items-center left-0">
          <Button
            variant={'unstyled'}
            size={'no-set'}
            className="text-white"
            onClick={() => {
              if (!swiper.current) return;
              swiper.current.swiper.slidePrev();
            }}
          >
            <FiChevronLeft fontSize={35} />
          </Button>
        </div>
        <div className="absolute top-[49%] -translate-y-1/2 z-50 flex items-center right-0">
          <Button
            variant={'unstyled'}
            size={'no-set'}
            className="text-white"
            onClick={() => {
              if (!swiper.current) return;
              swiper.current.swiper.slideNext();
            }}
          >
            <FiChevronRight fontSize={35} />
          </Button>
        </div>
      </Swiper>
    </div>
  );
}

export default CardAnimeSlider;
