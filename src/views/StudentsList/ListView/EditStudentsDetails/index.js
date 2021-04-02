import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation, useQuery, gql } from '@apollo/client';
import useMyForm from '../../../../hooks/MyForm'
import fields from './fields'
import {StudentEdit} from '../../../../graphql/mutations/student'
import {StudentsQuery, StudentQuery} from '../../../../graphql/queries/student'
import { ClassesQueryAll, CoursesQuery } from '../../../../graphql/queries/class'
import { Link, useHistory, useParams } from 'react-router-dom';
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

import ReactSelect from 'react-select'

const useStyles = makeStyles(() => ({
  root: {}
}));

const StudentDetails = ({ className, ...rest }) => {
  const classes = useStyles();
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
  var { id } = useParams();

  const coursesQuery = useQuery(CoursesQuery)
  const classesQuery = useQuery(ClassesQueryAll)

  const { loading, error, data } = useQuery(StudentQuery, {
    variables: { id: id },
  });



  var values= {
    name:"",
    email:"",
    matriculation:"",
    course_id:1,
    class_id:1
  }
  if (!loading) {
    console.log(data)
    values=data.student

    var courseDefault = {
      value:values.courses.id,
      label:values.courses.name
    }

    var classDefault = {
      value:values.classes.id,
      label:values.classes.name
    }

  }
  const onCompleted = useCallback(
    (response) => {
      setValues(values)
      setCourse(courseDefault)
      setClass(classDefault)
    },
    [setValues]
  );
  useEffect(() => {
    onCompleted()
  },[values])
  
  const [mutationEdit] = useMutation(StudentEdit,{
    refetchQueries: [
      {
        query: StudentsQuery,
        variables: { input: { page: 1, paginate: 10 } }
      }
    ]
  });
  const editStudent = async (data) => {
    data.course_id=parseInt(course['value'])
    data.class_id=parseInt(classRoom['value'])
    await mutationEdit({ variables: data })
    history.push('/app/students')
  };

  const courses = coursesQuery.data
  const classesRoom = classesQuery.data
 

  return (
    <form
      onSubmit={handleSubmit(editStudent)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode editar as informações de um estudante."
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
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={!!errors.name}
                  fullWidth
                  helperText={!!errors.name?errors.name:"Informe o nome do estudante"}
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
                <ReactSelect
                  id="autocomplete"
                  name="course_id"
                  onChange={e => {
                    setCourse(e)
                  }}
                  options={
                    courses &&
                    courses.courses &&
                    courses.courses.map(({ id, name }) => ({ value: id, label: name }))
                  }
                  value={course}
                />
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <ReactSelect
                  id="autocomplete"
                  name="class_id"
                  onChange={e => {
                    setClass(e)
                  }}
                  options={
                    classesRoom &&
                    classesRoom.classes &&
                    classesRoom.classes.map(({ id, name }) => ({ value: id, label: name }))
                  }
                  value={classRoom}
                />
              </Grid>
            
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
            Editar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default StudentDetails;
