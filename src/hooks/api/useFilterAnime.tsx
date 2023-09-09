'use client';
import { Tcollection } from '@/types/collection';
import { api } from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import React from 'react';

export const useFilterAnime = () => {
  const [query, setQuery] = React.useState('');
  const [value] = useDebounce(query, 500);

  const getQueryData = async () => {
    const response = await api.get<Tcollection>('/anime/search/?s=' + value);
    return response.data;
  };

  const reactQuery = useQuery({
    queryKey: ['filter', value],
    queryFn: getQueryData,
  });

  return { setQuery, query, ...reactQuery };
};
