import { gql } from '@apollo/client';

const CategoryDelete = gql`
  mutation CategoryDelete($id:ID!){
    deleteCategory(
      id:$id
    ){
      id
    }
  }
`;

const CategoryEdit = gql`
  mutation CategoryEdit($id:ID!, $input:CategoryInput){
    updateCategory(
    id:$id
    input:$input
  ),{
    id
   
  }
  }
`;
const CategoryCreate = gql`
  mutation CategoryCreate( $input:CategoryInput){
    createCategory(
      input:$input
  ),{
    id
   
  }
  }
`;

export {CategoryCreate, CategoryEdit, CategoryDelete}