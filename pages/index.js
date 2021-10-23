import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import { getCharacters } from 'queries';

import { Character, PaginationButton, Loader } from 'components';
import Arrow from 'components/icons/ChevronLeft';
import rickandmortylogo from 'public/rickandmortylogo.png';

function getPageButtons(page, pageButtons, action) {
  const inside = pageButtons.includes(page);

  if (!inside && action === 'subtract') {
    const newPageButtons = pageButtons.map((p) => --p);
    return newPageButtons;
  }

  if (!inside && action === 'add') {
    const newPageButtons = pageButtons.map((p) => ++p);
    return newPageButtons;
  }

  return pageButtons;
}

export default function Home() {
  const [page, setPage] = React.useState(1);
  const [pageButtons, setPageButtons] = React.useState([1, 2, 3, 4, 5]);

  const { data, isLoading, error } = useQuery(['characters', page], () => getCharacters(page));

  const characters = data?.characters?.results;
  const info = data?.characters?.info;
  const totalPages = info?.pages;

  function previousPage() {
    const newPage = page - 1;

    if (newPage >= 0) {
      setPage(newPage);
      setPageButtons(getPageButtons(newPage, pageButtons, 'subtract'));
    }
  }

  function nextPage() {
    const lastPage = totalPages;
    const newPage = page + 1;

    if (newPage <= lastPage) {
      setPage(newPage);
      setPageButtons(getPageButtons(newPage, pageButtons, 'add'));
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

      <header className="col-start-1 col-end-9 flex justify-center p-2">
        <Image src={rickandmortylogo} layout="intrinsic" />
      </header>

      <main className="grid grid-cols-3 gap-4 col-start-2 col-end-8 min-w-max">
        {characters?.map((character) => (
          <Character key={character.id} character={character} />
        ))}
      </main>

      {data && (
        <footer className="flex justify-center col-start-1 col-end-9 gap-2 m-6">
          <PaginationButton onClick={previousPage} disabled={page === 1}>
            <Arrow />
          </PaginationButton>
          {pageButtons.map((item) => (
            <PaginationButton key={item} id={item} selected={item === page} onClick={goToPage}>
              {item}
            </PaginationButton>
          ))}
          <PaginationButton onClick={nextPage} disabled={page === totalPages}>
            <Arrow direction="right" />
          </PaginationButton>
        </footer>
      )}
    </section>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('characters', getCharacters);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
