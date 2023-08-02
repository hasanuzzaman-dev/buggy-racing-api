const mongoose = require('mongoose');
const playedGameSchema = new mongoose.Schema({
    position: {
        type: number,
        default: 0,
    },
    trophy: {
        type: Number,
        default: 0,
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString(),
    },
    updatedAt: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

const PlayedGame = mongoose.model("PlayedGame", playedGameSchema);
module.exports = { PlayedGame, playedGameSchema };