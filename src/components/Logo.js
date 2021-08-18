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
import { withStyles } from "@material-ui/core/styles";
import logo from "src/assets/logo.png";
const styles = (theme) => ({
  div: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
const Logo = (props) => {
  const { classes } = props;
  return (
    <div className={classes.div}>
      <img
        alt="Logo"
        src={logo}
        style={{
          width: 25,
        }}
        {...props}
      />
    </div>
  );
};

export default withStyles(styles)(Logo);
