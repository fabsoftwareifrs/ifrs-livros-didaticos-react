import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import {CourseCreate} from '../../../../graphql/mutations/course'
import { Link, useHistory } from 'react-router-dom';
import { CoursesQuery } from 'src/graphql/queries/course';
import useMyForm from '../../../../hooks/MyForm'
import fields from './fields'
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



const useStyles = makeStyles(() => ({
  root: {}
}));

const CourseDetails = ({ className,...rest }) => {
  const classes = useStyles();
  var history= useHistory()
  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setTouched,
    reset,
    setValues
  } = useMyForm(fields);
  
  const [mutationCreate] = useMutation(CourseCreate,{
    
    refetchQueries: [
      { query: CoursesQuery,
       variables: { page:1, limit:10 }
       }
    ]
  });  
  
  const createCourse = async (data) => {
    await mutationCreate({ variables: data })
    history.push('/app/course')

  };

  

  return (
    <form
    onSubmit={handleSubmit(createCourse)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode cadastrar as informações de curso."
          title="Curso"
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
                helperText={!!errors.name?errors.name:"Informe o nome do curso"}
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
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Link to="/app/course">
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



export default CourseDetails;
