import { useRouter } from "next/router";
import { useQuery } from "react-query";
import getEpisodes from "../../queries/getEpisodes";

import { Card, BackButton, Loader } from "../../components";

const EpisodesList = () => {
  const router = useRouter();

  const ids = router.query.ids;
  const episodesIds = (ids && ids.split(",").map((id) => Number(id))) || [];

  const { data, isLoading, error } = useQuery(
    ["episodes", ...episodesIds],
    () => getEpisodes(episodesIds)
  );

  function goBack() {
    router.back();
  }

  if (isLoading) return <Loader />;

  if (error) return <p>{error}</p>;

  return (
    <main className="p-5 flex flex-col gap-3">
      <BackButton onClick={goBack} />
      {data?.episodesByIds?.map(({ id, name, episode, air_date }) => (
        <Card key={id}>
          <h2 className="text-3xl font-bold">{name}</h2>
          <b>{episode}</b>
          <p>{air_date}</p>
        </Card>
      ))}
    </main>
  );
};

export default EpisodesList;
