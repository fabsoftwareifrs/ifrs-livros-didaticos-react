import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import useMyForm from '../../../../hooks/MyForm'
import fields from './fields'
import {UserEdit} from '../../../../graphql/mutations/user'
import {UsersQuery, UserQuery} from '../../../../graphql/queries/user'
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

const UserDetails = ({ className, ...rest }) => {
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
  const { loading, error, data } = useQuery(UserQuery, {
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
    values=data.user
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
  
  
 
  const [mutationEdit] = useMutation(UserEdit,{
    refetchQueries: [
      { query: UsersQuery,
       variables: { page:1, limit:10 }
       }
    ]
  });  
  const editUser = async (data) => {
    data.accessLevel=parseInt(data.accessLevel)
    await mutationEdit({ variables: data })
    history.push('/app/users')
  };
 

  return (
    <form
      onSubmit={handleSubmit(editUser)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode editar as informações de um usuário."
          title="Usuário"
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
                helperText={!!errors.name?errors.name:"Informe o nome do usuário"}
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
                error={!!errors.login}
                fullWidth
                helperText={errors.login}
                label={input.login.label}
                name="login"
                type={input.login.type}
                onChange={({ target }) => handleChange(target)}
                value={input.login.value}
                variant="outlined"
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
             <TextField
                error={!!errors.accessLevel}
                fullWidth
                helperText={errors.accessLevel}
                label={input.accessLevel.label}
                name="accessLevel"
                type={input.accessLevel.type}
                onChange={({ target }) => handleChange(target)}
                value={input.accessLevel.value}
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
          <Link to="/app/users">
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



export default UserDetails;
