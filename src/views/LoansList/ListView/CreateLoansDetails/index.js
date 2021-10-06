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
import { LoanCreate } from "../../../../graphql/mutations/loan";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link, useHistory } from "react-router-dom";
import { LoansQuery } from "src/graphql/queries/loan";
import { AllStudentsQuery } from "src/graphql/queries/student";
import { AvailableCopiesQuery } from "src/graphql/queries/copy";
import { AllPeriodsQuery } from "src/graphql/queries/period";
import useMyForm from "../../../../hooks/MyForm";
import { useAuth } from "../../../../providers/Auth";
import fields from "./fields";

const useStyles = makeStyles(() => ({
  root: {},
}));

const LoanDetails = ({ className, ...rest }) => {
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

  const [mutationCreate] = useMutation(LoanCreate, {
    refetchQueries: [
      {
        query: LoansQuery,
        variables: {
          input: { page: 1, paginate: 10, search: "" },
          late: false,
        },
      },
      {
        query: LoansQuery,
        variables: { input: { page: 1, paginate: 10, search: "" }, late: true },
      },
      {
        query: AvailableCopiesQuery,
      },
    ],
  });
  const students = useQuery(AllStudentsQuery);
  const copies = useQuery(AvailableCopiesQuery);
  const periods = useQuery(AllPeriodsQuery);
  const createLoan = async (data) => {
    await mutationCreate({ variables: { input: data } });
    history.push("/app/loans");
  };

  return (
    <form
      onSubmit={handleSubmit(createLoan)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardHeader
              subheader="Você pode cadastrar as informações de um empréstimo."
              title="Empréstimos"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  {copies.loading ? (
                    ""
                  ) : (
                    <Autocomplete
                      name="copyId"
                      options={copies.data.availableCopies.map((option) => ({
                        value: option.id,
                        label: option.code,
                        ...option,
                      }))}
                      onChange={(event, value) => {
                        if (!value) {
                          handleChange({ name: "copyId", value: "" });
                        } else {
                          handleChange({
                            name: "copyId",
                            value: parseInt(value.value),
                          });
                        }
                      }}
                      groupBy={(option) => option.book.name}
                      getOptionLabel={(option) => option.label}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={input.copyId.label}
                          variant="outlined"
                          fullWidth
                          error={!!errors.copyId}
                          helperText={
                            !!errors.copyId
                              ? errors.copyId
                              : "Informe o exemplar"
                          }
                        />
                      )}
                    />
                  )}
                </Grid>
                <Grid item md={6} xs={12}>
                  {students.loading ? (
                    ""
                  ) : (
                    <Autocomplete
                      name="studentId"
                      options={students.data.students.map(({ id, name }) => ({
                        value: id,
                        label: name,
                      }))}
                      onChange={(event, value) => {
                        if (!value) {
                          handleChange({ name: "studentId", value: "" });
                        } else {
                          handleChange({
                            name: "studentId",
                            value: parseInt(value.value),
                          });
                        }
                      }}
                      getOptionLabel={(option) => option.label}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={input.studentId.label}
                          variant="outlined"
                          error={!!errors.studentId}
                          helperText={
                            !!errors.studentId
                              ? errors.studentId
                              : "Informe o estudante"
                          }
                        />
                      )}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  {periods.loading ? (
                    ""
                  ) : (
                    <Autocomplete
                      name="periodId"
                      options={periods.data.periods.map(({ id, name }) => ({
                        value: id,
                        label: name,
                      }))}
                      onChange={(event, value) => {
                        if (!value) {
                          handleChange({ name: "periodId", value: "" });
                        } else {
                          handleChange({
                            name: "periodId",
                            value: parseInt(value.value),
                          });
                        }
                      }}
                      getOptionLabel={(option) => option.label}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={input.periodId.label}
                          variant="outlined"
                          fullWidth
                          error={!!errors.periodId}
                          helperText={
                            !!errors.periodId
                              ? errors.periodId
                              : "Informe o período letivo"
                          }
                        />
                      )}
                    />
                  )}
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Link to="/app/loans">
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

export default LoanDetails;
