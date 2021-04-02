import { gql } from '@apollo/client';

const ClassDelete = gql`
  mutation ClassDelete($id:ID!){
    deleteClass(
      id:$id
    ){
      id
    }
  }
`;
const ClassEdit = gql`
  mutation ClassEdit($id:ID!, $input:ClassInput){
    updateClass(
      id:$id
      input:$input
  ),{
    id
  }
  }
`;
const ClassCreate = gql`
  mutation ClassCreate( $input:ClassInput){
    createClass(
      input:$input
  ),{
    id
  }
  }
`;

export { ClassCreate, ClassEdit, ClassDelete }