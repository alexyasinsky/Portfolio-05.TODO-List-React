import {Card, CardActions, CardContent} from "@mui/material";
import './AddFileForm.scss';
import {getFileNameRefById} from "../../services/firebase/storageRefs";
import {uploadBytes} from "firebase/storage";
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {getFilesOfCurrentTask} from "../../store/taskForm/actions";
import MyButton from "../MyButton/MyButton";

export default function AddFileForm({id, close}) {

  const fileRef = useRef(null);

  const dispatch = useDispatch();

  async function addFiles() {
    close();
    for (const file of fileRef.current.files) {
      debugger
      await uploadBytes(getFileNameRefById(id, file.name), file);
    }
    dispatch(getFilesOfCurrentTask(id));
  }

  return (
    <Card className='fileForm'>
      <CardContent>
        <input type="file" id="input" multiple ref={fileRef}/>
      </CardContent>
      <CardActions>
        <MyButton purpose='add' handler={addFiles}/>
        <MyButton purpose='cancel' handler={close}/>
      </CardActions>
    </Card>

  )
}

