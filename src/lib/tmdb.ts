import type { MovieDetails } from "@/types/movie-details";

const TMDB_BASE = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

type TMDBError = { status_message?: string; status_code?: number };
export const tmdbImg = (
  path?: string,
  size: "w185" | "w342" | "w500" | "w780" | "w1280" = "w342"
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : null);

async function tmdb<T>(
  endpoint: string,
  params: Record<string, string | number | undefined> = {},
  init?: RequestInit
) {
  if (!API_KEY) {
    throw new Error("TMDB_API_KEY_MISSING");
  }

  const sp = new URLSearchParams({ api_key: API_KEY, language: "pt-BR" });
  Object.entries(params).forEach(([k, v]) => v != null && sp.set(k, String(v)));
  const url = `${TMDB_BASE}${endpoint}?${sp.toString()}`;

  const r = await fetch(url, { cache: "no-store", ...init });

  if (!r.ok) {
    let detail = "";
    try {
      const j = (await r.json()) as TMDBError;
      detail = j?.status_message ? ` - ${j.status_message}` : "";
    } catch {}
    throw new Error(`TMDB_${r.status}${detail}`);
  }

  return (await r.json()) as T;
}

export const getGenres = () =>
  tmdb<{ genres: { id: number; name: string }[] }>("/genre/movie/list");
export const searchMovies = (q: string, page = 1, year?: number) =>
  tmdb("/search/movie", { query: q, page, year });
export const discoverMovies = (opts: {
  page?: number;
  sort_by?: string;
  with_genres?: number;
  primary_release_year?: number;
}) => tmdb("/discover/movie", opts);

export const getMovieDetails = (id: string | number) =>
  tmdb<MovieDetails>(`/movie/${id}`, {
    append_to_response: "videos,images,credits,recommendations",
    include_image_language: "pt,null,en",
  });
