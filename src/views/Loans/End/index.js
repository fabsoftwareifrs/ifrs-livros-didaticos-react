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

import React, { useState } from "react";
import { useHistory } from "react-router";
import { useMutation, useLazyQuery } from "@apollo/client";
import { openMessageBox, useMessageBox } from "src/providers/MessageBox";
import { TERMINATE_LOAN } from "src/graphql/mutations";
import { GET_LOAN_BY_CODE } from "src/graphql/queries";
import Form from "./Form";
//import { usePeriod } from "src/providers/Period";
import { Field, Status } from "src/reusable";

const End = ({ className, ...rest }) => {
  const { dispatch } = useMessageBox();
  const { push } = useHistory();

  const [isVisible, setIsVisible] = useState(false);

  //const [period] = usePeriod();

  const [state, setState] = useState({
    book: "",
    student: "",
    start: "",
    end: "",
  });

  const [getLoanByCode, { loading: loadingLoan }] = useLazyQuery(
    GET_LOAN_BY_CODE,
    {
      onCompleted: (response) => {
        const loan = response.getLoanByCode;
        setState({
          id: +loan.id,
          code: loan.copy.code,
          book: loan.copy.book.name,
          student: loan.student.name,
          statusId: +loan.copy.Status.id,
        });
        setIsVisible(true);
      },
      onError: (err) => {
        setIsVisible(false);
        dispatch(
          openMessageBox({
            type: "error",
            message: err.message,
          })
        );
      },
    }
  );

  const onBlur = async ({ target }) => {
    if (target.value.trim() === "") return;
    await getLoanByCode({ variables: { code: target.value } });
  };

  const [terminate, { loading }] = useMutation(TERMINATE_LOAN, {
    onCompleted: () => {
      dispatch(
        openMessageBox({
          message: "Livro devolvido com sucesso!",
        })
      );
      push("/app/loans");
    },
    onError: (err) => {
      dispatch(
        openMessageBox({
          type: "error",
          message: err.message,
        })
      );
    },
  });

  const onSubmit = async (input) => {
    const { code, ...rest } = input;
    await terminate({ variables: { id: state.id, input: { ...rest } } });
  };

  if (loadingLoan) return <p>Loading ...</p>;

  return (
    <Form
      loading={loading}
      onSubmit={onSubmit}
      header={{
        subheader: "Você pode cadastrar as informações de um empréstimo.",
        title: "Empréstimo",
      }}
      className={className}
      data={state}
      {...rest}
    >
      <Field name="code" onBlur={onBlur} />

      <span style={{ display: isVisible ? "" : "none" }}>{state.book}</span>
      <span style={{ display: isVisible ? "" : "none" }}>{state.student}</span>
      <Status style={{ display: isVisible ? "" : "none" }} name="statusId" />
      <Field style={{ display: isVisible ? "" : "none" }} name="observation" />
    </Form>
  );
};

export default End;
