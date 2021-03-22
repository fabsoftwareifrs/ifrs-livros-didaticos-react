import { gql } from '@apollo/client';

const CourseDelete = gql`
  mutation CourseDelete($id:ID!){
    deleteCourse(
      id:$id
    )
  }
`;

const CourseEdit = gql`
  mutation CourseEdit($id:ID!, $name:String!){
    updateCourse(
    id:$id
    name:$name
  ),{
    id
   
  }
  }
`;
const CourseCreate = gql`
  mutation CourseCreate( $name:String!){
    createCourse(
    name:$name
  ),{
    id
   
  }
  }
`;

export {CourseCreate, CourseEdit, CourseDelete}