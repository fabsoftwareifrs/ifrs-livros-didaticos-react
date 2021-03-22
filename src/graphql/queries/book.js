import { gql } from '@apollo/client';

const BooksQuery = gql`
  query BooksQuery($page:Int!, $limit:Int!){
    paginateBooks(page:$page, limit:$limit) {
      docs{
        id
        name
        code
        author
        volume
        quantity
      }
      total
    }
  }
`;
const BookQuery = gql`
  query BookQuery($id:ID!){
    book(id:$id) {
        id
        name
        code
        author
        volume
        quantity
  }
}
`;

export {BooksQuery, BookQuery}