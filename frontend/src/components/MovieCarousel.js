import React from "react";
import styled from "styled-components";
import Slider from "./Slider";

function MovieCarousel({ movies, type }) {
  return (
    <MovieWrapper>
      <h2>{type}</h2>
      <Slider movies={movies} />
    </MovieWrapper>
  );
}

const MovieWrapper = styled.div`
  margin: 4rem 0rem;
`;

export default MovieCarousel;
