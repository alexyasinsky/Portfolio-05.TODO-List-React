import {Card, CardActions, CardContent, Fab, Grid, Paper, TextField, Typography} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {addTaskToStore} from "../store/tasks/actions";
import {toggleShowTaskForm} from "../store/showCompsVars/actions";
import {Login} from "@mui/icons-material";

export default function TaskForm({task}) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

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

  const addButtonHandler = useCallback(() => {
    const task = {
      id: Math.floor(Math.random() * 10000),
      title: title,
      description: description,
      date: date,
      done: false
    }
    dispatch(addTaskToStore(task));
    dispatch(toggleShowTaskForm());
  }, [dispatch, title, description, date]);

  const cancelButtonHandler = useCallback(() => {
    dispatch(toggleShowTaskForm());
  }, [dispatch]);

  return (
      <Card component='form' onSubmit={addButtonHandler} sx={{position: 'absolute', width: '98%', bottom: '400px', zIndex: 1100, border: '1px solid black', margin: '0 1%'}}>
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
            <Grid container display='flex' justifyContent='end' spacing={2}>
              <Grid item>
                <Fab color="success" aria-label="agree" type="submit">
                  <CheckIcon />
                </Fab>
              </Grid>
              <Grid item>
                <Fab color="error" aria-label="cancel" onClick={cancelButtonHandler}>
                  <CloseIcon />
                </Fab>
              </Grid>
            </Grid>
          </CardActions>
      </Card>
  )
}