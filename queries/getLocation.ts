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

const GET_LOCATIONS = gql`
  query getLocations($page: Int, $dimension: String, $name: String, $type: String){
    locations (page: $page, filter: { dimension: $dimension, name: $name, type: $type }) {
      info {
        count
        next
        pages
        prev
      }
      results {
        id
        name
        dimension
        type
      }
    }
  }
`

function getLocation(id) {
  return request(gql_uri, GET_LOCATION, {
    id,
  });
}
type FilterType = {
  dimension: String;
  name: String;
  type: String;
}

function getLocations(page: number, {dimension, name, type}: FilterType) {
  return request(gql_uri, GET_LOCATIONS, {
    page,
    dimension,
    name,
    type,
  })
}

export { getLocation, getLocations };
