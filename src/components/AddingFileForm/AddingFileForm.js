import {Card, CardActions, CardContent} from "@mui/material";
import './AddingFileForm.scss';
import CancelButton from "../CancelButton";
import AddButton from "../AddButton";
import {getFileNameRefById} from "../../services/firebase/storageRefs";
import {uploadBytes} from "firebase/storage";
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {getFilesOfCurrentTask} from "../../store/taskForm/actions";

export default function AddingFileForm({id, close}) {

  const fileRef = useRef(null);

  const dispatch = useDispatch();

  async function addFiles() {
    close();
    for (const file of fileRef.current.files) {
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
        <AddButton handler={addFiles}/>
        <CancelButton handler={close}/>
      </CardActions>
    </Card>

  )
}

