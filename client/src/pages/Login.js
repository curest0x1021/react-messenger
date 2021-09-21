import React from "react";
import {
  Grid,
  Container,
} from "@material-ui/core";
import { LoginForm, Logo } from "../components";
import { useStyles } from "../themes/styles/login";

const Login = ({isSignUp = false}) => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container className={classes.mainContainer}>
        <Logo sm={5}/>
        <LoginForm sm={7} isSignUp={isSignUp}/>
      </Grid>
    </Container>
  );
};

export default Login;
