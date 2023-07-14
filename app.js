const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer } = require('apollo-server-express');
const createError = require("http-errors");
const devConfig = require('./config/dev');
const prodConfig = require('./config/prod');

const typeDefs = require('./graphql/typeDefs/typeDefs');
const resolvers = require('./graphql/resolvers/resolvers');
const { ApolloServerErrorCode } = require('@apollo/server/errors');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { nextHandledError, graphqlErrorHandler } = require('./helper/error-handler');


const environment = process.env.NODE_ENV || 'dev';
const config = environment === 'prod' ? prodConfig : devConfig;

const port = process.env.PORT || config.PORT;
const mongodbUri = process.env.MONGODB_URI || config.MONGODB_URI;

console.log({ environment })

//const isProd = environment === 'prod' ? true : false;


async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        formatError: (error) => {
            const { message, extensions } = error;
            //)
            // console.log(message);
            // console.log(extensions.code );
            return graphqlErrorHandler(error);

            // return {
            //     message,
            //     code: extensions.code
            // };
        },
        formatResponse: (response) => {
            if (response.errors) {
                delete response.data;
                //delete response
            }
            return response;
        },
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            return {
                token,
            };

        },
        includeStacktraceInErrorResponses: false, //to exclude stackTrace parameter from error messages
        introspection: true,

    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: app });
    // app.use((req, res) => {
    //     res.send('Hello from express apollo server');
    // });

    // Connect to MongoDB
    mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log(`🚀 Connected to MongoDB:: ${mongodbUri}`);
            // Start the server
            app.listen(port, () => {
                console.log(`🦄 Server is running on port ${port}`);
            });
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}

startServer();