import { gql } from '@apollo/client';

const ClassesQuery = gql`
  query ClassesQuery($page:Int!, $limit:Int!){
    paginateClasses(page:$page, limit:$limit) {
      docs{
        id
        name
        course_id
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
        course_id
    }
  }
`;

const CoursesQuery = gql`
  query CoursesQuery {
    courses {
      id
      name
    }
  }
`;

export {ClassesQuery, ClassQuery, CoursesQuery}