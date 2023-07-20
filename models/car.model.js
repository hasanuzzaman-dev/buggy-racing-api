const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    buggyCarId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BuggyCar'
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