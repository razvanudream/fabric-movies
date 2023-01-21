import React from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

function Slider({ movies }) {
  return (
    <Splide
      options={{
        perPage: 5,
        arrows: false,
        pagination: false,
        drag: "free",
        gap: "0.5rem",
        mediaQuery: "max",
        breakpoints: {
          1100: {
            perPage: 4,
          },
          900: {
            perPage: 3,
          },
          600: {
            perPage: 2,
          },
          450: {
            perPage: 1,
          },
        },
      }}
    >
      {movies.map((movie) => {
        return (
          <SplideSlide key={movie.imdbID}>
            <MovieCard>
              <img src={movie.Poster} alt={movie.Title} />
              <Gradient />
            </MovieCard>
          </SplideSlide>
        );
      })}
    </Splide>
  );
}

const MovieCard = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Slider;
