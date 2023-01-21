import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  imdbID: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
  },
  Image: {
    type: Schema.Types.ObjectId,
    ref: "Image",
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
