import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation, useQuery, gql } from '@apollo/client';
import useMyForm from '../../../../hooks/MyForm'
import fields from './fields'
import { StudentEdit } from '../../../../graphql/mutations/student'
import { StudentsQuery, StudentQuery } from '../../../../graphql/queries/student'
import { AllClassesQuery } from '../../../../graphql/queries/class'
import { AllCoursesQuery } from '../../../../graphql/queries/course'
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
  makeStyles,
  Container
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
  root: {}
}));

const StudentDetails = ({ className, ...rest }) => {

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

  const { loading, error, data } = useQuery(StudentQuery, {
    variables: { id: id },
  });

  const courses = useQuery(AllCoursesQuery)
  const classesRoom = useQuery(AllClassesQuery)

  console.log(classesRoom)

  var values = {
    name: "",
    email: "",
    matriculation: "",
    course_id: "",
    class_id: ""
  }

  if (!loading) {
    values = { id: data.student.id, name: data.student.name, email: data.student.email, matriculation: data.student.matriculation, courseId: parseInt(data.student.course.id), classId: parseInt(data.student.classes.id) }
  }

  const onCompleted = useCallback(
    (response) => {
      setValues(values)
    },
    [setValues]
  );
  useEffect(() => {
    onCompleted()
  }, [loading])

  const [mutationEdit] = useMutation(StudentEdit, {
    refetchQueries: [
      {
        query: StudentsQuery,
        variables: { input: { page: 1, paginate: 10 } }
      }
    ]
  });

  const editStudent = async (data) => {
    const { id, ...rest } = data
    await mutationEdit({ variables: { id: id, input: { ...rest } } })
    history.push('/app/students')
  };

  return (
    <form
      onSubmit={handleSubmit(editStudent)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
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
                  {courses.loading ? "" :
                    <Autocomplete
                      name="courseId"
                      options={
                        courses.data.courses.map(({ id, name }) => ({ value: id, label: name }))
                      }
                      onChange={(event, value) => {
                        if (!value) {
                          handleChange({ name: "courseId", value: "" })
                        } else {
                          handleChange({ name: "courseId", value: parseInt(value.value) })
                        }
                      }}
                      getOptionLabel={(option) => option.label}
                      getOptionSelected={(option, value) => option.id === value.id}
                      value={input.courseId.value == "" ? { value: "", label: "" } : { value: "" + input.courseId.value, label: courses.data.courses.find(s => s.id === "" + input.courseId.value).name }}
                      renderInput={(params) =>
                        <TextField {...params}
                          label={input.courseId.label}
                          variant="outlined"
                          error={!!errors.courseId}
                          helperText={!!errors.courseId ? errors.courseId : "Informe o curso"}
                        />
                      }
                    />
                  }
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  {classesRoom.loading ? "" :
                    <Autocomplete
                      name="classId"
                      options={
                        classesRoom.data.classes.map(({ id, name, course }) => ({ value: id, label: name }))
                      }
                      onChange={(event, value) => {
                        if (!value) {
                          handleChange({ name: "classId", value: "" })
                        } else {
                          handleChange({ name: "classId", value: parseInt(value.value) })
                        }
                      }}
                      getOptionLabel={(option) => option.label}
                      getOptionSelected={(option, value) => option.id === value.id}
                      value={input.classId.value == "" ? { value: "", label: "" } : { value: "" + input.classId.value, label: classesRoom.data.classes.find(s => s.id === "" + input.classId.value).name }}
                      renderInput={(params) =>
                        <TextField {...params}
                          label={input.classId.label}
                          variant="outlined"
                          error={!!errors.classId}
                          helperText={!!errors.classId ? errors.classId : "Informe a turma"}
                        />
                      }
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
        </Box>
      </Container>
    </form>
  );

};

export default StudentDetails;
