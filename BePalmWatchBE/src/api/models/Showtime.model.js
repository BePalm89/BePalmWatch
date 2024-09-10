import mongoose from "mongoose";

const ShowtimeSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    tickets: [{ type: mongoose.Types.ObjectId, required: true, ref: "seats" }],
  },
  { timestamps: true, collection: "showtime" }
);

const Showtime = mongoose.model("showtime", ShowtimeSchema, "showtime");

export default Showtime;