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
        courses{
          id
          name
        }
        class_id
        classes{
          id
          name
        }
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
      courses{
        id
        name
      }
      class_id
      classes{
        id
        name
      }
    }
  }
`;

export {StudentsQuery, StudentQuery}