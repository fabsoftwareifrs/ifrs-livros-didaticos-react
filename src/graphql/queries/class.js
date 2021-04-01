import { gql } from '@apollo/client';

const ClassesQuery = gql`
  query ClassesQuery($input:PaginateInput!){
    paginateClasses(input:$input) {
      docs{
        id
        name
        course{
          id
          name
        }
      }
      total
    }
  }
`;

const ClassQuery = gql`
  query ClassQuery($id:ID!){
    classRoom(id:$id) {
        id
        name
        course {
          id
          name
        }
    }
  }
`;



export { ClassesQuery, ClassQuery }