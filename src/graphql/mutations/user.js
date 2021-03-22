import { gql } from '@apollo/client';

const UserDelete = gql`
  mutation UserDelete($id:ID!){
    deleteUser(
      id:$id
    )
  }
`;

const UserEdit = gql`
  mutation UserEdit($id:ID!, $name:String!, $login:String!, $accessLevel:Int!){
    updateUser(
    id:$id
    name:$name
    login:$login
    accessLevel:$accessLevel
  ),{
    id
   
  }
  }
`;
const UserCreate = gql`
  mutation UserCreate( $name:String!, $login:String!, $password:String!, $accessLevel:Int!){
    createUser(
    name:$name
    login:$login
    password:$password
    accessLevel:$accessLevel
  ),{
    id
   
  }
  }
`;

export {UserDelete, UserEdit, UserCreate}