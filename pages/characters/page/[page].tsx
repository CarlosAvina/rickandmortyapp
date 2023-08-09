import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery, UseQueryResult } from 'react-query';

import { getCharacters } from '../../../queries';

import { Character, PaginationButton, Navigation, Loader } from '../../../components';
import Arrow from '../../../components/icons/ChevronLeft';
import rickandmortylogo from 'public/rickandmortylogo.png';
import Link from 'next/link';

function getPagesLimit(currentRange: number, lastRange: number, defaultLimit: number, page: number, totalPages: number) {
  if (currentRange !== lastRange) return defaultLimit;
  if (lastRange === 1) return totalPages;

  return (page % defaultLimit) || defaultLimit;
}

function getInitialPageButtons(page = 1, totalPages: number) {

  if (!totalPages) return [];

  const defaultLimit = 5;
  const currentRange = Math.ceil(page / defaultLimit);
  const lastRange = Math.ceil(totalPages / defaultLimit);
  const limit = getPagesLimit(currentRange, lastRange, defaultLimit, page, totalPages);

  const pages = [];

  for (let i = 0; i < limit; i++) {
    pages.push((i + 1) + (defaultLimit * (currentRange - 1)));
  }

  return pages;
}

export default function Home({ page = 1, characterName }) {
  const router = useRouter();

  // TODO: fix any
  const { data, isLoading, error }: UseQueryResult<any, Error> = useQuery(
    ['characters', page, characterName],
    () => getCharacters(page, characterName)
  );

  const [pageButtons, setPageButtons] = React.useState([]);

  const characters = data?.characters?.results;
  const info = data?.characters?.info;
  const totalPages = info?.pages;

  React.useEffect(() => {
    setPageButtons(getInitialPageButtons(page, totalPages))
  }, [page, totalPages]);

  function navigateToPage(newPage) {
    router.push(`/characters/page/${newPage}${characterName ? `?characterName=${characterName}` : ''}`, null, { scroll: false });
  }

  function previousPage() {
    const newPage = page - 1;

    if (newPage >= 0) {
      navigateToPage(newPage);
    }
  }

  function nextPage() {
    const lastPage = totalPages;
    const newPage = page + 1;

    if (newPage <= lastPage) {
      navigateToPage(newPage);
    }
  }

  function goToPage(event) {
    const id = Number(event.currentTarget.id);
    if (id) navigateToPage(id);
  }

  function searchCharacter(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const characterName = data.get('character-name');
    router.push(`/characters/page/1?characterName=${characterName}`);
  }

  if (isLoading) return <Loader />;

  if (error) return <p>{error.message}</p>;

  if (!page) return <p>Provide a valid page</p>;

  return (
    <html lang="en">
      <section className="grid grid-cols-8">
        <Head>
          <title>Characters</title>
          <meta name="description" content="Rick and morty character" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navigation page={page} />

        <form className="flex gap-4 justify-end items-center col-start-2 col-end-8 my-4" onSubmit={searchCharacter}>
          <input className="p-2 border-black border-2 rounded-md" name="character-name" type="text" placeholder="Search character" />
          <button className="p-2 bg-green-300 font-bold rounded-md border-2 border-black" type="submit">Search</button>
        </form>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 col-start-2 col-end-8">
          {characters?.map((character) => (
            <Character key={character.id} character={character} />
          ))}
        </main>

        {data && (
          <footer className="flex justify-center col-start-1 col-end-9 gap-2 m-6 sticky bg-white bottom-0 py-4">
            <PaginationButton onClick={previousPage} disabled={page === 1}>
              <Arrow />
            </PaginationButton>
            {pageButtons.map((item) => (
              <PaginationButton
                key={item}
                id={String(item)}
                selected={item === page}
                onClick={goToPage}
              >
                {item}
              </PaginationButton>
            ))}
            <PaginationButton onClick={nextPage} disabled={page === totalPages}>
              <Arrow direction="right" />
            </PaginationButton>
          </footer>
        )}
      </section>
    </html>
  );
}

export async function getServerSideProps(context) {
  const page = Number(context.query.page);
  const characterName = context.query?.characterName || "";

  return {
    props: {
      page,
      characterName,
    },
  };
}
