export const TOGGLE_SHOW_TASK_FORM = 'TASK_FORM::TOGGLE_SHOW_TASK_FORM';
export const SET_FORM_CASE = 'TASK_FORM::SET_FORM_CASE';
export const SET_CURRENT_TASK = 'TASK_FORM::SET_CURRENT_TASK';
export const CLEAR_CURRENT_TASK = 'TASK_FORM::CLEAR_CURRENT_TASK';



export const toggleShowTaskForm = () => ({
  type: TOGGLE_SHOW_TASK_FORM
});

export const setFormCase = (formCase) => {
  return ({
    type: SET_FORM_CASE,
    payload: formCase
  })
}


export const setCurrentTask = (task) => ({
  type: SET_CURRENT_TASK,
  payload: task
})

export const clearCurrentTask = (task) => ({
  type: CLEAR_CURRENT_TASK,
  payload: task
})