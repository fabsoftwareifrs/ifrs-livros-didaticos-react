import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Trash2 as TrashIcon, Edit as EditIcon} from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, books, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);


  

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Nome
                </TableCell>
                <TableCell>
                  Código
                </TableCell>
                <TableCell>
                  Autor
                </TableCell>
                <TableCell>
                  Volume
                </TableCell>
                <TableCell>
                  Quantidade
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.slice(0, limit).map((book) => (
                <TableRow
                  hover
                  key={book.id}
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
                        {book.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {book.code}
                  </TableCell>
                  <TableCell>
                    {book.author}
                  </TableCell>
                  <TableCell>
                    {book.volume}
                  </TableCell>
                  <TableCell>
                    {book.quantity}
                  </TableCell>
                  <TableCell>
                    <TrashIcon/>
                    <EditIcon/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={books.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage={'Itens por página:'}
      />
    </Card>
  );
};



export default Results;
