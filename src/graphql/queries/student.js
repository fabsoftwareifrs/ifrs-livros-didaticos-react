import { gql } from '@apollo/client';

const StudentsQuery = gql`
  query StudentsQuery($page:Int!, $limit:Int!){
    paginateStudents(page:$page, limit:$limit) {
      docs{
        id
        name
        email
        matriculation
        course_id
        class_id
      }
      total
    }
  }
`;
const StudentQuery = gql`
  query StudentQuery($id:ID!){
    student(id:$id) {
      id
      name
      email
      matriculation
      course_id
      class_id
    }
  }
`;

export {StudentsQuery, StudentQuery}