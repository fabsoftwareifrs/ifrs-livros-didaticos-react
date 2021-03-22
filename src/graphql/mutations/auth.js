import { gql } from '@apollo/client';

const Login = gql`
  mutation Login( $login:String!, $password:String!){
    login(
    login:$login
    password:$password
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