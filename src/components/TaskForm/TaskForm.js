import {Card, CardActions, CardContent, Grid, TextField, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearCurrentTask, toggleShowTaskForm} from "../../store/taskForm/actions";
import {
  selectCurrentTask,
  selectCurrentTaskId,
  selectCurrentTaskTempFilesData,
  selectFormCase
} from '../../store/taskForm/selectors';
import dayjs from "dayjs";
import {set, update, remove} from "@firebase/database";
import MyCalendar from "../MyCalendar/MyCalendar";
import './TaskForm.less';
import { getTaskRefById} from "../../services/firebase/dbRefs";
import FileList from "../FileList/FileList";
import AddFileForm from "../AddFileForm/AddFileForm";
import { getFilesOfCurrentTask } from '../../store/taskForm/actions';
import MyButton from "../MyButton/MyButton";
import { deleteObject } from "firebase/storage";
import {getFileRefByIdAndName} from "../../services/firebase/storageRefs";

export default function TaskForm() {

  const currentTask = useSelector(selectCurrentTask);
  const formCase = useSelector(selectFormCase);
  const id = useSelector(selectCurrentTaskId);
  const tempFilesData = useSelector(selectCurrentTaskTempFilesData);

  currentTask.date = new Date(currentTask.date);

  const [title, setTitle] = useState(currentTask.title);
  const [description, setDescription] = useState(currentTask.description);
  const [date, setDate] = useState(currentTask.date);

  const [isCalendarShown, setCalendarShown] = useState(false);
  const [dateClass, setDateClass] = useState('');
  const [isAddingFileFormShown, setAddingFileFormShow] = useState(false);

  const dispatch = useDispatch();

  function changeTitleHandler(e) {
    setTitle(e.target.value);
  }

  function changeDescriptionHandler(e) {
    setDescription(e.target.value);
  }

  function toggleCalendarShow() {
    setCalendarShown(previous => !previous);
  }

  function toggleAddingFileFormShow() {
    setAddingFileFormShow(previous => !previous);
  }

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
    dispatch(clearCurrentTask());
    dispatch(toggleShowTaskForm());
  }, [dispatch, title, description, date, formCase, id]);

  const cancelButtonHandler = useCallback(async() => {
    for (const fileName of tempFilesData) {
      await deleteObject(getFileRefByIdAndName(id, fileName));
    }
    dispatch(clearCurrentTask());
    dispatch(toggleShowTaskForm());
  }, [dispatch, id, tempFilesData]);

  const deleteButtonHandler = useCallback(async () => {
    await remove(getTaskRefById(currentTask.id));
    dispatch(clearCurrentTask());
    dispatch(toggleShowTaskForm());
  }, [dispatch, currentTask]);

  const doneButtonHandler = useCallback(async ()=> {
    await update(getTaskRefById(currentTask.id), { done: !currentTask.done });
    dispatch(clearCurrentTask());
    dispatch(toggleShowTaskForm());
  }, [dispatch, currentTask]);

  useEffect(()=> {
    const msFromUnix = dayjs(date).valueOf();
    const today = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();
    if (msFromUnix === today) {
      setDateClass( 'date_today');
    }
    if (msFromUnix < today) {
      setDateClass('date_past')
    }
    if (msFromUnix > today) {
      setDateClass('date_future')
    }
  }, [date]);

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