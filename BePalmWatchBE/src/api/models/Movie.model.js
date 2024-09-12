import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema(
  {
    row: { type: String, required: true },
    seat: { type: String, required: true },
  },
  { timestamps: true, collection: "seats" }
);

const ShowtimeTimeSchema = new mongoose.Schema({
  time: { type: String, required: true },
  tickets: [SeatSchema],
})

const ShowtimeSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    times: [ShowtimeTimeSchema],
  },
  { timestamps: true, collection: "showtime" }
);


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
    showtime: [ShowtimeSchema],
  },
  { timestamps: true, collection: "movies" }
);

const Movie = mongoose.model("movies", MovieSchema, "movies");

export default Movie;
