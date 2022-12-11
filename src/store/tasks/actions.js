import {onValue} from "@firebase/database";
import {tasksRef} from "../../services/firebase/dbRefs";

export const SET_TASKS = 'TASKS::SET_TASKS';
export const CLEAR_TASKS = 'TASKS::CLEAR_TASKS';

/**
 * экшн для записи списка заданий в стор
 * @param tasks - массив заданий
 * @returns {{payload, type: string}}
 */
const setTasks = (tasks) => ({
  type: SET_TASKS,
  payload: tasks
})

/**
 * экшн для отчистки списка заданий в сторе
 * @returns {{type: string}}
 */
const clearTasks = () => ({
  type: CLEAR_TASKS,
})

let unsubscribe;

/**
 * экшн для запуска отслеживания списка заданий на сервере
 * @returns {(function(*): void)|*}
 */
export const initTasksTrack = () => (dispatch) => {
  const unsubscribeTasks = onValue(tasksRef, snapshot => {
    const tasks = snapshot.val();
    let tasksArray = Object.values(tasks);
    tasksArray = tasksArray.map(task => {
      task.date = new Date(task.date);
      return task;
    });
    dispatch(setTasks(tasksArray));
  });
  unsubscribe = () => {
    unsubscribeTasks();
  }
};

/**
 * экшн для остановки отслеживания списка заданий не сервере
 * @returns {(function(*): void)|*}
 */
export const stopTasksTrack = () => (dispatch) => {
  dispatch(clearTasks())
  unsubscribe();
}