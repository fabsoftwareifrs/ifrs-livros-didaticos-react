import { gql } from '@apollo/client';

const UserDelete = gql`
  mutation UserDelete($id:ID!){
    deleteUser(
      id:$id
    ){
      id
    }
  }
`;

const UserEdit = gql`
  mutation UserEdit($id:ID!, $input:UserInput){
    updateUser(
    id:$id
    input:$input
  ),{
    id
   
  }
  }
`;
const UserCreate = gql`
  mutation UserCreate( $input:UserInput){
    createUser(
    input:$input
  ),{
    id
   
  }
  }
`;

export { UserDelete, UserEdit, UserCreate }