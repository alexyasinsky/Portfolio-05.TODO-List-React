import { getDownloadURL, getMetadata, listAll } from "firebase/storage";
import { getFilesRefById } from '../../services/firebase/storageRefs';


export const SET_CURRENT_TASK = 'TASK_FORM::SET_CURRENT_TASK';
export const CLEAR_CURRENT_TASK = 'TASK_FORM::CLEAR_CURRENT_TASK';
export const SET_CURRENT_TASK_FILES_DATA = 'TASK_FORM::SET_CURRENT_TASK_FILES_DATA';
export const SET_CURRENT_TASK_TEMP_FILES_DATA = 'TASK_FORM::SET_CURRENT_TASK_TEMP_FILES_DATA';

export const setCurrentTask = (task) => ({
  type: SET_CURRENT_TASK,
  payload: task
})

export const setEmptyCurrentTask = () => ({
  type: CLEAR_CURRENT_TASK,
})

export const getFilesOfCurrentTask = (id) => async (dispatch) => {
  const files = await listAll(getFilesRefById(id));
  const filesData = [];
  for (const ref of files.items) {
    const url = await getDownloadURL(ref);
    const data = await getMetadata(ref);
    filesData.push({data, url});
  }
  dispatch(setCurrentTaskFilesData(filesData));
}

const setCurrentTaskFilesData = (data) => ({
  type: SET_CURRENT_TASK_FILES_DATA,
  payload: data
})

export const setCurrentTaskTempFilesData = (data) => ({
  type: SET_CURRENT_TASK_TEMP_FILES_DATA,
  payload: data
})