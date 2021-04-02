import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import { LoansQuery } from '../../../graphql/queries/loan'
import { useMutation, useQuery, gql } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
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
  Button
} from '@material-ui/core';
import { Trash2 as TrashIcon, Edit as EditIcon } from 'react-feather';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  icon: {
    margin: '0 10px',
    cursor: 'pointer'
  }
}));




const LoanList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(LoansQuery, {
    variables: { input: { page: page, paginate: limit } },
  });





  if (error) return <p>Error :(</p>;




  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };




  return (
    <Page
      className={classes.root}
      title="Empréstimos"
    >
      <Container maxWidth={false}>
        <>
          <Toolbar />
          <Box mt={3}>
            {loading ? '' :
              <Card>
                <PerfectScrollbar>
                  <Box minWidth={1050}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            Estudante
                      </TableCell>
                          <TableCell>
                            Exemplar
                      </TableCell>
                          <TableCell>
                            Entrege?
                      </TableCell>
                          <TableCell>
                            Atrasado?
                      </TableCell>
                          <TableCell>
                            Período
                      </TableCell>


                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.paginateLoans.docs.slice(0, limit).map((loan) => (
                          <>
                            {loan.late ?
                              <TableRow
                                hover
                                key={loan.id}
                              >

                                <TableCell>
                                  {loan.student.name}
                                </TableCell>
                                <TableCell>
                                  {loan.copy.code}
                                </TableCell>
                                <TableCell>
                                  {loan.delivered ? "Sim" : "Não"}
                                </TableCell>
                                <TableCell>
                                  {loan.late ? "ATRASADO" : "Em dia"}
                                </TableCell>
                                <TableCell>
                                  {loan.period.name}
                                </TableCell>


                              </TableRow>
                              : ""}
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </PerfectScrollbar>
                <TablePagination
                  component="div"
                  count={data.paginateLoans.total}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleLimitChange}
                  page={page - 1}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 25]}
                  labelRowsPerPage={'Itens por página:'}
                />
              </Card>
            }
          </Box>
        </>

      </Container>
    </Page>

  );
};

export default (LoanList);

