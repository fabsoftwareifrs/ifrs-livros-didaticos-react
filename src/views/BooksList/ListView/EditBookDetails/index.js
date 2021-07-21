import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation, useQuery, gql } from '@apollo/client';
import { BooksEdit } from '../../../../graphql/mutations/book'
import useMyForm from '../../../../hooks/MyForm'
import fields from './fields'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AllCategoriesQuery } from '../../../../graphql/queries/category'
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
  Container
} from '@material-ui/core';
import { BookQuery, BooksQuery } from 'src/graphql/queries/book';
import { Link, useParams, useHistory } from "react-router-dom";


const useStyles = makeStyles(() => ({
  root: {}
}));

const BookDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  var history = useHistory()
  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setTouched,
    reset,
    setValues
  } = useMyForm(fields);
  var { id } = useParams();
  const { loading, error, data } = useQuery(BookQuery, {
    variables: { id: id },
  });
  var values = {
    name: "",
    author: "",
    volume: "",
    categoryId: ""
  }
  if (!loading) {
    values = { categoryId: parseInt(data.book.category.id), ...data.book }
  }
  const onCompleted = useCallback(
    (response) => {
      setValues(values);
    },
    [setValues]
  );
  useEffect(() => {
    onCompleted()
  }, [loading])



  const [mutationEdit] = useMutation(BooksEdit, {
    refetchQueries: [
      {
        query: BooksQuery,
        variables: { input: { page: 1, paginate: 10 } }
      }
    ]
  });
  const editBook = async (data) => {
    const { id, ...rest } = data
    await mutationEdit({ variables: { id: data.id, input: { ...rest } } })
    history.push('/app/books')
  };
  const categories = useQuery(AllCategoriesQuery);


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
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <input type="hidden" name="id" value={id} />
                  <TextField
                    error={!!errors.name}
                    fullWidth
                    helperText={!!errors.name ? errors.name : "Informe o título do livro"}
                    label={input.name.label}
                    name="name"
                    type={input.name.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.name.value}
                    variant="outlined"
                  />

                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={!!errors.author}
                    fullWidth
                    helperText={errors.author}
                    label={input.author.label}
                    name="author"
                    type={input.author.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.author.value}
                    variant="outlined"
                  />
                </Grid>

                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={!!errors.volume}
                    fullWidth
                    helperText={errors.volume}
                    label={input.volume.label}
                    name="volume"
                    type={input.volume.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.volume.value}
                    variant="outlined"
                  />
                </Grid>

                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  {categories.loading ? "" :
                    <Autocomplete
                      name="categoryId"
                      options={
                        categories.data.categories.map(({ id, name }) => ({ value: id, label: name }))
                      }
                      onChange={(event, value) => {
                        if (!value) {
                          handleChange({ name: "categoryId", value: "" })
                        } else {
                          handleChange({ name: "categoryId", value: parseInt(value.value) })
                        }
                      }}
                      value={input.categoryId.value == "" ? { value: "", label: "" } : { value: "" + input.categoryId.value, label: categories.data.categories.find(s => s.id === "" + input.categoryId.value).name }}
                      getOptionLabel={(option) => option.label}
                      getOptionSelected={(option, value) => option.id === value.id}
                      renderInput={(params) =>
                        <TextField {...params}
                          label={input.categoryId.label}
                          variant="outlined"
                          fullWidth
                          error={!!errors.categoryId}
                          helperText={!!errors.categoryId ? errors.categoryId : "Informe a categoria"}
                        />}
                    />
                  }
                </Grid>

              </Grid>
            </CardContent>
            <Divider />
            <Box
              display="flex"
              justifyContent="flex-end"
              p={2}
            >
              <Link to="/app/books">
                <Button
                  style={{ marginRight: 10, backgroundColor: "#8B0000", color: '#fff' }}
                  variant="contained"
                >
                  Cancelar
                </Button>
              </Link>
              <Button
                color="primary"
                variant="contained"
                type="submit"

              >
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
