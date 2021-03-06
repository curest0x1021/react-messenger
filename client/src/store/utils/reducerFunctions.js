import uuid from "react-uuid";

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    if (message.text) {
      newConvo.latestMessageText = message.text;
    } else if (message.attachments && message.attachments.length > 0) {
      newConvo.latestMessageText = "Image attached";
    }
    return [newConvo, ...state];
  }
  
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const newConvo = { ...convo };
      newConvo.messages.push(message);
      if (message.text) {
        newConvo.latestMessageText = message.text;
      } else if (message.attachments && message.attachments.length > 0) {
        newConvo.latestMessageText = "Image attached";
      }
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      if (message.text) {
        newConvo.latestMessageText = message.text;
      } else if (message.attachments && message.attachments.length > 0) {
        newConvo.latestMessageText = "Image attached";
      }
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addFilesToStore = (state, files) => {
  const newFiles = files.map(file => {
    return {
      id: uuid(),
      file: file,
      uploading: false,
      url: "",
      failed: false,
    };
  });
  return [...state, ...newFiles];
};

export const startUploadToStore = (state, id) => {
  return state.map(item => {
    if (item.id === id) {
      const newItem = { ...item };
      newItem.uploading = true;
      newItem.failed = false;
      return newItem;
    } else {
      return item;
    }
  });
};

export const successUploadToStore = (state, id, url) => {
  return state.map(item => {
    if (item.id === id) {
      const newItem = { ...item };
      newItem.uploading = false;
      newItem.failed = false;
      newItem.url = url;
      return newItem;
    } else {
      return item;
    }
  });
};

export const failUploadToStore = (state, id) => {
  return state.map(item => {
    if (item.id === id) {
      const newItem = { ...item };
      newItem.uploading = false;
      newItem.url = "";
      newItem.failed = true;
      return newItem;
    } else {
      return item;
    }
  });
};
