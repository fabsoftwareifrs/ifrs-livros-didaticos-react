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
import { Link, useParams, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import clsx from "clsx";

import { BookQuery, BooksQuery } from "src/graphql/queries";
import { EDIT_BOOK } from "src/graphql/mutations";
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

import { Categories } from "src/reusable";

import { fields } from "./fields";

const useStyles = makeStyles(() => ({
  root: {},
}));

const BookDetails = ({ className, ...rest }) => {
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
  const { loading, data } = useQuery(BookQuery, {
    variables: { id: id },
  });
  var values = {
    name: "",
    author: "",
    volume: "",
    categoryId: "",
  };
  if (!loading) {
    values = { categoryId: parseInt(data.book.category.id), ...data.book };
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

  const [mutationEdit] = useMutation(EDIT_BOOK, {
    refetchQueries: [
      {
        query: BooksQuery,
        variables: { input: { page: 1, paginate: 10, search: "" } },
      },
    ],
  });
  const editBook = async (data) => {
    const { id, ...rest } = data;
    await mutationEdit({ variables: { id: data.id, input: { ...rest } } });
    history.push("/app/books");
  };

  return (
    <form
      onSubmit={handleSubmit(editBook)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardHeader
              subheader="Você pode editar as informações do livro."
              title="Livro"
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
                      !!errors.name ? errors.name : "Informe o título do livro"
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
                    error={!!errors.author}
                    fullWidth
                    helperText={
                      !!errors.author
                        ? errors.author
                        : "Informe o autor do livro"
                    }
                    label={input.author.label}
                    name="author"
                    type={input.author.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.author.value}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={!!errors.volume}
                    fullWidth
                    helperText={
                      !!errors.volume
                        ? errors.volume
                        : "Informe o volume do livro"
                    }
                    label={input.volume.label}
                    name="volume"
                    type={input.volume.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.volume.value}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Categories
                    onChange={handleChange}
                    field={input.categoryId}
                    error={errors.categoryId}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Link to="/app/books">
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

export default BookDetails;
