const mongoose = require('mongoose');
// const { categorySchema, Category } = require('./category.model');
// const { accountSchema } = require('./account.model');
// const { transactionSchema } = require('./transaction.model');


const profileSchema = new mongoose.Schema({

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