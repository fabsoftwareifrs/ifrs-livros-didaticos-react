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
import { EDIT_COURSE } from "src/graphql/mutations";
import useMyForm from "src/hooks/MyForm";
import { fields } from "./fields";
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
import { Field } from "src/reusable";

import { CourseQuery } from "src/graphql/queries/courses";
import { Link, useParams, useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {},
}));

const CourseDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  var { push } = useHistory();
  var { id } = useParams();
  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setTouched,
    setValues,
  } = useMyForm(fields);

  const { loading, data } = useQuery(CourseQuery, {
    variables: { id: id },
    fetchPolicy: "cache-and-network",
  });
  var values = {
    name: "",
  };
  if (!loading) {
    values = data.course;
  }
  const onCompleted = useCallback(
    (response) => {
      setValues(values);
    },
    [setValues]
  );
  useEffect(() => {
    onCompleted();
  }, [values]);

  const [edit] = useMutation(EDIT_COURSE);
  const editCourse = async (data) => {
    const { ...rest } = data;
    await edit({ variables: { id: +id, input: { ...rest } } });
    push("/app/course");
  };

  return (
    <form
      onSubmit={handleSubmit(editCourse)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardHeader
              subheader="Você pode editar as informações de curso."
              title="Curso"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Field
                    name="name"
                    field={input.name}
                    error={errors.name}
                    onFocus={({ target }) => setTouched(target)}
                    onChange={({ target }) => handleChange(target)}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Link to="/app/course">
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

export default CourseDetails;
