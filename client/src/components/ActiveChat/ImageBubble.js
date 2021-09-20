import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = mine => makeStyles((theme) => ({
  container: {
    width: "260px",
    flexGrow: 1,
    justifyContent: mine ? "flex-end" : "flex-start",
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
  const { attachments, mine } = props;
  const classes = useStyles(mine)();
  const isMultiple = attachments.length > 1;

  const handleOnClick = (idx) => {
    if (props.openLightbox) {
      props.openLightbox(attachments, idx);
    }
  }

  return (
    <Grid 
      container
      className={classes.container} >
      {attachments.map((url, index) => {
        return (
          <img
            key={url}
            src={url}
            className={isMultiple ? classes.multiImages : classes.singleImage}
            onClick={() => handleOnClick(index)}
            alt={url}/>
        );
      })}
    </Grid>
  )
}

export default ImageBubble;
