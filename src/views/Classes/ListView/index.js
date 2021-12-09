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

import React, { useEffect, useState } from "react";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import { ClassesQuery } from "../../../graphql/queries/classrooms";
import { REMOVE_CLASSROOM } from "../../../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import PerfectScrollbar from "react-perfect-scrollbar";
import Modal from "../../../components/ModalIcon";
import {
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  CardHeader,
  Button,
} from "@material-ui/core";
import { Trash2 as TrashIcon, Edit as EditIcon } from "react-feather";
import { Link } from "react-router-dom";
import { openMessageBox, useMessageBox } from "src/providers/MessageBox";

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
    textAlign: "right",
  },
  notContentText: {
    padding: "5% 2%",
    width: "100%",
    textAlign: "center",
    fontSize: 25,
  },
}));

const ClassesList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { dispatch } = useMessageBox();
  const { loading, error, data, refetch } = useQuery(ClassesQuery, {
    variables: { input: { page: page, paginate: limit, search } },
    fetchPolicy: "cache-and-network",
  });

  const [mutationDelete] = useMutation(REMOVE_CLASSROOM, {
    onCompleted: () => {
      dispatch(
        openMessageBox({
          message: "Registro removido com sucesso.",
        })
      );
      refetch();
    },
    onError: (err) => {
      dispatch(
        openMessageBox({
          type: "error",
          message: "Erro ao remover registro.",
        })
      );
    },
  });

  useEffect(() => {
    setPage(1);
  }, [search]);

  if (error) return <p>Error :(</p>;

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  const deleteClass = (id) => {
    mutationDelete({ variables: { id } });
  };

  return (
    <Page className={classes.root} title="Turmas">
      <Container maxWidth={false}>
        {loading ? (
          ""
        ) : (
          <>
            <Toolbar search={search} setSearch={setSearch} />
            <Box mt={3}>
              <Card>
                {data.paginateClasses.docs.length ? (
                  <>
                    <PerfectScrollbar>
                      <Box minWidth={300}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome</TableCell>
                              <TableCell>Curso</TableCell>
                              <TableCell>Código externo</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.paginateClasses.docs
                              .slice(0, limit)
                              .map((objClasses) => (
                                <TableRow hover key={objClasses.id}>
                                  <TableCell>
                                    <Box alignItems="center" display="flex">
                                      {objClasses.name}
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    {objClasses.course.name}
                                  </TableCell>
                                  <TableCell>
                                    {objClasses.externalCode}
                                  </TableCell>
                                  <TableCell className={classes.endCell}>
                                    <Modal
                                      className={classes.icon}
                                      icon={TrashIcon}
                                    >
                                      <CardHeader
                                        subheader={
                                          'Tem certeza que deseja deletar a turma "' +
                                          objClasses.name +
                                          '"'
                                        }
                                        title="Deletar turma"
                                      />
                                      <Button
                                        variant="contained"
                                        style={{
                                          margin: 10,
                                          backgroundColor: "#8B0000",
                                          color: "#fff",
                                        }}
                                        onClick={() =>
                                          deleteClass(objClasses.id)
                                        }
                                      >
                                        Deletar
                                      </Button>
                                    </Modal>

                                    <Link
                                      to={
                                        "/app/classrooms/edit/" + objClasses.id
                                      }
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
                      count={data.paginateClasses.total}
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleLimitChange}
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

export default ClassesList;
