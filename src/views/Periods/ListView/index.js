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
import { PeriodsQuery } from "src/graphql/queries";
import { REMOVE_PERIOD } from "src/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import PerfectScrollbar from "react-perfect-scrollbar";
import Modal from "src/components/ModalIcon";
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
  notContentText: {
    padding: "5% 2%",
    width: "100%",
    textAlign: "center",
    fontSize: 25,
  },
}));

const PeriodsList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { loading, error, data, refetch } = useQuery(PeriodsQuery, {
    variables: { input: { page: page, paginate: limit, search } },
    fetchPolicy: "cache-and-network",
  });
  const [mutationDelete] = useMutation(REMOVE_PERIOD, {
    onCompleted: () => {
      refetch();
    },
  });

  if (error) return <p>Error :(</p>;

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  const deletePeriod = (id) => {
    mutationDelete({ variables: { id } });
  };
  const formatDate = (d) => {
    let date = d.substr(8, 2) + "/" + d.substr(5, 2) + "/" + d.substr(0, 4);
    return date;
  };
  return (
    <Page className={classes.root} title="Períodos">
      <Container maxWidth={false}>
        {loading ? (
          ""
        ) : (
          <>
            <Toolbar search={setSearch} />
            <Box mt={3}>
              <Card>
                {data.paginatePeriods.docs.length ? (
                  <>
                    <PerfectScrollbar>
                      <Box minWidth={300}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Período</TableCell>
                              <TableCell>Data Inicial</TableCell>
                              <TableCell>Data Final</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.paginatePeriods.docs
                              .slice(0, limit)
                              .map((period) => (
                                <TableRow hover key={period.id}>
                                  <TableCell>{period.name}</TableCell>
                                  <TableCell>
                                    {formatDate(period.start)}
                                  </TableCell>
                                  <TableCell>
                                    {formatDate(period.end)}
                                  </TableCell>
                                  <TableCell className={classes.endCell}>
                                    <Modal
                                      className={classes.icon}
                                      icon={TrashIcon}
                                    >
                                      <CardHeader
                                        subheader={
                                          "Tem certeza que deseja deletar o período?"
                                        }
                                        title="Deletar período"
                                      />
                                      <Button
                                        variant="contained"
                                        style={{
                                          margin: 10,
                                          backgroundColor: "#8B0000",
                                          color: "#fff",
                                        }}
                                        onClick={() => deletePeriod(period.id)}
                                      >
                                        Deletar
                                      </Button>
                                    </Modal>

                                    <Link
                                      to={"/app/periods/edit/" + period.id}
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
                      count={data.paginatePeriods.total}
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

export default PeriodsList;
