const { gql } = require('apollo-server-express');
const mapTypeDefs = gql`

interface CommonAttributes{
  createdAt: String,
  deletedAt: String,
  updatedAt: String
}

type Map {
    id:ID,
    unlocked: Boolean,
    active: Boolean,
    uiIndex: Int,
    price:Int,
   
}

input MapInput {
    unlocked: Boolean,
    active: Boolean,
    uiIndex: Int,
    price:Int,
    
}

`;

module.exports = mapTypeDefs;