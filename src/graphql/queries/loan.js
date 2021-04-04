import { gql } from '@apollo/client';

const LoansQuery = gql`
  query LoansQuery($input:PaginateInput!){
    paginateLoans(input:$input) {
      docs{
        id
        late
        delivered
        end
        student{
          id
          name
          email
          matriculation
          
        }
        copy{
          id
          code 
          status
        }
        period{
          id
          name
          start
          end
        }
      }
      total
    }
  }
`;
const LoanQuery = gql`
  query LoanQuery($id:ID!){
    loan(id:$id) {
        id
        late
        delivered
        student{
          id
          name
          email
          matriculation
         
        }
        copy{
          id
          code 
          status
        }
        period{
          id
          name
          start
          end
        }
      }
  }
`;

export { LoanQuery, LoansQuery }