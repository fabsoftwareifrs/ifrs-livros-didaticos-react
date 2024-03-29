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
import { EDIT_STATUS } from "src/graphql/mutations";
import { GET_STATUS_BY_ID } from "src/graphql/queries";
import { openMessageBox, useMessageBox } from "src/providers/MessageBox";
import { useParams, useHistory } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import Form from "./Form";

const Edit = ({ className, ...rest }) => {
  const { id } = useParams();
  const { push } = useHistory();
  const { dispatch } = useMessageBox();
  const [state, setState] = useState({});
  const [loading, isLoading] = useState(true);

  useQuery(GET_STATUS_BY_ID, {
    variables: { id: +id },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ getStatusById }) => {
      setState(getStatusById);
      isLoading(false);
    },
  });

  const [edit, { loading: loadingEdit }] = useMutation(EDIT_STATUS, {
    onCompleted: () => {
      dispatch(
        openMessageBox({
          message: "Estado alterado com sucesso!",
        })
      );
      push("/app/statuses");
    },
    onError: (err) => {
      dispatch(
        openMessageBox({
          type: "error",
          message: "Erro ao alterar estado",
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
        subheader: "Você pode alterar as informações de estado dos exemplares.",
        title: "estados de exemplares",
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
