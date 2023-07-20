const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    buggyMapId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BuggyMap'
    },
    theme: {
        type: String,
        default: "{}",
    },
    setting: {
        type: String,
        default: "{}",
    },

    createdAt: {
        type: Date,
        default: new Date().toISOString()
    },
    updatedAt: {
        type: Date,
        default: null

    },
    deletedAt: {
        type: Date,
        default: null
    },
})

const Map = mongoose.model('Map', mapSchema);

module.exports = { Map, mapSchema };