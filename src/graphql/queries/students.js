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

export const StudentsQuery = gql`
  query StudentsQuery($input: PaginateInput!) {
    paginateStudents(input: $input) {
      docs {
        id
        name
        email
        matriculation
        course {
          id
          name
        }
        classes {
          id
          name
        }
      }
      total
    }
  }
`;

export const AllStudentsQuery = gql`
  query AllStudentsQuery {
    students {
      id
      name
      email
      matriculation
      course {
        id
        name
      }
      classes {
        id
        name
      }
    }
  }
`;

export const StudentQuery = gql`
  query StudentQuery($id: ID!) {
    student(id: $id) {
      id
      name
      email
      matriculation
      course {
        id
        name
      }
      classes {
        id
        name
      }
    }
  }
`;
