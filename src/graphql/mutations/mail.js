import { gql } from '@apollo/client';

const WarnMail = gql`
  mutation WarnMail($loans:[Int]!){
    warnMail(
      loans:$loans
    ){
      response
    }
  }
`;

const LateMail = gql`
  mutation LateMail($loans:[Int]!){
    lateMail(
      loans:$loans
    ){
      response
    }
  }
`;


export { WarnMail, LateMail }