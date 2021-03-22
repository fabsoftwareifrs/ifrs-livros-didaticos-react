import { gql } from '@apollo/client';

const CategoryDelete = gql`
  mutation CategoryDelete($id:ID!){
    deleteCategory(
      id:$id
    )
  }
`;

const CategoryEdit = gql`
  mutation CategoryEdit($id:ID!, $name:String!){
    updateCategory(
    id:$id
    name:$name
  ),{
    id
   
  }
  }
`;
const CategoryCreate = gql`
  mutation CategoryCreate( $name:String!){
    createCategory(
    name:$name
  ),{
    id
   
  }
  }
`;

export {CategoryCreate, CategoryEdit, CategoryDelete}