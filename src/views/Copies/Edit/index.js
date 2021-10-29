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
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_COPY } from "src/graphql/mutations";
import useMyForm from "src/hooks/MyForm";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
import { CopyQuery } from "src/graphql/queries/copies";
import { Link, useParams, useHistory } from "react-router-dom";

import { fields } from "./fields";

const useStyles = makeStyles(() => ({
  root: {},
}));

const CopyDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  var history = useHistory();
  const {
    fields: input,
    errors,
    handleSubmit,
    handleChange,
    setValues,
  } = useMyForm(fields);
  var { id } = useParams();
  const { loading, data } = useQuery(CopyQuery, {
    variables: { id: id, search: "" },
    fetchPolicy: "cache-and-network",
  });
  var values = {
    status: { label: "", value: "" },
  };
  var bookId = "";
  const translate = (word) => {
    if (word === "MISPLACED") {
      return "EXTRAVIADO";
    }
    if (word === "LOANED") {
      return "EMPRESTADO";
    }
    if (word === "AVAILABLE") {
      return "DISPONIVEL";
    }
  };
  if (!loading) {
    values = {
      id: data.copy.id,
      status: { value: data.copy.status, label: translate(data.copy.status) },
    };
    bookId = parseInt(data.copy.book.id);
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

  const [mutationEdit] = useMutation(EDIT_COPY);
  const editCopy = async (data) => {
    data.status = data.status.value;
    const { id, ...rest } = data;
    await mutationEdit({ variables: { id: data.id, input: { ...rest } } });
    history.push("/app/copies/" + bookId);
  };

  const options = [
    { value: "MISPLACED", label: "EXTRAVIADO" },
    { value: "AVAILABLE", label: "DISPONIVEL" },
    { value: "LOANED", label: "EMPRESTADO" },
  ];

  return (
    <form
      onSubmit={handleSubmit(editCopy)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardHeader
              subheader="Você pode editar o status do exemplar."
              title="Exemplar"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <input type="hidden" name="id" value={id} />
                  {loading ? (
                    ""
                  ) : (
                    <Autocomplete
                      name="status"
                      options={options}
                      onChange={(event, value) => {
                        handleChange({ name: "status", value: value });
                      }}
                      value={input.status.value}
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(option) => option.label}
                      getOptionDisabled={(option) => option === options[2]}
                      disabled={data.copy.status === "LOANED" ? true : false}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={input.status.label}
                          variant="outlined"
                          fullWidth
                          error={!!errors.status}
                          helperText={
                            !!errors.status
                              ? errors.copyId
                              : "Informe o status do exemplar"
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
              <Link to={"/app/copies/" + bookId}>
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
  );
};

export default CopyDetails;