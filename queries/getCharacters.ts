import { request, gql } from "graphql-request";

const gql_uri = process.env.NEXT_PUBLIC_GQL_URI;

const GET_CHARACTERS = gql`
  query getCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
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

function getCharacters(page: number, characterName: string) {
  return request(gql_uri, GET_CHARACTERS, {
    page: Number(page),
    name: characterName,
  });
}

export default getCharacters;
