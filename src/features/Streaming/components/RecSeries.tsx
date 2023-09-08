'use client';
import Slider from '@/components/Slider';
import { recSeriesT } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SwiperSlide } from 'swiper/react';
interface T {
  data?: recSeriesT;
}
export const RecomendationSeries = ({ data }: T) => {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className="relative mt-2">
      <div className="container mb-5">
        <h2 className="text-white text-heading-2 font-semibold">Rekomendasi</h2>
      </div>
      {isLoading ? null : (
        <Slider>
          {data?.map((item, id) => (
            <SwiperSlide key={id}>
              <Link href={'/anime/' + item.slug}>
                <div className="relative h-[250px] w-full">
                  <Image
                    fill
                    alt={item.title}
                    src={item.thumbnail}
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Slider>
      )}
    </div>
  );
};
