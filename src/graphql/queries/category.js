import { gql } from '@apollo/client';

const CategoriesQuery = gql`
  query CategoriesQuery($page:Int!, $limit:Int!){
    paginateCategories(page:$page, limit:$limit) {
      docs{
        id
        name
      }
      total
    }
  }
`;
const CategoryQuery = gql`
  query CategoryQuery($id:ID!){
    category(id:$id) {
        id
        name
    }
  }
`;

export {CategoriesQuery, CategoryQuery}