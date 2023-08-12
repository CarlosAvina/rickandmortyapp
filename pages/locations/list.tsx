import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { getLocations } from '../../queries'
import { Loader, Navigation, Card } from '../../components';

const List = () => {
  const { data, isLoading, error, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(["locations"], ({ pageParam = 1 }) => getLocations(pageParam, { dimension: "", name: "", type: "" }), {
    getNextPageParam: (lastPage) => lastPage.locations.info.next ?? undefined,
  });
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (error) return <p>Something went wrong</p>;

  return <main className="flex flex-col gap-5 p-4">
    <Navigation />
    {isLoading ? <Loader /> : data.pages.map((page) => <>{page.locations.results.map(({ id, name, type, dimension }) =>
    (<Card key={id}>
      <h1 className="text-3xl font-semibold">
        {id}. {name}
      </h1>
      <p>
        <b>Type:</b> {type}
      </p>
      <p>
        <b>Dimension:</b> {dimension}
      </p>
    </Card>)
    )}</>)}
    <p ref={ref}>{isFetchingNextPage ? "Loading..." : null}</p>
  </main>
}

export default List;
