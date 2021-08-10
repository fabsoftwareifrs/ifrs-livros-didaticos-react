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
import PropTypes from "prop-types";
import { useMutation, useQuery, gql } from "@apollo/client";
import { CategoryEdit } from "../../../../graphql/mutations/category";
import useMyForm from "../../../../hooks/MyForm";
import fields from "./fields";
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
import { CategoryQuery, CategoriesQuery } from "src/graphql/queries/category";
import { Link, useParams, useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {},
}));

const CategoryDetails = ({ className, ...rest }) => {
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
  var { id } = useParams();
  const { loading, error, data } = useQuery(CategoryQuery, {
    variables: { id: id },
  });
  var values = {
    name: "",
  };
  if (!loading) {
    values = data.category;
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

  const [mutationEdit] = useMutation(CategoryEdit, {
    refetchQueries: [
      {
        query: CategoriesQuery,
        variables: { input: { page: 1, paginate: 10, search: "" } },
      },
    ],
  });
  const editCategory = async (data) => {
    const { id, ...rest } = data;
    await mutationEdit({ variables: { id: data.id, input: { ...rest } } });
    history.push("/app/category");
  };

  return (
    <form
      onSubmit={handleSubmit(editCategory)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardHeader
              subheader="Você pode editar as informações da categoria."
              title="Categoria de Livro"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <input type="hidden" name="id" value={id} />
                  <TextField
                    error={!!errors.name}
                    fullWidth
                    helperText={
                      !!errors.name
                        ? errors.name
                        : "Informe o nome da categoria do livro"
                    }
                    label={input.name.label}
                    name="name"
                    type={input.name.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.name.value}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Link to="/app/category">
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

export default CategoryDetails;
