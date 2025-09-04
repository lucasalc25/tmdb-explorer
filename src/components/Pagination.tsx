import { classNames } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPage,
}: PaginationProps) {
  if (!totalPages || totalPages <= 1) return null;
  const canPrev = page > 1;
  const canNext = page < totalPages;
  return (
    <div className="flex items-center justify-between gap-2 text-sm mt-4">
      <button
        disabled={!canPrev}
        onClick={() => canPrev && onPage(page - 1)}
        className={classNames(
          "rounded-xl px-3 py-2 border",
          canPrev
            ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
            : "bg-zinc-900 border-zinc-800 text-zinc-500 cursor-not-allowed"
        )}
      >
        Anterior
      </button>
      <div className="text-zinc-400">
        Página <span className="text-zinc-200">{page}</span> de{" "}
        <span className="text-zinc-200">{totalPages}</span>
      </div>
      <button
        disabled={!canNext}
        onClick={() => canNext && onPage(page + 1)}
        className={classNames(
          "rounded-xl px-3 py-2 border",
          canNext
            ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
            : "bg-zinc-900 border-zinc-800 text-zinc-500 cursor-not-allowed"
        )}
      >
        Próxima
      </button>
    </div>
  );
}
