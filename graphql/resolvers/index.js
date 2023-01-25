import cachios from "cachios";
import { formatError } from "../../utils/formatError.js";
import LRU from "lru-cache";
import Bull from "bull";

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

      const queue = new Bull("movie_queue", {
        redis: process.env.REDIS_URL,
      });

      const movies = {
        results: response?.data?.Search,
        errors: [],
      };

      movies.results.forEach(async (movie) => {
        await queue.add(movie, {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 5000,
          },
        });
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
