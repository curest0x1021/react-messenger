import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "260px",
    flexGrow: 1,
  },
  singleImage: {
    width: "100px",
    height: "100px",
    borderRadius: "8px",
    objectFit: "cover",
    margin: theme.spacing(0.5),
  },
  multiImages: {
    width: "80px",
    height: "60px",
    borderRadius: "6px",
    objectFit: "cover",
    margin: theme.spacing(0.5)
  },
}));

const ImageBubble = (props) => {
  const classes = useStyles();

  const { attachments, mine } = props;
  const isMultiple = attachments.length > 1;

  return (
    <Grid 
      container
      className={classes.container} 
      style={{justifyContent: mine ? "flex-end" : "flex-start"}}>
      {attachments.map((url, index) => {
        return (
          <img
            key={index}
            src={url}
            className={isMultiple ? classes.multiImages : classes.singleImage}
            alt={index}/>
        );
      })}
    </Grid>
  )
}

export default ImageBubble;
