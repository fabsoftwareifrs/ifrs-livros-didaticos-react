import { gql } from '@apollo/client';

const LoansQuery = gql`
  query LoansQuery(){
    loans() {
      docs{
        id
        name
      }
      total
    }
  }
`;
const LoanQuery = gql`
  query LoanQuery($id:ID!){
    loan(id:$id) {
        id
        name
    }
  }
`;

export {LoanQuery, LoansQuery}