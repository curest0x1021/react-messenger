import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  Container,
  CssBaseline,
  InputAdornment,
} from "@material-ui/core";
import { Logo } from "../components";
import { login } from "../store/utils/thunkCreators";
import { useStyles } from "../themes/styles/login";
import { useButtonStyles } from "../themes/styles/button";

const Login = (props) => {
  const classes = useStyles();
  const buttonClasses = useButtonStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <CssBaseline />
      <Grid container className={classes.mainContainer}>
        <Logo sm={5}/>
        <Grid xs={12} sm={7} >
          <Box className={classes.topContainer}>
            <Typography variant="body1" className={classes.registerLabel}>
              Do you have an account?
            </Typography>
            <Button
              variant="contained"
              className={buttonClasses.button}
              onClick={() => history.push("/register")}>
              Create account
            </Button>
          </Box>
          <form onSubmit={handleLogin}>
            <Box className={classes.formContainer}>
              <Typography variant="h4">Welcome back!</Typography>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
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
              <Box className={classes.buttonContainer}>
                <Button type="submit" variant="contained" className={buttonClasses.buttonBlue}>
                  Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
