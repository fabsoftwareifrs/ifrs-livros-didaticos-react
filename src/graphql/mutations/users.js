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

import { gql } from "@apollo/client";

export const REMOVE_USER = gql`
  mutation UserDelete($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const EDIT_USER = gql`
  mutation UserEdit($id: ID!, $input: UserInput) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`;

export const ADD_USER = gql`
  mutation UserCreate($input: UserInput) {
    createUser(input: $input) {
      id
    }
  }
`;
