import { animeTypes } from '.';

export type scheduleTypes = {
  day: string;
  data: Partial<animeTypes & { timer: string; ongoingEpisode: number }>[];
};
