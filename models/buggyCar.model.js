const mongoose = require('mongoose');

const buggyCarSchema = new mongoose.Schema({

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

const BuggyCar = mongoose.model('BuggyCar', buggyCarSchema);

module.exports = { BuggyCar, buggyCarSchema };