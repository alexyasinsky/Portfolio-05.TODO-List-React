import {CardContent, Typography, Card, Checkbox} from "@mui/material";
import {useDispatch} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {setCurrentTask, setFormCase, toggleShowTaskForm} from "../../store/taskForm/actions";

import './TaskListItem.scss';
import dayjs from "dayjs";
import {toggleTask} from "../../store/tasks/actions";

export default function TaskListItem({task}) {
  const dispatch = useDispatch();
  const [dateClass, setDateClass] = useState('');

  const handler = useCallback(()=> {
    dispatch(setFormCase('edit'));
    dispatch(toggleShowTaskForm());
    dispatch(setCurrentTask(task));
  }, [dispatch, task]);

  const handleChecking = useCallback(()=> {
    dispatch(toggleTask(task.id));
  }, [dispatch, task]);

  useEffect(()=> {
    if (dayjs(task.date).unix() === dayjs().hour(0).minute(0).second(0).millisecond(0).unix()) {
      setDateClass('taskListItem__date_today');
    }
    if (dayjs(task.date).unix() < dayjs().hour(0).minute(0).second(0).millisecond(0).unix()) {
      setDateClass('taskListItem__date_past')
    }
    if (dayjs(task.date).unix() > dayjs().hour(0).minute(0).second(0).millisecond(0).unix()) {
      setDateClass('taskListItem__date_future')
    }
  }, [task]);

  return (
    <Card className='taskListItem__card'>
      <CardContent className='taskListItem__content'>
        <Checkbox onChange={handleChecking} checked={task.done}/>
        <div onClick={handler}>
          <Typography className='taskListItem__title'>
            {task.title}
          </Typography>
          <Typography className={`taskListItem__date ${dateClass}`}>
            {dayjs(task.date).format('DD-MM-YYYY')}
        </Typography>
        </div>
      </CardContent>
    </Card>
  )
}