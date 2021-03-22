import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import {CoursesQuery} from '../../../graphql/queries/course'
import {CourseCreate, CourseDelete, CourseEdit} from '../../../graphql/mutations/course'
import { useMutation,useQuery } from '@apollo/client';
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
import { Trash2 as TrashIcon, Edit as EditIcon} from 'react-feather';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  icon:{
    margin:'0 10px',
    cursor:'pointer'
  }
}));

const CourseList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(CoursesQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(CourseDelete,{
    
    refetchQueries: [
      { query: CoursesQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });


 
  if (error) return <p>Error :(</p>;
 
 
 
  
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage+1);
  };
  const deleteCourse = (id) => {
    mutationDelete({ variables: { id } })
  };

 
  return (
    <Page
      className={classes.root}
      title="Curso"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          {loading?'':
          <Card>
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Curso
                      </TableCell>
                      
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateCourses.docs.slice(0, limit).map((course) => (
                      <TableRow
                        hover
                        key={course.id}
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
                              {course.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Tem certeza que deseja deletar o curso "'+course.name+'"'}
                            title="Deletar categoria"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteCourse(course.id)}
                          >
                            Deletar
                          </Button>
                          </Modal>
                          
                         <Link style={{color:'#263238'}} to={"/app/course/edit/"+course.id}><EditIcon className={classes.icon}/></Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateCourses.total}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page-1}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage={'Itens por página:'}
            />
          </Card>
          }
        </Box>
      </Container>
    </Page>
  );
};

export default (CourseList);

