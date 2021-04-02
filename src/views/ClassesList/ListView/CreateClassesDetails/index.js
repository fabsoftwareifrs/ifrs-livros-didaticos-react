import React, { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useLazyQuery } from "@apollo/client";
import { ClassesQuery, CoursesQuery } from '../../../../graphql/queries/class'
import { ClassCreate } from '../../../../graphql/mutations/class'
import fields from './fields'
import { Link, useHistory } from 'react-router-dom';
import useMyForm from '../../../../hooks/MyForm'
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
  Select,
  InputLabel
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

import ReactSelect from 'react-select'

const useStyles = makeStyles(() => ({
  root: {}
}));

const ClassDetails = ({ className, create, set, ...rest }) => {
  const classes = useStyles();

  var history = useHistory();

  const [course, setCourse] = useState(null);

  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setTouched,
    reset,
    setValues
  } = useMyForm(fields);

  const [mutationCreate] = useMutation(ClassCreate, {
    refetchQueries: [
      {
        query: ClassesQuery,
        variables: { input: { page: 1, paginate: 10 } }
      }
    ]
  });

  const createClass = (data) => {
    data.course_id = parseInt(data.course_id)
    mutationCreate({ variables: data })
    history.push('/app/classes')
  };

  const { loading, error, data } = useQuery(CoursesQuery);






  return (
    <form
      onSubmit={handleSubmit(createClass)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode cadastrar as informações de uma turma."
          title="Turma"
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
                helperText={!!errors.name ? errors.name : "Informe o nome da turma"}
                label={input.name.label}
                type={input.name.type}
                name="name"
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
              <ReactSelect
                id="autocomplete"
                name="course_id"
                onChange={e => {
                  setCourse(e)
                }}
                options={
                  data &&
                  data.courses &&
                  data.courses.map(({ id, name }) => ({ value: id, label: name }))
                }
                value={course}
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
          <Link to="/app/classes">
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
            Cadastrar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ClassDetails;


/*
<Autocomplete
                name="course_id"
                id="autocomplete"
                options={
                  data &&
                  data.courses &&
                  data.courses.map(({ id, name }) => ({ value: id, label: name }))
                }
                onChange={(event, newValue) => {
                  setCourse(newValue);
                }}
                value={course}
                getOptionLabel={(option) => option.label}
                getOptionSelected={(option, value) => option.id === value.id}
                style={{ width: 300 }}
                renderInput={(params) => 
                  <TextField {...params} 
                              label="Cursos" 
                              variant="outlined" 
                              error={!!errors.course_id}
                              helperText={!!errors.course_id?errors.course_id:"Informe o curso"}
                  />}
              />

*/