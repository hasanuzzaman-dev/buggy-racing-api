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
type Profile implements CommonAttributes{
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
    createdAt: String,
    deletedAt: String,
    updatedAt: String
}

type Theme {
    theme: String
}
type Setting {
    setting: String
}

type Car implements CommonAttributes{
    id:ID,
    level: Int,
    unlocked: Boolean,
    price:Int,
    theme: Theme,
    setting: Setting,
    createdAt: String,
    deletedAt: String,
    updatedAt: String
}
type Map implements CommonAttributes{
    id: ID,
    unlocked: Boolean,
    price:Int,
    createdAt: String,
    deletedAt: String,
    updatedAt: String
}
type Game {
    cars:[Car],
    maps: [Map]
}

type UserInfo {
    id:ID,
    money: Float,
    profile: Profile,
    # game: Game
    cars: [Car],
    maps: [Map],
}

type CustomError {
    status: Int,
    message: String

}

enum Gender{
    Male
    Female
    Others
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
    fullName: String,
    email: String,
    gender: Gender,
    age: String,
    country: String,
    networkPlatform: String
}


type Query{
    hello: String
    getUserById(id: ID): User
    # getUserByToken()
    # getAllPosts: [Post]
    # getPost(id: ID): Post
}

type Mutation{
     manualSignUp(user: UserManualSignUpInput): JWTToken
     socialSignUp(user: UserSocialSignUpInput): JWTToken
    #  deletePost(id: ID): String
    #  updatePost(id: ID, post: PostInput): Post
}

`;

module.exports = typeDefs;