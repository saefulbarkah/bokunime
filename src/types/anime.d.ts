export type episodeLists = {
  title: string;
  slug: string;
  episode: number;
  releaseDate: string;
};

export type animeTypes = {
  title: string;
  slug: string;
  thumbnail: string;
  releaseDate: string;
  type: string;
  genres: string[];
  episode: number | string;
  status: string;
  score: number;
  rating: number;
  episodeLists: episodeLists[];
  synopsis: string;
  studio: string;
};

export type downloadLists = {
  downloads: {
    format: string;
    data: {
      resolution: string;
      servers: {
        serverName: string;
        link: string;
      }[];
    }[];
  }[];
};

export type recSeriesT = Pick<
  animeTypes,
  'title' | 'thumbnail' | 'slug' | 'type' | 'status'
>[];

export type episodeType = Pick<
  animeTypes,
  'genres' | 'releaseDate' | 'rating' | 'type'
> &
  downloadLists & {
    titleEpisode: string;
    season: string;
    releaseYear: string;
    streamURL: string;
    recommendationSeries: recSeriesT;
    series: {
      name: string;
      slug: string;
    };
    duration: string | number;
  };
