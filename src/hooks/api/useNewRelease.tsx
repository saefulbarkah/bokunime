import { Tcollection } from '@/types/collection';
import { api } from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';

export const useNewRelease = () => {
  const getRes = async () => {
    const response = await api.get('/anime/new-releases');
    const data = await response.data;
    return data as Tcollection;
  };
  return useQuery({
    queryKey: ['newRelease'],
    queryFn: getRes,
  });
};
