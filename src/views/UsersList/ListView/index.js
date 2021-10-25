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
import { UsersQuery } from "../../../graphql/queries/user";
import { UserDelete } from "../../../graphql/mutations/user";
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
}));

const UsersList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { loading, error, data } = useQuery(UsersQuery, {
    variables: { input: { page: page, paginate: limit, search } },
  });
  const [mutationDelete] = useMutation(UserDelete, {
    refetchQueries: [
      {
        query: UsersQuery,
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
  const deleteUser = (id) => {
    mutationDelete({ variables: { id } });
  };

  return (
    <Page className={classes.root} title="Usuários">
      <Container maxWidth={false}>
        <Toolbar search={setSearch} />
        <Box mt={3}>
          {loading ? (
            ""
          ) : (
            <Card>
              <PerfectScrollbar>
                <Box minWidth={300}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Login</TableCell>
                        <TableCell>Nível de acesso</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.paginateUsers.docs.slice(0, limit).map((user) => (
                        <TableRow hover key={user.id}>
                          <TableCell>
                            <Box alignItems="center" display="flex">
                              <Typography color="textPrimary" variant="body1">
                                {user.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{user.login}</TableCell>
                          <TableCell>{user.accessLevel}</TableCell>

                          <TableCell className={classes.endCell}>
                            <Modal className={classes.icon} icon={TrashIcon}>
                              <CardHeader
                                subheader={
                                  'Tem certeza que deseja deletar o usuário "' +
                                  user.name +
                                  '"'
                                }
                                title="Deletar usuário"
                              />
                              <Button
                                variant="contained"
                                style={{
                                  margin: 10,
                                  backgroundColor: "#8B0000",
                                  color: "#fff",
                                }}
                                onClick={() => deleteUser(user.id)}
                              >
                                Deletar
                              </Button>
                            </Modal>

                            <Link
                              to={"/app/users/edit/" + user.id}
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
                count={data.paginateUsers.total}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page - 1}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage={"Itens por página:"}
              />
            </Card>
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default UsersList;
