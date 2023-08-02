const { Car } = require("../models/car.model");
const getCarsByUserId = async (userId) => {
    const data = await Car.find({ userId })
        .populate({
            path: 'buggyCarId',
            select: '-_id level unlocked active uiIndex price',
        });

    let myCars = data.map(item => {
        const { _id, buggyCarId, theme, setting } = item;
        let car = buggyCarId.toObject();
        car = { ...car, id: _id, theme: theme, setting: setting };
        return car;
    });

    return myCars;
}
module.exports = getCarsByUserId;