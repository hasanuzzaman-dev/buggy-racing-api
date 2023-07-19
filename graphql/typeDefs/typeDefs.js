const { gql } = require('apollo-server-express');
const userTypeDefs = require('./userTypeDefs');
const carTypeDefs = require('./carTypeDefs');
const mapTypeDefs = require('./mapTypeDefs');
const typeDefs = gql`

type Query{
    hello: String
    getUserById(id: ID): User
    manualSignIn(email: String!, password: String!): JWTToken
    socialSignIn(socialLoginId: String!): JWTToken
    getUserInfo: UserInfo
   
}

type Mutation{
     manualSignUp(user: UserManualSignUpInput): JWTToken
     socialSignUp(user: UserSocialSignUpInput): JWTToken
     deletePost(id: ID): String
     updateProfile(profile: UpdateProfileInput): ResponseMessage
     addCarByAdmin(car: CarInput): ResponseMessage
     addMapByAdmin(map: MapInput): ResponseMessage
    #  updatePost(id: ID, post: PostInput): Post
}

`;

module.exports = [typeDefs, userTypeDefs, carTypeDefs, mapTypeDefs];