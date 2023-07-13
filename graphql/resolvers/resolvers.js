const { userManualSignUp } = require('../../controller/authController')
const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World';
        },

    },

    Mutation: {
        manualSignUp:  userManualSignUp

    }


}

module.exports = resolvers;