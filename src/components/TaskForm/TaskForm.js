import {Card, CardActions, CardContent, Grid, TextField, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearCurrentTask, toggleShowTaskForm} from "../../store/taskForm/actions";
import {selectCurrentTask, selectCurrentTaskId, selectFormCase} from '../../store/taskForm/selectors';
import dayjs from "dayjs";
import {set, update, remove} from "@firebase/database";
import MyCalendar from "../MyCalendar/MyCalendar";
import './TaskForm.scss';
import { getTaskRefById} from "../../services/firebase/dbRefs";
import FileList from "../FileList/FileList";
import AddFileForm from "../AddFileForm/AddFileForm";
import { getFilesOfCurrentTask } from '../../store/taskForm/actions';
import MyButton from "../MyButton/MyButton";

export default function TaskForm() {

  const currentTask = useSelector(selectCurrentTask);
  const formCase = useSelector(selectFormCase);
  const id = useSelector(selectCurrentTaskId);

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

    useEffect(()=> {
      dispatch(getFilesOfCurrentTask(id));
  },  [dispatch, id])

  return (
    <Card component='form' onSubmit={submitButtonHandler} sx={{position: 'absolute', minHeight: '400px', width: '96%', bottom: '400px', zIndex: 1100, border: '1px solid black', margin: '0 1%', padding: '1% 1%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <CardContent sx={{position: 'relative'}}>
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
            <MyButton purpose='add' title='Add Files' handler={toggleAddingFileFormShow}/>
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
            {formCase === 'edit' && <><MyButton purpose='done' handler={successButtonHandler}/><MyButton purpose='edit' type='submit'/><MyButton purpose='delete' handler={deleteButtonHandler}/></>}
          </Grid>
          <Grid item>
            <MyButton purpose='cancel' handler={cancelButtonHandler}/>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}