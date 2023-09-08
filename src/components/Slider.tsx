'use client';
import React from 'react';

// Import Swiper React components
import { Swiper, SwiperProps, SwiperRef } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

interface CardProps extends React.PropsWithChildren, SwiperProps {}

function Slider({ children, slidesPerView = 2.4, ...props }: CardProps) {
  // const swiper = React.useRef<SwiperRef | null>(null);

  return (
    <div className="relative">
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={20}
        slidesOffsetAfter={20}
        slidesOffsetBefore={20}
        {...props}
      >
        {children}
        <div className="absolute top-[49%] -translate-y-1/2 z-50 flex items-center left-0  h-full pointer-events-none">
          <div className="bg-gradient-to-r from-background via-transparent  w-[60px] h-full"></div>
        </div>
        <div className="absolute top-[49%] -translate-y-1/2 z-50 flex items-center right-0  h-full pointer-events-none">
          <div className="bg-gradient-to-l from-background via-transparent  w-[60px] h-full"></div>
        </div>

        {/* <div className="absolute top-[49%] -translate-y-1/2 z-50 flex items-center left-0">
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
        </div> */}
      </Swiper>
    </div>
  );
}

export default Slider;
