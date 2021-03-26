import { gql } from '@apollo/client';

const LoansQuery = gql`
  query LoansQuery($page:Int!, $limit:Int!){
    paginateLoans(page:$page, limit:$limit) {
      docs{
        id
        late
        delivered
        students{
          name
        }
        books{
          name
        }
        users{
          name
        }
        periods{
          name
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
      user_id
      student_id
      book_id
      period_id
      students{
        id
        name
        email
        matriculation
        course_id
        class_id
      }
      books{
        id
        name
        code
        author
        volume
        quantity
      }
      users{
        id
        name
        login
        accessLevel
      }
      periods{
        id
        name
        start
        end
      }
    }
  }
`;

export {LoanQuery, LoansQuery}