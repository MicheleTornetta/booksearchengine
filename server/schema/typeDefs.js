const { gql } = require("apollo-server-express");

module.exports = gql`
type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [Book]!
}

type Query {
  me: User
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
  saveBook(input: SaveBookInput): User
  removeBook(bookId: String!): User
}
`;
