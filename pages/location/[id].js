import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { Card, BackButton } from 'components';

import { getLocation, getLocationsIds } from 'queries';

const Location = (props) => {
  const router = useRouter();

  const { data, isLoading, error } = useQuery(
    ['location', router.query.id],
    () => getLocation(router.query.id),
    { initialData: props.location }
  );

  const { id, name, type, dimension } = data?.location || {};

  function goBack() {
    router.back();
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="flex flex-col gap-4 p-5">
      <BackButton onClick={goBack} />
      <Card>
        <h1 className="text-3xl font-semibold">
          {id}.{name}
        </h1>
        <p>
          <b>Type:</b> {type}
        </p>
        <p>
          <b>Dimension:</b> {dimension}
        </p>
      </Card>
    </main>
  );
};

export async function getStaticProps({ params }) {
  const location = await getLocation(params.id);

  return {
    props: {
      location,
    },
  };
}

export async function getStaticPaths() {
  const response = await getLocationsIds();
  const paths = response.locations.results.map(({ id }) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default Location;
