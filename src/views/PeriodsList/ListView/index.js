import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import { PeriodsQuery } from '../../../graphql/queries/period'
import { PeriodCreate, PeriodEdit, PeriodDelete } from '../../../graphql/mutations/period'
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
    paddingTop: theme.spacing(3),
    whiteSpace: 'nowrap',
    overflowX: 'auto'
  },
  icon: {
    margin: '0 10px',
    cursor: 'pointer'
  },
  endCell: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const PeriodsList = (props) => {

  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(PeriodsQuery, {
    variables: { input: { page: page, paginate: limit } },
  });
  const [mutationDelete] = useMutation(PeriodDelete, {

    refetchQueries: [
      {
        query: PeriodsQuery,
        variables: { input: { page: page, paginate: limit } }
      }
    ]
  });

  if (error) return <p>Error :(</p>;

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  const deletePeriod = (id) => {
    mutationDelete({ variables: { id } })
  };
  const formatDate = (d) => {
    let date = d.substr(8, 2) + "/" + d.substr(5, 2) + "/" + d.substr(0, 4);
    return date
  }

  console.log(data)
  return (
    <Page
      className={classes.root}
      title="Períodos"
    >
      <Container maxWidth={false}>
        <>
          <Toolbar />
          <Box mt={3}>
            {loading ? '' :
              <Card>
                <PerfectScrollbar>
                  <Box minWidth={300}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            Período
                          </TableCell>
                          <TableCell>
                            Data Inicial
                          </TableCell>
                          <TableCell>
                            Data Final
                          </TableCell>
                          <TableCell>

                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.paginatePeriods.docs.slice(0, limit).map((period) => (
                          <TableRow
                            hover
                            key={period.id}
                          >
                            <TableCell>
                              {period.name}
                            </TableCell>
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
                                  subheader={'Tem certeza que deseja deletar o período?'}
                                  title="Deletar período"
                                />
                                <Button
                                  variant="contained"
                                  style={{ margin: 10, backgroundColor: "#8B0000", color: '#fff' }}
                                  onClick={() => deletePeriod(period.id)}
                                >
                                  Deletar
                                </Button>
                              </Modal>

                              <Link to={"/app/periods/edit/" + period.id} style={{ color: '#263238' }}><EditIcon className={classes.icon} /></Link>
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

export default (PeriodsList);

