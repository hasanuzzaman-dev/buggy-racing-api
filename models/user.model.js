const mongoose = require('mongoose');
const { profileSchema } = require('./profile.model');
const { carSchema } = require('./car.model');
const { mapSchema } = require('./map.model');
// const { accountSchema } = require('./account.model');
// const { transactionSchema } = require('./transaction.model');


const userSchema = new mongoose.Schema({

    email: {
        type: String,
    },
    password: {
        type: String,
    },
    socialLoginId: {
        type: String
    },
    networkPlatform: {
        type: String
    },
    money: {
        type: Number
    },
    profile: profileSchema,
    cars: [carSchema],
    maps: [mapSchema],

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