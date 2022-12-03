import {CLEAR_TASKS, SET_TASKS} from "./actions";

const initialState = [];

export const taskReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_TASKS:
      return [...payload];
    case CLEAR_TASKS:
      return initialState;
    default:
      return state;
  }
}