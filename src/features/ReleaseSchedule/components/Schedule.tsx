'use client';
import Slider from '@/components/Slider';
import React from 'react';
import { useSchedule } from '@/hooks/api';
import { SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/components/Loading';

export default function Schedule() {
  const { data, isLoading } = useSchedule();
  if (isLoading) return <Loading className="min-h-[calc(100vh-400px)]" />;

  return (
    <div className="mt-5">
      {data?.map((item, idx) => (
        <div className="relative" key={idx}>
          <div className="container mt-10 mb-5">
            <h2 className="text-paragraph text-white capitalize font-semibold">
              {item.day}
            </h2>
          </div>
          <Slider>
            {item.data.map((d, id) => (
              <SwiperSlide key={id}>
                <Link
                  href={'/anime/' + d.slug}
                  className="flex flex-col gap-2 items-center"
                >
                  <div className="relative h-[250px] w-full">
                    {d.ongoingEpisode ? (
                      <div className="absolute top-0 right-0 translate-y-1 -translate-x-1 bg-blue-700 rounded-md z-10 px-2 py-1 flex items-center justify-center">
                        <div className="text-sm text-white flex gap-1">
                          <p>episode </p>
                          <span className="font-semibold">
                            {d.ongoingEpisode}
                          </span>
                        </div>
                      </div>
                    ) : null}
                    <Image
                      src={`${d.thumbnail}`}
                      alt="sada"
                      fill
                      className="object-cover rounded"
                      unoptimized={true}
                    />
                    {d.timer ? (
                      <div className="absolute bottom-0 left-0 bg-black/70 backdrop-blur-sm  z-10 w-full h-7 flex items-center justify-center">
                        <p className="text-sm text-white">{d.timer}</p>
                      </div>
                    ) : null}
                  </div>
                  <p className="text-center text-md line-clamp-2">{d.title}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
}

Schedule.displayName = 'SwiperSlide';
