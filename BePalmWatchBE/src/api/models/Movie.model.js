import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    poster_path: { type: String, required: false },
    release_date: { type: String, required: true },
    genres: [{ type: String, required: true }],
    original_language: { type: String, required: true },
    overview: { type: String, required: true },
    vote_average: { type: Number, required: true},
    vote_count: { type: Number, required: true},
    showtime: [{ type: mongoose.Schema.Types.ObjectId, ref: "showtime" }],
  },
  { timestamps: true, collection: "movies" }
);

const Movie = mongoose.model("movies", MovieSchema, "movies");

export default Movie;
