import { gql } from '@apollo/client';

const LoanDelete = gql`
  mutation LoanDelete($id:ID!){
    deleteLoan(
      id:$id
    )
  }
`;

const LoanEdit = gql`
  mutation LoanEdit($id:ID!, $withdrawDate:Date!, $loanDays:Int!, $delivered:Boolean!, $studentId: Int!, $bookId: Int!, $userId: Int!){
    updateLoan(
    id:$id
    name:$name
    withdrawDate: $withdrawDate
    loanDays: $loanDays
    delivered: $delivered, 
    studentId: $studentId, 
    bookId: $bookId, 
    userId: $userId
  ),{
    id
   
  }
  }
`;
const LoanCreate = gql`
mutation LoanCreate($withdrawDate:Date!, $loanDays:Int!, $delivered:Boolean!, $studentId: Int!, $bookId: Int!, $userId: Int!){
    createLoan(
        name:$name
        withdrawDate: $withdrawDate
        loanDays: $loanDays
        delivered: $delivered, 
        studentId: $studentId, 
        bookId: $bookId, 
        userId: $userId
  ),{
    id
   
  }
  }
`;

export {LoanCreate, LoanEdit, LoanDelete}