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

const LoanDelete = gql`
  mutation LoanDelete($id: ID!) {
    deleteLoan(id: $id) {
      id
    }
  }
`;

const LoanEdit = gql`
  mutation LoanEdit($id: ID!, $input: LoanInput) {
    updateLoan(id: $id, input: $input) {
      id
    }
  }
`;
const LoanCreate = gql`
  mutation LoanCreate($input: LoanInput) {
    createLoan(input: $input) {
      id
    }
  }
`;

const TerminateLoan = gql`
  mutation TerminateLoan($id: ID!, $input: TerminateLoanInput) {
    terminateLoan(id: $id, input: $input) {
      id
    }
  }
`;

const CancelTerminateLoan = gql`
  mutation CancelTerminateLoan($id: ID!) {
    cancelTerminateLoan(id: $id) {
      id
    }
  }
`;

export { LoanCreate, LoanEdit, LoanDelete, TerminateLoan, CancelTerminateLoan };
