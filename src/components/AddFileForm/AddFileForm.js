import {Card, CardActions, CardContent} from "@mui/material";
import './AddFileForm.less';
import {getFileRefByIdAndName} from "../../services/firebase/storageRefs";
import {uploadBytes} from "firebase/storage";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFilesOfCurrentTask, setCurrentTaskTempFilesData} from "../../store/currentTask/actions";
import MyButton from "../MyButton/MyButton";
import {selectCurrentTaskTempFilesData} from "../../store/currentTask/selectors";

/**
 * компонент формы добавления нового файла
 * @param id идентификатор текущего задания
 * @param close метод для закрытия формы
 * @returns {JSX.Element}
 * @constructor
 */

export default function AddFileForm({id, close}) {
  /**
   * хук для ссылки на инпут, который используется для добавления файлов
   * @type {React.MutableRefObject<null>}
   */
  const filesRef = useRef(null);
  const tempFilesData = useSelector(selectCurrentTaskTempFilesData);
  const dispatch = useDispatch();

  /**
   * обработчик кнопки, который
   * - закрывает форму
   * - загружает файлы на сервер
   * - перезаписывает временные файлы текущего задания
   * - обновляет список файлов текущего задания
   * @returns {Promise<void>}
   */
  async function addFilesButtonHandler() {
    close();
    for (const file of filesRef.current.files) {
      await uploadBytes(getFileRefByIdAndName(id, file.name), file);
      tempFilesData.push(file.name)
    }
    dispatch(setCurrentTaskTempFilesData(tempFilesData))
    dispatch(getFilesOfCurrentTask(id));
  }

  return (
    <Card className='fileForm'>
      <CardContent>
        <input type="file" id="input" multiple ref={filesRef}/>
      </CardContent>
      <CardActions>
        <MyButton purpose='add' handler={addFilesButtonHandler}/>
        <MyButton purpose='cancel' handler={close}/>
      </CardActions>
    </Card>

  )
}

