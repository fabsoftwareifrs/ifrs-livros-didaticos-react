import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useMutation, useQuery, gql } from '@apollo/client';
import { ClassQuery, ClassesQuery } from '../../../../graphql/queries/class'
import { AllCoursesQuery } from '../../../../graphql/queries/course'
import { ClassEdit } from '../../../../graphql/mutations/class'
import fields from './fields'
import { Link, useHistory, useParams } from 'react-router-dom';
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
  InputLabel,
  Container
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ClassDetails = ({ className, details, edit, set, ...rest }) => {
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

  const { loading, error, data } = useQuery(ClassQuery, {
    variables: { id: id },
  });

  const courses = useQuery(AllCoursesQuery)

  var values = {
    name: "",
    course_id: ""
  }

  if (!loading) {
    values = { id: data.classRoom.id, name: data.classRoom.name, courseId: parseInt(data.classRoom.course.id) }
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

  const [mutationEdit] = useMutation(ClassEdit, {
    refetchQueries: [
      {
        query: ClassesQuery,
        variables: { input: { page: 1, paginate: 10 } }
      }
    ]
  });

  const editClass = async (data) => {
    const { id, ...rest } = data
    await mutationEdit({ variables: { id: id, input: { ...rest } } })
    history.push('/app/classes')
  };

  return (
    <form
      onSubmit={handleSubmit(editClass)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardHeader
              subheader="Você pode editar as informações da turma."
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
                  <input type="hidden" name="id" value={id} />
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
                      value={input.courseId.value == "" ? { value: "", label: "" } : { value: "" + input.courseId.value, label: courses.data.courses.find(s => s.id === "" + input.courseId.value).name }}
                      getOptionLabel={(option) => option.label}
                      getOptionSelected={(option, value) => option.id === value.id}

                      renderInput={(params) =>
                        <TextField {...params}
                          label={input.courseId.label}
                          variant="outlined"
                          error={!!errors.courseId}
                          helperText={!!errors.courseId ? errors.courseId : "Informe o curso"}
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
                Editar
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </form>
  );
};

export default ClassDetails;

