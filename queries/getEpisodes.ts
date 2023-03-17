import { request, gql } from "graphql-request";

const gql_uri = process.env.NEXT_PUBLIC_GQL_URI;

const GET_EPISODES = gql`
  query getEpisodes($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      id
      name
      episode
      air_date
    }
  }
`;

function getEpisodes(ids) {
  return request(gql_uri, GET_EPISODES, {
    ids,
  });
}

export default getEpisodes;
