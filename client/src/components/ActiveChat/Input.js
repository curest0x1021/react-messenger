import React, { useState } from "react";
import { FormControl, FilledInput, InputAdornment, IconButton } from "@material-ui/core";
import { FileCopyOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import UploadDialog from "../UploadDialog/UploadDialog";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user
    };
    await postMessage(reqBody);
    setText("");
  };

  const handleAttachClick = () => {
    setOpen(true);
  }

  const handleOnClose = () => {
    setOpen(false);
  }

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleAttachClick}>
                  <FileCopyOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
      <UploadDialog
        open={open}
        onClose={handleOnClose}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
