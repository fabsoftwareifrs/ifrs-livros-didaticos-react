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
import PropTypes from "prop-types";
import Modal from "../../../components/Modal";
import clsx from "clsx";
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
} from "@material-ui/core";
import BellIcon from "@material-ui/icons/Notifications";
import SendIcon from "@material-ui/icons/Send";
import { Search as SearchIcon } from "react-feather";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  bar: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  warnButton: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "5%",
    },
  },
  disable: {
    backgroundColor: "grey !important",
    opacity: 0.6,
  },
}));

const Toolbar = ({ className, create, mail, search, selected, ...rest }) => {
  const classes = useStyles();
  const handlePress = (e) => {
    if (e.which == 13) {
      search(e.target.value);
    }
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Link to="/app/loans/create">
          <Button color="primary" variant="contained">
            Adicionar Empréstimo
          </Button>
        </Link>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box className={classes.bar}>
              <Box width={"100%"} maxWidth={500}>
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
                  placeholder="Buscar Empréstimos"
                  variant="outlined"
                />
              </Box>
              <Box className={classes.warnButton} maxWidth={500}>
                <Modal
                  style={{ backgroundColor: "#e6ac00", color: "#fff" }}
                  className={selected ? "" : classes.disable}
                  disabled={selected ? false : true}
                  startIcon={<BellIcon />}
                  variant="contained"
                  text="Enviar notificação"
                >
                  <CardHeader title="Deseja enviar um e-mail de lembrete de entrega para os empréstimos selecionados?" />
                  <Button
                    color="primary"
                    startIcon={<SendIcon />}
                    style={{ margin: 10 }}
                    variant="contained"
                    onClick={mail}
                  >
                    Enviar
                  </Button>
                </Modal>
              </Box>
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
