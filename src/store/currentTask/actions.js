import { getDownloadURL, getMetadata, listAll } from "firebase/storage";
import { getFilesRefById } from '../../services/firebase/storageRefs';


export const SET_CURRENT_TASK = 'TASK_FORM::SET_CURRENT_TASK';
export const CLEAR_CURRENT_TASK = 'TASK_FORM::CLEAR_CURRENT_TASK';
export const SET_CURRENT_TASK_FILES_DATA = 'TASK_FORM::SET_CURRENT_TASK_FILES_DATA';
export const SET_CURRENT_TASK_TEMP_FILES_DATA = 'TASK_FORM::SET_CURRENT_TASK_TEMP_FILES_DATA';


/**
 * экшн для записи текущего задания в стор
 * @param task - объект задания
 * @returns {{payload, type: string}}
 */
export const setCurrentTask = (task) => ({
  type: SET_CURRENT_TASK,
  payload: task
})

/**
 * экшн для записи пустого задания в стор
 * @returns {{type: string}}
 */
export const setEmptyCurrentTask = () => ({
  type: CLEAR_CURRENT_TASK,
})

/**
 * экшн для загрузки информации о файлах текущего задания с сервера
 * @param id - айди задания
 * @returns {(function(*): Promise<void>)|*}
 */
export const getFilesOfCurrentTask = (id) => async (dispatch) => {
  const files = await listAll(getFilesRefById(id));
  const filesData = [];
  for (const ref of files.items) {
    const url = await getDownloadURL(ref);
    const data = await getMetadata(ref);
    filesData.push({data, url});
  }
  dispatch(setCurrentTaskFilesData(filesData));
}

/**
 * экшн для записи информации о файлах текущего задания в стор
 * @param data - массив с информацией о файлах
 * @returns {{payload, type: string}}
 */
const setCurrentTaskFilesData = (data) => ({
  type: SET_CURRENT_TASK_FILES_DATA,
  payload: data
})

/**
 * экшн для записи информации о временно (до сохранения текущего задания) загруженных на сервер файлах пользователя
 * @param data - массив с информацией о файлах
 * @returns {{payload, type: string}}
 */
export const setCurrentTaskTempFilesData = (data) => ({
  type: SET_CURRENT_TASK_TEMP_FILES_DATA,
  payload: data
})