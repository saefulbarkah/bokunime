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
  series: string;
  score: number;
  rating: string;
  episodeLists: episodeLists[];
  synopsis: string;
  studio: string;
};
