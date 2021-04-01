import { gql } from '@apollo/client';

const StudentDelete = gql`
  mutation studentDelete($id:ID!){
    deleteStudent(
      id:$id
    )
  }
`;

const StudentEdit = gql`
  mutation StudentEdit($id:ID, $input:StudentInput){
    updateStudent(
      id:$id
      input:$input
  ),{
      id
    }
  }
`;
const StudentCreate = gql`
  mutation StudentCreate($input:StudentInput){
    createStudent(
      name:$name
      input:$input
  ),{
      id
    }
  }
`;

export {StudentDelete, StudentEdit, StudentCreate}