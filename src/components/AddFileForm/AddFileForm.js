import {Card, CardActions, CardContent} from "@mui/material";
import './AddFileForm.less';
import {getFileRefByIdAndName} from "../../services/firebase/storageRefs";
import {uploadBytes} from "firebase/storage";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFilesOfCurrentTask, setCurrentTaskTempFilesData} from "../../store/taskForm/actions";
import MyButton from "../MyButton/MyButton";
import {selectCurrentTaskTempFilesData} from "../../store/taskForm/selectors";

export default function AddFileForm({id, close}) {

  const fileRef = useRef(null);
  const tempFilesData = useSelector(selectCurrentTaskTempFilesData);
  const dispatch = useDispatch();

  async function addFiles() {
    close();
    for (const file of fileRef.current.files) {
      await uploadBytes(getFileRefByIdAndName(id, file.name), file);
      tempFilesData.push(file.name)
    }
    dispatch(setCurrentTaskTempFilesData(tempFilesData))
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

