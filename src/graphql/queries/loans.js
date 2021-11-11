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

export const GET_LOAN_BY_CODE = gql`
  query getLoanByCode($code: String!) {
    getLoanByCode(code: $code) {
      id
      student {
        name
      }
      copy {
        id
        code
        Status {
          id
        }
        book {
          name
        }
      }
    }
  }
`;

export const GET_ALL_LOANS_BY_PERIOD_ID = gql`
  query getAllLoansByPeriodId(
    $periodId: Int!
    $pagination: PaginateInput!
    $late: Boolean
  ) {
    getAllLoansByPeriodId(
      periodId: $periodId
      pagination: $pagination
      late: $late
    ) {
      docs {
        id
        late
        delivered
        end
        student {
          id
          name
          email
          matriculation
        }
        copy {
          id
          code
          Status {
            id
            name
          }
          book {
            id
            name
          }
        }
        period {
          id
          name
          start
          end
        }
      }
      total
    }
  }
`;

export const LoansQuery = gql`
  query LoansQuery($input: PaginateInput!, $late: Boolean!) {
    paginateLoans(input: $input, late: $late) {
      docs {
        id
        late
        delivered
        end
        student {
          id
          name
          email
          matriculation
        }
        copy {
          id
          code
          Status {
            id
            name
          }
          book {
            id
            name
          }
        }
        period {
          id
          name
          start
          end
        }
      }
      total
    }
  }
`;
export const LoanQuery = gql`
  query LoanQuery($id: ID!) {
    loan(id: $id) {
      id
      late
      delivered
      student {
        id
        name
        email
        matriculation
      }
      copy {
        id
        code
        Status {
          id
          name
        }
      }
      period {
        id
        name
        start
        end
      }
    }
  }
`;
