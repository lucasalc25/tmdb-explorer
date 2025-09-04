"use client";
import { useState, useEffect } from "react";
import type { Genre, Movie, TMDBListResponse } from "@/types/tmdb";
import type { SearchState } from "@/types/search"; // <- use o tipo centralizado
import { discoverMovies, searchMovies } from "@/lib/tmdb";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import Tabs from "@/components/Tabs";
import Pagination from "@/components/Pagination";

export default function ExplorerClient({ genres }: { genres: Genre[] }) {
  const [tab, setTab] = useState<"popular" | "now_playing">("popular");

  const [state, setState] = useState<SearchState>({
    q: "",
    genreId: undefined,
    year: undefined,
    sort: "popularity.desc",
  });

  const debounced = useDebouncedValue<SearchState>(state, 400);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ab = new AbortController();
    (async () => {
      setLoading(true);
      setError("");
      try {
        const hasQuery = !!debounced.q.trim();
        if (hasQuery) {
          const j = (await searchMovies(
            debounced.q,
            page,
            debounced.year
          )) as TMDBListResponse<Movie>;
          setMovies(j.results || []);
          setTotalPages(Math.min(j.total_pages || 1, 500));
        } else {
          const opts: any = { page, sort_by: debounced.sort };
          if (debounced.genreId) opts.with_genres = debounced.genreId;
          if (debounced.year) opts.primary_release_year = debounced.year;
          if (tab === "now_playing") {
            const today = new Date().toISOString().slice(0, 10);
            opts["release_date.lte"] = today;
            opts.sort_by = "release_date.desc";
          }
          const j = (await discoverMovies(opts)) as TMDBListResponse<Movie>;
          setMovies(j.results || []);
          setTotalPages(Math.min(j.total_pages || 1, 500));
        }
      } catch (e: any) {
        if (e?.name !== "AbortError")
          setError("Não foi possível buscar agora.");
      } finally {
        setLoading(false);
      }
    })();
    return () => ab.abort();
  }, [debounced, page, tab]);

  const onChange = (patch: Partial<SearchState>) => {
    setPage(1);
    setState((s) => ({ ...s, ...patch }));
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Explorador de Filmes • TMDB
            </h1>
            <p className="text-zinc-400 text-sm md:text-base">
              Busca, filtros por gênero/ano e ordenação.
            </p>
          </div>
          {!state.q && (
            <Tabs
              tab={tab}
              onTab={(t) => {
                setTab(t);
                setPage(1);
              }}
            />
          )}
        </header>

        <SearchBar
          genres={genres}
          state={state}
          onChange={onChange}
          onSubmit={() => setPage(1)}
          onReset={() => {
            setState({
              q: "",
              genreId: undefined,
              year: undefined,
              sort: "popularity.desc",
            });
            setPage(1);
          }}
        />

        <div
          aria-live="polite"
          className="text-sm text-zinc-400 min-h-[1.25rem]"
        >
          {loading
            ? "Carregando…"
            : movies.length
            ? `${movies.length} resultado(s) nesta página`
            : ""}
        </div>

        {error && (
          <div className="rounded-xl border border-red-700 bg-red-900/30 text-red-200 p-3">
            {error}
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((m) => (
            <MovieCard key={m.id} m={m} />
          ))}
        </section>

        {!loading && !movies.length && (
          <div className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center text-zinc-400">
            Nada por aqui. Tente buscar por{" "}
            <span className="text-zinc-200">“matrix”</span> ou ajuste filtros.
          </div>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPage={(p) => setPage(p)}
        />

        <footer className="pt-6 text-xs text-zinc-500">
          Dados por TMDB · Demonstração.
        </footer>
      </div>
    </main>
  );
}
