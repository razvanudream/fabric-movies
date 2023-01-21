import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  Poster: {
    type: String,
  },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
