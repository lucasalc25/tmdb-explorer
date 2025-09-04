import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMovieDetails, tmdbImg } from "@/lib/tmdb";

type Params = { params: { id: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const movie = await getMovieDetails(params.id).catch(() => null);
  if (!movie) return { title: "Filme não encontrado | TMDB Explorer" };
  return {
    title: `${movie.title} (${
      movie.release_date?.slice(0, 4) ?? "—"
    }) | TMDB Explorer`,
    description: movie.overview?.slice(0, 150),
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: tmdbImg(movie.backdrop_path, "w500") ?? undefined,
    },
  };
}

export default async function MoviePage({ params }: Params) {
  const movie = await getMovieDetails(params.id).catch(() => null);
  if (!movie) notFound();

  const poster = tmdbImg(movie.poster_path, "w500");
  const backdrop = tmdbImg(movie.backdrop_path, "w1280");
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "—";

  return (
    <main className="min-h-screen">
      <section className="flex flex-col justify-end relative isolate min-h-[30vh]">
        {backdrop && (
          <>
            <div className="absolute inset-0 -z-10">
              <Image
                src={backdrop}
                alt=""
                fill
                className="object-cover opacity-30"
                priority={false}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-zinc-950" />
          </>
        )}

        <div className="mx-[23.5%] max-w-5xl p-6">
          <Link
            href="/"
            className="inline-block text-sm text-zinc-300 hover:text-zinc-100"
          >
            ← Voltar
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 pb-10">
        <section className="flex flex-col gap-6 sm:flex-row">
          <div className="w-40 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            {poster ? (
              <Image
                src={poster}
                alt={`Pôster de ${movie.title}`}
                width={342}
                height={513}
                className="h-auto w-full"
              />
            ) : (
              <div className="grid h-[513px] w-[342px] place-items-center text-xs text-zinc-500">
                sem pôster
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {movie.title} <span className="text-zinc-400">({year})</span>
            </h1>
            {movie.tagline && (
              <p className="mt-1 italic text-zinc-400">“{movie.tagline}”</p>
            )}
            <p className="mt-3 text-sm text-zinc-300">
              {movie.overview || "Sem sinopse em português."}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-300">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="rounded-full border border-zinc-700 px-2 py-1"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
              <div>
                <dt className="text-zinc-400">Duração</dt>
                <dd>{movie.runtime ? `${movie.runtime} min` : "—"}</dd>
              </div>
              <div>
                <dt className="text-zinc-400">Nota TMDB</dt>
                <dd>⭐ {movie.vote_average?.toFixed?.(1) ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-zinc-400">Lançamento</dt>
                <dd>{movie.release_date ?? "—"}</dd>
              </div>
            </dl>

            {movie.production_companies?.length ? (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-zinc-200">
                  Produtoras
                </h2>
                <ul className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
                  {movie.production_companies.map((c) => (
                    <li
                      key={c.id}
                      className="rounded border border-zinc-800 px-2 py-1"
                    >
                      {c.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
