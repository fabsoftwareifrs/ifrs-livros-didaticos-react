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

import React, { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import Page from "src/components/Page";
import { CopiesByBookQuery } from "src/graphql/queries";
import { REMOVE_COPY } from "src/graphql/mutations";

import PerfectScrollbar from "react-perfect-scrollbar";
import Modal from "src/components/ModalIcon";
import Toolbar from "./Toolbar";
import Barcode from "react-barcode";
import PrintConfig from "src/utils/printConfig";
import {
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  CardHeader,
  Button,
} from "@material-ui/core";
import { Trash2 as TrashIcon, Edit as EditIcon } from "react-feather";
import { openMessageBox, useMessageBox } from "src/providers/MessageBox";
import { Backdrop, CircularProgress } from "@mui/material";

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
  bars: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
  },
  bar: {
    width: PrintConfig.ticketWidth,
    height: PrintConfig.ticketHeight,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const CopyList = (props) => {
  const classes = useStyles();
  var { id } = useParams();
  const componentRef = useRef();
  id = parseInt(id);
  const [search, setSearch] = useState("");
  const { dispatch } = useMessageBox();
  const { loading, error, data, refetch } = useQuery(CopiesByBookQuery, {
    variables: { bookId: id, search },
    fetchPolicy: "cache-and-network",
  });
  const [mutationDelete, { loading: loadingDelete }] = useMutation(
    REMOVE_COPY,
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

  if (error) return <p>Error :(</p>;

  const deleteCopy = (id) => {
    mutationDelete({ variables: { id } });
  };
  return (
    <Page className={classes.root} title="Exemplares">
      <Backdrop
        sx={{
          color: "#17882c",
          backgroundColor: "rgb(255 255 255 / 50%)",
          zIndex: (theme) => theme.zIndex.drawer + 1000,
        }}
        open={loading || loadingDelete}
      >
        <CircularProgress disableShrink color="inherit" />
      </Backdrop>
      <Container maxWidth={false}>
        <Toolbar
          componentRef={componentRef}
          search={search}
          setSearch={setSearch}
          id={id}
          extra={{ refetch }}
        />
        <Box mt={3}>
          {loading ? (
            ""
          ) : (
            <Card>
              <div style={{ display: "none" }}>
                <div ref={componentRef} className={classes.bars}>
                  {data.copiesByBookId.map((copy) => (
                    <div key={copy.id} className={classes.bar}>
                      <Barcode
                        width={PrintConfig.barWidth}
                        height={PrintConfig.barHeight}
                        fontSize={PrintConfig.barFontSize}
                        value={copy.code}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <PerfectScrollbar>
                <Box minWidth={300}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Código</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Livro</TableCell>
                        <TableCell>Situação</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.copiesByBookId.map((copy) => (
                        <TableRow hover key={copy.id}>
                          <TableCell>
                            <Box alignItems="center" display="flex">
                              <Typography color="textPrimary" variant="body1">
                                {copy.code}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box alignItems="center" display="flex">
                              <Typography color="textPrimary" variant="body1">
                                {copy.Status.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box alignItems="center" display="flex">
                              <Typography color="textPrimary" variant="body1">
                                {copy.book.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box alignItems="center" display="flex">
                              <Typography color="textPrimary" variant="body1">
                                {!copy.Status.isAvailable
                                  ? "Indisponível"
                                  : copy.isLoaned
                                  ? "Emprestado"
                                  : "Disponível"}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell className={classes.endCell}>
                            <Modal className={classes.icon} icon={TrashIcon}>
                              <CardHeader
                                subheader={
                                  "Tem certeza que deseja deletar o exemplar de código " +
                                  copy.code +
                                  "?"
                                }
                                title="Deletar exemplar"
                              />
                              <Button
                                variant="contained"
                                style={{
                                  margin: 10,
                                  backgroundColor: "#8B0000",
                                  color: "#fff",
                                }}
                                onClick={() => deleteCopy(copy.id)}
                              >
                                Deletar
                              </Button>
                            </Modal>

                            <Link
                              style={{ color: "#263238" }}
                              to={"/app/copies/edit/" + copy.id}
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
            </Card>
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default CopyList;
