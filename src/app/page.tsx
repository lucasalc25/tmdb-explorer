import { getGenres } from "@/lib/tmdb";
import ExplorerClient from "./ExplorerClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorer de Filmes",
  description:
    "Busque filmes, filtre por gênero/ano e ordene por popularidade, nota ou lançamento. Dados do TMDB.",
};

export default async function Page() {
  const { genres } = await getGenres();
  return <ExplorerClient genres={genres} />;
}
