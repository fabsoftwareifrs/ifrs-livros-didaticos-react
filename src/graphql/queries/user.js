import { gql } from '@apollo/client';

const UsersQuery = gql`
  query UsersQuery($page:Int!, $limit:Int!){
    paginateUsers(page:$page, limit:$limit) {
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

export {UsersQuery,UserQuery}