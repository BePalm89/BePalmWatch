export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: string[];
  id: number;
  _id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  homepage: string;
}

export interface MovieResponse {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
}
