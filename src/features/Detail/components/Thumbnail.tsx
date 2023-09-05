import Image from 'next/image';
import React from 'react';

export const Thumbnail = ({ src }: { src: string }) => {
  return (
    <div className="relative w-[155px] h-[220px]">
      <Image
        src={src}
        fill
        alt=""
        className="object-fill rounded-md"
        unoptimized
      />
    </div>
  );
};
