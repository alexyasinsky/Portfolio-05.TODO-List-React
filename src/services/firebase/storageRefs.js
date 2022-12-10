import {ref} from "firebase/storage";
import {storage} from "./index";

export const getFilesRefById = (id) => ref(storage, `${id}`);
export const getFileRefByIdAndName = (id, name) => ref(storage, `${id}/${name}`);
