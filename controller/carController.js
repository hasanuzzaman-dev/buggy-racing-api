const { nextHandledError, addSuccessMessage } = require("../helper/error-handler");
const { validateAddCarSchema } = require("../helper/validation_schema");
const { Car } = require("../models/car.model");

module.exports = {
    addCarByAdmin: async (parent, args, context, info) => {

        try {

            const joiResult = await validateAddCarSchema.validateAsync(args.car);

            const car = new Car({ ...joiResult, createdAt: new Date().toISOString() });

            const savedCar = await car.save();

            return addSuccessMessage("Car added successfully!");
        } catch (error) {
            nextHandledError(error);
        }

    }
}