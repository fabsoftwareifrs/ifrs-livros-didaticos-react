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

export const BooksDelete = gql`
  mutation BooksDelete($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

export const IMPORT_BOOKS = gql`
  mutation ImportBooks($input: BookImportInput) {
    importBooks(input: $input)
  }
`;

export const BooksEdit = gql`
  mutation BooksEdit($id: ID!, $input: BookInput) {
    updateBook(id: $id, input: $input) {
      id
    }
  }
`;

export const BooksCreate = gql`
  mutation BooksCreate($input: BookInput) {
    createBook(input: $input) {
      id
    }
  }
`;
