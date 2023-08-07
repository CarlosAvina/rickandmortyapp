import { request, gql } from "graphql-request";

const gql_uri = process.env.NEXT_PUBLIC_GQL_URI;

const GET_EPISODES_BY_IDS = gql`
  query getEpisodes($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      id
      name
      episode
      air_date
    }
  }
`;

const GET_EPISODES = gql`
  query getEpisodes($title: String, $episodeCode: String, $page: Int) {
    episodes (filter: { name: $title, episode: $episodeCode }, page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        episode
        air_date
      }
    }
  }
`

function getEpisodesByIds(ids: number[]) {
  return request(gql_uri, GET_EPISODES_BY_IDS, {
    ids,
  });
}

function getEpisodes(page: number, episodeCode: string) {
  return request(gql_uri, GET_EPISODES, { episodeCode, page })
}

export { getEpisodes, getEpisodesByIds };
