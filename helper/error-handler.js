const { GraphQLError } = require('graphql');
const { ApolloServerErrorCode } = require('@apollo/server/errors');

class CustomGraphQLError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'CustomGraphQLError';
        this.extensions = {
            code: code
        };
    }
}
const ErrorTypes = {
    BAD_USER_INPUT: {
        errorStatus: ApolloServerErrorCode.BAD_USER_INPUT,
        errorCode: 400,
    },
    BAD_REQUEST: {
        errorStatus: ApolloServerErrorCode.BAD_REQUEST,
        errorCode: 400,
    },
    NOT_FOUND: {
        errorStatus: 'NOT_FOUND',
        errorCode: 404,
    },
    UNAUTHENTICATED: {
        errorStatus: 'UNAUTHENTICATED',
        errorCode: 401,
    },
    ALREADY_EXISTS: {
        errorStatus: 'ALREADY_EXISTS',
        errorCode: 400,
    },
    INTERNAL_SERVER_ERROR: {
        errorStatus: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
        errorCode: 500,
    },
};

const throwCustomError = (errorMessage, errorType) => {
    // console.log('Throwing custom error');
    // console.log('Error types in custom: ', errorType);
    throw new CustomGraphQLError(errorMessage, errorType);
}

module.exports = {throwCustomError, ErrorTypes};