import { animeTypes } from '.';

export type Tcollection = {
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  collection: Partial<animeTypes>[];
};
