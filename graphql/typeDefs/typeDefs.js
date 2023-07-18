const { gql } = require('apollo-server-express');
const typeDefs = gql`

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
    money: String
}
type JWTToken {
    accessToken: String,
    refreshToken: String,
}
type Profile {
    id:ID,
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

type Theme {
    theme: String
}
type Setting {
    setting: String
}

type Car {
    id:ID,
    level: Int,
    unlocked: Boolean,
    price:Int,
    theme: Theme,
    setting: Setting,
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

type Query{
    hello: String
    getUserById(id: ID): User
    manualSignIn(email: String!, password: String!): JWTToken
    socialSignIn(socialLoginId: String!): JWTToken
    getUserInfo: UserInfo
    # getUserByToken()
    # getAllPosts: [Post]
    # getPost(id: ID): Post
}

type Mutation{
     manualSignUp(user: UserManualSignUpInput): JWTToken
     socialSignUp(user: UserSocialSignUpInput): JWTToken
     deletePost(id: ID): String
     updateProfile(profile: UpdateProfileInput): ResponseMessage
    #  updatePost(id: ID, post: PostInput): Post
}

`;

module.exports = typeDefs;