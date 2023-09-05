import { Detail } from '@/features/Detail';
import { animeTypes } from '@/types';
import { api } from '@/utils/api/api';
import React from 'react';

async function getAnime({
  slug,
}: {
  slug: string;
}): Promise<Partial<animeTypes>> {
  try {
    const response = await api.get('/anime/detail/' + slug);
    const data = await response.data;
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
