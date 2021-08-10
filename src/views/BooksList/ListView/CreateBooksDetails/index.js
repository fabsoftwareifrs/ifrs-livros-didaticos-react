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
import { BooksCreate } from "../../../../graphql/mutations/book";
import { CopyCreate } from "../../../../graphql/mutations/copy";
import { AllCategoriesQuery } from "../../../../graphql/queries/category";
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
import { Link, useHistory } from "react-router-dom";
import { BooksQuery } from "src/graphql/queries/book";
import useMyForm from "../../../../hooks/MyForm";
import fields from "./fields";

const useStyles = makeStyles(() => ({
  root: {},
}));

const BookDetails = ({ className, ...rest }) => {
  var history = useHistory();
  const classes = useStyles();
  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setTouched,
    reset,
    setValues,
  } = useMyForm(fields);

  const [mutationCreate] = useMutation(BooksCreate, {
    refetchQueries: [
      {
        query: BooksQuery,
        variables: { input: { page: 1, paginate: 10, search: "" } },
      },
    ],
  });
  const [mutationCreateCopy] = useMutation(CopyCreate);
  const categories = useQuery(AllCategoriesQuery);
  const createBook = async (data) => {
    var { quantity } = data;
    quantity = parseInt(quantity);
    delete data.quantity;

    let book = await mutationCreate({ variables: { input: data } });
    for (let i = 0; i < quantity; i++) {
      await mutationCreateCopy({
        variables: {
          input: {
            status: "AVAILABLE",
            bookId: parseInt(book.data.createBook.id),
          },
        },
      });
    }
    history.push("/app/books");
  };

  return (
    <form
      onSubmit={handleSubmit(createBook)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardHeader
              subheader="Você pode cadastrar as informações de um livro."
              title="Livro"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
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
                  {categories.loading ? (
                    ""
                  ) : (
                    <Autocomplete
                      name="categoryId"
                      options={categories.data.categories.map(
                        ({ id, name }) => ({ value: id, label: name })
                      )}
                      onChange={(event, value) => {
                        if (!value) {
                          handleChange({ name: "categoryId", value: "" });
                        } else {
                          handleChange({
                            name: "categoryId",
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
                          label={input.categoryId.label}
                          variant="outlined"
                          fullWidth
                          error={!!errors.categoryId}
                          helperText={
                            !!errors.categoryId
                              ? errors.categoryId
                              : "Informe a categoria do livro"
                          }
                        />
                      )}
                    />
                  )}
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Informe a quantidade de exemplares do livro"
                    label={input.quantity.label}
                    name="quantity"
                    type={input.quantity.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.quantity.value}
                    variant="outlined"
                    inputProps={{ min: 0 }}
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
                Cadastrar
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </form>
  );
};

export default BookDetails;
