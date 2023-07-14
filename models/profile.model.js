const mongoose = require('mongoose');
// const { categorySchema, Category } = require('./category.model');
// const { accountSchema } = require('./account.model');
// const { transactionSchema } = require('./transaction.model');


const profileSchema = new mongoose.Schema({

    fullName: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    age:{
        type: Number,
        default: null

    },
    avatar: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    flag: {
        type: String,
        default: null
    },
    totalPlayedGame: {
        type: Number,
        default: null
    },
    gameWin: {
        type: Number,
        default: null
    },
    rank: {
        type: Number,
        default: null
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

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile, profileSchema };