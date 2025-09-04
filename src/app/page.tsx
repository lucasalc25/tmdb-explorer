import { getGenres } from "@/lib/tmdb";
import ExplorerClient from "./ExplorerClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorer de Filmes",
  description:
    "Busque filmes, filtre por gênero/ano e ordene por popularidade, nota ou lançamento. Dados do TMDB.",
};

export default async function Page() {
  let genres: { id: number; name: string }[] = [];
  let serverError = "";

  try {
    const res = await getGenres();
    genres = res.genres ?? [];
  } catch (e: unknown) {
    serverError =
      e instanceof Error ? e.message : "Falha ao carregar dados do TMDB.";
  }

  return (
    <>
      {serverError && (
        <div className="mx-auto max-w-5xl px-6 pt-4">
          <div className="rounded-lg border border-yellow-700 bg-yellow-900/30 p-3 text-sm text-yellow-200">
            {serverError.includes("TMDB_API_KEY_MISSING")
              ? "Variável NEXT_PUBLIC_TMDB_API_KEY ausente no servidor. Configure-a na Vercel e faça novo deploy."
              : `Não foi possível carregar gêneros agora (${serverError}). A busca ainda pode funcionar.`}
          </div>
        </div>
      )}

      <ExplorerClient genres={genres} />
    </>
  );
}
