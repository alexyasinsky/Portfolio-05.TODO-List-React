import {Card, CardActions, CardContent, Grid, TextField, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTask, deleteTask, editTask, toggleTask} from "../../store/tasks/actions";
import {clearCurrentTask, toggleShowTaskForm} from "../../store/taskForm/actions";
import { selectCurrentTask, selectFormCase } from '../../store/taskForm/selectors';
import SuccessButton from '../SuccessButton';
import CancelButton from '../CancelButton';
import EditButton from '../EditButton';
import DeleteButton from '../DeleteButton';
import dayjs from "dayjs";

import MyCalendar from "../MyCalendar/MyCalendar";
import './TaskForm.scss';
import AddButton from "../AddButton";

export default function TaskForm() {

  const currentTask = useSelector(selectCurrentTask);
  const formCase = useSelector(selectFormCase);

  const [title, setTitle] = useState(currentTask.title);
  const [description, setDescription] = useState(currentTask.description);
  const [date, setDate] = useState(new Date(currentTask.date));

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

  const submitButtonHandler = useCallback((e) => {
    e.preventDefault();
      debugger
      const task = {
        title: title,
        description: description,
        date: date,
        done: false
      }
    if (formCase === 'add') {
      task.id = Math.floor(Math.random() * 10000);
      dispatch(addTask(task));
    }
    if (formCase === 'edit') {
      task.id = currentTask.id;
      dispatch(editTask(task))
    }
    dispatch(clearCurrentTask());
    dispatch(toggleShowTaskForm());
  }, [dispatch, title, description, date, formCase, currentTask]);

  const cancelButtonHandler = useCallback(() => {
    dispatch(clearCurrentTask());
    dispatch(toggleShowTaskForm());
  }, [dispatch]);

  const deleteButtonHandler = useCallback(() => {
    dispatch(deleteTask(currentTask.id));
    dispatch(clearCurrentTask());
    dispatch(toggleShowTaskForm());
  }, [dispatch, currentTask]);

  const successButtonHandler = useCallback(()=> {
    dispatch(toggleTask(currentTask.id));
    dispatch(clearCurrentTask());
    dispatch(toggleShowTaskForm());
  }, [dispatch, currentTask]);


  useEffect(()=> {
    if (dayjs(date).unix() === dayjs().hour(0).minute(0).second(0).millisecond(0).unix()) {
      setDateClass('date_today');
    }
    if (dayjs(date).unix() < dayjs().hour(0).minute(0).second(0).millisecond(0).unix()) {
      setDateClass('date_past')
    }
    if (dayjs(date).unix() > dayjs().hour(0).minute(0).second(0).millisecond(0).unix()) {
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