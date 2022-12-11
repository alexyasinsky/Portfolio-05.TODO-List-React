import {Card, CardActions, CardContent, Grid, TextField, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setEmptyCurrentTask} from "../../store/currentTask/actions";
import {
  selectCurrentTask, selectCurrentTaskFilesData,
  selectCurrentTaskId,
  selectCurrentTaskTempFilesData,
} from '../../store/currentTask/selectors';
import dayjs from "dayjs";
import {set, update, remove} from "@firebase/database";
import MyCalendar from "../MyCalendar/MyCalendar";
import './TaskForm.less';
import { getTaskRefById} from "../../services/firebase/dbRefs";
import FileList from "../FileList/FileList";
import AddFileForm from "../AddFileForm/AddFileForm";
import { getFilesOfCurrentTask } from '../../store/currentTask/actions';
import MyButton from "../MyButton/MyButton";
import { deleteObject } from "firebase/storage";
import {getFileRefByIdAndName} from "../../services/firebase/storageRefs";
import getDateClass from "../../services/tools";
import {selectTaskFormCase} from "../../store/interfaceVars/selectors";
import {toggleShowTaskForm} from "../../store/interfaceVars/actions";


/**
 * компонент формы для добавления/изменения текущего задания
 * @returns {JSX.Element}
 * @constructor
 */
