import React, { useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation, gql} from '@apollo/client';
import {Login} from '../../graphql/mutations/auth'
import { login as AuthLogin, useAuth } from '../../providers/Auth'
import useMyForm from '../../hooks/MyForm'
import fields from './fields'
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

const LoginView = () => {
  const {dispatch}=useAuth()
  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setTouched,
    reset,
    setValues
  } = useMyForm(fields);
  
  const [mutationLogin,{ loading: mutationLoading, error: mutationError }] = useMutation(Login,{
    onError(){
     
    } ,
    onCompleted({login}) {
        dispatch(AuthLogin(login.user, login.token))
    }
  });
  const onSubmit= async (data) =>  {
    await mutationLogin({ variables:  data })
    
  }
  

  return (
    
      
          
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Entrar
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Entre no gerenciador de livros didáticos
                  </Typography>
                  <Typography
                    style={{color:'red'}}
                    gutterBottom
                    variant="body2"
                  >
                    {mutationError && 'Usuário ou senha incorretos'}
                  </Typography>
                  
                </Box>
               
               
                <TextField
                  error={!!errors.login}
                  fullWidth
                  label={input.login.label}
                  margin="normal"
                  name="login"
                  type={input.login.type}
                  onChange={({ target }) => handleChange(target)}
                  value={input.login.value}
                  variant="outlined"
                  helperText={errors.login}
                />
               
                <TextField
                  error={!!errors.password}
                  fullWidth
                  label={input.password.label}
                  margin="normal"
                  name="password"
                  type={input.password.type}
                  onChange={({ target }) => handleChange(target)}
                  value={input.password.value}
                  helperText={errors.password}
                  variant="outlined"
                />
  
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Box>
                
              </form>
          

        
    
  );
};

export default LoginView;
