import {CLEAR_CURRENT_TASK, SET_CURRENT_TASK, TOGGLE_SHOW_TASK_FORM, SET_FORM_CASE} from "./actions";

const initialState = {
  showTaskForm: false,
  currentTask: {
    id: 0,
    title: '',
    description: '',
    date: ''
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
        currentTask: {...payload}
      }
    case CLEAR_CURRENT_TASK: 
      return {
        ...state,
        currentTask: initialState.currentTask
      }
    default:
      return state;
  }
}