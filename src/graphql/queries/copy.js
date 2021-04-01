import { gql } from '@apollo/client';

const CopiesQuery = gql`
  query CopiesQuery{
    copies {
      id
      code
      status
    }
  }
`;
const CopyQuery = gql`
  query CopyQuery($id:ID!){
    copy(id:$id) {
      id
      code
      status
    }
  }
`;

export { CopiesQuery, CopyQuery }