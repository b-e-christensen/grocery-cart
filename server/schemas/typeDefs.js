const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Product {
    _id: ID
    name: String
    price: Float
  }

  type Store {
    _id: ID
    name: String
    products: [Product]
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    stores: [Store]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: [User]
    me: User
    stores: [Store]
    products: [Product]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addStoreDev(name: String!, user_id: ID): Store
    updateStoreDev(name: String!, store_id: ID): Store
    deleteStoreDev(store_id: ID, user_id: ID): Store

    addProductDev(name: String!, price: Float, store_id: ID): Product
    updateProductDev(name: String!, price: Float, product_id: ID): Product
    deleteProductDev(product_id: ID): Product
  }
`;

module.exports = typeDefs;
