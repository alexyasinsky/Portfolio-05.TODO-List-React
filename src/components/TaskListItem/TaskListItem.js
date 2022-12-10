import {CardContent, Typography, Card, Checkbox} from "@mui/material";
import {useDispatch} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {setCurrentTask, setFormCase, toggleShowTaskForm} from "../../store/taskForm/actions";

import './TaskListItem.less';
import dayjs from "dayjs";
import {update} from "@firebase/database";
import {getTaskRefById} from "../../services/firebase/dbRefs";
import getDateClass from "../../services/tools";

export default function TaskListItem({task}) {

  const dispatch = useDispatch();
  const [dateClass, setDateClass] = useState('');

  const clickToCardHandler = useCallback(()=> {
    dispatch(setFormCase('edit'));
    dispatch(toggleShowTaskForm());
    dispatch(setCurrentTask(task));
  }, [dispatch, task]);

  const handleChecking = useCallback(async ()=> {
    await update(getTaskRefById(task.id), { done: !task.done });
  }, [task]);

  useEffect(()=> {
    setDateClass(getDateClass(task.date));
  }, [task]);

  return (
    <Card className='taskListItem taskListItem__card'>
      <CardContent className='taskListItem__content'>
        <Checkbox onChange={handleChecking} checked={task.done}/>
        <div onClick={clickToCardHandler}>
          <Typography className='taskListItem__title'>
            {task.title}
          </Typography>
          <Typography className={`date ${dateClass}`}>
            {dayjs(task.date).format('DD-MM-YYYY')}
        </Typography>
        </div>
      </CardContent>
    </Card>
  )
}