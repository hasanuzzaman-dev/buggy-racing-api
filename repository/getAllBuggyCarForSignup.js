const { BuggyCar } = require('../models/buggyCar.model');
const getAllBuggyCarForSignup = async () => {

    const cars = await BuggyCar.find(
        { deletedAt: null, active: true }
    ).select({
        _id: 1,
    });

    return cars;
}

module.exports = getAllBuggyCarForSignup;