/*
 * This file is part of LMS Livros Didáticos.
 *
 * LMS Livros Didáticos is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * LMS Livros Didáticos is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Foobar.  If not, see <https://www.gnu.org/licenses/>
 */

import React, { createContext, useReducer, useEffect, useContext } from "react";
import { createUploadLink } from "apollo-upload-client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/link-error";

const uploadLink = new createUploadLink({
  uri: `http://localhost:4000/graphql`,
  // uri: `https://ifrs-livros-didaticos-back.herokuapp.com/graphql`,
});

const authLink = new ApolloLink((operation, forward) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  operation.setContext({
    headers: {
      authorization: auth?.token ? `Bearer ${auth.token}` : "",
    },
  });

  return forward(operation);
});

const errorLink = (dispatch) =>
  onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        if (message.match(/jwt expired/)) {
          dispatch(logout());
        }
        if (message.match(/invalid signature/)) {
          dispatch(logout());
        }
      });
    }
  });

const Context = createContext();

const initialState = {
  isAuthenticated: false,
  user: { id: "", name: "", login: "" },
  token: "",
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const login = (user, token) => ({
  type: LOGIN,
  payload: { user, token },
});

const logout = () => {
  localStorage.clear();
  return { type: LOGOUT };
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN": {
      const { user, token } = payload;
      return { isAuthenticated: true, user, token };
    }
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const useAuth = () => {
  const [auth, dispatch] = useContext(Context);
  if (auth === undefined)
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider");

  return { auth, dispatch };
};

const AuthenticatedProvider = ({ children }) => {
  const localState = JSON.parse(localStorage.getItem("auth"));
  const [auth, dispatch] = useReducer(reducer, localState || initialState);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink(dispatch), authLink.concat(uploadLink)]),
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <ApolloProvider client={client}>
      <Context.Provider value={[auth, dispatch]}>{children}</Context.Provider>
    </ApolloProvider>
  );
};

export default AuthenticatedProvider;
export { useAuth, login, logout };
