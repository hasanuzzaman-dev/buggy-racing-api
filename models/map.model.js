const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({

    unlocked: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        default: 0,
    },
    active: {
        type: Boolean,
        default: true,
    },
    uiIndex: {
        type: Number,
        default: 1,
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