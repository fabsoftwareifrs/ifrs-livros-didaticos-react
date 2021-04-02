import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../components/Modal';
import clsx from 'clsx';
import { CopiesByBookQuery } from '../../../graphql/queries/copy'
import { CopyCreate } from '../../../graphql/mutations/copy'
import { useMutation, useQuery } from '@apollo/client';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  CardHeader,
  IconButton,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { Link } from "react-router-dom"
const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, id, ...rest }) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(0);
  const [mutationCreate] = useMutation(CopyCreate, {

    refetchQueries: [
      {
        query: CopiesByBookQuery,
        variables: { bookId: id }
      }
    ]
  });
  const createCopy = async (e) => {
    e.preventDefault()
    for (let i = 0; i < quantity; i++) {
      await mutationCreate({ variables: { input: { status: "AVAILABLE", bookId: id } } })
    }
  }
  const handleChange = (e) => {
    setQuantity(e.target.value)
  }
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Link to="/app/books">
          <Button
            style={{ color: '#fff', backgroundColor: '#8B0000', height: 55 }}
          >
            <ArrowBackIcon fontSize="large" /> Voltar
        </Button>
        </Link>
        <form
          onSubmit={createCopy}
        >
          <TextField
            helperText={"Informe a quantidade de exemplares"}
            label='Quantidade'
            type='number'
            onChange={handleChange}
            variant="outlined"
            inputProps={{ min: 0 }}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            style={{
              height: 55,
              marginLeft: 10
            }}
          >Gerar Exemplares</Button>
        </form>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Buscar Alunos"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
