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
import clsx from "clsx";
import { useMutation } from "@apollo/client";
import { IMPORT_STUDENTS } from "../../../../graphql/mutations/students";
import useMyForm from "../../../../hooks/MyForm";
import fields from "./fields";
import { Link, useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  Container,
} from "@material-ui/core";
import { UploadInput } from "src/reusable";

const useStyles = makeStyles(() => ({
  root: {},
}));

const StudentDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  var { push } = useHistory();

  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
  } = useMyForm(fields);
  const [mutationCreate] = useMutation(IMPORT_STUDENTS, {
    onCompleted: () => {
      push("/app/students");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const createStudent = async (data) => {
    const { file } = data;
    const d = await mutationCreate({ variables: { input: { file: file[0] } } });
    console.log(d);
  };

  return (
    <form
      onSubmit={handleSubmit(createStudent)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardHeader
              subheader="Você pode cadastrar as informações de um estudante."
              title="Estudante"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <UploadInput
                    name="file"
                    field={input.file}
                    error={errors.file}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Link to="/app/students">
                <Button
                  style={{
                    marginRight: 10,
                    backgroundColor: "#8B0000",
                    color: "#fff",
                  }}
                  variant="contained"
                >
                  Cancelar
                </Button>
              </Link>
              <Button color="primary" variant="contained" type="submit">
                Importar
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </form>
  );
};

export default StudentDetails;
