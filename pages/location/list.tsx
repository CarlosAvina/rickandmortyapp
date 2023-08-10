import { useQuery } from 'react-query';
import { getLocations } from '../../queries'
import { Loader, Navigation, Card } from '../../components';

const List = () => {
  const { data, isLoading, error } = useQuery(["locations"], () => getLocations(1, { dimension: "", name: "", type: ""}));

  if (isLoading) return <Loader />;
  if (error) return <p>Something went wrong</p>;

  const locations = data.locations.results;

  return <main className="flex flex-col gap-5 p-4">
    <Navigation />
    {locations.map(({id, name, type, dimension}) => 
      (<Card>
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
    )};
  </main>
}

export default List;
