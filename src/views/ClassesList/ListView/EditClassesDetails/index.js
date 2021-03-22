import React, { useCallback, useEffect } from 'react';
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

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ClassDetails = ({ className, details, edit, set, ...rest }) => {
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

  var { id } = useParams();

  console.log(id)

  const { loading, error, data } = useQuery(ClassQuery, {
    variables: { id:id },
  });

  var values= {
    name:"",
    course_id:1
  }
  if(!loading){
    console.log(data)
    values=data.classRoom
  }
  const onCompleted = useCallback(
    (response) => {
      setValues(values);
    },
    [setValues]
  );
  useEffect(() => {
    onCompleted()
  },[values])


  //const { loading1, error1, data1 } = useQuery(CoursesQuery);

  //if (loading1) return 'Loading...';
  //if (error1) return `Error! ${error.message}`;
  

  const [mutationEdit] = useMutation(ClassEdit,{
    refetchQueries: [
      { query: ClassesQuery,
       variables: { page:1, limit:10 }
       }
    ]
  }); 

  const editClass = async (data) => {
    data.course_id=parseInt(data.course_id)
    console.log(data)
    console.log("teste")
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
              <TextField
                error={!!errors.course_id}
                fullWidth
                helperText={!!errors.course_id?errors.course_id:"Informe o nome da turma"}
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
                    (course.id == values.course_id)?
                      <MenuItem value={course.id}>{course.name}</MenuItem>:
                      <MenuItem value={course.id}>{course.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
*/