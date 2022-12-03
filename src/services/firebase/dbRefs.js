import {ref} from "firebase/database";
import {db} from "./index";

export const tasksRef = ref(db, "tasks");
export const getTaskRefById = (id) => ref(db, `tasks/${id}`);
