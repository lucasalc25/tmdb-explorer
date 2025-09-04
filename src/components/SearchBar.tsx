"use client";
import { useEffect, useState } from "react";
import type { Genre } from "@/types/tmdb";
import { classNames } from "@/lib/utils";

type SortOption =
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

type SearchBarProps = {
  state: SearchState;
  genres: Genre[];
  onChange: (patch: Partial<SearchState>) => void;
  onSubmit: () => void;
  onReset: () => void;
};

export default function SearchBar({
  state,
  genres,
  onChange,
  onSubmit,
  onReset,
}: SearchBarProps) {
  const [local, setLocal] = useState<SearchState>(state);

  useEffect(() => setLocal(state), [state]);

  const patch = (p: Partial<SearchState>) => {
    const next = { ...local, ...p };
    setLocal(next);
    onChange(next);
  };

  const keyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") onSubmit();
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-xl">
      <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-12">
        {/* Query */}
        <div className="md:col-span-5">
          <label htmlFor="q" className="mb-1 block text-sm text-zinc-300">
            Buscar filme
          </label>
          <input
            id="q"
            value={local.q}
            onChange={(e) => patch({ q: e.target.value })}
            onKeyDown={keyDown}
            placeholder="Ex.: interestelar, matrix, coringa"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Gênero */}
        <div className="md:col-span-3">
          <label htmlFor="genre" className="mb-1 block text-sm text-zinc-300">
            Gênero
          </label>
          <select
            id="genre"
            value={local.genreId ?? ""}
            onChange={(e) =>
              patch({
                genreId: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Todos</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ano */}
        <div className="md:col-span-2">
          <label htmlFor="year" className="mb-1 block text-sm text-zinc-300">
            Ano
          </label>
          <input
            id="year"
            type="number"
            placeholder="2024"
            value={local.year ?? ""}
            onChange={(e) =>
              patch({
                year: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Ordenação */}
        <div className="md:col-span-2">
          <label htmlFor="sort" className="mb-1 block text-sm text-zinc-300">
            Ordenar
          </label>
          <select
            id="sort"
            value={local.sort}
            onChange={(e) => patch({ sort: e.target.value as SortOption })}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="popularity.desc">Popularidade ↓</option>
            <option value="popularity.asc">Popularidade ↑</option>
            <option value="vote_average.desc">Nota ↓</option>
            <option value="vote_average.asc">Nota ↑</option>
            <option value="release_date.desc">Lançamento ↓</option>
            <option value="release_date.asc">Lançamento ↑</option>
          </select>
        </div>

        {/* Ações */}
        <div className="md:col-span-12 flex justify-end gap-2">
          <button
            type="button"
            onClick={onSubmit}
            className={classNames(
              "rounded-xl px-4 py-2 transition shadow-md",
              "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700"
            )}
          >
            Buscar
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl px-4 py-2 transition bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-800"
          >
            Limpar
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs text-zinc-400">
        Dica: <kbd className="rounded bg-zinc-800 px-1 py-0.5">Ctrl</kbd>+
        <kbd className="rounded bg-zinc-800 px-1 py-0.5">Enter</kbd> para
        buscar.
      </p>
    </div>
  );
}
