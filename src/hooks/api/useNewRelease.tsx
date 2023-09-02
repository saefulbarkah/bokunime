import { api } from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';

export const useNewRelease = () => {
  const getRec = async () => {
    const response = await api.get('/anime/new-releases');
    const data = await response.data;
    return data;
  };
  return useQuery({
    queryKey: ['newRelease'],
    queryFn: getRec,
  });
};
