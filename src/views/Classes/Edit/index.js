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

import React, { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link, useHistory, useParams } from "react-router-dom";
import clsx from "clsx";

import { ClassQuery, ClassesQuery } from "src/graphql/queries";
import { EDIT_CLASSROOM } from "src/graphql/mutations";
import useMyForm from "src/hooks/MyForm";

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

import { fields } from "./fields";

const useStyles = makeStyles(() => ({
  root: {},
}));

const ClassDetails = ({ className, details, edit, set, ...rest }) => {
  const classes = useStyles();
  var history = useHistory();

  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setValues,
  } = useMyForm(fields);

  var { id } = useParams();

  const { loading, data } = useQuery(ClassQuery, {
    variables: { id: id },
  });

  var values = {
    name: "",
    course_id: "",
  };

  if (!loading) {
    values = {
      id: data.classRoom.id,
      name: data.classRoom.name,
      courseId: parseInt(data.classRoom.course.id),
    };
  }

  const onCompleted = useCallback(
    (response) => {
      setValues(values);
    },
    [setValues]
  );
  useEffect(() => {
    onCompleted();
  }, [loading]);

  const [mutationEdit] = useMutation(EDIT_CLASSROOM, {
    refetchQueries: [
      {
        query: ClassesQuery,
        variables: { input: { page: 1, paginate: 10, search: "" } },
      },
    ],
  });

  const editClass = async (data) => {
    const { id, ...rest } = data;
    await mutationEdit({ variables: { id: id, input: { ...rest } } });
    history.push("/app/classes");
  };

  return (
    <form
      onSubmit={handleSubmit(editClass)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardHeader
              subheader="Você pode editar as informações da turma."
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
                  <input type="hidden" name="id" value={id} />
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
                Editar
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </form>
  );
};

export default ClassDetails;
