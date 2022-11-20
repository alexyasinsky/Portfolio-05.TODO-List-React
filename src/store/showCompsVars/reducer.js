import {TOGGLE_SHOW_TASK_FORM} from "./actions";

const initialState = {
  showTaskForm: false,
}

export const showCompsVarsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case TOGGLE_SHOW_TASK_FORM:
      return {
        ...state,
        showTaskForm: !state.showTaskForm
      };
    default:
      return state;
  }
}