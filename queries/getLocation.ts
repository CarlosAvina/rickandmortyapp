import { request, gql } from "graphql-request";

const gql_uri = process.env.NEXT_PUBLIC_GQL_URI;

const GET_LOCATION = gql`
  query getLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
    }
  }
`;

function getLocation(id) {
  return request(gql_uri, GET_LOCATION, {
    id,
  });
}

export default getLocation;
