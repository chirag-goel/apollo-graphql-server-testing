const {
    gql,
} = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql `
  type Query {
    hello: String,
    userData(userId: String!): UserDataRes
  }

  type UserDataRes {
      firstName: String!
      lastName: String!
      website: String!
  }

  type Mutation {
      greet(name: String!): String!
  }
`;

module.exports = typeDefs;