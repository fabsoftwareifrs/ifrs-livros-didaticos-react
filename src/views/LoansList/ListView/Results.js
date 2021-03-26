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

const Results = ({ className, loans, ...rest }) => {
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
              {loans.slice(0, limit).map((loan) => (
                <TableRow
                  hover
                  key={loan.id}
                >
                  
                  <TableCell>                           
                          {loan.withdrawDate}
                        </TableCell>
                        <TableCell>
                          {loan.loanDays}
                        </TableCell>
                        <TableCell>
                          {loan.delivered}
                        </TableCell>
                        <TableCell>
                          {loan.studentId}
                        </TableCell>
                        <TableCell>
                          {loan.bookId}
                        </TableCell>
                        <TableCell>
                          {loan.userId}
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
    </Card>
  );
};



export default Results;
