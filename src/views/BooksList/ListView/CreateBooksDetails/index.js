import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import {BooksCreate} from '../../../../graphql/mutations/book'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { BooksQuery } from 'src/graphql/queries/book';
import useMyForm from '../../../../hooks/MyForm'
import fields from './fields'

const useStyles = makeStyles(() => ({
  root: {}
}));

const BookDetails = ({ className, ...rest }) => {
  var history= useHistory()
  const classes = useStyles();
  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setTouched,
    reset,
    setValues
  } = useMyForm(fields);
  
  const [mutationCreate] = useMutation(BooksCreate,{
    
    refetchQueries: [
      { query: BooksQuery,
       variables: { page:1, limit:10 }
       }
    ]
  });  
  
  const createBook = async (data) => {
    
    data.quantity=parseInt(data.quantity)
    await mutationCreate({ variables: data })
    history.push('/app/books')

  };

  return (
    <form
      onSubmit={handleSubmit(createBook)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode cadastrar as informações de um livro."
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
              <TextField
                error={!!errors.name}
                fullWidth
                helperText={!!errors.name?errors.name:"Informe o título do livro"}
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
                label={input.name.label}
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
                error={!!errors.code}
                fullWidth
                helperText={errors.code}
                label={input.code.label}
                name="code"
                type={input.code.type}
                onChange={({ target }) => handleChange(target)}
                value={input.code.value}
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
              <TextField
                error={!!errors.quantity}
                fullWidth
                helperText={errors.quantity}
                label={input.quantity.label}
                name="quantity"
                type={input.quantity.type}
                onChange={({ target }) => handleChange(target)}
                value={input.quantity.value}
                variant="outlined"
              />
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
            style={{marginRight:10,backgroundColor:"#8B0000",color:'#fff'}}
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
            Cadastrar
          </Button>
        </Box>
      </Card>
    </form>
  );
};



export default BookDetails;
