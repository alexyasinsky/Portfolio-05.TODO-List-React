import {TOGGLE_SHOW_TASK_FORM, SET_TASK_FORM_CASE, TOGGLE_SHOW_DONE_TASKS,} from "./actions";

const initialState = {
  showTaskForm: false,
  taskFormCase: '',
  showDoneTasks: false
}

export const interfaceVarsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case TOGGLE_SHOW_TASK_FORM:
      return {
        ...state,
        showTaskForm: !state.showTaskForm
      };
    case SET_TASK_FORM_CASE:
      return {
        ...state,
        formCase: payload
      };
    case TOGGLE_SHOW_DONE_TASKS:
      return {
        ...state,
        showDoneTasks: !state.showDoneTasks
      };
    default:
      return state;
  }
}