import { gql } from '@apollo/client';

const LoanDelete = gql`
  mutation LoanDelete($id:ID!){
    deleteLoan(
      id:$id
    )
  }
`;

const LoanEdit = gql`
  mutation LoanEdit($id:ID!, $input:LoanInput){
    updateLoan(
    id:$id
    input:$input
  ),{
    id
   
  }
  }
`;
const LoanCreate = gql`
mutation LoanCreate($input:LoanInput){
    createLoan(
      input:$input
  ),{
    id
   
  }
  }
`;

export {LoanCreate, LoanEdit, LoanDelete}