export type SortOption =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "release_date.desc"
  | "release_date.asc";

export type SearchState = {
  q: string;
  genreId?: number;
  year?: number;
  sort: SortOption;
};
