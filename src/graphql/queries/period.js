import { gql } from '@apollo/client';

const PeriodsQuery = gql`
  query PeriodsQuery($input:PaginateInput!){
    paginatePeriods(input:$input) {
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

export { PeriodsQuery, PeriodQuery, AllPeriodsQuery }