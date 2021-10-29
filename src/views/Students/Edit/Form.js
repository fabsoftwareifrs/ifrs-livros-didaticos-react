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
import { Link } from "react-router-dom";
import clsx from "clsx";

import useMyForm from "src/hooks/MyForm";

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

import { Classes, Courses, Field } from "src/reusable";

import fields from "./fields";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Form = ({
  header,
  labelButtonSubmit,
  labelButtonCancel,
  onSubmit,
  loading,
  data = {},
  className,
  ...rest
}) => {
  const classes = useStyles();

  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
  } = useMyForm(fields, data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardHeader {...header} />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Field
                    name="name"
                    field={input.name}
                    error={errors.name}
                    onChange={({ target }) => handleChange(target)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    name="email"
                    field={input.email}
                    error={errors.email}
                    onChange={({ target }) => handleChange(target)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    name="matriculation"
                    field={input.matriculation}
                    error={errors.matriculation}
                    onChange={({ target }) => handleChange(target)}
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
                  {labelButtonCancel || "Cancelar"}
                </Button>
              </Link>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={loading}
              >
                {labelButtonSubmit || "Salvar"}
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </form>
  );
};

export default Form;
