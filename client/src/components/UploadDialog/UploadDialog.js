import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close, CheckCircleOutline } from "@material-ui/icons";
import { styled } from "@material-ui/styles";
import PropTypes from "prop-types";
import Dropzone from "./Dropzone";
import { connect } from "react-redux";
import { addNewFiles, uploadFiles, reset } from "../../store/utils/thunkFiles";


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
  itemContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "50px",
    padding: theme.spacing(2),
    overflow: "hidden",
    boxSizing: "border-box",
  },
  nameContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fileName: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.file,
  },
  checkIcon: {
    opacity: 0.5,
    marginLeft: "auto",
  },
  progressbar: {
    width: "100%",
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
        <Button onClick={uploadFiles}>
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
