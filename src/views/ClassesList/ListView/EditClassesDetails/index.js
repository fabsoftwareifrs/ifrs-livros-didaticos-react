import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useMutation,useQuery, gql } from '@apollo/client';
import { CoursesQuery, ClassQuery, ClassesQuery } from '../../../../graphql/queries/class'
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
  InputLabel
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';


import ReactSelect from 'react-select'
import { SignalCellularNullSharp } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ClassDetails = ({ className, details, edit, set, ...rest }) => {
  const classes = useStyles();

  var history= useHistory()

  const [course, setCourse] = useState(SignalCellularNullSharp);
  
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

  const { loading, error, data } = useQuery(ClassQuery, {
    variables: { id:id },
  });

  var values= {
    name:"",
    course_id:1
  }

  if(!loading){
    values=data.classRoom

    var courseSelected = {
      value:values.courses.id,
      label:values.courses.name
    }

  }

  const onCompleted = useCallback(
    (response) => {
      setValues(values);
      setCourse(courseSelected)
    },
    [setValues]
  );

  useEffect(() => {
    onCompleted()
  },[values])

  const courses = coursesQuery.data
  
  const [mutationEdit] = useMutation(ClassEdit,{
    refetchQueries: [
      { query: ClassesQuery,
       variables: { page:1, limit:10 }
       }
    ]
  }); 

  const editClass = async (data) => {
    data.course_id=parseInt(course['value'])
    await mutationEdit({ variables: data })
    history.push('/app/classes')
  };

  
  return (
    <form
    onSubmit={handleSubmit(editClass)}
      className={clsx(classes.root, className)}
      {...rest}
    >
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
              <input type="hidden" name="id" value={id}/>
              <TextField
                error={!!errors.name}
                fullWidth
                helperText={!!errors.name?errors.name:"Informe o nome da turma"}
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
                  courses &&
                  courses.courses &&
                  courses.courses.map(({ id, name }) => ({ value: id, label: name }))
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
            Editar
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
                  courses &&
                  courses.courses &&
                  courses.courses.map(({ id, name }) => ({ value: id, label: name }))
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
