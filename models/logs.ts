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
        type: String,// changed from Number to String (as playerId is a string in Player model)
        requied: true,
        Unique: true,
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
