import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl p-6 text-center">
      <h1 className="text-xl font-semibold">Filme não encontrado</h1>
      <p className="mt-2 text-zinc-400">
        Tente voltar e escolher outro título.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block rounded border border-zinc-800 px-3 py-2 text-sm hover:bg-zinc-800"
      >
        ← Voltar para a home
      </Link>
    </div>
  );
}
