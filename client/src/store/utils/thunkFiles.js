import axios from "axios";
import { CLOUDINARY_URL } from "../../config/constants";
import {
  addFiles,
  startUpload,
  successUploaded,
  failUpload,
  resetFiles,
} from "../files";

const api = axios.create({
  baseURL: `${CLOUDINARY_URL}/${process.env.REACT_APP_CLOUD_NAME}`,
});

// FILES THUNK CREATORS

export const addNewFiles = (files) => (dispatch) => {
  dispatch(addFiles(files));
}

export const reset = () => (dispatch) => {
  dispatch(resetFiles());
}

export const uploadFiles = (files) => async (dispatch) => {
  try {
    await Promise.all(files.map(f => uploadFile(dispatch, f)));
  } catch (e) {
    console.log(e);
  }
  
}

const uploadFile = (dispatch, item) => {
  return new Promise((resolve, reject) => {
    dispatch(startUpload(item.id));
    const formData = new FormData();
    formData.append("file", item.file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    api.post("/image/upload", formData)
      .then(res => {
        dispatch(successUploaded(item.id, res.data.url));
        resolve(res);
      })
      .catch(err => {
        dispatch(failUpload(item.id));
        reject(err);
      });
  });
};