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

import React from "react";
import clsx from "clsx";
import { useMutation } from "@apollo/client";
import { ADD_LOAN } from "src/graphql/mutations";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  Container,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import useMyForm from "src/hooks/MyForm";
import { fields } from "./fields";
import { Copies, Periods, Students } from "src/reusable";

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
  } = useMyForm(fields);

  const [mutationCreate] = useMutation(ADD_LOAN);
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
                  <Copies
                    onChange={handleChange}
                    field={input.copyId}
                    error={errors.copyId}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Students
                    onChange={handleChange}
                    field={input.studentId}
                    error={errors.studentId}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Periods
                    onChange={handleChange}
                    field={input.periodId}
                    error={errors.periodId}
                  />
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
