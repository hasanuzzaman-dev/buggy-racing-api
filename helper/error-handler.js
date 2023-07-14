const { GraphQLError } = require('graphql');
const { ApolloServerErrorCode } = require('@apollo/server/errors');
const {
    ValidationError,
    ApolloError,
    ForbiddenError,
    AuthenticationError,
    UserInputError,

} = require('apollo-server-express');


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
    GRAPHQL_VALIDATION_FAILED: {
        errorStatus: 'GRAPHQL_VALIDATION_FAILED',
        errorCode: 400,
    },

    GRAPHQL_PARSE_FAILED: {
        errorStatus: 'GRAPHQL_PARSE_FAILED',
        errorCode: 400,
    },
    PERSISTED_QUERY_NOT_FOUND: {
        errorStatus: 'PERSISTED_QUERY_NOT_FOUND',
        errorCode: 400,
    },
    PERSISTED_QUERY_NOT_SUPPORTED: {
        errorStatus: 'PERSISTED_QUERY_NOT_SUPPORTED',
        errorCode: 400,
    },
};

const throwCustomError = (errorMessage, errorType) => {
    // console.log('Throwing custom error');
    // console.log('Error types in custom: ', errorType);
    throw new CustomGraphQLError(errorMessage, errorType);
}

const nextHandledError = (error) => {
    //console.log("nextHandledError");
    if (error.isJoi === true) {
        console.log("nextHandledError1");
        const msg = `${error.details[0].message}`;
        throw throwCustomError(msg, ErrorTypes.BAD_REQUEST);
    } 
    else if (error instanceof AuthenticationError) {
        console.log("nextHandledError2");
        throw throwCustomError(error?.message, ErrorTypes.UNAUTHENTICATED);
    }
    else if (error instanceof ApolloError) {
        console.log("nextHandledError3");
        throw throwCustomError(error?.message, error?.extensions?.code);
    } 
    else {
        console.log("nextHandledError3");
        throw throwCustomError(error.message, ErrorTypes.BAD_REQUEST);
    }
}

const graphqlErrorHandler = (error) => {
    console.log("graphqlErrorHandler");
    const { message, extensions } = error;

    console.error(error);

    if (extensions.code === "GRAPHQL_VALIDATION_FAILED") {
        return {
            message,
            code: ErrorTypes.GRAPHQL_VALIDATION_FAILED
        }
    } else if (extensions.code === "GRAPHQL_PARSE_FAILED") {
        return {
            message,
            code: ErrorTypes.GRAPHQL_PARSE_FAILED
        }
    } else if (extensions.code === "PERSISTED_QUERY_NOT_FOUND") {
        return {
            message,
            code: ErrorTypes.PERSISTED_QUERY_NOT_FOUND
        }
    } else if (extensions.code === "PERSISTED_QUERY_NOT_SUPPORTED") {
        return {
            message,
            code: ErrorTypes.PERSISTED_QUERY_NOT_SUPPORTED
        }
    } else if (error instanceof GraphQLError) {
        const { code } = error.extensions;
        //console.log(code);
        return {
            message,
            code: code
        }
    }
}


module.exports = { throwCustomError, ErrorTypes, nextHandledError, graphqlErrorHandler };