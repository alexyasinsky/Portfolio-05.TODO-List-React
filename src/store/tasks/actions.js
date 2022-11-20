export const ADD_TASK = 'TASK::ADD_TASK';

export const addTaskToStore = (task) => ({
  type: ADD_TASK,
  payload: task
});