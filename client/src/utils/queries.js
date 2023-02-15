import { gql } from '@apollo/client';

//query for the Appollo Server

export const GET_ME = gql`
query Me {
  me {
    username
    savedBooks {
      image
      title
      link
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


