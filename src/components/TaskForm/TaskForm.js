import {Card, CardActions, CardContent, Grid, TextField, Typography} from "@mui/material";
import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearCurrentTask, toggleShowTaskForm} from "../../store/taskForm/actions";
import { selectCurrentTask, selectFormCase } from '../../store/taskForm/selectors';
import SuccessButton from '../SuccessButton';
import CancelButton from '../CancelButton';
import EditButton from '../EditButton';
import DeleteButton from '../DeleteButton';
import dayjs from "dayjs";
import {push, set, update, remove} from "@firebase/database";

import MyCalendar from "../MyCalendar/MyCalendar";
import './TaskForm.scss';
import AddButton from "../AddButton";
import { getTaskRefById, tasksRef} from "../../services/firebase/dbRefs";
import { uploadBytes } from "firebase/storage";
import {getFileNameRefById} from "../../services/firebase/storageRefs";
import FileList from "../FileList";

export default function TaskForm() {

  const currentTask = useSelector(selectCurrentTask);
  currentTask.date = new Date(currentTask.date);
  const formCase = useSelector(selectFormCase);

  const [title, setTitle] = useState(currentTask.title);
  const [description, setDescription] = useState(currentTask.description);
  const [date, setDate] = useState(currentTask.date);
  // const [files, setFiles] = useState(currentTask.files);
  const [isCalendarShown, setCalendarShown] = useState(false);
  const [dateClass, setDateClass] = useState('');
  
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

  const submitButtonHandler = useCallback(async (e) => {
    e.preventDefault();
      const task = {
        title: title,
        description: description,
        date: dayjs(date).valueOf(),
        // files: files,
        done: false
      }
      const file = fileRef.current.files[0];
    if (formCase === 'add') {
      task.id = push(tasksRef).key;
      if (file) {
        const ref = getFileNameRefById(task.id, file.name);
        await uploadBytes(ref, file);
      }
      await set(getTaskRefById(task.id), task);
    }
    if (formCase === 'edit') {
      if (file) {
        const ref = getFileNameRefById(currentTask.id, file.name);
        await uploadBytes(ref, file);
      }
      await update(getTaskRefById(currentTask.id), task);
    }
    dispatch(clearCurrentTask());
    dispatch(toggleShowTaskForm());
  }, [dispatch, title, description, date, formCase, currentTask]);

  const cancelButtonHandler = useCallback(() => {
    dispatch(clearCurrentTask());
    dispatch(toggleShowTaskForm());
  }, [dispatch]);

  const deleteButtonHandler = useCallback(() => {
    remove(getTaskRefById(currentTask.id));
    dispatch(clearCurrentTask());
    dispatch(toggleShowTaskForm());
  }, [dispatch, currentTask]);

  const successButtonHandler = useCallback(async ()=> {
    await update(getTaskRefById(currentTask.id), { done: !currentTask.done });
    dispatch(clearCurrentTask());
    dispatch(toggleShowTaskForm());
  }, [dispatch, currentTask]);

  const fileRef = useRef(null);

  useEffect(()=> {
    const msFromUnix = dayjs(date).valueOf();
    const today = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();
    if (msFromUnix === today) {
      setDateClass('date_today');
    }
    if (msFromUnix < today) {
      setDateClass('date_past')
    }
    if (msFromUnix > today) {
      setDateClass('date_future')
    }
  }, [date]);

  return (
      <Card component='form' onSubmit={submitButtonHandler} sx={{position: 'absolute', minHeight: '400px', width: '96%', bottom: '400px', zIndex: 1100, border: '1px solid black', margin: '0 1%', padding: '1% 1%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <CardContent>
            <Grid container display='flex' flexDirection='column' spacing={2}>
              <Grid position='relative'>
                { isCalendarShown && <MyCalendar value={date} setValue={(d) => setDate(d)} close={toggleCalendarShow}/> }
              </Grid>
              <Grid item >
                <Typography variant='h6' sx={{width: 1}}>
                  Task
                </Typography>
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={8}>
                  <TextField label="title" variant="outlined" value={title} onChange={changeTitleHandler} sx={{width: 1}} required={true}/>
                </Grid>
                <Grid item xs={4}>
                  <TextField label="date" variant="outlined" value={dayjs(date).format('DD-MM-YYYY')} sx={{width: 1}} InputProps={{readOnly: true}} onClick={toggleCalendarShow} className={dateClass}/>
                </Grid>
              </Grid>
              <Grid item>
                <TextField label="description" sx={{width: 1}} variant="outlined" value={description} onChange={changeDescriptionHandler}/>
              </Grid>
              <Grid item>
                <input type="file" id="input" multiple ref={fileRef}/>
              </Grid>
              <Grid item>
                {currentTask.files?.length > 0 && <FileList files={currentTask.files}/> }
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container display='flex' justifyContent='end' spacing={5}>
              <Grid item>
                {formCase === 'add' && <AddButton type='submit'/>}
                {formCase === 'edit' && <><SuccessButton handler={successButtonHandler}/><EditButton type='submit'/><DeleteButton handler={deleteButtonHandler}/></>}
              </Grid>
              <Grid item>
                <CancelButton handler={cancelButtonHandler}/>
              </Grid>
            </Grid>
          </CardActions>
      </Card>
  )
}