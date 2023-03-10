import React from "react";
import useSearch from "../hooks/useSearch";
import { randomTitle } from "../utils/randomizer";
import styled from "styled-components";
import { motion } from "framer-motion";

function SummaryList({ type, searchTerm }) {
  const { movies } = useSearch({ searchTerm: searchTerm ?? randomTitle(type) });
  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {movies.map((movie) => {
        return (
          <Card key={movie.imdbID}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : `${process.env.PUBLIC_URL}/assets/not_found.png`
              }
              alt={movie.Title}
            />
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 1rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    object-fit: cover;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default SummaryList;
