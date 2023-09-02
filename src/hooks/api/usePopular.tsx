import { api } from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';

export const usePopular = () => {
  const getRec = async () => {
    const response = await api.get('/anime/popular');
    const data = await response.data;
    return data;
  };
  return useQuery({
    queryKey: ['popular'],
    queryFn: getRec,
  });
};
