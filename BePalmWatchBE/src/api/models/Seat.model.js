import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema(
  {
    row: { type: String, required: true },
    seat: { type: String, required: true },
  },
  { timestamps: true, collection: "seats" }
);

const Seat = mongoose.model("seats", SeatSchema, 'seats');

export default Seat;
