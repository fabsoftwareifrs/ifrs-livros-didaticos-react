import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import {LoanCreate} from '../../../../graphql/mutations/loan'
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
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link, useHistory } from 'react-router-dom';
import { LoansQuery } from 'src/graphql/queries/loan';
import { AllStudentsQuery } from 'src/graphql/queries/student';
import { AllBooksQuery } from 'src/graphql/queries/book';
import { AllPeriodsQuery } from 'src/graphql/queries/period';
import useMyForm from '../../../../hooks/MyForm'
import {  useAuth } from '../../../../providers/Auth'
import fields from './fields'

const useStyles = makeStyles(() => ({
  root: {}
}));

const LoanDetails = ({ className, ...rest }) => {
  var history= useHistory()
  const classes = useStyles();
  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setTouched,
    reset,
    setValues
  } = useMyForm(fields);
  const {auth} =useAuth()
  const [mutationCreate] = useMutation(LoanCreate,{
    
    refetchQueries: [
      { query: LoansQuery,
       variables: { page:1, limit:10 }
       }
    ]
  });  
  const students = useQuery(AllStudentsQuery);
  const books = useQuery(AllBooksQuery);
  const periods = useQuery(AllPeriodsQuery);
  const createLoan = async (data) => {
    data.delivered=false
    data.user_id=parseInt(auth.user.id)
    await mutationCreate({ variables: data })
    history.push('/app/loans')

  };

  return (
    <form
      onSubmit={handleSubmit(createLoan)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode cadastrar as informações de um empréstimo."
          title="Empréstimos"
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
              {books.loading?"":
              <Autocomplete
                  name="book_id"
                  options={
                    books.data.books.map(({ id, name }) => ({ value: id, label: name }))
                  }
                  onChange={(event, value) => {
                    if(!value){
                      handleChange({name:"book_id", value:""}) 
                    }else{
                    handleChange({name:"book_id", value:parseInt(value.value)})
                    }
                  }}
                  getOptionLabel={(option) => option.label}
                  getOptionSelected={(option, value) => option.id === value.id}
                  style={{ width: 300 }}
                  renderInput={(params) => 
                    <TextField {...params} 
                                label={input.book_id.label} 
                                variant="outlined" 
                                fullWidth
                                error={!!errors.book_id}
                                helperText={!!errors.book_id?errors.book_id:"Informe o livro"}
                    />}
                />
              }
              </Grid>
              <Grid
              item
              md={6}
              xs={12}
            >
              {students.loading?"":
              <Autocomplete
                  name="student_id"
                  options={
                    students.data.students.map(({ id, name }) => ({ value: id, label: name }))
                  }
                  onChange={(event, value) => {
                    if(!value){
                      handleChange({name:"student_id", value:""}) 
                    }else{
                    handleChange({name:"student_id", value:parseInt(value.value)})
                    }
                  }}
                  getOptionLabel={(option) => option.label}
                  getOptionSelected={(option, value) => option.id === value.id}
                  style={{ width: 300 }}
                  renderInput={(params) => 
                    <TextField {...params} 
                                label={input.student_id.label} 
                                variant="outlined" 
                                error={!!errors.student_id}
                                helperText={!!errors.student_id?errors.student_id:"Informe o estudante"}
                    />}
                />
              }
              </Grid>
            
          </Grid>
          <Grid
            container
            spacing={3}
          >
           
            <Grid
              item
              md={6}
              xs={12}
            >
              {periods.loading?"":
              <Autocomplete
                  name="period_id"
                  options={
                    periods.data.periods.map(({ id, name }) => ({ value: id, label: name }))
                  }
                  onChange={(event, value) => {
                    if(!value){
                      handleChange({name:"period_id", value:""}) 
                    }else{
                    handleChange({name:"period_id", value:parseInt(value.value)})
                    }
                  }}
                  getOptionLabel={(option) => option.label}
                  getOptionSelected={(option, value) => option.id === value.id}
                  style={{ width: 300 }}
                  renderInput={(params) => 
                    <TextField {...params} 
                                label={input.period_id.label} 
                                variant="outlined" 
                                fullWidth
                                error={!!errors.period_id}
                                helperText={!!errors.period_id?errors.period_id:"Informe o período letivo"}
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
          <Link to="/app/loans">
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



export default LoanDetails;
