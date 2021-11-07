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
import { GET_ALL_LOANS_BY_PERIOD_ID } from "src/graphql/queries/loans";
import {
  REMOVE_LOAN,
  TERMINATE_LOAN,
  CANCEL_TERMINATE_LOAN,
} from "src/graphql/mutations";
import { WarnMail } from "src/graphql/mutations/mail";
import { useMutation, useQuery } from "@apollo/client";
import PerfectScrollbar from "react-perfect-scrollbar";
import ModalIcon from "src/components/ModalIcon";
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
  Checkbox,
} from "@material-ui/core";
import {
  Trash2 as TrashIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  X as XIcon,
} from "react-feather";
import { Link } from "react-router-dom";
import { usePeriod } from "src/providers/Period";

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

const LoanList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedLoanIds, setSelectedLoanIds] = useState([]);
  const end = new Date();
  const [period] = usePeriod();

  const { loading, error, data, refetch } = useQuery(
    GET_ALL_LOANS_BY_PERIOD_ID,
    {
      variables: {
        periodId: period.value,
        pagination: { page: page, paginate: limit, search },
      },
      fetchPolicy: "cache-and-network",
    }
  );
  const [mutationDelete] = useMutation(REMOVE_LOAN);

  const [mutationTerminate] = useMutation(TERMINATE_LOAN);

  const [mutationCancelTerminate] = useMutation(CANCEL_TERMINATE_LOAN);

  const [mutationWarnMail] = useMutation(WarnMail);

  if (error) return <p>Error :(</p>;
  const handleSelectAll = (event, loans) => {
    let newSelectedLoanIds;

    if (event.target.checked) {
      newSelectedLoanIds = loans.map((loan) => loan.id);
    } else {
      newSelectedLoanIds = [];
    }

    setSelectedLoanIds(newSelectedLoanIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedLoanIds.indexOf(id);
    let newSelectedLoanIds = [];

    if (selectedIndex === -1) {
      newSelectedLoanIds = newSelectedLoanIds.concat(selectedLoanIds, id);
    } else if (selectedIndex === 0) {
      newSelectedLoanIds = newSelectedLoanIds.concat(selectedLoanIds.slice(1));
    } else if (selectedIndex === selectedLoanIds.length - 1) {
      newSelectedLoanIds = newSelectedLoanIds.concat(
        selectedLoanIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedLoanIds = newSelectedLoanIds.concat(
        selectedLoanIds.slice(0, selectedIndex),
        selectedLoanIds.slice(selectedIndex + 1)
      );
    }

    setSelectedLoanIds(newSelectedLoanIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const deleteLoan = async (id) => {
    await mutationDelete({ variables: { id } });
    await refetch();
  };

  const sendWarnMail = async () => {
    let loans = [];
    if (selectedLoanIds.length === 0) {
      alert("Nenhum usuáro selecionado!");
    } else {
      selectedLoanIds.map(async function (loanId) {
        loans.push(parseInt(loanId));
      });
      let response = await mutationWarnMail({ variables: { loans } });
      if (response.data.warnMail.response[0] === "success") {
        alert("Enviado com sucesso!");
      } else {
        console.log(response.data.warnMail.response);
      }
    }
  };

  const terminateLoan = async (id) => {
    await mutationTerminate({ variables: { id: id, input: { end } } });
    await refetch();
  };

  const cancelTerminateLoan = async (id) => {
    await mutationCancelTerminate({ variables: { id } });
    await refetch();
  };
  return (
    <Page className={classes.root} title="Empréstimos">
      <Container maxWidth={false}>
        {loading ? (
          ""
        ) : (
          <>
            <Toolbar
              search={setSearch}
              selected={selectedLoanIds.length > 0}
              mail={sendWarnMail}
            />
            <Box mt={3}>
              <Card>
                {data.getAllLoansByPeriodId.docs.length ? (
                  <>
                    <PerfectScrollbar>
                      <Box minWidth={300}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={
                                    selectedLoanIds.length ===
                                    data.getAllLoansByPeriodId.docs.slice(
                                      0,
                                      limit
                                    ).length
                                  }
                                  color="primary"
                                  indeterminate={
                                    selectedLoanIds.length > 0 &&
                                    selectedLoanIds.length <
                                      data.getAllLoansByPeriodId.docs.slice(
                                        0,
                                        limit
                                      ).length
                                  }
                                  onChange={(e) =>
                                    handleSelectAll(
                                      e,
                                      data.getAllLoansByPeriodId.docs.slice(
                                        0,
                                        limit
                                      )
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>Estudante</TableCell>
                              <TableCell>Livro</TableCell>
                              <TableCell>Exemplar</TableCell>
                              <TableCell>Entregue?</TableCell>

                              <TableCell></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.getAllLoansByPeriodId.docs
                              .slice(0, limit)
                              .map((loan) => (
                                <TableRow hover key={loan.id}>
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      color="primary"
                                      checked={
                                        selectedLoanIds.indexOf(loan.id) !== -1
                                      }
                                      onChange={(event) =>
                                        handleSelectOne(event, loan.id)
                                      }
                                      value="true"
                                    />
                                  </TableCell>
                                  <TableCell>{loan.student.name}</TableCell>
                                  <TableCell>
                                    <Link
                                      to={`/app/books/${loan.copy.book.id}/copies`}
                                    >
                                      {loan.copy.book.name}
                                    </Link>
                                  </TableCell>
                                  <TableCell>{loan.copy.code}</TableCell>
                                  <TableCell>
                                    <ModalIcon
                                      className={classes.icon}
                                      icon={loan.delivered ? CheckIcon : XIcon}
                                    >
                                      <CardHeader title="Mudar status empréstimo" />
                                      {loan.delivered ? (
                                        <Button
                                          variant="contained"
                                          style={{
                                            margin: 10,
                                            backgroundColor: "#8B0000",
                                            color: "#fff",
                                          }}
                                          onClick={() =>
                                            cancelTerminateLoan(loan.id)
                                          }
                                        >
                                          Marcar como não entregue
                                        </Button>
                                      ) : (
                                        <Button
                                          variant="contained"
                                          style={{
                                            margin: 10,
                                            backgroundColor: "#17882c",
                                            color: "#fff",
                                          }}
                                          onClick={() => terminateLoan(loan.id)}
                                        >
                                          Marcar como entregue
                                        </Button>
                                      )}
                                    </ModalIcon>
                                  </TableCell>
                                  <TableCell className={classes.endCell}>
                                    <ModalIcon
                                      className={classes.icon}
                                      icon={TrashIcon}
                                    >
                                      <CardHeader
                                        subheader={
                                          "Tem certeza que deseja deletar o empréstimo?"
                                        }
                                        title="Deletar empréstimo"
                                      />
                                      <Button
                                        variant="contained"
                                        style={{
                                          margin: 10,
                                          backgroundColor: "#8B0000",
                                          color: "#fff",
                                        }}
                                        onClick={() => deleteLoan(loan.id)}
                                      >
                                        Deletar
                                      </Button>
                                    </ModalIcon>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </PerfectScrollbar>
                    <TablePagination
                      component="div"
                      count={data.getAllLoansByPeriodId.total}
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

export default LoanList;
