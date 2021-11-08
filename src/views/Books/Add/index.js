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

import React from "react";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import { openMessageBox, useMessageBox } from "src/providers/MessageBox";
import { ADD_BOOK } from "src/graphql/mutations";
import Form from "./Form";

const Add = ({ className, ...rest }) => {
  const { push } = useHistory();
  const { dispatch } = useMessageBox();

  const [add, { loading }] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      dispatch(
        openMessageBox({
          message: "Livro cadastrado com sucesso!",
        })
      );
      push("/app/books");
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
    await add({ variables: { input } });
  };

  return (
    <Form
      loading={loading}
      onSubmit={onSubmit}
      header={{
        subheader: "Você pode cadastrar as informações de um livro.",
        title: "Livro",
      }}
      className={className}
      {...rest}
    />
  );
};

export default Add;
