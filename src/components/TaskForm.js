import {Card, CardActions, CardContent, Grid, TextField, Typography} from "@mui/material";
import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTask, deleteTask, editTask} from "../store/tasks/actions";
import {clearCurrentTask, toggleShowTaskForm} from "../store/taskForm/actions";
import { selectCurrentTask, selectFormCase } from '../store/taskForm/selectors';
import AgreeButton from './AgreeButton';
import CancelButton from './CancelButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';


export default function TaskForm() {

  const currentTask = useSelector(selectCurrentTask);
  const formCase = useSelector(selectFormCase);
  const [title, setTitle] = useState(currentTask.title);
  const [description, setDescription] = useState(currentTask.description);
  const [date, setDate] = useState(currentTask.date);
  
  const dispatch = useDispatch();

  function changeTitleHandler(e) {
    setTitle(e.target.value);
  }

  function changeDescriptionHandler(e) {
    setDescription(e.target.value);
  }

  function changeDateHandler(e) {
    setDate(e.target.value);
  }

  const submitButtonHandler = useCallback((e) => {
    e.preventDefault();
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

  return (
      <Card component='form' onSubmit={submitButtonHandler} sx={{position: 'absolute', width: '98%', bottom: '400px', zIndex: 1100, border: '1px solid black', margin: '0 1%'}}>
          <CardContent>
            <Grid container display='flex' flexDirection='column' spacing={2}>
              <Grid item >
                <Typography variant='h6' sx={{width: 1}}>
                  Add New Task
                </Typography>
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={8}>
                  <TextField label="title" variant="outlined" value={title} onChange={changeTitleHandler} sx={{width: 1}} required={true}/>
                </Grid>
                <Grid item xs={4}>
                  <TextField label="date" variant="outlined" value={date} onChange={changeDateHandler} sx={{width: 1}}/>
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
                {formCase === 'add' && <AgreeButton type='submit'/>}
                {formCase === 'edit' && <><EditButton type='submit'/><DeleteButton handler={deleteButtonHandler}/></>}
              </Grid>
              <Grid item>
                <CancelButton handler={cancelButtonHandler}/>
              </Grid>
            </Grid>
          </CardActions>
      </Card>
  )
}