import { getDownloadURL, getMetadata, listAll } from "firebase/storage";
import { getFilesRefById } from '../../services/firebase/storageRefs';


export const TOGGLE_SHOW_TASK_FORM = 'TASK_FORM::TOGGLE_SHOW_TASK_FORM';
export const SET_FORM_CASE = 'TASK_FORM::SET_FORM_CASE';
export const SET_CURRENT_TASK = 'TASK_FORM::SET_CURRENT_TASK';
export const CLEAR_CURRENT_TASK = 'TASK_FORM::CLEAR_CURRENT_TASK';
export const ADD_FILE_DATA_TO_CURRENT_TASK = 'TASK_FORM::ADD_FILE_DATA_TO_CURRENT_TASK';
export const CLEAR_CURRENT_TASK_FILE_LIST = 'TASK_FORM::CLEAR_CURRENT_TASK_FILE_LIST';

export const toggleShowTaskForm = () => ({
  type: TOGGLE_SHOW_TASK_FORM
});

export const setFormCase = (formCase) => ({
    type: SET_FORM_CASE,
    payload: formCase
})

export const setCurrentTask = (task) => ({
  type: SET_CURRENT_TASK,
  payload: task
})

export const clearCurrentTask = () => ({
  type: CLEAR_CURRENT_TASK,
})

// export const getFilesOfCurrentTask = () => async (dispatch, getState) => {
//   const files = await listAll(getFilesRefById(getState().taskForm.currentTask.id));
//   files.items.forEach(ref => {
//     dispatch(generateFileData(ref));
//   })
// }

// const addFileDataToCurrentTask = (data) => ({
//   type: ADD_FILE_DATA_TO_CURRENT_TASK,
//   payload: data
// })

// const generateFileData = (ref) => async (dispatch) => {
//   const url = await getDownloadURL(ref);
//   const data = await getMetadata(ref);
//   dispatch(addFileDataToCurrentTask({[data.name]: url}));
// }

export const getFilesOfCurrentTask = () => async (dispatch, getState) => {
  const files = await listAll(getFilesRefById(getState().taskForm.currentTask.id));
  const filesData = [];
  for (const ref of files.items) {
    const url = await getDownloadURL(ref);
    const data = await getMetadata(ref);
    filesData.push({data, url});
  }
  dispatch(addFileDataToCurrentTask(filesData));

}

const addFileDataToCurrentTask = (data) => ({
  type: ADD_FILE_DATA_TO_CURRENT_TASK,
  payload: data
})