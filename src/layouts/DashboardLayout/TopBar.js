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
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Button,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
import Logo from "src/components/Logo";
import { logout as AuthLogout, useAuth } from "../../providers/Auth";
//import { Periods } from "src/reusable";
import { usePeriod, openModal } from "src/providers/Period";
const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const { dispatch } = useAuth();
  const [period, dispatchPeriod] = usePeriod();

  // const { push } = useHistory();

  // const onChange = ({ value }) => {
  //   dispatchPeriod(setPeriod(value));
  //   push("/app/books");
  // };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <Button
            variant="contained"
            size="small"
            onClick={() => dispatchPeriod(openModal())}
          >
            {period?.label || "Selecione um período"}
          </Button>

          <IconButton onClick={() => dispatch(AuthLogout())} color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
