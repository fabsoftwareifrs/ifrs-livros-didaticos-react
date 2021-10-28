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

import "react-perfect-scrollbar/dist/css/styles.css";
import "src/mixins/chartjs";

import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import GlobalStyles from "src/components/GlobalStyles";
import theme from "src/theme";
import PrivateRoute from "./routes/PrivateRoute";
import UnPrivateRoute from "./routes/UnPrivateRoute";

import AuthProvider from "./providers/Auth";

import Dashboard from "./layouts/DashboardLayout";
import Main from "./layouts/MainLayout";

import LoginView from "src/views/auth";

import Books from "src/views/Books/ListView";
import BooksCreate from "src/views/Books/Add";
import BooksEdit from "src/views/Books/Edit";
import BooksImport from "src/views/Books/Import";

import BooksCategory from "src/views/BooksCategory/ListView";
import BooksCategoryCreate from "src/views/BooksCategory/Add";
import BooksCategoryEdit from "src/views/BooksCategory/Edit";

import Classes from "src/views/Classes/ListView";
import ClassesCreate from "src/views/Classes/Add";
import ClassesEdit from "src/views/Classes/Edit";

import Copies from "src/views/Copies/ListView";
import CopiesEdit from "src/views/Copies/Edit";

import Courses from "src/views/Courses/ListView";
import CoursesCreate from "src/views/Courses/Add";
import CoursesEdit from "src/views/Courses/Edit";

import Lates from "src/views/Lates/ListView";

import Loans from "src/views/Loans/ListView";
import LoansCreate from "src/views/Loans/Add";
import LoansEdit from "src/views/Loans/Edit";

import Periods from "src/views/Periods/ListView";
import PeriodCreate from "src/views/Periods/Add";
import PeriodEdit from "src/views/Periods/Edit";

import Students from "src/views/Students/ListView";
import StudentsCreate from "src/views/Students/Add";
import StudentsEdit from "src/views/Students/Edit";
import StudentsImport from "src/views/Students/Import";

import Users from "src/views/Users/ListView";
import UsersCreate from "src/views/Users/Add";
import UsersEdit from "src/views/Users/Edit";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthProvider>
          <Switch>
            <UnPrivateRoute
              exact
              path="/"
              component={() => <Main Children={LoginView} />}
            />
            <PrivateRoute
              exact
              path="/app/books"
              component={() => <Dashboard Children={Books} />}
            />
            <PrivateRoute
              exact
              path="/app/books/create"
              component={() => <Dashboard Children={BooksCreate} />}
            />
            <PrivateRoute
              exact
              path="/app/books/edit/:id"
              component={() => <Dashboard Children={BooksEdit} />}
            />
            <PrivateRoute
              exact
              path="/app/books/import"
              component={() => <Dashboard Children={BooksImport} />}
            />
            <PrivateRoute
              exact
              path="/app/category"
              component={() => <Dashboard Children={BooksCategory} />}
            />
            <PrivateRoute
              exact
              path="/app/category/create"
              component={() => <Dashboard Children={BooksCategoryCreate} />}
            />
            <PrivateRoute
              exact
              path="/app/category/edit/:id"
              component={() => <Dashboard Children={BooksCategoryEdit} />}
            />
            <PrivateRoute
              exact
              path="/app/classes"
              component={() => <Dashboard Children={Classes} />}
            />
            <PrivateRoute
              exact
              path="/app/classes/create"
              component={() => <Dashboard Children={ClassesCreate} />}
            />
            <PrivateRoute
              exact
              path="/app/classes/edit/:id"
              component={() => <Dashboard Children={ClassesEdit} />}
            />
            <PrivateRoute
              exact
              path="/app/copies/:id"
              component={() => <Dashboard Children={Copies} />}
            />
            <PrivateRoute
              exact
              path="/app/copies/edit/:id"
              component={() => <Dashboard Children={CopiesEdit} />}
            />
            <PrivateRoute
              exact
              path="/app/course"
              component={() => <Dashboard Children={Courses} />}
            />
            <PrivateRoute
              exact
              path="/app/course/create"
              component={() => <Dashboard Children={CoursesCreate} />}
            />
            <PrivateRoute
              exact
              path="/app/course/edit/:id"
              component={() => <Dashboard Children={CoursesEdit} />}
            />
            <PrivateRoute
              exact
              path="/app/lates"
              component={() => <Dashboard Children={Lates} />}
            />
            <PrivateRoute
              exact
              path="/app/loans"
              component={() => <Dashboard Children={Loans} />}
            />
            <PrivateRoute
              exact
              path="/app/loans/create"
              component={() => <Dashboard Children={LoansCreate} />}
            />
            <PrivateRoute
              exact
              path="/app/loans/edit/:id"
              component={() => <Dashboard Children={LoansEdit} />}
            />
            <PrivateRoute
              exact
              path="/app/periods"
              component={() => <Dashboard Children={Periods} />}
            />
            <PrivateRoute
              exact
              path="/app/periods/create"
              component={() => <Dashboard Children={PeriodCreate} />}
            />
            <PrivateRoute
              exact
              path="/app/periods/edit/:id"
              component={() => <Dashboard Children={PeriodEdit} />}
            />
            <PrivateRoute
              exact
              path="/app/students"
              component={() => <Dashboard Children={Students} />}
            />
            <PrivateRoute
              exact
              path="/app/students/create"
              component={() => <Dashboard Children={StudentsCreate} />}
            />
            <PrivateRoute
              exact
              path="/app/students/edit/:id"
              component={() => <Dashboard Children={StudentsEdit} />}
            />
            <PrivateRoute
              exact
              path="/app/students/import"
              component={() => <Dashboard Children={StudentsImport} />}
            />
            <PrivateRoute
              exact
              path="/app/users"
              component={() => <Dashboard Children={Users} />}
            />
            <PrivateRoute
              exact
              path="/app/users/create"
              component={() => <Dashboard Children={UsersCreate} />}
            />
            <PrivateRoute
              exact
              path="/app/users/edit/:id"
              component={() => <Dashboard Children={UsersEdit} />}
            />
          </Switch>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
