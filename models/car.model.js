const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({

    level: {
        type: Number,
    },
    unlocked: {
        type: Boolean,
    },
    price: {
        type: Number,
    },
    theme: {
        type: Boolean,
    },
    setting: {
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

const Car = mongoose.model('Car', carSchema);

module.exports = { Map, carSchema };