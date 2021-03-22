import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjE0MDIzMTYwLCJleHAiOjE2MTQxMDk1NjB9.WcEkqLgHCJ14hP-fUnpkfAuaj8kXnFFvkhgzygFaP-0",
  }
});
export default client;