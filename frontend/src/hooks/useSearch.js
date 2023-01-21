import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { API_ERROR } from "../utils/constants";

const SEARCH_MOVIES = gql`
  query search($searchTerm: String) {
    search(searchTerm: $searchTerm) {
      results {
        Title
        Year
        Type
        imdbID
        Poster
      }
      errors {
        type
        message
      }
    }
  }
`;

function useSearch({ searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, error, data } = useQuery(SEARCH_MOVIES, {
    variables: {
      searchTerm,
    },
  });

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error || data?.search?.errors?.length) {
      setErrorMessage(data?.search?.errors[0].message ?? API_ERROR);

      return;
    }

    setMovies(data.search.results);
  }, [data, loading, error]);

  return {
    movies,
    errorMessage,
  };
}

export default useSearch;
