import {ref} from "firebase/database";
import {db} from "./index";

/**
 * переменная для хранения ссылки на объект задания в базе данных
 * @type {DatabaseReference}
 */
export const tasksRef = ref(db, "tasks");
/**
 * функция для получения ссылки на объект конкретного задания в базе данных по его айди
 * @param id
 * @returns {DatabaseReference}
 */
export const getTaskRefById = (id) => ref(db, `tasks/${id}`);