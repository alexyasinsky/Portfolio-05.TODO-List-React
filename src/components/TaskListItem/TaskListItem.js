import {CardContent, Typography, Card, Checkbox} from "@mui/material";
import {useDispatch} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {setCurrentTask, setFormCase, toggleShowTaskForm} from "../../store/taskForm/actions";

import './TaskListItem.scss';
import dayjs from "dayjs";
import {update} from "@firebase/database";
import {getTaskRefById} from "../../services/firebase";

export default function TaskListItem({task}) {

  task.date = new Date(task.date);

  const dispatch = useDispatch();
  const [dateClass, setDateClass] = useState('');

  const handler = useCallback(()=> {
    dispatch(setFormCase('edit'));
    dispatch(toggleShowTaskForm());
    dispatch(setCurrentTask(task));
  }, [dispatch, task]);

  const handleChecking = useCallback(async ()=> {
    await update(getTaskRefById(task.id), { done: !task.done });
  }, [task]);

  useEffect(()=> {
    const msFromUnix = dayjs(task.date).valueOf();
    const today = dayjs().hour(0).minute(0).second(0).millisecond(0).valueOf();
    if (msFromUnix === today) {
      setDateClass('taskListItem__date_today');
    }
    if (msFromUnix < today) {
      setDateClass('taskListItem__date_past')
    }
    if (msFromUnix > today) {
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