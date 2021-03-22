import { gql } from '@apollo/client';

const StudentDelete = gql`
  mutation studentDelete($id:ID!){
    deleteStudent(
      id:$id
    )
  }
`;

const StudentEdit = gql`
  mutation StudentEdit($id:ID, $name:String!, $email:String!, $matriculation:String!, $course_id:Int!, $class_id:Int!){
    updateStudent(
      id:$id
      name:$name
      email:$email
      matriculation:$matriculation
      course_id:$course_id
      class_id:$class_id
  ),{
      id
    }
  }
`;
const StudentCreate = gql`
  mutation StudentCreate( $name:String!, $email:String!, $matriculation:String!, $course_id:Int!, $class_id:Int!){
    createStudent(
      name:$name
      email:$email
      matriculation:$matriculation
      course_id:$course_id
      class_id:$class_id
  ),{
      id
    }
  }
`;

export {StudentDelete, StudentEdit, StudentCreate}