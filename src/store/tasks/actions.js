import {onValue} from "@firebase/database";
import {tasksRef} from "../../services/firebase/dbRefs";

export const SET_TASKS = 'TASKS::SET_TASKS';
export const CLEAR_TASKS = 'TASKS::CLEAR_TASKS';

const setTasks = (tasks) => ({
  type: SET_TASKS,
  payload: tasks
})

const clearTasks = () => ({
  type: CLEAR_TASKS,
})

let unsubscribe;

export const initTasksTrack = () => (dispatch) => {
  const unsubscribeTasks = onValue(tasksRef, snapshot => {
    const tasks = snapshot.val();
    const tasksArray = Object.values(tasks);
    dispatch(setTasks(tasksArray));
  });
  unsubscribe = () => {
    unsubscribeTasks();
  }
};

export const stopTasksTrack = () => (dispatch) => {
  dispatch(clearTasks())
  unsubscribe();
}