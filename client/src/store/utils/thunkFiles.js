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
  await files.forEach(async (item) => {
    try {
      dispatch(startUpload(item.id));
      const { data } = await uploadFile(item.file);
      console.log(data);
      dispatch(successUploaded(item.id, data.url));
    } catch (e) {
      dispatch(failUpload(item.id));
    }
  });
}

const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    api.post("/image/upload", formData)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
