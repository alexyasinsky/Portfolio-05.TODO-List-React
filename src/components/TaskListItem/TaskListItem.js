import {CardContent, Typography, Card, Checkbox} from "@mui/material";
import {useDispatch} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {setCurrentTask} from "../../store/currentTask/actions";

import './TaskListItem.less';
import dayjs from "dayjs";
import {update} from "@firebase/database";
import {getTaskRefById} from "../../services/firebase/dbRefs";
import getDateClass from "../../services/tools";
import {setTaskFormCase, toggleShowTaskForm} from "../../store/interfaceVars/actions";


/**
 * компонент элемента списка заданий
 * @param task - объект задания
 * @returns {JSX.Element}
 * @constructor
 */
export default function TaskListItem({task}) {

  const dispatch = useDispatch();

  /**
   * переменная для хранения значения класса даты
   */
  const [dateClass, setDateClass] = useState('');

  /**
   * хук отслеживания изменения даты текущего задания с целью изменения класса поля даты
   */
  useEffect(()=> {
    setDateClass(getDateClass(task.date));
  }, [task]);
  /**
   * функция для обработки нажатия на содержательную часть компонента
   * - устанавливает вариант формы текущего задания в режим "edit"
   * - открывает форму текущего задания
   * - загружает выбранное задание в стор текущего задания
   * @type {(function(): void)|*}
   */
  const clickToCardContentHandler = useCallback(()=> {
    dispatch(setTaskFormCase('edit'));
    dispatch(setCurrentTask(task));
    dispatch(toggleShowTaskForm());
  }, [dispatch, task]);

  /**
   * функция-обработчик нажатия на чекбокс - обновляет на сервере информацию о статусе задачи на "выполнено"
   * @type {(function(): Promise<void>)|*}
   */
  const checkboxHandler = useCallback(async ()=> {
    await update(getTaskRefById(task.id), { done: !task.done });
  }, [task]);



  return (
    <Card className='taskListItem taskListItem__card'>
      <Checkbox onChange={checkboxHandler} checked={task.done}/>
      <CardContent className='taskListItem__content' onClick={clickToCardContentHandler}>
        <div >
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