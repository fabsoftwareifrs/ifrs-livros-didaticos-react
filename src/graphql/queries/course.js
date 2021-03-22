import { gql } from '@apollo/client';

const CoursesQuery = gql`
  query CoursesQuery($page:Int!, $limit:Int!){
    paginateCourses(page:$page, limit:$limit) {
      docs{
        id
        name
      }
      total
    }
  }
`;
const CourseQuery = gql`
  query CourseQuery($id:ID!){
    course(id:$id) {
        id
        name
    }
  }
`;

export {CoursesQuery, CourseQuery}