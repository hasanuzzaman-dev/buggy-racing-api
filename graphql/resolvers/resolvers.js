const {
    userManualSignUp,
    userSocialSignUp,
    userManualSignIn,
    userSocialSignIn,

} = require('../../controller/authController');
const { getUserInfo } = require('../../controller/userController');

const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World';
        },
        manualSignIn: userManualSignIn,
        socialSignIn: userSocialSignIn,
        getUserInfo: getUserInfo


    },

    Mutation: {
        manualSignUp: userManualSignUp,
        socialSignUp: userSocialSignUp,
        deletePost: () => {

        }

    }


}

module.exports = resolvers;