const { nextHandledError, addSuccessMessage } = require("../helper/error-handler");
const { validateBuggyMapSchema } = require("../helper/validation_schema");
const { BuggyMap } = require("../models/buggyMap.model");
const { GraphQLError } = require("graphql");

module.exports = {
    addMapByAdmin: async (parent, args, context, info) => {

        try {
            const joiResult = await validateBuggyMapSchema.validateAsync(args.map);
            const map = new BuggyMap({ ...joiResult, createdAt: new Date().toISOString() });
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