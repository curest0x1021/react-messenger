import React from "react";
import {
  Grid,
  Box,
  Hidden,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../../themes/styles/logo";
import bubble from "../../assets/bubble.svg";

const Logo = ({sm = 5}) => {
  const classes = useStyles();

  return (
    <Grid item sm={sm} className={classes.logoContainer}>
      <Hidden xsDown>
        <Box className={classes.logoOverlay}>
          <img src={bubble} alt="bubble" className={classes.logoBubble}/>
          <Typography variant="h4" paragraph={true} align="center" className={classes.logoText}>
            Converse with anyone with any language
          </Typography>
        </Box>
      </Hidden>
    </Grid>
  );
};

export default Logo;
