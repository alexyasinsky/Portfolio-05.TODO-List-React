import { listAll } from "firebase/storage";
import { getFilesRefById } from '../../services/firebase/storageRefs';


export const TOGGLE_SHOW_TASK_FORM = 'TASK_FORM::TOGGLE_SHOW_TASK_FORM';
export const SET_FORM_CASE = 'TASK_FORM::SET_FORM_CASE';
export const SET_CURRENT_TASK = 'TASK_FORM::SET_CURRENT_TASK';
export const CLEAR_CURRENT_TASK = 'TASK_FORM::CLEAR_CURRENT_TASK';
export const SET_CURRENT_TASK_FILE_LIST = 'TASK_FORM::SET_CURRENT_TASK_FILE_LIST';
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

export const setCurrentTaskFileList = (list) => ({
  type: SET_CURRENT_TASK_FILE_LIST,
  payload: list
})

export const clearCurrentTaskFileList = () => ({
  type: CLEAR_CURRENT_TASK_FILE_LIST,
})

export const getFileList = (id) => async (dispatch) => {
 const fileList = await listAll(getFilesRefById(id));
 dispatch(setCurrentTaskFileList(fileList.items));
}