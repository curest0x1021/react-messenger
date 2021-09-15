import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Grid,
  Container,
  CssBaseline,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { Logo } from "../components";
import { register } from "../store/utils/thunkCreators";
import { useStyles } from "../themes/styles/signup";
import { useButtonStyles } from "../themes/styles/button";

const Signup = (props) => {
  const classes = useStyles();
  const buttonClasses = useButtonStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <CssBaseline />
      <Grid container className={classes.mainContainer}>
        <Logo sm={5}/>
        <Grid xs={12} sm={7}>
          <Box className={classes.topContainer}>
            <Typography variant="body1" className={classes.loginLabel}>
              Already have an account?
            </Typography>
            <Button
              variant="contained"
              className={buttonClasses.button}
              onClick={() => history.push("/login")}>
              Login
            </Button>
          </Box>
          <form onSubmit={handleRegister}>
            <Box className={classes.formContainer}>
              <Typography variant="h4">Create an account.</Typography>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth error={!!formErrorMessage.confirmPassword}>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <FormControl margin="normal" required fullWidth error={!!formErrorMessage.confirmPassword}>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
              <Box className={classes.buttonContainer}>
                <Button type="submit" variant="contained" className={buttonClasses.buttonBlue}>
                  Create
                </Button>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
