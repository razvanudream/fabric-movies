import express from "express";
import parser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import Arena from "bull-arena";
import { createBullBoard } from "@bull-board/api";
import { ExpressAdapter, BullMQAdapter } from "@bull-board/express";
import Image from "./models/image.js";
import Movie from "./models/movie.js";
import graphQLSchema from "./graphql/schema/index.js";
import rootResolvers from "./graphql/resolvers/index.js";
import { Queue, Worker } from "bullmq";

const app = express();

app.use(parser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(
  "/api",
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: rootResolvers,
    graphiql: true,
  })
);

const redisOptions = { port: 6379, host: "127.0.0.1" };

const queues = {
  movieQueue: new Queue("movie_queue", {
    connection: redisOptions,
  }),
};

const schedulers = new Worker(queues.movieQueue.name, async (job) => {
  const movie = job.data;

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

const arena = Arena(
  {
    BullMQ: Queue,
    queues: [
      {
        type: "bullmq",
        name: queues.movieQueue.name,
        hostId: "worker",
        redis: redisOptions,
      },
    ],
  },
  { disableListen: true }
);

app.use("/arena", arena);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  console.log(`Bull arena is available at: http://localhost:${PORT}/arena`);
});

const serverAdapter = new ExpressAdapter();

createBullBoard({
  queues: [new BullMQAdapter(queues.movieQueue)],
  serverAdapter: serverAdapter,
});

serverAdapter.setBasePath("/bull-board");

app.use("/bull-board", serverAdapter.getRouter());

mongoose.set("strictQuery", false);

/**
 * Instead of using env variables a better approach here
 * for a production ready app would be AWS Secrets Manager
 * and S3 with IAM role setup to give access to your app
 * and only to a certain folder where your credentials are
 * stored
 */

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@fabric.avfqbqt.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
