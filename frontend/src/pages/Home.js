import React from "react";
import MovieListing from "../components/MovieListing";
import useSearch from "../hooks/useSearch";
import { POPULAR_TYPE, TRENDING_TYPE } from "../utils/constants";

function Home() {
  const { movies: trending } = useSearch({ searchTerm: "Christmas" });
  const { movies: popular } = useSearch({ searchTerm: "Woman" });

  return (
    <div>
      <MovieListing movies={trending} type={TRENDING_TYPE} />
      <MovieListing movies={popular} type={POPULAR_TYPE} />
    </div>
  );
}

export default Home;
