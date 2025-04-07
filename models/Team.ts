import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    teamID: {
        type: String,
        required: true,
        unique: true
    },
    teamImage: {
        type: String,
        required: true
    },
    teamBalance: {
        type: Number,
        required: true
    },
    teamRating: {
        type: Number,
        required: true
    },
    numberofPlayers: {
        type: Number,
        required: true
    },
    player_bought: {
        type: Number,
        required: true
    },
    number_foreign: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Team', teamSchema); 