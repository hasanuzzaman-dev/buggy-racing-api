const { Car } = require('../models/car.model');
const getAllCarForSignup = async () => {

    const cars = await Car.find(
        { deletedAt: null, active: true }
    ).select({
        _id: 1,
    });

    return cars;
}

module.exports = getAllCarForSignup;