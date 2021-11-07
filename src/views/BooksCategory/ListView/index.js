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

import { CategoriesQuery } from "src/graphql/queries";
import { REMOVE_CATEGORY } from "src/graphql/mutations";
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

const CategoryList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [removeCategory, { loading: loadingRemove }] = useMutation(
    REMOVE_CATEGORY,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (err) => {
        console.log(err.message);
      },
    }
  );

  const { data, loading, refetch } = useQuery(CategoriesQuery, {
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
    await removeCategory({ variables: { id } });
  };

  return (
    <Page className={classes.root} title="Categorias de Livros">
      <Container maxWidth={false}>
        {loading ? (
          ""
        ) : (
          <>
            <Toolbar search={setSearch} />
            <Box mt={3}>
              <Card>
                {data.paginateCategories.docs.length ? (
                  <>
                    <PerfectScrollbar>
                      <Box minWidth={300}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Categoria</TableCell>
                              <TableCell>Código externo</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.paginateCategories.docs
                              .slice(0, limit)
                              .map((category) => (
                                <TableRow hover key={category.id}>
                                  <TableCell>
                                    <Box alignItems="center" display="flex">
                                      <Typography
                                        color="textPrimary"
                                        variant="body1"
                                      >
                                        {category.name}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>{category.externalCode}</TableCell>
                                  <TableCell className={classes.endCell}>
                                    <Modal
                                      className={classes.icon}
                                      icon={TrashIcon}
                                    >
                                      <CardHeader
                                        subheader={
                                          'Tem certeza que deseja deletar a categoria "' +
                                          category.name +
                                          '"'
                                        }
                                        title="Deletar categoria"
                                      />
                                      <Button
                                        variant="contained"
                                        style={{
                                          margin: 10,
                                          backgroundColor: "#8B0000",
                                          color: "#fff",
                                        }}
                                        onClick={() => remove(category.id)}
                                        disabled={loadingRemove}
                                      >
                                        Deletar
                                      </Button>
                                    </Modal>

                                    <Link
                                      style={{ color: "#263238" }}
                                      to={"/app/categories/edit/" + category.id}
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
                      count={data.paginateCategories.total}
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

export default CategoryList;
