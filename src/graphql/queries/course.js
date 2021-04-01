import { gql } from '@apollo/client';

const CoursesQuery = gql`
  query CoursesQuery($input:PaginateInput!){
    paginateCourses(input:$input) {
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

export { CoursesQuery, CourseQuery }