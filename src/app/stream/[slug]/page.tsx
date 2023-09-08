import Streaming from '@/features/Streaming/Streaming';
import { episodeType } from '@/types';
import { api } from '@/utils/api/api';
import React from 'react';

async function getEpisode({ slug }: { slug: string }) {
  try {
    const response = await api.get<episodeType>('/anime/episode/' + slug);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

interface T {
  params: { slug: string };
}
export default async function page({ params }: T) {
  const data = await getEpisode({ slug: params.slug });
  return <Streaming data={data!} />;
}
