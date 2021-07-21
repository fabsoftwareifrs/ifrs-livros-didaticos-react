import { gql } from '@apollo/client';

const CopiesQuery = gql`
  query CopiesQuery{
    copies {
      id
      code
      book{
        id
        name
      }
      status
    }
  }
`;
const AvailableCopiesQuery = gql`
  query AvailableCopiesQuery{
    availableCopies {
      id
      code
      book{
        id
        name
      }
    }
  }
`;
const CopiesByBookQuery = gql`
  query CopiesByBookQuery($bookId:Int!){
    copiesByBookId(bookId:$bookId) {
      id
      code
      book{
        id
        name
      }
      status
    }
  }
`;
const CopyQuery = gql`
  query CopyQuery($id:ID!){
    copy(id:$id) {
      id
      code
      book{
        id
        name
      }
      status
    }
  }
`;


export { AvailableCopiesQuery, CopiesQuery, CopiesByBookQuery, CopyQuery }