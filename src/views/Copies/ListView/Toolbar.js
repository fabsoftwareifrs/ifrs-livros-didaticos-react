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
import PropTypes from "prop-types";
import clsx from "clsx";
import { ADD_COPY } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReactToPrint from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";
import PrintConfig from "src/utils/printConfig";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const Toolbar = ({ className, id, search, componentRef, extra, ...rest }) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(0);
  const [mutationCreate] = useMutation(ADD_COPY);
  const handlePress = (e) => {
    if (e.which === 13) {
      search(e.target.value);
    }
  };
  const createCopy = async (e) => {
    e.preventDefault();
    for (let i = 0; i < quantity; i++) {
      await mutationCreate({
        variables: { input: { bookId: id } },
      });
    }
    await extra.refetch();
  };
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  const pageStyles = `
  @page {
    size: ${PrintConfig.pageSize};
    margin: ${PrintConfig.pageMargin};
  }
`;
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="space-between">
        <Link to="/app/books">
          <Button
            style={{ color: "#fff", backgroundColor: "#8B0000", height: 55 }}
          >
            <ArrowBackIcon fontSize="large" /> Voltar
          </Button>
        </Link>
        <div style={{ display: "flex" }}>
          <ReactToPrint
            pageStyle={pageStyles}
            trigger={() => (
              <Button
                style={{
                  color: "#fff",
                  backgroundColor: "#e6ac00",
                  height: 55,
                  marginRight: 10,
                }}
                variant="contained"
                startIcon={<PrintIcon />}
              >
                Imprimir etiquetas
              </Button>
            )}
            content={() => componentRef.current}
          />
          <form onSubmit={createCopy}>
            <TextField
              helperText={"Informe a quantidade de exemplares"}
              label="Quantidade"
              type="number"
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
                marginLeft: 10,
              }}
            >
              Gerar Exemplares
            </Button>
          </form>
        </div>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                onKeyPress={handlePress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Buscar exemplares por código"
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
  className: PropTypes.string,
};

export default Toolbar;
