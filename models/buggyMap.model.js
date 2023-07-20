const mongoose = require('mongoose');

const buggyMapSchema = new mongoose.Schema({

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

const BuggyMap = mongoose.model('BuggyMap', buggyMapSchema);

module.exports = { BuggyMap, buggyMapSchema };