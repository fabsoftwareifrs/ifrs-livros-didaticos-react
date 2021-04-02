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

export { CopiesQuery, CopiesByBookQuery, CopyQuery }