const mongoose = require('mongoose');
// const { categorySchema, Category } = require('./category.model');
// const { accountSchema } = require('./account.model');
// const { transactionSchema } = require('./transaction.model');


const profileSchema = new mongoose.Schema({

    fullName: {
        type: String,
    },
    gender: {
        type: String,
    },
    age:{
        type: Number
    },
    avatar: {
        type: String,
    },
    country: {
        type: String,
    },
    flag: {
        type: String,
    },
    totalPlayedGame: {
        type: Number,
    },
    gameWin: {
        type: Number,
    },
    rank: {
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

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { Profile, profileSchema };