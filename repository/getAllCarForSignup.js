const { Car } = require('../models/car.model');
const getAllCarForSignup = async () => {

    const cars = await Car.find(
        { deletedAt: null, active: true },
    ).select({
        level: 1,
        unlocked: 1,
        price: 1,
        active: 1,
        uiIndex: 1,
        theme: 1,
        setting: 1,
        createdAt: 1,
        deletedAt: 1,
        updatedAt: 1,
    });

    return cars;
}

module.exports = getAllCarForSignup;