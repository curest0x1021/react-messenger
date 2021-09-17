import React, { useRef, useState } from "react";
import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  dropzone: {
    height: "200px",
    width: "200px",
    background: theme.palette.background.primary,
    border: theme.spacing(0.5),
    borderColor: theme.palette.border.primary,
    borderStyle: "dashed",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "16px",
  },
  highlight: {
    background: theme.palette.background.highlight,
  },
  icon: {
    opacity: "0.3",
    height: "64px",
    width: "64px",
  },
  fileInput: {
    display: "none",
  },
}));

const Dropzone = (props) => {
  const classes = useStyles();
  const [highlight, setHighlight] = useState(false);
  const fileInputRef = useRef(null);

  const onDragOver = (event) => {
    event.preventDefault();
    if (props.disabled) return;
    setHighlight(true);
  }

  const onDragLeave = () => {
    setHighlight(false);
  }

  const onDrop = (event) => {
    event.preventDefault();
    if (props.disabled) return;
    const files = event.dataTransfer.files;
    if (props.onFilesAdded) {
      props.onFilesAdded(fileListToArray(files));
    }
    setHighlight(false);
  }

  const openFileDialog = () => {
    if (props.disabled) return;
    fileInputRef.current.click();
  }

  const handleOnFilesAdded = (event) => {
    if (props.disabled) return;
    const files = event.target.files;
    if (props.onFilesAdded) {
      props.onFilesAdded(fileListToArray(files));
    }
  }

  function fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  return (
    <div
      className={`${classes.dropzone} ${highlight && classes.highlight}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: props.disabled ? "default" : "pointer" }}
    >
      <input
        ref={fileInputRef}
        className={classes.fileInput}
        type="file"
        accept=".jpg, .jpeg, .png, .svg, .tiff"
        multiple
        onChange={handleOnFilesAdded}
      />
      <CloudUpload fontSize="inherit" className={classes.icon}/>
      <Typography>Upload Files</Typography>
    </div>
  );
};

export default Dropzone;
