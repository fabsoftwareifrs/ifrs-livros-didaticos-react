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
import clsx from "clsx";
import PropTypes from "prop-types";
import { useMutation, useQuery, gql } from "@apollo/client";
import { StudentCreate } from "../../../../graphql/mutations/student";
import { StudentsQuery } from "../../../../graphql/queries/student";
import { AllClassesQuery } from "../../../../graphql/queries/class";
import { AllCoursesQuery } from "../../../../graphql/queries/course";
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
  TextField,
  makeStyles,
  Container,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

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
    setTouched,
    reset,
    setValues,
  } = useMyForm(fields);
  const [mutationCreate] = useMutation(StudentCreate, {
    refetchQueries: [
      {
        query: StudentsQuery,
        variables: { input: { page: 1, paginate: 10, search: "" } },
      },
    ],
  });

  const createStudent = async (data) => {
    await mutationCreate({ variables: { input: data } });
    history.push("/app/students");
  };

  const courses = useQuery(AllCoursesQuery);
  const classesRoom = useQuery(AllClassesQuery);

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
                  {courses.loading ? (
                    ""
                  ) : (
                    <Autocomplete
                      name="courseId"
                      options={courses.data.courses.map(({ id, name }) => ({
                        value: id,
                        label: name,
                      }))}
                      onChange={(event, value) => {
                        if (!value) {
                          handleChange({ name: "courseId", value: "" });
                        } else {
                          handleChange({
                            name: "courseId",
                            value: parseInt(value.value),
                          });
                        }
                      }}
                      getOptionLabel={(option) => option.label}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={input.courseId.label}
                          variant="outlined"
                          error={!!errors.courseId}
                          helperText={
                            !!errors.courseId
                              ? errors.courseId
                              : "Informe o curso do estudante"
                          }
                        />
                      )}
                    />
                  )}
                </Grid>
                <Grid item md={6} xs={12}>
                  {classesRoom.loading ? (
                    ""
                  ) : (
                    <Autocomplete
                      name="classId"
                      options={classesRoom.data.classes.map(({ id, name }) => ({
                        value: id,
                        label: name,
                      }))}
                      onChange={(event, value) => {
                        if (!value) {
                          handleChange({ name: "classId", value: "" });
                        } else {
                          handleChange({
                            name: "classId",
                            value: parseInt(value.value),
                          });
                        }
                      }}
                      getOptionLabel={(option) => option.label}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={input.classId.label}
                          variant="outlined"
                          error={!!errors.classId}
                          helperText={
                            !!errors.classId
                              ? errors.classId
                              : "Informe a turma do estudante"
                          }
                        />
                      )}
                    />
                  )}
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
