export type MovieDetails = {
  id: number;
  title: string;
  original_title?: string;
  tagline?: string;
  overview?: string;
  release_date?: string;
  runtime?: number;
  vote_average?: number;
  genres?: { id: number; name: string }[];
  poster_path?: string;
  backdrop_path?: string;
  spoken_languages?: {
    iso_639_1: string;
    name?: string;
    english_name?: string;
  }[];
  production_countries?: { iso_3166_1: string; name: string }[];
  production_companies?: { id: number; name: string; logo_path?: string }[];
};
