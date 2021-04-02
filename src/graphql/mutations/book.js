import { gql } from '@apollo/client';

const BooksDelete = gql`
  mutation BooksDelete($id:ID!){
    deleteBook(
      id:$id
    ){
      id
    }
  }
`;
const BooksEdit = gql`
  mutation BooksEdit($id:ID!, $input:BookInput){
    updateBook(
    id:$id
    input:$input
  ),{
    id
   
  }
  }
`;
const BooksCreate = gql`
  mutation BooksCreate( $input:BookInput){
    createBook(
      input:$input
  ),{
    id
   
  }
  }
`;

export { BooksCreate, BooksEdit, BooksDelete }