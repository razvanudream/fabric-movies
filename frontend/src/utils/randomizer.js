import {
  MORPHEUS,
  MORPHEUS_TYPE,
  NEO,
  NEO_TYPE,
  SUGGESTED,
  SPOONBOY,
  SPOONBOY_TYPE,
  TRENDING,
  TRENDING_TYPE,
  SUGGESTED_TYPE,
} from "./constants";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomTitle(type) {
  switch (type) {
    case NEO_TYPE:
      return NEO[randomIntFromInterval(0, NEO.length - 1)];
    case MORPHEUS_TYPE:
      return MORPHEUS[randomIntFromInterval(0, MORPHEUS.length - 1)];
    case SPOONBOY_TYPE:
      return SPOONBOY[randomIntFromInterval(0, SPOONBOY.length - 1)];
    case TRENDING_TYPE:
      return TRENDING[randomIntFromInterval(0, TRENDING.length - 1)];
    case SUGGESTED_TYPE:
      return SUGGESTED_TYPE[randomIntFromInterval(0, SUGGESTED.length - 1)];
    default:
      return "Matrix";
  }
}
