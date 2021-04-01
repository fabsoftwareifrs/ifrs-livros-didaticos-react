import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useMutation, useQuery, gql } from '@apollo/client';
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

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ClassDetails = ({ className, create, set, ...rest }) => {
  const classes = useStyles();

  var history = useHistory();

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

  //const { loading, error, data } = useQuery(CoursesQuery);

  //if (loading) return 'Loading...';
  //if (error) return `Error! ${error.message}`;

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
              <TextField
                error={!!errors.course_id}
                fullWidth
                helperText={!!errors.course_id ? errors.course_id : "Informe o nome da turma"}
                label={input.course_id.label}
                type={input.course_id.type}
                name="course_id"
                onChange={({ target }) => handleChange(target)}
                value={input.course_id.value}
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

  <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Curso</InputLabel>
                <Select
                  error={!!errors.courseId}
                  helperText={errors.courseId}
                  label={input.courseId.label}
                  type={input.courseId.type}
                  id="select"
                  onChange={handleChange}
                  name="course_id"
                  value={input.courseId.value}
                >
                  {data.courses.map((course) => (
                    <MenuItem value={course.id}>{course.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

*/
