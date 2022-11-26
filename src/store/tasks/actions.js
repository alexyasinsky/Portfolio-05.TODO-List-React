export const ADD_TASK = 'TASK::ADD_TASK';
export const EDIT_TASK = 'TASK::EDIT_TASK';
export const DELETE_TASK = 'TASK::DELETE_TASK';
export const TOGGLE_TASK = 'TASK::TOGGLE_TASK';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task
});

export const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id
});

export const toggleTask = (id) => ({
  type: TOGGLE_TASK,
  payload: id
});