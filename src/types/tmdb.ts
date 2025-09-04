export type Genre = { id: number; name: string };
export type Movie = {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  vote_average?: number;
  overview?: string;
};
export type TMDBListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
