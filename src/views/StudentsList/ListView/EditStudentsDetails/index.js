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
import clsx from "clsx";
import { useMutation, useQuery } from "@apollo/client";
import useMyForm from "src/hooks/MyForm";
import { fields } from "./fields";
import { EDIT_STUDENT } from "src/graphql/mutations";
import { StudentsQuery, StudentQuery } from "src/graphql/queries";

import { Link, useHistory, useParams } from "react-router-dom";
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

import { Classes, Courses } from "src/reusable";

const useStyles = makeStyles(() => ({
  root: {},
}));

const StudentDetails = ({ className, ...rest }) => {
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

  const { loading, data } = useQuery(StudentQuery, {
    variables: { id: id },
  });

  var values = {
    name: "",
    email: "",
    matriculation: "",
    course_id: "",
    class_id: "",
  };

  if (!loading) {
    values = {
      id: data.student.id,
      name: data.student.name,
      email: data.student.email,
      matriculation: data.student.matriculation,
      courseId: parseInt(data.student.course.id),
      classId: parseInt(data.student.classes.id),
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

  const [mutationEdit] = useMutation(EDIT_STUDENT, {
    refetchQueries: [
      {
        query: StudentsQuery,
        variables: { input: { page: 1, paginate: 10, search: "" } },
      },
    ],
  });

  const editStudent = async (data) => {
    const { id, ...rest } = data;
    await mutationEdit({ variables: { id: id, input: { ...rest } } });
    history.push("/app/students");
  };

  return (
    <form
      onSubmit={handleSubmit(editStudent)}
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
                  <TextField
                    error={!!errors.name}
                    fullWidth
                    helperText={
                      !!errors.name
                        ? errors.name
                        : "Informe o nome do estudante"
                    }
                    label={input.name.label}
                    name="name"
                    type={input.name.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.name.value}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={!!errors.email}
                    fullWidth
                    helperText={errors.email}
                    label={input.email.label}
                    name="email"
                    type={input.email.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.email.value}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={!!errors.matriculation}
                    fullWidth
                    helperText={errors.matriculation}
                    label={input.matriculation.label}
                    name="matriculation"
                    type={input.matriculation.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.matriculation.value}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Courses
                    onChange={handleChange}
                    field={input.courseId}
                    error={errors.courseId}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Classes
                    onChange={handleChange}
                    field={input.classId}
                    error={errors.classId}
                    courseId={input.courseId.value}
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
                Cadastrar
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </form>
  );
};

export default StudentDetails;
