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

import { StatusesQuery } from "src/graphql/queries";
import { REMOVE_STATUS } from "src/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import PerfectScrollbar from "react-perfect-scrollbar";
import Page from "src/components/Page";
import Modal from "src/components/ModalIcon";
import Toolbar from "./Toolbar";
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

const StatusList = (props) => {
  const classes = useStyles();
  const { dispatch } = useMessageBox();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [removeStatus, { loading: loadingRemove }] = useMutation(
    REMOVE_STATUS,
    {
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
    }
  );

  const { data, loading, refetch } = useQuery(StatusesQuery, {
    variables: { input: { page: page, paginate: limit, search } },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const remove = async (id) => {
    await removeStatus({ variables: { id } });
  };

  return (
    <Page className={classes.root} title="Estados dos exemplares">
      <Container maxWidth={false}>
        {loading ? (
          ""
        ) : (
          <>
            <Toolbar search={setSearch} />
            <Box mt={3}>
              <Card>
                {data.paginateStatuses.docs.length ? (
                  <>
                    <PerfectScrollbar>
                      <Box minWidth={300}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Estado</TableCell>
                              <TableCell>Disponível</TableCell>
                              <TableCell>Padrão</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.paginateStatuses.docs
                              .slice(0, limit)
                              .map((status) => (
                                <TableRow hover key={status.id}>
                                  <TableCell>
                                    <Box alignItems="center" display="flex">
                                      <Typography
                                        color="textPrimary"
                                        variant="body1"
                                      >
                                        {status.name}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    {status.isAvailable ? "Sim" : "Não"}
                                  </TableCell>
                                  <TableCell>
                                    {status.isDefault ? "Sim" : "Não"}
                                  </TableCell>
                                  <TableCell className={classes.endCell}>
                                    <Modal
                                      className={classes.icon}
                                      icon={TrashIcon}
                                    >
                                      <CardHeader
                                        subheader={
                                          'Tem certeza que deseja deletar o estado "' +
                                          status.name +
                                          '"'
                                        }
                                        title="Deletar estado"
                                      />
                                      <Button
                                        variant="contained"
                                        style={{
                                          margin: 10,
                                          backgroundColor: "#8B0000",
                                          color: "#fff",
                                        }}
                                        onClick={() => remove(status.id)}
                                        disabled={loadingRemove}
                                      >
                                        Deletar
                                      </Button>
                                    </Modal>

                                    <Link
                                      style={{ color: "#263238" }}
                                      to={"/app/statuses/edit/" + status.id}
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
                      count={data.paginateStatuses.total}
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

export default StatusList;
