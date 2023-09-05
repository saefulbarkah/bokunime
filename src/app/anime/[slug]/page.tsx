import { NEXT_PUBLIC_API_URL } from '@/config/siteConfig';
import { Detail } from '@/features/Detail';
import { animeTypes } from '@/types';
import React from 'react';

async function getAnime({
  slug,
}: {
  slug: string;
}): Promise<Partial<animeTypes>> {
  try {
    const response = await fetch(
      NEXT_PUBLIC_API_URL + '/anime/detail/' + slug,
      {
        cache: 'no-store',
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    const e: any = error;
    return e;
  }
}

interface T {
  params: { slug: string };
}

async function page({ params }: T) {
  const { slug } = params;
  const data = await getAnime({ slug });
  return <Detail data={data} />;
}

export default page;
