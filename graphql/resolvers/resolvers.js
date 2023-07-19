const {
    userManualSignUp,
    userSocialSignUp,
    userManualSignIn,
    userSocialSignIn,
} = require('../../controller/authController');
const {
    getUserInfo,
    updateProfile
} = require('../../controller/userController');

const { addCarByAdmin } = require("../../controller/carController");
const { addMapByAdmin } = require('../../controller/mapController');

const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World';
        },
        manualSignIn: userManualSignIn,
        socialSignIn: userSocialSignIn,
        getUserInfo: getUserInfo,


    },

    Mutation: {
        manualSignUp: userManualSignUp,
        socialSignUp: userSocialSignUp,
        updateProfile: updateProfile,
        addCarByAdmin: addCarByAdmin,
        addMapByAdmin: addMapByAdmin,
        deletePost: () => {

        }

    }


}

module.exports = resolvers;