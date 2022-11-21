import {CardContent, Typography, Card, Checkbox} from "@mui/material";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {setCurrentTask, setFormCase, toggleShowTaskForm} from "../../store/taskForm/actions";

import './TaskListItem.scss';

export default function TaskListItem({task}) {

  const dispatch = useDispatch();

  const handler = useCallback(()=> {
    dispatch(setFormCase('edit'));
    dispatch(toggleShowTaskForm());
    dispatch(setCurrentTask(task));
  }, [dispatch, task]);

  return(
    <Card className='taskListItem__card'>
      <CardContent className='taskListItem__content'>
        <Checkbox/>
        <div onClick={handler}>
          <Typography className='taskListItem__title'>
            {task.title}
          </Typography>
          <Typography className='taskListItem__date'>
            {task.date}
        </Typography>
        </div>
      </CardContent>
      {/* <CardActions>
        <Button>
          <MoreVertIcon/>
        </Button>
      </CardActions> */}
    </Card>
  )
}