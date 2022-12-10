import {
  CLEAR_CURRENT_TASK,
  SET_CURRENT_TASK,
  SET_CURRENT_TASK_FILES_DATA, SET_CURRENT_TASK_TEMP_FILES_DATA
} from "./actions";
import {push} from "@firebase/database";
import {tasksRef} from "../../services/firebase/dbRefs";

const initialState = {
  id: push(tasksRef).key,
  title: '',
  description: '',
  date: new Date().setHours(0,0,0,0),
  done: false,
  filesData: [],
  tempFilesData: []
}

export const currentTaskReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_CURRENT_TASK:
      return {
        ...state,
        ...payload
      }
    case CLEAR_CURRENT_TASK: 
      return {
        id: push(tasksRef).key,
        title: '',
        description: '',
        date: new Date().setHours(0,0,0,0),
        done: false,
        filesData: [],
        tempFilesData: []
      }
    case SET_CURRENT_TASK_FILES_DATA:
      return {
        ...state,
        filesData: payload
      }
    case SET_CURRENT_TASK_TEMP_FILES_DATA:
      return {
        ...state,
        tempFilesData: payload
      }
    default:
      return state;
  }
}