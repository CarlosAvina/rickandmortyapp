import { request, gql } from "graphql-request";

const gql_uri = process.env.NEXT_PUBLIC_GQL_URI;

const GET_CHARACTERS = gql`
  query getCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        prev
        next
      }
      results {
        id
        name
        status
        image
        origin {
          id
          name
        }
        location {
          id
        }
        episode {
          id
        }
      }
    }
  }
`;

function getCharacters(page) {
  return request(gql_uri, GET_CHARACTERS, {
    page: Number(page),
  });
}

export default getCharacters;
