'use client';
import { Skeleton } from '@/components/ui/skeleton';
import React, { useRef, useState } from 'react';

export const Player = ({ src }: { src: string }) => {
  const [isLoadIframe, setLoadIframe] = useState(true);
  return (
    <div className="relative w-full h-[250px]">
      {isLoadIframe ? (
        <>
          <Skeleton className="h-[211px] w-full absolute top-0 -z-50" />
        </>
      ) : null}
      <iframe
        src={src}
        className="w-full h-full"
        loading="lazy"
        allowFullScreen
        onLoad={() => setLoadIframe(false)}
      />
    </div>
  );
};
