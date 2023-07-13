const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({

    unlocked: {
        type: Boolean,
    },
    price: {
        type: Number,
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