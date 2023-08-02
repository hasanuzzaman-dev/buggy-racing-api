const mongoose = require('mongoose');
const User = require('../models/user.model');
const createError = require('http-errors');
const { verifyAccessToken } = require('../helper/jwt_helper');
const { nextHandledError, updateSuccessMessage } = require('../helper/error-handler');
const { validateUpdateProfileSchema } = require('../helper/validation_schema');
const { Car } = require("../models/car.model");
const getUserById = require("../repository/getUserById");
const getCarsByUserId = require('../repository/getCarsByUserId');
const getMapsByUserId = require("../repository/getMapsByUserId");
module.exports = {

    getUserInfo: async (parent, args, context, info) => {
        // Extract the token from the request context
        const { token } = context;

        const userId = await verifyAccessToken(token);
        //console.log({ userId });

        try {

            let user = await getUserById(userId);
            const cars = await getCarsByUserId(userId);
            const maps = await getMapsByUserId(userId);

            user = user.toObject();
            user.cars = cars;
            user.maps = maps;

            console.log(user)

            return user;

        } catch (err) {
            console.log(err);
        }

    },

    updateProfile: async (parent, { profile }, context, info) => {
        // Extract the token from the request context
        const { token } = context;

        const userId = await verifyAccessToken(token);
        //console.log({ profile });

        const joiResult = await validateUpdateProfileSchema.validateAsync(profile);
        const { fullName, email, gender, age, country, avatar } = profile;

        const updateProfile = {};
        updateProfile.fullName = (fullName !== undefined) ? fullName : joiResult.fullName;
        updateProfile.email = (email !== undefined) ? email : joiResult.email;
        updateProfile.gender = (gender !== undefined) ? gender : joiResult.gender;
        updateProfile.age = (age !== undefined) ? age : joiResult.age;
        updateProfile.country = (country !== undefined) ? country : joiResult.country;
        updateProfile.avatar = (avatar !== undefined) ? avatar : joiResult.avatar;
        updateProfile.updatedAt = new Date().toISOString();


        try {
            const user = await User.findOneAndUpdate(
                { _id: userId, deletedAt: null },
                updateProfile,
                { new: true }
            );

            if (!user) {
                throw nextHandledError(createError.NotFound());
            }
            //console.log(user);

            return updateSuccessMessage("Profile updated successfully!");

        } catch (err) {
            throw nextHandledError(err);
        }


    },

}
