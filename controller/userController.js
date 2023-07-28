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

        // try {
        //     const user = await User.findOne(
        //         { _id: userId, deletedAt: null },
        //     );
        //     if (!user) {
        //         throw nextHandledError(createError.NotFound());
        //     }
        //     console.log(user);
        //     return user;

        // } catch (err) {
        //     throw nextHandledError(err);
        // }


    },

    updateProfile: async (parent, { profile }, context, info) => {
        // Extract the token from the request context
        const { token } = context;

        const userId = await verifyAccessToken(token);
        //console.log({ profile });

        const joiResult = await validateUpdateProfileSchema.validateAsync(profile);
        const { fullName, email, gender, age, country, avatar } = profile;

        try {
            const user = await User.findOneAndUpdate(
                { _id: userId, deletedAt: null },
                {
                    $set: {
                        'profile.fullName': (fullName !== undefined) ? fullName : joiResult.fullName,
                        'email': (email !== undefined) ? email : joiResult.email,
                        'profile.gender': (gender !== undefined) ? gender : joiResult.gender,
                        'profile.age': (age !== undefined) ? age : joiResult.age,
                        'profile.country': (country !== undefined) ? country : joiResult.country,
                        'profile.avatar': (avatar !== undefined) ? avatar : joiResult.avatar,
                        'profile.updatedAt': new Date().toISOString(),
                    }
                },
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
