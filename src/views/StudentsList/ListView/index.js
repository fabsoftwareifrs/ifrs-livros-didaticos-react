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
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import { StudentsQuery } from "../../../graphql/queries/student";
import { StudentDelete, StudentEdit } from "../../../graphql/mutations/student";
import { useMutation, useQuery, gql } from "@apollo/client";
import PerfectScrollbar from "react-perfect-scrollbar";
import Modal from "../../../components/ModalIcon";
import {
  Avatar,
  Box,
  Card,
  Container,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  CardHeader,
  TextField,
  Button,
} from "@material-ui/core";
import { Trash2 as TrashIcon, Edit as EditIcon } from "react-feather";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    whiteSpace: "nowrap",
    overflowX: "auto",
  },
  icon: {
    margin: "0 10px",
    cursor: "pointer",
  },
  endCell: {
    display: "flex",
    justifyContent: "flex-end",
  },
  notContentText: {
    padding: "5% 2%",
    width: "100%",
    textAlign: "center",
    fontSize: 25,
  },
}));

const StudentsList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { loading, error, data } = useQuery(StudentsQuery, {
    variables: { input: { page: page, paginate: limit, search } },
  });
  const [mutationDelete] = useMutation(StudentDelete, {
    refetchQueries: [
      {
        query: StudentsQuery,
        variables: { input: { page: page, paginate: limit, search } },
      },
    ],
  });

  if (error) return <p>Error :(</p>;

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const deleteStudent = (id) => {
    mutationDelete({ variables: { id } });
  };

  return (
    <Page className={classes.root} title="Estudantes">
      <Container maxWidth={false}>
        {loading ? (
          ""
        ) : (
          <>
            <Toolbar
              content={data.paginateStudents.docs.length}
              search={setSearch}
            />
            <Box mt={3}>
              <Card>
                {data.paginateStudents.docs.length ? (
                  <>
                    <PerfectScrollbar>
                      <Box minWidth={300}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome</TableCell>
                              <TableCell>E-mail</TableCell>
                              <TableCell>Matricula</TableCell>
                              <TableCell>Curso</TableCell>
                              <TableCell>Turma</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.paginateStudents.docs
                              .slice(0, limit)
                              .map((student) => (
                                <TableRow hover key={student.id}>
                                  <TableCell>
                                    <Box alignItems="center" display="flex">
                                      <Typography
                                        color="textPrimary"
                                        variant="body1"
                                      >
                                        {student.name}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>{student.email}</TableCell>
                                  <TableCell>{student.matriculation}</TableCell>
                                  <TableCell>{student.course.name}</TableCell>
                                  <TableCell>{student.classes.name}</TableCell>

                                  <TableCell className={classes.endCell}>
                                    <Modal
                                      className={classes.icon}
                                      icon={TrashIcon}
                                    >
                                      <CardHeader
                                        subheader={
                                          'Tem certeza que deseja deletar o estudante "' +
                                          student.name +
                                          '"'
                                        }
                                        title="Deletar estudante"
                                      />
                                      <Button
                                        variant="contained"
                                        style={{
                                          margin: 10,
                                          backgroundColor: "#8B0000",
                                          color: "#fff",
                                        }}
                                        onClick={() =>
                                          deleteStudent(student.id)
                                        }
                                      >
                                        Deletar
                                      </Button>
                                    </Modal>

                                    <Link
                                      to={"/app/students/edit/" + student.id}
                                      style={{ color: "#263238" }}
                                    >
                                      <EditIcon className={classes.icon} />
                                    </Link>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </PerfectScrollbar>
                    <TablePagination
                      component="div"
                      count={data.paginateStudents.total}
                      onChangePage={handlePageChange}
                      onChangeRowsPerPage={handleLimitChange}
                      page={page - 1}
                      rowsPerPage={limit}
                      rowsPerPageOptions={[5, 10, 25]}
                      labelRowsPerPage={"Itens por página:"}
                    />
                  </>
                ) : (
                  <Typography className={classes.notContentText}>
                    Nenhum registro aqui.
                  </Typography>
                )}
              </Card>
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
};

export default StudentsList;
