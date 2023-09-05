import Image from 'next/image';
import React from 'react';

export const DetailBanner = ({ src }: { src: string }) => {
  return (
    <div className="relative w-full h-[300px]">
      <Image src={src} alt="" fill unoptimized className="object-cover" />
      <div className="absolute  bg-background/50 w-full h-full inset-0 backdrop-blur-[1px]"></div>
    </div>
  );
};
