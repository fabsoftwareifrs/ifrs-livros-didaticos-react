import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useMutation, useQuery, gql } from '@apollo/client';
import { PeriodQuery, PeriodsQuery } from '../../../../graphql/queries/period'
import { PeriodCreate, PeriodEdit, PeriodDelete } from '../../../../graphql/mutations/period'
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
  InputLabel,
  Container
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const PeriodDetails = ({ className, details, edit, set, ...rest }) => {
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

  const { loading, error, data } = useQuery(PeriodQuery, {
    variables: { id: id },
  });

  var values = {
    name: "",
    start: "",
    end: ""
  }

  if (!loading) {
    values = { id: data.period.id, name: data.period.name, start: data.period.start, end: data.period.end }
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

  const [mutationEdit] = useMutation(PeriodEdit, {
    refetchQueries: [
      {
        query: PeriodsQuery,
        variables: { input: { page: 1, paginate: 10 } }
      }
    ]
  });

  const editPeriod = async (data) => {
    const { id, ...rest } = data
    await mutationEdit({ variables: { id: id, input: { ...rest } } })
    history.push('/app/periods')
  };

  return (
    <form
      onSubmit={handleSubmit(editPeriod)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardHeader
              subheader="Você pode cadastrar as informações de um período."
              title="Períodos"
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
                    helperText={!!errors.name ? errors.name : "Informe o nome do período"}
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
                    error={!!errors.start}
                    fullWidth
                    helperText={!!errors.start ? errors.start : "Informe a data de início"}
                    label={input.start.label}
                    name="start"
                    type={input.start.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.start.value}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
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
                  <TextField
                    error={!!errors.end}
                    fullWidth
                    helperText={!!errors.end ? errors.end : "Informe a data de fim"}
                    label={input.end.label}
                    name="end"
                    type={input.end.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.end.value}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
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
              <Link to="/app/periods">
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
                Cadastrar
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </form>
  );

};

export default PeriodDetails;

