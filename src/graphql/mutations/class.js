import { gql } from '@apollo/client';

const ClassDelete = gql`
  mutation ClassDelete($id:ID!){
    deleteClass(
      id:$id
    )
  }
`;
const ClassEdit = gql`
  mutation ClassEdit($id:ID!, $name:String!, $course_id:Int!){
    updateClass(
      id:$id
      name:$name
      course_id:$course_id
  ),{
    id
  }
  }
`;
const ClassCreate = gql`
  mutation ClassCreate( $name:String!, $course_id:Int!){
    createClass(
    name:$name
    course_id:$course_id
  ),{
    id
  }
  }
`;

export {ClassCreate, ClassEdit, ClassDelete}