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
import { IMPORT_STUDENTS } from "src/graphql/mutations";
import { openMessageBox, useMessageBox } from "src/providers/MessageBox";
import { useParams, useHistory } from "react-router-dom";
import Form from "./Form";

const Import = ({ className, ...rest }) => {
  const { id } = useParams();
  const { push } = useHistory();
  const { dispatch } = useMessageBox();

  const [importStudents, { loading: loadingedit }] = useMutation(
    IMPORT_STUDENTS,
    {
      onCompleted: () => {
        dispatch(
          openMessageBox({
            message: "Estudantes importados com sucesso!",
          })
        );
        push("/app/students");
      },
      onError: (err) => {
        dispatch(
          openMessageBox({
            type: "error",
            message: "Erro ao importar estudante",
          })
        );
      },
    }
  );
  const onSubmit = async (input) => {
    const { file } = input;
    await importStudents({ variables: { id: +id, input: { file: file[0] } } });
  };

  return (
    <Form
      header={{
        subheader: "Você pode importar os estudantes.",
        title: "Estudante",
      }}
      loading={loadingedit}
      onSubmit={onSubmit}
      className={className}
      {...rest}
    />
  );
};

export default Import;
