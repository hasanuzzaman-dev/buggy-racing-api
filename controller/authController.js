const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validateManualSignUp } = require('../helper/validation_schema');
const { throwCustomError, ErrorTypes } = require('../helper/error-handler');
const { GraphQLError } = require('graphql');
const { ApolloError } = require('apollo-server-express');
const User = require('../models/user.model');
const Profile = require('../models/profile.model');
const { signAccessToken, signRefreshToken } = require('../helper/jwt_helper');



module.exports = {

    userManualSignUp: async (parent, args, context, info) => {

        try {

            const joiResult = await validateManualSignUp.validateAsync(args.user);

            //console.log(joiResult);
            const userDoesExist = await User.findOne({ email: joiResult.email });
            if (userDoesExist)
                throw throwCustomError(`${joiResult.email} is already exist!`, ErrorTypes.BAD_REQUEST);

            const hashedPassword = await bcrypt.hash(joiResult.password, 10);

            const profile = {
                fullName: joiResult.fullName,
                gender: joiResult.gender,
                age: joiResult.age,
                country: joiResult.country,
                totalPlayedGame: 0,
                gameWin: 0,
                createdAt: new Date().toISOString(),

            }


            const user = new User({
                email: joiResult.email,
                password: hashedPassword,
                money: 0,
                profile: profile,
                createdAt: new Date().toISOString(),

            });

            const savedUser = await user.save();

            const accessToken = await signAccessToken(savedUser?._id?.toString());
            const refreshToken = await signRefreshToken(savedUser?.id);

            return { accessToken, refreshToken };


        } catch (error) {
            //console.log(JSON.stringify(error))
            if (error.isJoi === true) {

                const msg = `${error.details[0].message}`;
                //throw new ApolloError(msg);
                throw throwCustomError(msg, ErrorTypes.BAD_REQUEST);

            }

        }
    }
}