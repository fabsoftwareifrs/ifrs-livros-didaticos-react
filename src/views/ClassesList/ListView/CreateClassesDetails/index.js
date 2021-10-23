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
import { ClassesQuery } from "../../../../graphql/queries/class";
import { ClassCreate } from "../../../../graphql/mutations/class";
import fields from "./fields";
import { Link, useHistory } from "react-router-dom";
import useMyForm from "../../../../hooks/MyForm";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Container,
} from "@material-ui/core";

import { Courses } from "src/reusable";

const useStyles = makeStyles(() => ({
  root: {},
}));

const ClassDetails = ({ className, create, set, ...rest }) => {
  const classes = useStyles();

  var history = useHistory();

  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
  } = useMyForm(fields);

  const [mutationCreate] = useMutation(ClassCreate, {
    refetchQueries: [
      {
        query: ClassesQuery,
        variables: { input: { page: 1, paginate: 10, search: "" } },
      },
    ],
  });

  const createClass = async (data) => {
    await mutationCreate({ variables: { input: data } });
    history.push("/app/classes");
  };

  return (
    <form
      onSubmit={handleSubmit(createClass)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardHeader
              subheader="Você pode cadastrar as informações de uma turma."
              title="Turma"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Courses
                    onChange={handleChange}
                    field={input.courseId}
                    error={errors.courseId}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={!!errors.name}
                    fullWidth
                    helperText={
                      !!errors.name
                        ? errors.name
                        : "Informe o nome da turma. Ex: 1º ano"
                    }
                    label={input.name.label}
                    type={input.name.type}
                    name="name"
                    onChange={({ target }) => handleChange(target)}
                    value={input.name.value}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Link to="/app/classes">
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
                Cadastrar
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </form>
  );
};

export default ClassDetails;
