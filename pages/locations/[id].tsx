import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { Card, BackButton, Loader } from '../../components';
import { getLocation } from '../../queries';

const Location = () => {
  const router = useRouter();
  // TODO: Fix any
  const { data, isLoading, error } = useQuery<any, Error>(['location', router.query.id], () =>
    getLocation(router.query.id)
  );

  const { id, name, type, dimension } = data?.location || {};

  function goBack() {
    router.back();
  }

  if (isLoading) return <Loader />;

  if (error) return <p>{error.message}</p>;

  return (
    <main className="flex flex-col gap-4 p-5">
      <BackButton onClick={goBack} />
      <Card>
        <h1 className="text-3xl font-semibold">
          {id}. {name}
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

export default Location;
