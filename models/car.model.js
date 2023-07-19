const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({

    level: {
        type: Number,
    },
    unlocked: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: true,
    },
    uiIndex: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        default:0,
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

const Car = mongoose.model('Car', carSchema);

module.exports = { Car, carSchema };