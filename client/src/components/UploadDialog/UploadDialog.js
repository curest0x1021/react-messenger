import React from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, LinearProgress, Typography } from "@material-ui/core";
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
    <Box className={className}>
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
    </Box>
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

  const handleOnSubmit = () => {
    const urls = data.filter(item => item.url !== "").map(item => item.url);
    if (urls.length > 0) {
      props.onSubmit(urls);
    }
    props.reset();
    props.onClose();
  }

  const renderItem = (item) => {
    return (
      <Box key={item.id} className={classes.itemContainer}>
        <Box className={classes.nameContainer}>
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
        </Box>
        {item.uploading &&
          <LinearProgress className={classes.progressbar} />
        }
      </Box>
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
        <Box className={classes.files}>
          {data.map(item => renderItem(item))}
        </Box>
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
          disabled={isSendButtonDisabled()}
          onClick={handleOnSubmit}>
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
