import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String! $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      token
      email
      password
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(username: $username!, $email: String!, password: $password!) {
   addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const SAVE_Book = gql`
  mutation saveBook(
    $bookAuthor
    $bookDescription
    $bookId
    $bookImage
    $booklink
    $title)
    {
    saveBook(
        bookAuthor: $bookAuthor, bookDescription: $bookDescription, bookId: $bookId, 
        bookImage: $bookImage, 
        bookLink: $booklink, 
        title: $title)
        {
            _id
            bookAuthor
            bookDescription
            bookImage
            bookLink
            title
        }
    }
}
`;

export const REMOVE_BOOk = gql`
    removeBook(
        bookAuthor: $bookAuthor, bookDescription: $bookDescription, bookId: $bookId, 
        bookImage: $bookImage, 
        bookLink: $bookLink, 
        title: $title)
        {
            _id
            bookAuthor
            bookDescription
            bookImage
            bookLink
            title
        }
    }
}
`;
