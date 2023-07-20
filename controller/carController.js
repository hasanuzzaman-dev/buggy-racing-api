const { nextHandledError, addSuccessMessage } = require("../helper/error-handler");
const { validateAddCarSchema } = require("../helper/validation_schema");
const { BuggyCar} = require("../models/buggyCar.model");

module.exports = {
    addCarByAdmin: async (parent, args, context, info) => {

        try {

            const joiResult = await validateAddCarSchema.validateAsync(args.car);

            const car = new BuggyCar({ ...joiResult, createdAt: new Date().toISOString() });

            const savedCar = await car.save();

            return addSuccessMessage("Car added successfully!");
        } catch (error) {
            nextHandledError(error);
        }

    }
}