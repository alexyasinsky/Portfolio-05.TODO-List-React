import {CLEAR_CURRENT_TASK, SET_CURRENT_TASK, TOGGLE_SHOW_TASK_FORM, SET_FORM_CASE, ADD_FILE_DATA_TO_CURRENT_TASK} from "./actions";

const initialState = {
  showTaskForm: false,
  currentTask: {
    id: 0,
    title: '',
    description: '',
    date: new Date().setHours(0,0,0,0),
    done: false,
    filesData: []
  },
  formCase: ''
}

export const taskFormReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case TOGGLE_SHOW_TASK_FORM:
      return {
        ...state,
        showTaskForm: !state.showTaskForm
      };
    case SET_FORM_CASE:
      return {
        ...state,
        formCase: payload
      };
    case SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: Object.assign(state.currentTask, payload)
      }
    case CLEAR_CURRENT_TASK: 
      return {
        ...state,
        currentTask: {
          id: 0,
          title: '',
          description: '',
          date: new Date().setHours(0,0,0,0),
          done: false,
          filesData: []
        }
      }
    // case ADD_FILE_DATA_TO_CURRENT_TASK:
    //   state.currentTask.filesData = [...payload];
    //   state.currentTask.filesData.push(payload);
    //   return state;

        case ADD_FILE_DATA_TO_CURRENT_TASK:
      // state.currentTask.filesData = [...payload];
      // state.currentTask.filesData.push(payload);
      // return state;
      const task = {
        ...state.currentTask,
        filesData: payload
      };
      return {
        ...state,
        currentTask: task
      }
    default:
      return state;
  }
}