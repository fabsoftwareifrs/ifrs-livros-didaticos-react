import { gql } from '@apollo/client';

const UsersQuery = gql`
  query UsersQuery($input:PaginateInput!){
    paginateUsers(input:$input) {
      docs{
        id
        name
        login
        accessLevel
      }
      total
    }
  }
`;
const UserQuery = gql`
  query UserQuery($id:ID!){
    user(id:$id) {
        id
        name
        login
        accessLevel
    }
  }
`;

export { UsersQuery, UserQuery }