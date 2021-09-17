import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { login, register } from "../../store/utils/thunkCreators";
import { useStyles } from "../../themes/styles/loginForm";

const LoginForm = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login, register, sm = 7, isSignUp } = props;
  
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleSubmit = async (event) => {
    if (isSignUp) {
      await handleRegister(event);
    } else {
      await handleLogin(event);
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

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

  const handleTogglePage = () => {
    history.push(isSignUp ? "/login" : "/register");
  }

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid item xs={12} sm={sm} >
      <Box className={classes.topContainer}>
        <Typography variant="body1" className={classes.label}>
          {isSignUp ? "Already have an account?" : "Do you have an account?"}
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleTogglePage}>
          {isSignUp ? "Login" : "Create account"}
        </Button>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box className={classes.formContainer}>
          <Typography variant="h4">
            {isSignUp ? "Create an account." : "Welcome back!"}
          </Typography>
          <FormControl margin="normal" required fullWidth>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
            />
          </FormControl>
          {isSignUp ?
            (
              <>
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
              </>
            )
            :
            (
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button className={classes.forgotButton}>
                          Forgot?
                        </Button>
                      </InputAdornment>
                    )
                  }}
                />
              </FormControl>
            )
          }
          <Box className={classes.buttonContainer}>
            <Button type="submit" variant="contained" className={classes.buttonBlue}>
              {isSignUp ? "Create" : "Login"}
            </Button>
          </Box>
        </Box>
      </form>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(login(credentials)),
    register: (credentials) => dispatch(register(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
