import Link from "next/link";
import Image from "next/image";
import type { Movie } from "@/types/tmdb";
import { tmdbImg } from "@/lib/tmdb";

type MovieCardProps = { m: Movie };

export default function MovieCard({ m }: MovieCardProps) {
  const poster = tmdbImg(m.poster_path, "w342");
  const year = m.release_date ? new Date(m.release_date).getFullYear() : "—";

  return (
    <Link href={`/movie/${m.id}`} className="block">
      <article className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3 transition hover:border-zinc-700">
        <div className="flex gap-3">
          <div className="h-30 w-20 flex-none overflow-hidden rounded-md bg-zinc-800">
            {poster ? (
              <Image
                src={poster}
                alt={`Pôster de ${m.title}`}
                width={228}
                height={342}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-20 place-items-center text-xs text-zinc-500">
                sem pôster
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold" title={m.title}>
              {m.title}
            </h3>
            <p className="text-xs text-zinc-400">
              {year} · ⭐ {m.vote_average?.toFixed?.(1) ?? "—"}
            </p>
            {m.overview && (
              <p className="mt-1 line-clamp-3 text-xs text-zinc-500">
                {m.overview}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
