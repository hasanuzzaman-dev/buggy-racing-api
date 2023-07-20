const { gql } = require('apollo-server-express');
const carTypeDefs = gql`

interface CommonAttributes{
  createdAt: String,
  deletedAt: String,
  updatedAt: String
}

type Car {
    id:ID,
    level: Int,
    unlocked: Boolean,
    active: Boolean,
    uiIndex: Int,
    price:Int,
}

input CarInput {
    level: Int,
    unlocked: Boolean,
    active: Boolean,
    uiIndex: Int,
    price:Int,
}

`;

module.exports = carTypeDefs;