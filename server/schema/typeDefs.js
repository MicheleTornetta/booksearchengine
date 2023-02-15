const { gql } = require("apollo-server-express");

//typeDefs set up
const typeDefs = gql`



type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [Book]!
}

 
type Query {
  me(token: String!): User
}


type Book {
  bookId: String
  authors: [String]
  description: String
  image: String
  link: String
  title: String
}



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


type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  saveBook(input: SaveBookInput, token: String!): User
  removeBook(bookId: String!, token: String!): User
}`;

module.exports = typeDefs;
