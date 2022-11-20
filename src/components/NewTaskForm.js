import {Card, CardActions, CardContent, Fab, TextField, Typography} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addTaskToStore} from "../store/tasks/actions";

export default function NewTaskForm({close}) {

  const [task, setTask] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();

  function changeTaskHandler(e) {
    setTask(e.target.value);
  }

  function changeDateHandler(e) {
    setDate(e.target.value);
  }

  function addButtonHandler() {
    dispatch(addTaskToStore({task, date, done: false}));
    close();
  }


  return (
    <Card sx={{position: 'absolute', width: 1, height: '300px', bottom: 0, zIndex: 1100}}>
      <CardContent>
        <Typography variant='h6'>
          Add New Task
        </Typography>
        <TextField label="task" variant="outlined" value={task} onChange={changeTaskHandler}/>
        <TextField label="date" variant="outlined" value={date} onChange={changeDateHandler}/>

      </CardContent>
      <CardActions>
        <Fab color="success" aria-label="agree" onClick={addButtonHandler}>
          <CheckIcon />
        </Fab>
        <Fab color="error" aria-label="cancel" onClick={close}>
          <CloseIcon />
        </Fab>
      </CardActions>
    </Card>
  )
}