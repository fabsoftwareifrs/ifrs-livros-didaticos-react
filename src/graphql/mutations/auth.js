import { gql } from '@apollo/client';

const Login = gql`
  mutation Login( $input:AuthInput){
    login(
    input:$input
  ),{
    token
    user{
      id
      name
    }
  }
  }
`;

export {Login}