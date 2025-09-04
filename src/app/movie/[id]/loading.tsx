export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="h-6 w-40 animate-pulse rounded bg-zinc-800" />
      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="h-80 animate-pulse rounded bg-zinc-800" />
        <div className="col-span-2 space-y-3">
          <div className="h-6 w-2/3 animate-pulse rounded bg-zinc-800" />
          <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
