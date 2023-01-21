import { buildSchema } from "graphql";

const schema = buildSchema(`
  type SearchResult {
    results: [Movie]
    errors: [Error]
  }

  type Movie {
    Title: String!
    Year: String
    imdbID: String!
    Type: String
    Poster: String
  }

  type Error {
    type: String
    message: String
  }

  type Query {
    search(searchTerm: String): SearchResult
  }

  schema {
    query: Query
  }
`);

export default schema;
