import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import {LoanEdit} from '../../../../graphql/mutations/loan'
import useMyForm from '../../../../hooks/MyForm'
import fields from './fields'
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
import { LoanQuery, LoansQuery } from 'src/graphql/queries/loan';
import {Link,useParams,useHistory} from "react-router-dom";
import {  useAuth } from '../../../../providers/Auth'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AllStudentsQuery } from 'src/graphql/queries/student';
import { AllBooksQuery } from 'src/graphql/queries/book';
import { AllPeriodsQuery } from 'src/graphql/queries/period';
const useStyles = makeStyles(() => ({
  root: {}
}));

const LoanDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  var history= useHistory()
  const {auth} =useAuth()
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
  const [checked, setChecked] = React.useState();
  const { loading, error, data } = useQuery(LoanQuery, {
    variables: { id:id },
  });
  
  var values= {
    delivered:"",
    user_id:"",
    student_id:"",
    book_id:"",
    period_id:""
  }
  if(!loading){
    values=data.loan
  }
  const onCompleted = useCallback(
    (response) => {
      setValues(values);
      setChecked(values.delivered)
    },
    [setValues]
  );
  useEffect(() => {
    onCompleted()
  },[values])
  
  
 
  const [mutationEdit] = useMutation(LoanEdit,{
    refetchQueries: [
      { 
        query: LoansQuery,
        variables: { page:1, limit:10 }
      }
    ]
  });  
  const editLoan = async (data) => {
    data.user_id=parseInt(auth.user.id)
    data.delivered=checked
    await mutationEdit({ variables: data })
    history.push('/app/loans')
  };
  const students = useQuery(AllStudentsQuery);
  const books = useQuery(AllBooksQuery);
  const periods = useQuery(AllPeriodsQuery);

  const handleChangeChecked = () => {
    setChecked(!checked);
  };
  return (
    <>{loading?"":
    <form
      onSubmit={handleSubmit(editLoan)}
      className={clsx(classes.root, className)}
      {...rest}
    >
       <Card>
        <CardHeader
          subheader="Você pode editar as informações de um empréstimo."
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
              {checked?<Button style={{height:'70%'}}  onClick={handleChangeChecked} color="primary" variant="contained">Entrege</Button>:<Button  onClick={handleChangeChecked} style={{marginRight:10,backgroundColor:"#8B0000",color:'#fff', height:'70%'}} variant="contained">Não Entrege</Button>}
              
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              { books.loading ?"":
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
                  value={input.book_id.value==""?{value:"", label:""}: {value: ""+input.book_id.value, label: books.data.books.find(s => s.id === ""+input.book_id.value).name }}
                  getOptionLabel={(option) => option.label}
                  getOptionSelected={(option, value) => option.id === value.id}
                  
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
                  value={input.student_id.value==""?{value:"", label:""}:{ value: ""+input.student_id.value, label: students.data.students.find(s => s.id === ""+input.student_id.value).name }}
                  getOptionLabel={(option) => option.label}
                  getOptionSelected={(option, value) => option.id === value.id}
                  
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
                  value={input.period_id.value==""?{value:"", label:""}:{ value: ""+input.period_id.value, label: periods.data.periods.find(s => s.id === ""+input.period_id.value).name }}
                  getOptionLabel={(option) => option.label}
                  getOptionSelected={(option, value) => option.id === value.id}
                  
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
            Editar
          </Button>
        </Box>
      </Card>
    </form>
    }</>
  );
};



export default LoanDetails;
