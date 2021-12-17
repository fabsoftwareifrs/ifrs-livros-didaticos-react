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

import { ADD_CATEGORY } from "src/graphql/mutations";
import Form from "./Form";
import { openMessageBox, useMessageBox } from "src/providers/MessageBox";

const Add = ({ className, ...rest }) => {
  const { push } = useHistory();
  const { dispatch } = useMessageBox();

  const [add, { loading }] = useMutation(ADD_CATEGORY, {
    onCompleted: () => {
      dispatch(
        openMessageBox({
          message: "Categoria cadastrada com sucesso!",
        })
      );
      push("/app/categories");
    },
    onError: (err) => {
      dispatch(
        openMessageBox({
          type: "error",
          message: "Erro ao cadastrar categoria",
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
        subheader: "Você pode cadastrar as informações de categoria de livro.",
        title: "Categoria de Livro",
      }}
      className={className}
      {...rest}
    />
  );
};

export default Add;
