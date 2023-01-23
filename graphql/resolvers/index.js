import cachios from "cachios";
import Image from "../../models/image.js";
import Movie from "../../models/movie.js";
import { formatError } from "../../utils/formatError.js";
import LRU from "lru-cache";

const CACHE_TTL_IN_SECONDS = 6 * 60 * 60; // 6 hours

cachios.cache = new LRU({
  ttl: CACHE_TTL_IN_SECONDS,
  max: 10000,
});

const rootResolvers = {
  search: async ({ searchTerm }) => {
    try {
      /**
       * Think about using cachios with a TTL of 1 day?
       * Movies don't change data often and by doing this we avoid
       * using up too many requests should this API have a limit
       */
      const response = await cachios.get(
        `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${
          process.env.OMDBAPI_KEY
        }`
      );

      const movies = {
        results: response?.data?.Search,
        errors: [],
      };

      /**
       * Since there are only 10 records per page for omdbapi
       * which cannot be changed, this won't impact loading times,
       * however, a queue system (e.g. AWS SQS) would be ideal here
       * to delegate this task to and return results faster to FE.
       */
      movies.results.forEach(async (movie) => {
        try {
          const posterRecord = new Image({
            Poster: movie.Poster,
          });

          const movieRecord = new Movie({
            Title: movie.Title,
            Year: movie.Year,
            imdbID: movie.imdbID,
            Type: movie.Type,
            Image: posterRecord,
          });

          await movieRecord.save();
          await posterRecord.save();
        } catch (err) {
          /**
           * It's most likely a duplicate key due to unique index
           * on movie collection which is why we save the movie first
           * then the poster for it
           */
        }
      });

      return movies;
    } catch (err) {
      return {
        results: [],
        errors: formatError(err),
      };
    }
  },
};

export default rootResolvers;
