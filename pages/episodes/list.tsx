import React from 'react';
import { getEpisodes } from "../../queries"
import { useQuery, UseQueryResult } from "react-query"
import { Loader, Card } from "../../components"

export default function List() {
  const [season, setSeason] = React.useState("S01");
  const { data, isLoading, error }: UseQueryResult<any, Error> = useQuery(["episodes", season], () => getEpisodes(1, season));

  function selectSeason(event) {
    const value = event.currentTarget.value;
    setSeason(value);
  }

  if (isLoading) return <Loader />
  if (error) return <p>{error.message}</p>

  return <div className='flex gap-3 flex-col p-5'>
    <select className="w-52 self-end p-3 font-bold border-2 border-black rounded-md" onChange={selectSeason} value={season}>
      <option value="S01">Season 1</option>
      <option value="S02">Season 2</option>
      <option value="S03">Season 3</option>
      <option value="S04">Season 4</option>
      <option value="S05">Season 5</option>
    </select>
    {data.episodes.results.map(({ id, episode, air_date, name }) =>
      <Card key={id}>
        <h2 className="text-3xl font-bold">{name}</h2>
        <b>{episode}</b>
        <p>{air_date}</p>
      </Card>
    )}
  </div>
}
