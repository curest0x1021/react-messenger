import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, LinearProgress, Typography } from "@material-ui/core";
import { Close, CheckCircleOutline, ErrorOutline } from "@material-ui/icons";
import { styled } from "@material-ui/styles";
import PropTypes from "prop-types";
import Dropzone from "./Dropzone";
import { connect } from "react-redux";
import { addNewFiles, uploadFiles, reset } from "../../store/utils/thunkFiles";
import { useStyles } from "../../themes/styles/uploadDialog";

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
  const { data } = props;

  const onFilesAdded = (addFiles) => {
    props.addNewFiles(addFiles);
  }

  const uploadFiles = () => {
    const filterData = data.filter(item => item.url === "");
    if (filterData.length > 0) {
      props.uploadFiles(filterData);
    }
  }

  const handleOnClose = () => {
    props.reset();
    props.onClose();
  }

  const isUploadButtonDisabled = () => {
    const filterData = data.filter(item => item.url === "");
    return filterData.length === 0
  }

  const isSendButtonDisabled = () => {
    const filterData = data.filter(item => item.url !== "");
    return filterData.length === 0;
  }

  const renderItem = (item) => {
    return (
      <div key={item.id} className={classes.itemContainer}>
        <div className={classes.nameContainer}>
          <Typography className={classes.fileName}>{item.file.name}</Typography>
          {item.url &&
            <CheckCircleOutline
              className={classes.checkIcon}
              fontSize="small"
            />
          }
          {item.failed && 
            <ErrorOutline
              className={classes.errorIcon}
              fontSize="small"
            />
          }
        </div>
        {item.uploading &&
          <LinearProgress className={classes.progressbar} />
        }
      </div>
    )
  }

  return (
    <CustomDialog
      open={props.open}
      onClose={handleOnClose}
    >
      <CustomDialogTitle
        className={classes.title}
        iconClassName={classes.iconClose}
        onClose={handleOnClose}>
        Upload Files
      </CustomDialogTitle>
      <DialogContent className={classes.content}>
        <Dropzone
          onFilesAdded={onFilesAdded}
        />
        <div className={classes.files}>
          {data.map(item => renderItem(item))}
        </div>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          variant="outlined"
          className={classes.uploadButton}
          onClick={uploadFiles}
          disabled={isUploadButtonDisabled()}>
          Upload
        </Button>
        <Button
          variant="outlined"
          className={classes.sendButton}
          disabled={isSendButtonDisabled()}>
          Send
        </Button>
      </DialogActions>
    </CustomDialog>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.files
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewFiles: (files) => dispatch(addNewFiles(files)),
    uploadFiles: (data) => dispatch(uploadFiles(data)),
    reset: () => dispatch(reset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDialog);
