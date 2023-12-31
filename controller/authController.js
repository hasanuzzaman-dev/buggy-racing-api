
const bcrypt = require('bcrypt');
const {
    validateManualSignUp,
    validateSocialSignUp,
    validateManualSignIn,
    validateSocialSignIn
} = require('../helper/validation_schema');
const { throwCustomError, ErrorTypes, nextHandledError } = require('../helper/error-handler');
const { GraphQLError } = require('graphql');
const { ApolloError, ValidationError, AuthenticationError } = require('apollo-server-express');
const User = require('../models/user.model');
const { signAccessToken, signRefreshToken } = require('../helper/jwt_helper');
const getAllBuggyCarForSignup = require('../repository/getAllBuggyCarForSignup');
const getAllBuggyMapForSignup = require('../repository/getAllBuggyMapForSignup');
const { Car } = require('../models/car.model');
const { Map } = require('../models/map.model');

module.exports = {

    userManualSignUp: async (parent, args, context, info) => {

        try {
            const joiResult = await validateManualSignUp.validateAsync(args.user);
            //console.log(joiResult);
            const userDoesExist = await User.findOne({ email: joiResult.email });
            if (userDoesExist) {
                throw new ApolloError(`${joiResult.email} is already exist!!`, ErrorTypes.ALREADY_EXISTS);
            }

            const hashedPassword = await bcrypt.hash(joiResult.password, 10);

            const user = new User({
                email: joiResult.email,
                password: hashedPassword,
                money: 0,
                fullName: joiResult.fullName,
                gender: joiResult.gender,
                age: joiResult.age,
                country: joiResult.country,
                totalPlayedGame: 0,
                gameWin: 0,
                createdAt: new Date().toISOString(),
            });

            const savedUser = await user.save();
            const cars = await getAllBuggyCarForSignup();

            let myCars = cars.map(car => {
                let newCar = new Car({
                    userId: savedUser.id,
                    buggyCarId: car._id,
                    createdAt: new Date().toISOString(),
                })

                return newCar;
            });

            const savedCar = await Car.insertMany(myCars);

            const maps = await getAllBuggyMapForSignup();

            let myMaps = maps.map(map => {
                //console.log("map", map);
                let newMap = new Map({
                    userId: savedUser.id,
                    buggyMapId: map._id,
                    createdAt: new Date().toISOString(),
                });
                return newMap;
            });

            const savedMap = await Map.insertMany(myMaps);

            const accessToken = await signAccessToken(savedUser?._id?.toString());
            const refreshToken = await signRefreshToken(savedUser?.id);

            return { accessToken, refreshToken };


        } catch (error) {
            nextHandledError(error);
        }
    },
    userManualSignIn: async (parent, args, context, info) => {

        try {

            const joiResult = await validateManualSignIn.validateAsync({
                email: args.email,
                password: args.password
            });

            const user = await User.findOne({ email: joiResult.email });
            if (!user) {
                throw new AuthenticationError("User not authenticated");
            }

            const isMatch = await bcrypt.compare(joiResult.password, user.password);
            if (!isMatch) {
                throw new AuthenticationError("Username/Password not valid!");
            }

            //console.log(JSON.stringify(user));

            const userId = user._id.toString();

            const accessToken = await signAccessToken(userId);
            const refreshToken = await signRefreshToken(userId);
            return { accessToken, refreshToken };



        } catch (error) {
            nextHandledError(error)
        }
    },


    userSocialSignUp: async (parent, args, context, info, next) => {
        //console.log(JSON.stringify(info));

        try {

            const joiResult = await validateSocialSignUp.validateAsync(args.user);

            //console.log(joiResult);
            const userDoesExist = await User.findOne({ socialLoginId: joiResult.socialLoginId });
            if (userDoesExist) {
                throw new ApolloError(`This user is already exist!!`, ErrorTypes.ALREADY_EXISTS);
            }
            const user = new User({
                socialLoginId: joiResult.socialLoginId,
                email: joiResult.email,
                money: 0,
                networkPlatform: joiResult.networkPlatform,
                fullName: joiResult.fullName,
                gender: joiResult.gender,
                age: joiResult.age,
                avatar: joiResult.avatar,
                country: joiResult.country,
                totalPlayedGame: 0,
                gameWin: 0,
                createdAt: new Date().toISOString(),

            });

            const savedUser = await user.save();
            const cars = await getAllBuggyCarForSignup();

            let myCars = cars.map(car => {
                let newCar = new Car({
                    userId: savedUser.id,
                    buggyCarId: car._id,
                    createdAt: new Date().toISOString(),
                })
                return newCar;
            });

            const savedCar = await Car.insertMany(myCars);

            const maps = await getAllBuggyMapForSignup();

            let myMaps = maps.map(map => {
                //console.log("map", map);
                let newMap = new Map({
                    userId: savedUser.id,
                    buggyMapId: map._id,
                    createdAt: new Date().toISOString(),
                });
                return newMap;
            });

            const savedMap = await Map.insertMany(myMaps);

            const accessToken = await signAccessToken(savedUser?._id?.toString());
            const refreshToken = await signRefreshToken(savedUser?.id);

            return { accessToken, refreshToken };


        } catch (error) {
            nextHandledError(error);
        }
    },


    userSocialSignIn: async (parent, args, context, info) => {

        try {

            const joiResult = await validateSocialSignIn.validateAsync({
                socialLoginId: args.socialLoginId,
            });

            const user = await User.findOne({ socialLoginId: joiResult.socialLoginId });
            if (!user) {
                throw new AuthenticationError("User not authenticated");
            }

            const userId = user._id.toString();

            const accessToken = await signAccessToken(userId);
            const refreshToken = await signRefreshToken(userId);

            return { accessToken, refreshToken };

        } catch (error) {
            nextHandledError(error)
        }
    },
}