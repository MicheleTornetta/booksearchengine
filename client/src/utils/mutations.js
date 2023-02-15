import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      token
      email
      password
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
   addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const SAVE_BOOK = gql`
mutation SaveBook($token: String!, $input: SaveBookInput) {
  saveBook(token: $token, input: $input) {
 asdasdasd   bookCount
  }
}
`;

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: String!, $token: String!) {
  removeBook(bookId: $bookId, token: $token) {
    bookCount
  }
}
`;
