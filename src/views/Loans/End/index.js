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
import { Field, Status, FieldEndCode } from "src/reusable";
import { Typography } from "@material-ui/core";

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
            message: "Erro ao obter emprestimos",
          })
        );
        setIsVisible(false);
        setState(initialState);
      },
    }
  );

  const search = async (value) => {
    if (value === "") return;
    await getLoanByCode({ variables: { code: value } });
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
          message: "Erro ao devolver emprestimos",
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

  return (
    <Form
      loading={loading || loadingLoan}
      onSubmit={onSubmit}
      header={{
        subheader: "Você pode devolver um empréstimo.",
        title: "Devolução de empréstimo",
      }}
      className={className}
      data={state}
      {...rest}
    >
      <FieldEndCode name="code" search={search} />
      <Status style={{ display: isVisible ? "" : "none" }} name="statusId" />
      <Field style={{ display: isVisible ? "" : "none" }} name="observation" />
      <Typography
        style={{ display: isVisible ? "" : "none", padding: "0 13px" }}
      >
        Livro: {state.book}
        <br />
        Estudante: {state.student}
      </Typography>
    </Form>
  );
};

export default End;
