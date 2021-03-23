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


const useStyles = makeStyles(() => ({
  root: {}
}));

const LoanDetails = ({ className, ...rest }) => {
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
  const { loading, error, data } = useQuery(LoanQuery, {
    variables: { id:id },
  });
  var values= {
    name:"",
    code:"",
    author:"",
    volume:"",
    quantity:1
  }
  if(!loading){
    values=data.loan
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
  
  
 
  const [mutationEdit] = useMutation(LoansEdit,{
    refetchQueries: [
      { 
        query: LoansQuery
      }
    ]
  });  
  const editLoan = async (data) => {
    data.loanDays= parseInt(data.loanDays)
    data.delivered=data.loanDays === true
    data.studentId=parseInt(data.studentId)
    data.bookId=parseInt(data.bookId)
    data.userId=parseInt(data.userId)
    await mutationEdit({ variables: data })
    history.push('/app/loans')
  };
 
  

  return (
    <form
      onSubmit={handleSubmit(editLoan)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode editar as informações do livro."
          title="Livro"
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
                helperText={!!errors.name?errors.name:"Informe o título do livro"}
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
                error={!!errors.author}
                fullWidth
                helperText={errors.author}
                label={input.name.label}
                name="author"
                type={input.author.type}
                onChange={({ target }) => handleChange(target)}
                value={input.author.value}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={!!errors.code}
                fullWidth
                helperText={errors.code}
                label={input.code.label}
                name="code"
                type={input.code.type}
                onChange={({ target }) => handleChange(target)}
                value={input.code.value}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={!!errors.volume}
                fullWidth
                helperText={errors.volume}
                label={input.volume.label}
                name="volume"
                type={input.volume.type}
                onChange={({ target }) => handleChange(target)}
                value={input.volume.value}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={!!errors.quantity}
                fullWidth
                helperText={errors.quantity}
                label={input.quantity.label}
                name="quantity"
                type={input.quantity.type}
                onChange={({ target }) => handleChange(target)}
                value={input.quantity.value}
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
  );
};



export default LoanDetails;