export default function TaskForm() {
  /**
   * переменная текущего задания
   * @type {object}
   */
  const currentTask = useSelector(selectCurrentTask);
  /**
   * переменная варианта формы - для добавления (add) или изменения (edit) текущего задания
   * @type {string}
   */
  const formCase = useSelector(selectTaskFormCase);
  const id = useSelector(selectCurrentTaskId);
  /**
   * массив для хранения названий добавленных во время работы с текущим заданием файлов
   * @type {array}
   */
  const tempFilesData = useSelector(selectCurrentTaskTempFilesData);
  const filesData = useSelector(selectCurrentTaskFilesData);
  /**
   * переменные для хранения значений полей формы
   */
  const [title, setTitle] = useState(currentTask.title);
  const [description, setDescription] = useState(currentTask.description);
  const [date, setDate] = useState(currentTask.date);

  /**
   * функции-обработчики ввода пользователей в поля "название задачи" и "описание"
   * @param e - событие event
   */
  function changeTitleHandler(e) {
    setTitle(e.target.value);
  }
  function changeDescriptionHandler(e) {
    setDescription(e.target.value);
  }

  /**
   * переменные для хранения значений видимости компонентов календаря и формы добавления нового файла
   */
  const [isCalendarShown, setCalendarShown] = useState(false);
  const [isAddingFileFormShown, setAddingFileFormShow] = useState(false);
  /**
   * методы для изменения значения видимости компонентов календаря и формы добавления нового файла
   */
  function toggleCalendarShow() {
    setCalendarShown(previous => !previous);
  }

  function toggleAddingFileFormShow() {
    setAddingFileFormShow(previous => !previous);
  }
  /**
   * переменная для хранения значения класса даты
   */
  const [dateClass, setDateClass] = useState('');
  /**
   * хук отслеживания изменения даты текущего задания с целью изменения класса поля даты
   */
  useEffect(()=> {
    setDateClass(getDateClass(date));
  }, [date]);

  const dispatch = useDispatch();

  /**
   * функция-обработчик кнопок отправки формы ("Add" или "Edit"):
   * - прекращает автоматическую отправку формы
   * - создает объект "задание", содержащий полученные от пользователя данные
   * - отправляет задание на сервер с учетом варианта формы
   * - завершает работу над текущим заданием

   * @type {(function(*): Promise<void>)|*}
   */
  const submitButtonHandler = useCallback(async (e) => {
    e.preventDefault();
      const task = {
        id: id,
        title: title,
        description: description,
        date: dayjs(date).valueOf(),
        done: false
      }
    if (formCase === 'add') {
      await set(getTaskRefById(id), task);
    }
    if (formCase === 'edit') {
      await update(getTaskRefById(id), task);
    }
    finishWorkWithCurrentTask();
  }, [dispatch, title, description, date, formCase, id]);

  /**
   * функция-обработчик кнопки "Cancel":
   * удаляет временные файлы на сервере
   * - отчищает стор с текущим заданием
   * - завершает работу над текущим заданием
   * @type {(function(): Promise<void>)|*}
   */
  const cancelButtonHandler = useCallback(async() => {
    for (const fileName of tempFilesData) {
      await deleteObject(getFileRefByIdAndName(id, fileName));
    }
    finishWorkWithCurrentTask();
  }, [dispatch, id, tempFilesData]);
  /**
   * функция-обработчик кнопки "Delete":
   * - удаляет текущее задание с сервера;
   * - удаляет файлы текущего задания с сервера
   * - завершает работу над текущим заданием
   * @type {(function(): Promise<void>)|*}
   */
  const deleteButtonHandler = useCallback(async () => {
    await remove(getTaskRefById(currentTask.id));
    for (const fileName of filesData) {
      await deleteObject(getFileRefByIdAndName(id, fileName));
    }
    finishWorkWithCurrentTask();
  }, [dispatch, currentTask]);

  /**
   * функция-обработчик кнопки "Done":
   * - обновляет на сервере информацию о статусе задачи на "выполнено"
   * - завершает работу над текущим заданием
   * @type {(function(): Promise<void>)|*}
   */
  const doneButtonHandler = useCallback(async ()=> {
    await update(getTaskRefById(currentTask.id), { done: true });
    finishWorkWithCurrentTask();
  }, [dispatch, currentTask]);

  /**
   * функция для завершения работы над текущим заданием:
   * - отчищает текущее задание в сторе
   * - закрывает компонент-форму текущего задания
   */
  function finishWorkWithCurrentTask() {
    dispatch(setEmptyCurrentTask());
    dispatch(toggleShowTaskForm());
  }

  /**
   * хук для обновления списка файлов
   */
  useEffect(()=> {
    dispatch(getFilesOfCurrentTask(id));
  },  [dispatch, id])

  return (
    <Card component='form' onSubmit={submitButtonHandler} className="taskForm">
      <CardContent className="taskForm__content">
        <Grid container display='flex' flexDirection='column' spacing={2}>
          <Grid position='relative'>
            { isCalendarShown && <MyCalendar value={date} setValue={(d) => setDate(d)} close={toggleCalendarShow}/> }
          </Grid>
          <Grid item >
            <Typography variant='h6'>
              Task
            </Typography>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={8}>
              <TextField label="title" variant="outlined" value={title} onChange={changeTitleHandler} className='taskForm__textField' required={true}/>
            </Grid>
            <Grid item xs={4}>
              <TextField label="date" variant="outlined" value={dayjs(date).format('DD-MM-YYYY')} InputProps={{readOnly: true}} onClick={toggleCalendarShow} className={`taskForm__textField ${dateClass}`}/>
            </Grid>
          </Grid>
          <Grid item>
            <TextField label="description" className='taskForm__textField' variant="outlined" value={description} onChange={changeDescriptionHandler}/>
          </Grid>
          <Grid item>
            <MyButton purpose='add' customTitle='Add Files' handler={toggleAddingFileFormShow}/>
          </Grid>
          <Grid item>
            <FileList/>
          </Grid>
        </Grid>
        { isAddingFileFormShown && <AddFileForm id={id} close={toggleAddingFileFormShow}/>}
      </CardContent>
      <CardActions>
        <Grid container display='flex' justifyContent='end' spacing={5}>
          <Grid item>
            {formCase === 'add' && <MyButton purpose='add' type='submit'/>}
            {formCase === 'edit' && <><MyButton purpose='done' handler={doneButtonHandler}/><MyButton purpose='edit' type='submit'/><MyButton purpose='delete' handler={deleteButtonHandler}/></>}
          </Grid>
          <Grid item>
            <MyButton purpose='cancel' handler={cancelButtonHandler}/>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}