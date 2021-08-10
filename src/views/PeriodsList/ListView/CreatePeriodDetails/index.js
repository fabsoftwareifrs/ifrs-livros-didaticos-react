/*
 * This file is part of LMS Livros Didáticos.
 *
 * LMS Livros Didáticos is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * LMS Livros Didáticos is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Foobar.  If not, see <https://www.gnu.org/licenses/>
 */

import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useMutation, useQuery, gql } from "@apollo/client";
import { PeriodCreate } from "../../../../graphql/mutations/period";
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
  Container,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { PeriodsQuery } from "src/graphql/queries/period";
import useMyForm from "../../../../hooks/MyForm";
import { useAuth } from "../../../../providers/Auth";
import fields from "./fields";

const useStyles = makeStyles(() => ({
  root: {},
}));

const PeriodDetails = ({ className, ...rest }) => {
  var history = useHistory();
  const classes = useStyles();
  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setTouched,
    reset,
    setValues,
  } = useMyForm(fields);

  const [mutationCreate] = useMutation(PeriodCreate, {
    refetchQueries: [
      {
        query: PeriodsQuery,
        variables: { input: { page: 1, paginate: 10, search: "" } },
      },
    ],
  });

  const createPeriod = async (data) => {
    await mutationCreate({ variables: { input: data } });
    history.push("/app/periods");
  };

  return (
    <form
      onSubmit={handleSubmit(createPeriod)}
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
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={!!errors.name}
                    fullWidth
                    helperText={
                      !!errors.name
                        ? errors.name
                        : "Informe o nome do período letivo"
                    }
                    label={input.name.label}
                    name="name"
                    type={input.name.type}
                    onChange={({ target }) => handleChange(target)}
                    value={input.name.value}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={!!errors.start}
                    fullWidth
                    helperText={
                      !!errors.start
                        ? errors.start
                        : "Informe a data de início do período letivo"
                    }
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
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={!!errors.end}
                    fullWidth
                    helperText={
                      !!errors.end
                        ? errors.end
                        : "Informe a data final do período letivo"
                    }
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
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Link to="/app/periods">
                <Button
                  style={{
                    marginRight: 10,
                    backgroundColor: "#8B0000",
                    color: "#fff",
                  }}
                  variant="contained"
                >
                  Cancelar
                </Button>
              </Link>
              <Button color="primary" variant="contained" type="submit">
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
