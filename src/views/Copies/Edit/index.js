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

import { useMutation, useQuery } from "@apollo/client";
import { EDIT_COPY } from "src/graphql/mutations";
import { CopyQuery } from "src/graphql/queries";
import { Backdrop, CircularProgress } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import Form from "./Form";
import { openMessageBox, useMessageBox } from "src/providers/MessageBox";

const Edit = ({ className, ...rest }) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [state, setState] = useState({});
  const [loading, isLoading] = useState(true);
  const { dispatch } = useMessageBox();

  useQuery(CopyQuery, {
    variables: { id: +id },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ copy }) => {
      setState({ ...copy, bookId: +copy.book.id, statusId: +copy.Status.id });
      isLoading(false);
    },
  });

  const [edit, { loading: loadingEdit }] = useMutation(EDIT_COPY, {
    onCompleted: () => {
      dispatch(
        openMessageBox({
          message: "Exemplar alterado com sucesso!",
        })
      );
      push(`/app/books/${state.bookId}/copies`);
    },
    onError: (err) => {
      dispatch(
        openMessageBox({
          type: "error",
          message: "Erro ao editar exemplar",
        })
      );
    },
  });
  const onSubmit = async (input) => {
    await edit({ variables: { id: +id, input } });
  };

  if (loading) {
    return (
      <Backdrop
        sx={{
          color: "#17882c",
          backgroundColor: "rgb(255 255 255 / 50%)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress disableShrink color="inherit" />
      </Backdrop>
    );
  }
  return (
    <Form
      header={{
        subheader: "Você pode alterar as informações do exemplar do livro.",
        title: "Exemplar",
      }}
      loading={loadingEdit || loading}
      onSubmit={onSubmit}
      data={state}
      className={className}
      {...rest}
    />
  );
};

export default Edit;
