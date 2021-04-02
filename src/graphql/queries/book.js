import { gql } from '@apollo/client';

const BooksQuery = gql`
  query BooksQuery($input:PaginateInput!){
    paginateBooks(input:$input) {
      docs{
        id
        name
        author
        volume
        category{
          id 
          name
        }
      }
      total
    }
  }
`;
const AllBooksQuery = gql`
  query AllBooksQuery{
    books{
        id
        name
        author
        volume
        category{
          id 
          name
        }
    }
  }
`;
const BookQuery = gql`
  query BookQuery($id:ID!){
    book(id:$id) {
        id
        name
        author
        volume
        category{
          id 
          name
        }
  }
}
`;

export { BooksQuery, BookQuery, AllBooksQuery }