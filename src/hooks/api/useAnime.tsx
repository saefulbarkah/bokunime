'use client';
import { animeTypes } from '@/types';
import { api } from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';

export const useAnime = ({ slug }: { slug: string }) => {
  const getAnime = async () => {
    const response = await api.get<Partial<animeTypes>>(
      '/anime/detail/' + slug
    );
    return response.data;
  };
  return useQuery({ queryKey: ['anime'], queryFn: getAnime });
};
