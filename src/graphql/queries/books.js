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

export const BooksQuery = gql`
  query BooksQuery($input: PaginateInput!) {
    paginateBooks(input: $input) {
      docs {
        id
        name
        author
        volume
        year
        isbn
        category {
          id
          name
        }
      }
      total
    }
  }
`;

export const AllBooksQuery = gql`
  query AllBooksQuery {
    books {
      id
      name
      author
      volume
      year
      isbn
      category {
        id
        name
      }
    }
  }
`;

export const BookQuery = gql`
  query BookQuery($id: ID!) {
    book(id: $id) {
      id
      name
      author
      volume
      year
      isbn
      category {
        id
        name
      }
    }
  }
`;
