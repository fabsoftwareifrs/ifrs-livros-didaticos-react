import React, { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMutation, useQuery, gql } from '@apollo/client';
import { CopyEdit } from '../../../../graphql/mutations/copy'
import useMyForm from '../../../../hooks/MyForm'
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import { CopyQuery, CopiesByBookQuery } from 'src/graphql/queries/copy';
import { Link, useParams, useHistory } from "react-router-dom";


const useStyles = makeStyles(() => ({
  root: {}
}));

const CopyDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  var history = useHistory()
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
  const { loading, error, data } = useQuery(CopyQuery, {
    variables: { id: id },
  });
  var values = {
    status: { label: "", value: "" },

  }
  var bookId = ""
  const translate = (word) => {
    if (word == "MISPLACED") {
      return ("EXTRAVIADO")
    }
    if (word == "LOANED") {
      return ("EMPRESTADO")
    }
    if (word == "AVAILABLE") {
      return ("DISPONIVEL")
    }
  }
  if (!loading) {
    values = { id: data.copy.id, status: { value: data.copy.status, label: translate(data.copy.status) } }
    bookId = parseInt(data.copy.book.id)
  }
  const onCompleted = useCallback(
    (response) => {
      setValues(values);
    },
    [setValues]
  );
  useEffect(() => {
    onCompleted()
  }, [loading])



  const [mutationEdit] = useMutation(CopyEdit, {
    refetchQueries: [
      {
        query: CopiesByBookQuery,
        variables: { bookId: bookId }
      }
    ]
  });
  const editCopy = async (data) => {
    data.status = data.status.value
    const { id, ...rest } = data
    await mutationEdit({ variables: { id: data.id, input: { ...rest } } })
    history.push("/app/copies/" + bookId)
  };

  const options = [
    { value: 'MISPLACED', label: "EXTRAVIADO" },
    { value: 'AVAILABLE', label: 'DISPONIVEL' },
    { value: 'LOANED', label: "EMPRESTADO" },
  ]

  return (
    <form
      onSubmit={handleSubmit(editCopy)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Você pode editar as informações de curso."
          title="Curso"
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
              <input type="hidden" name="id" value={id} />
              {loading ? "" :
                <Autocomplete
                  name="status"
                  options={options}
                  onChange={(event, value) => {

                    handleChange({ name: "status", value: value })

                  }}
                  value={input.status.value}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.label}
                  getOptionDisabled={(option) => option === options[2]}
                  disabled={data.copy.status == "LOANED" ? true : false}
                  renderInput={(params) =>
                    <TextField {...params}
                      label={input.status.label}
                      variant="outlined"
                      fullWidth
                      error={!!errors.status}
                      helperText={!!errors.status ? errors.copyId : "Informe o status do exemplar"}
                    />}
                />}

            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Link to={"/app/copies/" + bookId}>
            <Button
              style={{ marginRight: 10, backgroundColor: "#8B0000", color: '#fff' }}
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



export default CopyDetails;
