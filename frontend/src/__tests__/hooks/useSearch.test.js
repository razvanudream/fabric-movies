import { act, renderHook } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { gql } from "@apollo/client";
import React from "react";
import useSearch from "../../hooks/useSearch";
import { API_ERROR } from "../../utils/constants";

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

const mockQueryDataNotEmpty = {
  request: {
    query: SEARCH_MOVIES,
    variables: { searchTerm: "The Godfather Part II" },
  },
  result: {
    data: {
      search: {
        results: [
          {
            Title: "The Godfather Part II",
            Year: "1974",
            imdbID: "tt0071562",
            Type: "movie",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
          },
          {
            Title: "The Godfather vs. The Godfather Part II",
            Year: "2008",
            imdbID: "tt5942862",
            Type: "movie",
            Poster: "N/A",
          },
        ],
        errors: [],
        __typename: "Search",
      },
    },
  },
};

const mockQueryDataEmptyWithoutErrors = {
  request: {
    query: SEARCH_MOVIES,
    variables: { searchTerm: "Unit Test Without Error" },
  },
  result: {
    data: {
      search: {
        results: [],
        errors: [],
        __typename: "Search",
      },
    },
  },
};

const mockQueryDataEmptyWithErrors = {
  request: {
    query: SEARCH_MOVIES,
    variables: { searchTerm: "Unit Test With Error" },
  },
  result: {
    data: {
      search: {
        results: [],
        errors: [
          {
            type: "Unknown",
            message: API_ERROR,
          },
        ],
        __typename: "Search",
      },
    },
  },
};

function getHookWrapper(mocks = [], searchTerm) {
  const wrapper = ({ children }) => (
    <MockedProvider addTypename={false} mocks={mocks}>
      {children}
    </MockedProvider>
  );

  const { result } = renderHook(() => useSearch({ searchTerm }), {
    wrapper,
  });

  return { result };
}

const waitForData = () => new Promise((res) => setTimeout(res, 0));

test("Should return 2 results", async () => {
  const { result } = getHookWrapper(
    [mockQueryDataNotEmpty],
    "The Godfather Part II"
  );

  await act(async () => {
    await waitForData();
  });

  expect(result.current.movies.length).toBe(2);
  expect(result.current.errorMessage).toBe("");
});

test("Should return 0 results", async () => {
  const { result } = getHookWrapper(
    [mockQueryDataEmptyWithoutErrors],
    "Unit Test Without Error"
  );

  await act(async () => {
    await waitForData();
  });

  expect(result.current.movies.length).toBe(0);
  expect(result.current.errorMessage).toBe("");
});

test("Should return 0 results with error", async () => {
  const { result } = getHookWrapper(
    [mockQueryDataEmptyWithErrors],
    "Unit Test With Error"
  );

  await act(async () => {
    await waitForData();
  });

  expect(result.current.movies.length).toBe(0);
  expect(result.current.errorMessage).toBe(API_ERROR);
});
