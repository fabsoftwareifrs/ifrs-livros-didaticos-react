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

import { useMutation } from "@apollo/client";
import { IMPORT_BOOKS } from "src/graphql/mutations";
import { openMessageBox, useMessageBox } from "src/providers/MessageBox";
import { useParams, useHistory } from "react-router-dom";
import Form from "./Form";

const Import = ({ className, ...rest }) => {
  const { id } = useParams();
  const { push } = useHistory();
  const { dispatch } = useMessageBox();

  const [importBooks, { loading: loadingedit }] = useMutation(IMPORT_BOOKS, {
    onCompleted: () => {
      dispatch(
        openMessageBox({
          message: "Livros importados com sucesso!",
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
    const { file } = input;
    await importBooks({ variables: { id: +id, input: { file: file[0] } } });
  };

  return (
    <Form
      header={{
        subheader: "Você pode importar os livros.",
        title: "Livro",
      }}
      loading={loadingedit}
      onSubmit={onSubmit}
      className={className}
      {...rest}
    />
  );
};

export default Import;
