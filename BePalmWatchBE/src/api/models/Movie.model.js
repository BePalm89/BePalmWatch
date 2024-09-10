import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    showtime: [{ type: mongoose.Schema.Types.ObjectId, ref: "showtime" }],
  },
  { timestamps: true, collection: "movies" }
);

const Movie = mongoose.model("movies", MovieSchema, "movies");

export default Movie;
