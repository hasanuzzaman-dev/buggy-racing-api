const { nextHandledError, addSuccessMessage } = require("../helper/error-handler");
const { validateAddMapSchema } = require("../helper/validation_schema");
const { Map } = require("../models/map.model");
const { GraphQLError } = require("graphql");

module.exports = {
    addMapByAdmin: async (parent, args, context, info) => {

        try {
            const joiResult = await validateAddMapSchema.validateAsync(args.map);
            const map = new Map({ ...joiResult, createdAt: new Date().toISOString() });
            const savedMap = await map.save();

            if (savedMap) {
                return addSuccessMessage("Map added successfully!");
            } else {
                throw new GraphQLError("INTERNAL_SERVER_ERROR");
            }

        } catch (error) {
            nextHandledError(error);
        }

    }
}