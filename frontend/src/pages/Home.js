import React from "react";
import MovieCarousel from "../components/MovieCarousel";
import useSearch from "../hooks/useSearch";
import { POPULAR_TYPE, TRENDING_TYPE } from "../utils/constants";
import { motion } from "framer-motion";

function Home() {
  const { movies: trending } = useSearch({ searchTerm: "Christmas" });
  const { movies: popular } = useSearch({ searchTerm: "Woman" });

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MovieCarousel movies={trending} type={TRENDING_TYPE} />
      <MovieCarousel movies={popular} type={POPULAR_TYPE} />
    </motion.div>
  );
}

export default Home;
