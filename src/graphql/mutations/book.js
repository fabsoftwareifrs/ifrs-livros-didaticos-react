import { gql } from '@apollo/client';

const BooksDelete = gql`
  mutation BooksDelete($id:ID!){
    deleteBook(
      id:$id
    )
  }
`;
const BooksEdit = gql`
  mutation BooksEdit($id:ID!, $name:String!, $code:String!,$author:String!, $volume:String!, $quantity:Int!){
    updateBook(
    id:$id
    name:$name
    code:$code
    author:$author
    volume:$volume
    quantity:$quantity
  ),{
    id
   
  }
  }
`;
const BooksCreate = gql`
  mutation BooksCreate( $name:String!, $code:String!,$author:String!, $volume:String!, $quantity:Int!){
    createBook(
    name:$name
    code:$code
    author:$author
    volume:$volume
    quantity:$quantity
  ),{
    id
   
  }
  }
`;

export {BooksCreate, BooksEdit, BooksDelete}