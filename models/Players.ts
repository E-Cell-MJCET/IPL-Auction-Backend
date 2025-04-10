import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
  },
  playerId: {
    type: String,
    // required: true,
    // Unique: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  boughtAt: {
    type: Number,
  },
  isSold: {
    type: Boolean,
    required: false,
  },
  role: {
    type: String,
    // required : true,
  },
  nationality: {
    type: String,
    required: true,
  },
  basePrice: {
    type: String,
    required: true,
  },
  pocket: {
    type: String,
    required: true,
  },
});

export default mongoose.model("player", playerSchema);
