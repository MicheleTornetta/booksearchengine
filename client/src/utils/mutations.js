import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;

export const SAVE_BOOK = gql`
mutation SaveBook($token: String!, $input: SaveBookInput) {
  saveBook(token: $token, input: $input) {
    bookCount
  }
}
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: String!, $token: String!) {
  removeBook(bookId: $bookId, token: $token) {
    username
    savedBooks {
      title
      link
      image
      description
      bookId
      authors
    }
    email
    bookCount
    _id
  }
}
`;
