const mongoose = require('mongoose');
const User = require('../models/user.model');
const { verifyAccessToken } = require('../helper/jwt_helper');

module.exports = {

    getUserInfo: async (parent, args, context, info) => {
        // Extract the token from the request context
        const { token } = context;

        const userId = await verifyAccessToken(token);
        console.log({ userId });



        try {
            const user = await User.findOne(
                {
                    _id: userId
                }
            );
            if (!user) {

            }
            console.log(user);
            return user;
        } catch (err) {
            throw err;
        }


    },
}
