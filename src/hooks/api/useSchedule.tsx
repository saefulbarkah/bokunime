'use client';
import { scheduleTypes } from '@/types';
import { api } from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';

export const useSchedule = () => {
  const getData = async () => {
    const response = await api.get('/anime/release-schedule');
    const data: scheduleTypes[] = await response.data;
    return data;
  };

  return useQuery({ queryKey: ['releaseSchedule'], queryFn: getData });
};
