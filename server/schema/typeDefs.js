const { gql } = require("apollo-server-express");

//typeDefs set up
const typeDefs = gql`

//user types

type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [Book]!
}

//me: returns the user type 
type Query {
  me(token: String!): User
}

//Book Types
type Book {
  bookId: String
  authors: [String]
  description: String
  image: String
  link: String
  title: String
}

//Auth type

type Auth {
  token: String
  user: User
}

input SaveBookInput {
  bookId: String!
  authors: [String!]!
  title: String!
  image: String!
  link: String!
  description: String!
}

// Mutation setup
type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  saveBook(input: SaveBookInput, token: String!): User
  removeBook(bookId: String!, token: String!): User
}`;

module.exports = typeDefs;
