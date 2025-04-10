import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
  timeStamp: {
    type: Date,
    required: true,
  },
  soldTo: {
    type: String,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Player",
  },
  price: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: Number,
    required: true,
    Unique: true,
  },
});

export default mongoose.model("Logs",logsSchema);
