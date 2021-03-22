import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import PrivateRoute from "./routes/PrivateRoute";
import UnPrivateRoute from "./routes/UnPrivateRoute";
import AuthProvider from "./providers/Auth";
import Dashboard from "./layouts/DashboardLayout"
import Main from "./layouts/MainLayout"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginView from 'src/views/auth';
import ListView from 'src/views/StudentsList/ListView';
import Books from 'src/views/BooksList/ListView';
import BooksCreate from 'src/views/BooksList/ListView/CreateBooksDetails';
import BooksEdit from 'src/views/BooksList/ListView/EditBookDetails';
import BooksCategory from 'src/views/BooksCategoryList/ListView';
import Classes from 'src/views/ClassesList/ListView';
import ClassesCreate from 'src/views/ClassesList/ListView/CreateClassesDetails';
import ClassesEdit from 'src/views/ClassesList/ListView/EditClassesDetails';
import BooksCategoryCreate from 'src/views/BooksCategoryList/ListView/CreateCategoryDetails';
import BooksCategoryEdit from 'src/views/BooksCategoryList/ListView/EditCategoryDetails';
import Users from 'src/views/UsersList/ListView';
import UsersCreate from 'src/views/UsersList/ListView/CreateUsersDetails';
import UsersEdit from 'src/views/UsersList/ListView/EditUsersDetails';
import Courses from 'src/views/CoursesList/ListView';
import CoursesCreate from 'src/views/CoursesList/ListView/CreateCourseDetails';
import CoursesEdit from 'src/views/CoursesList/ListView/EditCourseDetails';
import Students from 'src/views/StudentsList/ListView';
import StudentsCreate from 'src/views/StudentsList/ListView/CreateStudentsDetails';
import StudentsEdit from 'src/views/StudentsList/ListView/EditStudentsDetails';
import { createBrowserHistory } from "history";
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
          </Switch>
    </AuthProvider>
    </ThemeProvider>
    </Router>
  );
};

export default App;
