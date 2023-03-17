import { request, gql } from "graphql-request";

const gql_uri = process.env.NEXT_PUBLIC_GQL_URI;

const GET_LOCATIONS = gql`
  query {
    locations {
      results {
        id
      }
    }
  }
`;

function getLocationsIds() {
  return request(gql_uri, GET_LOCATIONS);
}

export default getLocationsIds;
