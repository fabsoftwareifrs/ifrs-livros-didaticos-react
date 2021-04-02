import React, { useState } from 'react';
import Page from 'src/components/Page';
import { CopiesByBookQuery } from '../../../graphql/queries/copy'
import { CopyDelete } from '../../../graphql/mutations/copy'
import { useMutation, useQuery } from '@apollo/client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Modal from '../../../components/ModalIcon';
import Toolbar from './Toolbar'
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
import { Link, useParams, useHistory } from "react-router-dom";

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

const CopyList = (props) => {
  const classes = useStyles();
  var { id } = useParams();
  id = parseInt(id)

  const { loading, error, data } = useQuery(CopiesByBookQuery,
    { variables: { bookId: id } });
  const [mutationDelete] = useMutation(CopyDelete, {

    refetchQueries: [
      {
        query: CopiesByBookQuery,
        variables: { bookId: id }
      }
    ]
  });

  const translate = (word) => {
    if (word == "MISPLACED") {
      return ("EXTRAVIADO")
    }
    if (word == "LOANED") {
      return ("EMPRESTADO")
    }
    if (word == "AVAILABLE") {
      return ("DISPONIVEL")
    }
  }

  if (error) return <p>Error :(</p>;




  const deleteCourse = (id) => {
    mutationDelete({ variables: { id } })
  };
  return (
    <Page
      className={classes.root}
      title="Exemplares"
    >
      <Container maxWidth={false}>
        <Toolbar id={id} />
        <Box mt={3}>
          {loading ? '' :
            <Card>
              <PerfectScrollbar>
                <Box minWidth={1050}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          Código
                      </TableCell>
                        <TableCell>
                          Status
                      </TableCell>
                        <TableCell>
                          Livro
                      </TableCell>
                        <TableCell>

                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.copiesByBookId.map((copy) => (
                        <TableRow
                          hover
                          key={copy.id}
                        >

                          <TableCell>
                            <Box
                              alignItems="center"
                              display="flex"
                            >

                              <Typography
                                color="textPrimary"
                                variant="body1"
                              >
                                {copy.code}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              alignItems="center"
                              display="flex"
                            >

                              <Typography
                                color="textPrimary"
                                variant="body1"
                              >
                                {translate(copy.status)}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              alignItems="center"
                              display="flex"
                            >

                              <Typography
                                color="textPrimary"
                                variant="body1"
                              >
                                {copy.book.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Modal
                              className={classes.icon}
                              icon={TrashIcon}
                            >
                              <CardHeader
                                subheader={'Tem certeza que deseja deletar o exemplar de código ' + copy.code + '?'}
                                title="Deletar exemplar"
                              />
                              <Button
                                variant="contained"
                                style={{ margin: 10, backgroundColor: "#8B0000", color: '#fff' }}
                                onClick={() => deleteCourse(copy.id)}
                              >
                                Deletar
                          </Button>
                            </Modal>

                            <Link style={{ color: '#263238' }} to={"/app/copies/edit/" + copy.id}><EditIcon className={classes.icon} /></Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
            </Card>
          }
        </Box>
      </Container>
    </Page>
  );
};

export default (CopyList);

