
export const TOGGLE_SHOW_TASK_FORM = 'TASK_FORM::TOGGLE_SHOW_TASK_FORM';
export const SET_TASK_FORM_CASE = 'TASK_FORM::SET_TASK_FORM_CASE';
export const TOGGLE_SHOW_DONE_TASKS = 'TASK_FORM::TOGGLE_SHOW_DONE_TASKS';

/**
 * экшн для переключения значения видимости формы текушего задания
 * @returns {{type: string}}
 */
export const toggleShowTaskForm = () => ({
  type: TOGGLE_SHOW_TASK_FORM
});

/**
 * экшн для установки значения варианта формы текущего задания
 * @param formCase - строка со значением "add" или "edit"
 * @returns {{payload, type: string}}
 */
export const setTaskFormCase = (formCase) => ({
    type: SET_TASK_FORM_CASE,
    payload: formCase
})

/**
 * экшн для переключения значения видимости завершенных заданий в списке заданий
 * @returns {{type: string}}
 */
export const toggleShowDoneTasks = () => ({
  type: TOGGLE_SHOW_DONE_TASKS
})