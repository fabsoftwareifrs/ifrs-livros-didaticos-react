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

export const CopiesQuery = gql`
  query CopiesQuery {
    copies {
      id
      code
      book {
        id
        name
      }
      Status {
        id
        name
        isAvailable
      }
    }
  }
`;

export const AvailableCopiesQuery = gql`
  query AvailableCopiesQuery($search: String, $selecteds: [String]) {
    availableCopies(search: $search, selecteds: $selecteds) {
      id
      code
      book {
        id
        name
      }
    }
  }
`;

export const CopiesByBookQuery = gql`
  query CopiesByBookQuery($bookId: Int!, $search: String!) {
    copiesByBookId(bookId: $bookId, search: $search) {
      id
      code
      isLoaned
      book {
        id
        name
      }
      Status {
        id
        name
        isAvailable
      }
    }
  }
`;

export const CopyQuery = gql`
  query CopyQuery($id: ID!) {
    copy(id: $id) {
      id
      code
      book {
        id
        name
      }
      Status {
        id
        name
        isAvailable
      }
    }
  }
`;
