import React, { useState } from 'react';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import {StudentsQuery} from '../../../graphql/queries/student'
import {StudentDelete, StudentEdit} from '../../../graphql/mutations/student'
import {useMutation,useQuery, gql } from '@apollo/client';
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


const StudentsList = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const { loading, error, data } = useQuery(StudentsQuery, {
    variables: { page:page, limit:limit },
  });
  const [mutationDelete] = useMutation(StudentDelete,{
    
    refetchQueries: [
      { query: StudentsQuery,
       variables: { page:page, limit:limit }
       }
    ]
  });
  const [mutationEdit] = useMutation(StudentEdit,{
    refetchQueries: [
      { query: StudentsQuery,
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
  const deleteStudent = (id) => {
    mutationDelete({ variables: { id } })
  };
  const editStudent = (values) => {
    mutationEdit({ variables: values })
    setEdit(false)
  };
  
 
  return (
    <Page
      className={classes.root}
      title="Estudantes"
    >
      <Container maxWidth={false}>
     
        <Toolbar create={setCreate} />
        <Box mt={3}>
          {loading?'':
          <Card>
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Nome
                      </TableCell>
                      <TableCell>
                        E-mail
                      </TableCell>
                      <TableCell>
                        Matricula
                      </TableCell>
                      <TableCell>
                        Curso
                      </TableCell>
                      <TableCell>
                        Turma
                      </TableCell>
                      <TableCell>
                        
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.paginateStudents.docs.slice(0, limit).map((student) => (
                      <TableRow
                        hover
                        key={student.id}
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
                              {student.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {student.email}
                        </TableCell>
                        <TableCell>
                          {student.matriculation}
                        </TableCell>
                        <TableCell>
                          {student.course_id}
                        </TableCell>
                        <TableCell>
                          {student.class_id}
                        </TableCell>
                        <TableCell> 

                        </TableCell>
                        <TableCell> 
                          <Modal
                            className={classes.icon}
                            icon={TrashIcon}
                          >
                            <CardHeader
                            subheader={'Tem certeza que deseja deletar o estudante "'+student.name+'"'}
                            title="Deletar estudante"
                          />
                          <Button
                            variant="contained"
                            style={{margin:10,backgroundColor:"#8B0000",color:'#fff'}}
                            onClick={()=>deleteStudent(student.id)}
                          >
                            Deletar
                          </Button>
                          </Modal>
                          
                          <Link to={"/app/students/edit/"+student.id} style={{color:'#263238'}}><EditIcon className={classes.icon}/></Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={data.paginateStudents.total}
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

export default (StudentsList);

