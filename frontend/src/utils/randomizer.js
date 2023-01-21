import {
  KIDS,
  KIDS_TYPE,
  MOVIES,
  MOVIES_TYPE,
  POPULAR,
  POPULAR_TYPE,
  TRENDING,
  TRENDING_TYPE,
  TV_SHOWS,
  TV_SHOWS_TYPE,
} from "./constants";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomTitle(type) {
  switch (type) {
    case MOVIES_TYPE:
      return MOVIES[randomIntFromInterval(0, MOVIES.length - 1)];
    case TV_SHOWS_TYPE:
      return TV_SHOWS[randomIntFromInterval(0, TV_SHOWS.length - 1)];
    case KIDS_TYPE:
      return KIDS[randomIntFromInterval(0, KIDS.length - 1)];
    case TRENDING_TYPE:
      return TRENDING[randomIntFromInterval(0, TRENDING.length - 1)];
    case POPULAR_TYPE:
      return POPULAR[randomIntFromInterval(0, POPULAR.length - 1)];
    default:
      return "Matrix";
  }
}
