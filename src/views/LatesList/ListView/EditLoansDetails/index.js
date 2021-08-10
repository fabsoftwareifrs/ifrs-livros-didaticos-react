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

import React, { useCallback, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useMutation, useQuery, gql } from "@apollo/client";
import { LoanEdit } from "../../../../graphql/mutations/loan";
import useMyForm from "../../../../hooks/MyForm";
import { AvailableCopiesQuery } from "src/graphql/queries/copy";
import fields from "./fields";
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
import { LoanQuery, LoansQuery } from "src/graphql/queries/loan";
import { Link, useParams, useHistory } from "react-router-dom";
import { useAuth } from "../../../../providers/Auth";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AllStudentsQuery } from "src/graphql/queries/student";
import { CopiesQuery } from "src/graphql/queries/copy";
import { AllPeriodsQuery } from "src/graphql/queries/period";
const useStyles = makeStyles(() => ({
  root: {},
}));

const LoanDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  var history = useHistory();
  const { auth } = useAuth();
  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setTouched,
    reset,
    setValues,
  } = useMyForm(fields);
  var { id } = useParams();
  const { loading, error, data } = useQuery(LoanQuery, {
    variables: { id: id },
  });

  var values = {
    studentId: "",
    copyId: "",
    periodId: "",
  };
  if (!loading) {
    values = {
      id: data.loan.id,
      studentId: parseInt(data.loan.student.id),
      copyId: parseInt(data.loan.copy.id),
      periodId: parseInt(data.loan.period.id),
    };
  }
  const onCompleted = useCallback(
    (response) => {
      setValues(values);
    },
    [setValues]
  );
  useEffect(() => {
    onCompleted();
  }, [loading]);

  const [mutationEdit] = useMutation(LoanEdit, {
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
  const editLoan = async (data) => {
    const { id, ...rest } = data;
    await mutationEdit({ variables: { id: id, input: { ...rest } } });
    history.push("/app/loans");
  };
  const students = useQuery(AllStudentsQuery);
  const copies = useQuery(CopiesQuery);
  const periods = useQuery(AllPeriodsQuery);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <form
          onSubmit={handleSubmit(editLoan)}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Container maxWidth={false}>
            <Box mt={3}>
              <Card>
                <CardHeader
                  subheader="Você pode editar as informações de um empréstimo."
                  title="Empréstimos"
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <input type="hidden" name="id" value={id} />
                    <Grid item md={6} xs={12}>
                      {copies.loading ? (
                        ""
                      ) : (
                        <Autocomplete
                          name="copyId"
                          options={copies.data.copies.map(({ id, code }) => ({
                            value: id,
                            label: code,
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
                          value={
                            input.copyId.value == ""
                              ? { value: "", label: "" }
                              : {
                                  value: "" + input.copyId.value,
                                  label: copies.data.copies.find(
                                    (s) => s.id === "" + input.copyId.value
                                  ).code,
                                }
                          }
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
                                  : "Informe um exemplar"
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
                          options={students.data.students.map(
                            ({ id, name }) => ({ value: id, label: name })
                          )}
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
                          value={
                            input.studentId.value == ""
                              ? { value: "", label: "" }
                              : {
                                  value: "" + input.studentId.value,
                                  label: students.data.students.find(
                                    (s) => s.id === "" + input.studentId.value
                                  ).name,
                                }
                          }
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
                                  : "Informe um estudante"
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
                          value={
                            input.periodId.value == ""
                              ? { value: "", label: "" }
                              : {
                                  value: "" + input.periodId.value,
                                  label: periods.data.periods.find(
                                    (s) => s.id === "" + input.periodId.value
                                  ).name,
                                }
                          }
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
                                  : "Informe um período letivo"
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
                    Editar
                  </Button>
                </Box>
              </Card>
            </Box>
          </Container>
        </form>
      )}
    </>
  );
};

export default LoanDetails;
