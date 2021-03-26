import { gql } from '@apollo/client';

const PeriodsQuery = gql`
  query PeriodsQuery($page:Int!, $limit:Int!){
    paginatePeriods(page:$page, limit:$limit) {
      docs{
        id
        name
        start
        end
      }
      total
    }
  }
`;
const AllPeriodsQuery = gql`
  query AllPeriodsQuery{
    periods {
        id
        name
        start
        end
    }
  }
`;
const PeriodQuery = gql`
  query PeriodQuery($id:ID!){
    period(id:$id) {
      id
      name
      start
      end
    }
  }
`;

export {PeriodsQuery, PeriodQuery,AllPeriodsQuery}