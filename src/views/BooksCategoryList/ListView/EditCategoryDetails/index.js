import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation,useQuery, gql } from '@apollo/client';
import {CategoryEdit} from '../../../../graphql/mutations/category'
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
import { CategoryQuery, CategoriesQuery } from 'src/graphql/queries/category';
import {Link,useParams,useHistory} from "react-router-dom";


const useStyles = makeStyles(() => ({
  root: {}
}));

const CategoryDetails = ({ className, ...rest }) => {
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
  const { loading, error, data } = useQuery(CategoryQuery, {
    variables: { id:id },
  });
  var values= {
    name:"",
    
  }
  if(!loading){
    values=data.category
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
  
  
 
  const [mutationEdit] = useMutation(CategoryEdit,{
    refetchQueries: [
      { query: CategoriesQuery,
       variables: { page:1, limit:10 }
       }
    ]
  });  
  const editCategory = async (data) => {
    console.log(data)
    await mutationEdit({ variables: data })
    history.push('/app/category')
  };
 
  

  return (
    <form
      onSubmit={handleSubmit(editCategory)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode editar as informações da categoria."
          title="Categoria de Livro"
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
                helperText={!!errors.name?errors.name:"Informe o nome da categoria"}
                label={input.name.label}
                name="name"
                type={input.name.type}
                onChange={({ target }) => handleChange(target)}
                value={input.name.value}
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
          <Link to="/app/category">
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



export default CategoryDetails;
