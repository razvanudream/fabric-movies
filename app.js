import express from "express";
import parser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";

import graphQLSchema from "./graphql/schema/index.js";
import rootResolvers from "./graphql/resolvers/index.js";

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
