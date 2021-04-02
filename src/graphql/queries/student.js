import { gql } from '@apollo/client';

const StudentsQuery = gql`
  query StudentsQuery($input:PaginateInput!){
    paginateStudents(input:$input) {
      docs{
        id
        name
        email
        matriculation
        course{
          id
          name
        }
        classes{
          id 
          name
        }
      }
      total
    }
  }
`;
const AllStudentsQuery = gql`
  query AllStudentsQuery{
    students{
        id
        name
        email
        matriculation
        course{
          id
          name
        }
        classes{
          id 
          name
        }
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
      course{
        id
        name
      }
      classes{
        id 
        name
      }
    }
  }
`;

export { StudentsQuery, StudentQuery, AllStudentsQuery }