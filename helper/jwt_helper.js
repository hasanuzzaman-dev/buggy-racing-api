const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const { nextHandledError } = require('./error-handler');


module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};

            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "24h",
                issuer: "www.buggy-racing.com",
                audience: userId,
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    //return reject(err);
                    return reject(createError.InternalServerError());
                }

                resolve(token);
            })
        })
    },

    verifyAccessToken: async (token) => {
        return new Promise((resolve, reject) => {
            //console.log({ token });
            if (!token) {
                return nextHandledError(createError.Unauthorized());
            }

            const authHeader = token;
            const bearerToken = authHeader.split(' ');
            const token1 = bearerToken[1];

            JWT.verify(token1, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                    return nextHandledError(createError.Unauthorized(message));
                }
                //console.log(payload.aud);

                const userId = payload.aud;
                resolve(userId);
            })

        })


    },

    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};

            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: "1y",
                issuer: "www.buggy-racing.com",
                audience: userId,
            };

            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    //return reject(err);
                    return reject(createError.InternalServerError());
                }

                resolve(token);
            })
        })
    },


    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) return reject(createError.Unauthorized());
                const userId = payload.aud;
                resolve(userId);
            })
        })
    }
}
