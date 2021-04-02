import { gql } from '@apollo/client';

const CopyDelete = gql`
  mutation CopyDelete($id:ID!){
    deleteCopy(
      id:$id
    ){
      id
    }
  }
`;
const CopyEdit = gql`
  mutation CopyEdit($id:ID!, $input:CopyInput){
    updateCopy(
    id:$id
    input:$input
  ),{
    id
   
  }
  }
`;
const CopyCreate = gql`
  mutation CopyCreate( $input:CopyInput){
    createCopy(
      input:$input
  ),{
    id
   
  }
  }
`;

export { CopyCreate, CopyEdit, CopyDelete }