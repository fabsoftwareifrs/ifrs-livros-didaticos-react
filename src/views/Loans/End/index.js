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
import { useMutation, useLazyQuery } from "@apollo/client";
import { openMessageBox, useMessageBox } from "src/providers/MessageBox";
import { TERMINATE_LOAN } from "src/graphql/mutations";
import { GET_LOAN_BY_CODE } from "src/graphql/queries";
import Form from "./Form";
import { Field, Status } from "src/reusable";

const initialState = {
  code: "",
  book: "",
  student: "",
  statusId: "",
  start: "",
};

const End = ({ className, ...rest }) => {
  const { dispatch } = useMessageBox();

  const [isVisible, setIsVisible] = useState(false);
  const [state, setState] = useState(initialState);

  const [getLoanByCode, { loading: loadingLoan }] = useLazyQuery(
    GET_LOAN_BY_CODE,
    {
      fetchPolicy: "network-only",
      onCompleted: (response) => {
        const loan = response.getLoanByCode;
        setState({
          id: +loan.id,
          code: loan.copy.code,
          book: loan.copy.book.name,
          student: loan.student.name,
          statusId: +loan.copy.Status.id,
          start: loan.start,
        });
        setIsVisible(true);
      },
      onError: (err) => {
        dispatch(
          openMessageBox({
            type: "error",
            message: err.message,
          })
        );
        setIsVisible(false);
        setState(initialState);
      },
    }
  );

  const onBlur = async ({ target }) => {
    if (target.value.trim() === "") return;
    console.log("chegou aqui");
    await getLoanByCode({ variables: { code: target.value } });
  };

  const [terminate, { loading }] = useMutation(TERMINATE_LOAN, {
    onCompleted: () => {
      dispatch(
        openMessageBox({
          message: "Livro devolvido com sucesso!",
        })
      );
      setIsVisible(false);
      setState(initialState);
    },
    onError: (err) => {
      dispatch(
        openMessageBox({
          type: "error",
          message: err.message,
        })
      );
      setIsVisible(false);
      setState(initialState);
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
      <Field id="1" name="code" onBlur={onBlur} />

      <span id="2" style={{ display: isVisible ? "" : "none" }}>
        {state.book}
      </span>
      <span id="3" style={{ display: isVisible ? "" : "none" }}>
        {state.student}
      </span>
      <Status
        id="4"
        style={{ display: isVisible ? "" : "none" }}
        name="statusId"
      />
      <Field
        id="5"
        style={{ display: isVisible ? "" : "none" }}
        name="observation"
      />
    </Form>
  );
};

export default End;
