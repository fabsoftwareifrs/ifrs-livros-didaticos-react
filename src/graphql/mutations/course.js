import { gql } from '@apollo/client';

const CourseDelete = gql`
  mutation CourseDelete($id:ID!){
    deleteCourse(
      id:$id
    ){
      id
    }
  }
`;

const CourseEdit = gql`
  mutation CourseEdit($id:ID!, $input:CourseInput){
    updateCourse(
    id:$id
    input:$input
  ),{
    id
   
  }
  }
`;
const CourseCreate = gql`
  mutation CourseCreate( $input:CourseInput){
    createCourse(
      input:$input
  ),{
    id
   
  }
  }
`;

export { CourseCreate, CourseEdit, CourseDelete }