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
import React from "react";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/components/GlobalStyles";
import "src/mixins/chartjs";
import theme from "src/theme";
import PrivateRoute from "./routes/PrivateRoute";
import UnPrivateRoute from "./routes/UnPrivateRoute";
import AuthProvider from "./providers/Auth";
import Dashboard from "./layouts/DashboardLayout";
import Main from "./layouts/MainLayout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginView from "src/views/auth";
import ListView from "src/views/StudentsList/ListView";
import Books from "src/views/BooksList/ListView";
import BooksCreate from "src/views/BooksList/ListView/CreateBooksDetails";
import BooksEdit from "src/views/BooksList/ListView/EditBookDetails";
import BooksCategory from "src/views/BooksCategoryList/ListView";
import Classes from "src/views/ClassesList/ListView";
import ClassesCreate from "src/views/ClassesList/ListView/CreateClassesDetails";
import ClassesEdit from "src/views/ClassesList/ListView/EditClassesDetails";
import BooksCategoryCreate from "src/views/BooksCategoryList/ListView/CreateCategoryDetails";
import BooksCategoryEdit from "src/views/BooksCategoryList/ListView/EditCategoryDetails";
import Users from "src/views/UsersList/ListView";
import UsersCreate from "src/views/UsersList/ListView/CreateUsersDetails";
import UsersEdit from "src/views/UsersList/ListView/EditUsersDetails";
import Courses from "src/views/CoursesList/ListView";
import CoursesCreate from "src/views/CoursesList/ListView/CreateCourseDetails";
import CoursesEdit from "src/views/CoursesList/ListView/EditCourseDetails";
import Students from "src/views/StudentsList/ListView";
import StudentsCreate from "src/views/StudentsList/ListView/CreateStudentsDetails";
import StudentsEdit from "src/views/StudentsList/ListView/EditStudentsDetails";
import Loans from "src/views/LoansList/ListView";
import LoansCreate from "src/views/LoansList/ListView/CreateLoansDetails";
import LoansEdit from "src/views/LoansList/ListView/EditLoansDetails";
import Copies from "src/views/CopiesList/ListView";
import CopiesEdit from "src/views/CopiesList/ListView/EditCopiesDetails";
import Lates from "src/views/LatesList/ListView";
import Periods from "src/views/PeriodsList/ListView";
import PeriodCreate from "src/views/PeriodsList/ListView/CreatePeriodDetails";
import PeriodEdit from "src/views/PeriodsList/ListView/EditPeriodDetails";
import { createBrowserHistory } from "history";
import { LocationSearching } from "@material-ui/icons";
var hist = createBrowserHistory();

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
              path="/app/student"
              component={() => <Dashboard Children={ListView} />}
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
              path="/app/lates"
              component={() => <Dashboard Children={Lates} />}
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
          </Switch>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
