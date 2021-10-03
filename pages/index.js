import React from "react";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { getCharacters } from "../queries";

import { Character, PaginationButton, Loader } from "../components";
import Arrow from "../components/icons/ChevronLeft";

export default function Home() {
  const [page, setPage] = React.useState(1);

  const { data, isLoading, error } = useQuery(["characters", page], () =>
    getCharacters(page)
  );
  const characters = data?.characters?.results;
  const info = data?.characters?.info;

  const pages = Array.from(Array(info?.pages ?? 0), (_, i) => ++i);
  const pagesToDisplay = pages.slice(page - 1, page + 4);

  function previousPage() {
    if (page - 1 >= 0) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    const lastPage = info?.pages;

    if (page + 1 <= lastPage) {
      setPage(page + 1);
    }
  }

  function goToPage(event) {
    const id = Number(event.currentTarget.id);

    if (id) setPage(id);
  }

  if (isLoading) return <Loader />;

  if (error) return <p>{error}</p>;

  return (
    <section className="grid grid-cols-8 my-16">
      <Head>
        <title>Data fetching</title>
        <meta name="description" content="Data fetching example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-3 gap-4 col-start-2 col-end-8 min-w-max">
        {characters?.map((character) => (
          <Character key={character.id} character={character} />
        ))}
      </main>

      {data && (
        <footer className="flex justify-center col-start-1 col-end-9 gap-2 m-6">
          <PaginationButton onClick={previousPage}>
            <Arrow />
          </PaginationButton>
          {pagesToDisplay.map((item) => (
            <PaginationButton
              key={item}
              id={item}
              selected={item === page}
              onClick={goToPage}
            >
              {item}
            </PaginationButton>
          ))}
          <PaginationButton onClick={nextPage}>
            <Arrow direction="right" />
          </PaginationButton>
        </footer>
      )}
    </section>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("characters", getCharacters);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
