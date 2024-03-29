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

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../providers/Auth";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  User as UserIcon,
  Book as BookIcon,
  Bookmark as BookMarkIcon,
  Users as UsersIcon,
  Square as SquareIcon,
  PenTool as PenIcon,
  ArrowUp as ArrowIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
} from "react-feather";
import NavItem from "./NavItem";

const items = [
  {
    href: "/app/categories",
    icon: BookMarkIcon,
    title: "Categorias de Livros",
  },
  {
    href: "/app/statuses",
    icon: BookMarkIcon,
    title: "Estados dos exemplares",
  },
  {
    href: "/app/books",
    icon: BookIcon,
    title: "Livros",
  },
  {
    href: "/app/loans",
    icon: ArrowIcon,
    title: "Empréstimos",
  },
  {
    href: "/app/lates",
    icon: ClockIcon,
    title: "Atrasados",
  },
  {
    href: "/app/periods",
    icon: CalendarIcon,
    title: "Períodos",
  },
  {
    href: "/app/courses",
    icon: PenIcon,
    title: "Cursos",
  },
  {
    href: "/app/classrooms",
    icon: SquareIcon,
    title: "Turmas",
  },
  {
    href: "/app/students",
    icon: UsersIcon,
    title: "Estudantes",
  },

  {
    href: "/app/users",
    icon: UserIcon,
    title: "Usuários",
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { auth } = useAuth();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {"Bem-vindo, " + auth.user?.name || ""}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
