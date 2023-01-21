import React from "react";
import MovieCarousel from "../components/MovieCarousel";
import useSearch from "../hooks/useSearch";
import { POPULAR_TYPE, TRENDING_TYPE } from "../utils/constants";

function Home() {
  const { movies: trending } = useSearch({ searchTerm: "Christmas" });
  const { movies: popular } = useSearch({ searchTerm: "Woman" });

  return (
    <div>
      <MovieCarousel movies={trending} type={TRENDING_TYPE} />
      <MovieCarousel movies={popular} type={POPULAR_TYPE} />
    </div>
  );
}

export default Home;
