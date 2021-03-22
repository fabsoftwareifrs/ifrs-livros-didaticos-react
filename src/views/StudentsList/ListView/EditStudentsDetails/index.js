import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import useMyForm from '../../../../hooks/MyForm'
import fields from './fields'
import {StudentEdit} from '../../../../graphql/mutations/student'
import {StudentsQuery, StudentQuery} from '../../../../graphql/queries/student'
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

const useStyles = makeStyles(() => ({
  root: {}
}));

const StudentDetails = ({ className, ...rest }) => {
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
  const { loading, error, data } = useQuery(StudentQuery, {
    variables: { id:id },
  });
  var values= {
    name:"",
    email:"",
    matriculation:"",
    course_id:1,
    class_id:1
  }
  if(!loading){
    console.log(data)
    values=data.student
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
  
  
 
  const [mutationEdit] = useMutation(StudentEdit,{
    refetchQueries: [
      { query: StudentsQuery,
       variables: { page:1, limit:10 }
       }
    ]
  });  
  const editStudent = async (data) => {
    data.course_id=parseInt(data.course_id)
    data.class_id=parseInt(data.class_id)
    await mutationEdit({ variables: data })
    history.push('/app/students')
  };
 

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

              <Grid
                item
                md={6}
                xs={12}
              >
              <TextField
                  error={!!errors.class_id}
                  fullWidth
                  helperText={!!errors.class_id?errors.class_id:"Informe o nome da turma"}
                  label={input.class_id.label}
                  type={input.class_id.type}
                  name="class_id"
                  onChange={({ target }) => handleChange(target)}
                  value={input.class_id.value}
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
          <Link to="/app/students">
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

export default StudentDetails;
