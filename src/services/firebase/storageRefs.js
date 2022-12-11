import {ref} from "firebase/storage";
import {storage} from "./index";


/**
 * функция для получения ссылки на все файлы конкретного задания в хранилище по его айди
 * @param id
 * @returns {StorageReference}
 */
export const getFilesRefById = (id) => ref(storage, `${id}`);

/**
 * функция для получения ссылки на конкретный файл конкретного задания в хранилище по имени файла и по айди задания
 * @param id
 * @param name
 * @returns {StorageReference}
 */
export const getFileRefByIdAndName = (id, name) => ref(storage, `${id}/${name}`);
