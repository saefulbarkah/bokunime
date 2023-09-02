'use client';
import { api } from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';

export const useRec = () => {
  const getRec = async () => {
    const response = await api.get('/anime/recommendation');
    const data = await response.data;
    return data;
  };
  return useQuery({
    queryKey: ['recom'],
    queryFn: getRec,
  });
};
