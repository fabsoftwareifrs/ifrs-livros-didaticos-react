import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import {StudentCreate} from '../../../../graphql/mutations/student'
import {StudentsQuery} from '../../../../graphql/queries/student'
import { ClassesQueryAll, CoursesQuery } from '../../../../graphql/queries/class'
import useMyForm from '../../../../hooks/MyForm'
import fields from './fields'
import { Link, useHistory } from 'react-router-dom';
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

import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
  root: {}
}));

const StudentDetails = ({ className,...rest }) => {
  const classes = useStyles()
  var history= useHistory()

  const [course, setCourse] = useState(null)
  const [classRoom, setClass] = useState(null)

  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setTouched,
    reset,
    setValues
  } = useMyForm(fields);
  const [mutationCreate] = useMutation(StudentCreate, {
    refetchQueries: [
      {
        query: StudentsQuery,
        variables: { input: { page: 1, paginate: 10 } }
      }
    ]
  });
  const createStudent = (data) => {
    data.course_id=parseInt(course['value'])
    data.class_id=parseInt(classRoom['value'])
    mutationCreate({ variables: data })
    history.push('/app/students')
  };

  const courses = useQuery(CoursesQuery);
  const classesRoom = useQuery(ClassesQueryAll);
  

  return (
    <form
      onSubmit={handleSubmit(createStudent)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode cadastrar as informações de um estudante."
          title="Estudante"
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
                helperText={!!errors.name ? errors.name : "Informe o nome do estudante"}
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
                error={!!errors.email}
                fullWidth
                helperText={errors.email}
                label={input.email.label}
                name="email"
                type={input.email.type}
                onChange={({ target }) => handleChange(target)}
                value={input.email.value}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={!!errors.matriculation}
                fullWidth
                helperText={errors.matriculation}
                label={input.matriculation.label}
                name="matriculation"
                type={input.matriculation.type}
                onChange={({ target }) => handleChange(target)}
                value={input.matriculation.value}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Autocomplete
                name="course_id"
                id="autocomplete"
                options={
                  courses.data &&
                  courses.data.courses &&
                  courses.data.courses.map(({ id, name }) => ({ value: id, label: name }))
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
              
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <Autocomplete
                name="class_id"
                id="autocomplete"
                options={
                  classesRoom.data &&
                  classesRoom.data.classes &&
                  classesRoom.data.classes.map(({ id, name }) => ({ value: id, label: name }))
                }
                onChange={(event, newValue) => {
                  setClass(newValue);
                }}
                value={classRoom}
                getOptionLabel={(option) => option.label}
                getOptionSelected={(option, value) => option.id === value.id}
                style={{ width: 300 }}
                renderInput={(params) => 
                  <TextField {...params} 
                              label="Turma" 
                              variant="outlined" 
                              error={!!errors.class_id}
                              helperText={!!errors.class_id?errors.class_id:"Informe a turma"}
                  />}
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
          <Link to="/app/students">
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

export default StudentDetails;
