import { gql } from '@apollo/client';

const PeriodDelete = gql`
  mutation PeriodDelete($id:ID!){
    deletePeriod(
      id:$id
    ){
      id
    }
  }
`;

const PeriodEdit = gql`
  mutation PeriodEdit($id:ID!, $input:PeriodInput){
    updatePeriod(
    id:$id
    input:$input
  ),{
    id
  }
  }
`;
const PeriodCreate = gql`
  mutation PeriodCreate( $input:PeriodInput){
    createPeriod(
      input:$input
  ),{
    id
   
  }
  }
`;

export { PeriodCreate, PeriodEdit, PeriodDelete }