const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    socialLoginId: {
        type: String,
        default: null
    },
    networkPlatform: {
        type: String,
        default: null
    },
    money: {
        type: Number,
        default: null
    },
    fullName: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    age: {
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
        default: 0
    },
    gameWin: {
        type: Number,
        default: 0
    },
    rank: {
        type: Number,
        default: 0
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

const User = mongoose.model('User', userSchema);

module.exports = User;