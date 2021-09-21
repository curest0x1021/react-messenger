import {
  addFilesToStore,
  startUploadToStore,
  successUploadToStore,
  failUploadToStore,
} from "./utils/reducerFunctions";

// ACTIONS
const ADD_FILES = "ADD_FILES";
const START_UPLOAD = "START_UPLOAD";
const SUCCESS_UPLOAD = "SUCCESS_UPLOAD";
const FAIL_UPLOAD = "FAIL_UPLOAD";
const RESET_FILES = "RESET_FILES";

// ACTION CREATORS
export const addFiles = (files) => {
  return {
    type: ADD_FILES,
    payload: { files },
  };
};

export const startUpload = (id) => {
  return {
    type: START_UPLOAD,
    payload: { id },
  };
};

export const successUploaded = (id, url) => {
  return {
    type: SUCCESS_UPLOAD,
    payload: { id, url },
  };
};

export const failUpload = (id) => {
  return {
    type: FAIL_UPLOAD,
    payload: { id },
  };
};

export const resetFiles = () => {
  return { type: RESET_FILES};
};

// REDUCER
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FILES:
      return addFilesToStore(state, action.payload.files);
    case START_UPLOAD:
      return startUploadToStore(state, action.payload.id);
    case SUCCESS_UPLOAD:
      return successUploadToStore(state, action.payload.id, action.payload.url);
    case FAIL_UPLOAD:
      return failUploadToStore(state, action.payload.id);
    case RESET_FILES:
      return [];
    default:
      return state;
  }
};

export default reducer;
