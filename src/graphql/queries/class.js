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

const ClassesQuery = gql`
  query ClassesQuery($input: PaginateInput!) {
    paginateClasses(input: $input) {
      docs {
        id
        name
        course {
          id
          name
        }
      }
      total
    }
  }
`;

const AllClassesQuery = gql`
  query AllClassesQuery {
    classes {
      id
      name
      course {
        id
        name
      }
    }
  }
`;

const ClassQuery = gql`
  query ClassQuery($id: ID!) {
    classRoom(id: $id) {
      id
      name
      course {
        id
        name
      }
    }
  }
`;

export { ClassesQuery, ClassQuery, AllClassesQuery };
