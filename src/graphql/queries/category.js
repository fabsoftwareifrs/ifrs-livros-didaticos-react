import { gql } from '@apollo/client';

const CategoriesQuery = gql`
  query CategoriesQuery($input:PaginateInput!){
    paginateCategories(input:$input) {
      docs{
        id
        name
      }
      total
    }
  }
`;
const AllCategoriesQuery = gql`
  query AllCategoriesQuery{
    categories {
      id
      name
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

export { CategoriesQuery, CategoryQuery, AllCategoriesQuery }