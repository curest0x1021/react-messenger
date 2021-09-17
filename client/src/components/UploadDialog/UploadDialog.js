import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close, CheckCircleOutline } from "@material-ui/icons";
import { styled } from "@material-ui/styles";
import PropTypes from "prop-types";
import Dropzone from "./Dropzone";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "row",
    paddingTop: theme.spacing(4),
    boxSizing: "border-box",
    width: "600px",
  },
  files: {
    marginLeft: theme.spacing(8),
    alignItems: "flex-start",
    justifyItems: "flex-start",
    flex: 1,
    overflowY: "auto",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4),
    width: "100%",
  },
  iconClose: {
    marginLeft: "auto",
    marginRight: theme.spacing(2),
  },
  fileName: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.file,
  },
  row: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "50px",
    padding: theme.spacing(2),
    overflow: "hidden",
    boxSizing: "border-box",
  },
  checkIcon: {
    opacity: 0.5,
    marginLeft: theme.spacing(8),
  },
  progressWrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: theme.spacing(4),
  },
}));

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CustomDialogTitle = (props) => {
  const { children, onClose, className, iconClassName, ...other } = props;

  return (
    <div className={className}>
      <DialogTitle {...other} >
        {children}
      </DialogTitle>
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={iconClassName}
        >
          <Close />
        </IconButton>
      )}
    </div>
  );
};

CustomDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const UploadDialog = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    uploading: false,
    successUploaded: false,
    files: [],
    uploadProgress: {}
  });
  // const [uploading, setUploading] = useState(false);
  // const [successUploaded, setSuccessUploaded] = useState(false);
  // const [files, setFiles] = useState([]);
  // const [uploadProgress, setUploadProgress] = useState({});

  const onFilesAdded = (addFiles) => {
    const files = [...state.files];
    const newFiles = files.concat(addFiles);
    console.log(newFiles);
    setState({ ...state, files: newFiles });
  }

  const uploadFiles = async () => {
    state.uploadProgress = {};
    state.uploading = true;
    setState({ ...state, uploading: true, uploadProgress: {} });
    const promises = [];
    state.files.forEach(file => {
      promises.push(sendRequest(file));
    });
    try {
      await Promise.all(promises);
      setState({ ...state, successUploaded: true, uploading: false });
    } catch (e) {
      setState({ ...state, successUploaded: true, uploading: false });
    }
  }

  function sendRequest(file) {
    return new Promise((resolve, reject) => {
      const config = {
        onUploadProgress: function(event) {
          if (event.lengthComputable) {
            const copy = { ...state.uploadProgress };
            copy[file.name] = {
              state: "pending",
              percentage: Math.round((event.loaded * 100) / event.total),
            };
            setState({ ...state, uploadProgress: copy });
          }
        }
      };
      const formData = FormData();
      formData.append("file", file, file.name);

      axios.put("url", formData, config)
        .then(res => {
          const copy = { ...state.uploadProgress };
          copy[file.name] = { state: "done", percentage: 100 };
          setState({ ...state, uploadProgress: copy });
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          const copy = { ...state.uploadProgress };
          copy[file.name] = { state: "error", percentage: 0 };
          setState({ ...state, uploadProgress: copy });
          console.log(err);
          reject(err);
        });
    });
  }

  const renderProgress = (file) => {
    const progress = state.uploadProgress[file.name];
    if (state.uploading || state.successUploaded) {
      return (
        <div className={classes.progressWrapper}>
          <LinearProgress value={progress ? progress.percentage : 0} />
          <CheckCircleOutline
            className={classes.checkIcon}
            fontSize="small"
            style={{ opacity: progress && progress.state === "done" ? 0.5 : 0}}
          />
        </div>
      )
    }
  }

  return (
    <CustomDialog
      open={props.open}
      onClose={props.onClose}
    >
      <CustomDialogTitle
        className={classes.title}
        iconClassName={classes.iconClose}
        onClose={props.onClose}>
        Upload Files
      </CustomDialogTitle>
      <DialogContent className={classes.content}>
        <Dropzone
          onFilesAdded={onFilesAdded}
          disabled={state.uploading || state.successUploaded}
        />
        <div className={classes.files}>
          {state.files.map(file => {
            return (
              <div key={file.name} className={classes.row}>
                <Typography className={classes.fileName}>{file.name}</Typography>
                {renderProgress(file)}
              </div>
            );
          })}
        </div>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={uploadFiles}>
          Send
        </Button>
      </DialogActions>
    </CustomDialog>
  );
}

export default UploadDialog;
