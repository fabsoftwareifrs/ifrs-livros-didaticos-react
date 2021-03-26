import { gql } from '@apollo/client';

const LoanDelete = gql`
  mutation LoanDelete($id:ID!){
    deleteLoan(
      id:$id
    )
  }
`;

const LoanEdit = gql`
  mutation LoanEdit($id:ID!, $delivered:Boolean!, $student_id: Int!, $book_id: Int!, $user_id: Int!, $period_id: Int!){
    updateLoan(
    id:$id
    delivered: $delivered, 
    student_id: $student_id, 
    book_id: $book_id, 
    user_id: $user_id
    period_id: $period_id
  ),{
    id
   
  }
  }
`;
const LoanCreate = gql`
mutation LoanCreate($delivered:Boolean!, $student_id: Int!, $book_id: Int!, $user_id: Int!, $period_id: Int!){
    createLoan(
      delivered: $delivered, 
      student_id: $student_id, 
      book_id: $book_id, 
      user_id: $user_id
      period_id: $period_id
  ),{
    id
   
  }
  }
`;

export {LoanCreate, LoanEdit, LoanDelete}