import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import { styled } from "@material-ui/styles";
import PropTypes from "prop-types";
import Dropzone from "./Dropzone";

const useStyles = makeStyles(() => ({
  
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
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

CustomDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const UploadDialog = (props) => {
  const [uploading, setUploading] = useState(false);
  const [successUploaded, setSuccessUploaded] = useState(false);

  return (
    <CustomDialog
      open={props.open}
      onClose={props.onClose}
    >
      <CustomDialogTitle onClose={props.onClose}>
        Upload Dialog
      </CustomDialogTitle>
      <DialogContent>
        <Dropzone
          onFilesAdded={() => {}}
          disabled={uploading || successUploaded}
        />
        <Typography>Custom dialog</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>
          Send
        </Button>
      </DialogActions>
    </CustomDialog>
  );
}

export default UploadDialog;
