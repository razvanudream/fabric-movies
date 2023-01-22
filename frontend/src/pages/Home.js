import React from "react";
import MovieCarousel from "../components/MovieCarousel";
import useSearch from "../hooks/useSearch";
import { SUGGESTED_TYPE, TRENDING_TYPE } from "../utils/constants";
import { motion } from "framer-motion";

function Home() {
  const { movies: trending } = useSearch({ searchTerm: "Christmas" });
  const { movies: suggested } = useSearch({ searchTerm: "Woman" });

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MovieCarousel movies={trending} type={TRENDING_TYPE} />
      <MovieCarousel movies={suggested} type={SUGGESTED_TYPE} />
    </motion.div>
  );
}

export default Home;
