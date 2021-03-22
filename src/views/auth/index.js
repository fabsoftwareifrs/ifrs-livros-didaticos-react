import React, { useState } from 'react';
import Page from 'src/components/Page';
import Login from './LoginView';
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
    makeStyles
  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      height: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));
const LoginView = () => {
  const classes = useStyles();
  return (
    <Page
    className={classes.root}
    title="Login"
  >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
        <Login/>
    
    </Container>
    </Box>
    </Page>
  );
};

export default (LoginView);