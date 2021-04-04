import { gql } from '@apollo/client';

const LoanDelete = gql`
  mutation LoanDelete($id:ID!){
    deleteLoan(
      id:$id
    ){
      id
    }
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

const TerminateLoan = gql`
  mutation TerminateLoan($id:ID!, $input:TerminateLoanInput){
    terminateLoan(
      id:$id
      input:$input
    ),{
      id 
    }
  }
`;

const CancelTerminateLoan = gql`
  mutation CancelTerminateLoan($id:ID!){
    cancelTerminateLoan(
      id:$id
    ),{
      id 
    }
  }
`;

export { LoanCreate, LoanEdit, LoanDelete, TerminateLoan, CancelTerminateLoan }