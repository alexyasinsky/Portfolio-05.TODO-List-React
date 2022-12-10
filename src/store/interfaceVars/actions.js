
export const TOGGLE_SHOW_TASK_FORM = 'TASK_FORM::TOGGLE_SHOW_TASK_FORM';
export const SET_TASK_FORM_CASE = 'TASK_FORM::SET_TASK_FORM_CASE';
export const TOGGLE_SHOW_DONE_TASKS = 'TASK_FORM::TOGGLE_SHOW_DONE_TASKS';

export const toggleShowTaskForm = () => ({
  type: TOGGLE_SHOW_TASK_FORM
});

export const setTaskFormCase = (formCase) => ({
    type: SET_TASK_FORM_CASE,
    payload: formCase
})

export const toggleShowDoneTasks = () => ({
  type: TOGGLE_SHOW_DONE_TASKS
})