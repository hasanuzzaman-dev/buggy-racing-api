const { gql } = require('apollo-server-express');
const userTypeDefs = gql`

interface CommonAttributes{
  createdAt: String,
  deletedAt: String,
  updatedAt: String
}

type User {
    id: ID,
    email: String,
    password: String,
    socialLoginId: String,
    money: String,
    fullName: String,
    gender: Gender,
    age: Int,
    avatar: String,
    country: String,
    flag: String,
    totalPlayedGame: Int,
    gameWin: Int,
    rank: Int,
}
type JWTToken {
    accessToken: String,
    refreshToken: String,
}
type Profile {
    id:ID,
   
}

type Map {
    id: ID,
    unlocked: Boolean,
    price:Int,
   
}
type Game {
    cars:[Car],
    maps: [Map]
}

enum Gender{
    Male
    Female
    Others
}
type UserInfo {
    id:ID,
    email: String,
    password: String,
    fullName: String,
    socialLoginId: String,
    gender: Gender,
    age: Int,
    avatar: String,
    country: String,
    flag: String,
    totalPlayedGame: Int,
    gameWin: Int,
    rank: Int,
    money: Float,
    profile: Profile,
    # game: Game
    cars: [Car],
    maps: [Map],
}

type ResponseMessage {
    code: Int,
    status: String,
    message: String,
}

# input UserSignUpInput {
#     fullName: String,
#     email: String,
#     password: String,
#     gender: Gender,
#     age: String,
#     country: String
# }

input UserManualSignUpInput {
    fullName: String,
    email: String,
    password: String,
    gender: Gender,
    age: Int,
    country: String
}

input UserSocialSignUpInput {
    socialLoginId: String!,
    fullName: String!,
    email: String,
    gender: Gender!,
    age: Int!,
    country: String!,
    avatar: String,
    networkPlatform: String!
}

input UpdateProfileInput {
    fullName: String,
    email: String,
    gender: Gender,
    age: Int,
    country: String,
    avatar: String,
}

`;

module.exports = userTypeDefs;