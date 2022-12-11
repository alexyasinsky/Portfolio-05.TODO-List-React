import {List, ListItem} from "@mui/material";
import TaskListItem from "../TaskListItem/TaskListItem";
import {useSelector} from "react-redux";
import {selectTasks} from "../../store/tasks/selectors";
import './TaskList.less';
import {selectShowDoneTasks} from "../../store/interfaceVars/selectors";

/**
 * функция для сравнения заданий по датам
 * @param a
 * @param b
 * @returns {number}
 */

function compareTaskDate(a, b) {
  if (a.date > b.date) return 1;
  if (a.date === b.date) return 0;
  if (a.date < b.date) return -1;
}

/**
 * компонент для отрисовки списка заданий
 * @returns {JSX.Element}
 * @constructor
 */
export default function TaskList() {
  /**
   * переменная для хранения списка заданий
   * @type {array}
   */
  let tasks = useSelector(selectTasks);
  /**
   * переменная для хранения значения видимости завершенных заданий
   * @type {boolean}
   */
  const isDoneTasksShown = useSelector(selectShowDoneTasks);

  /**
   * фильтрация списка заданий по значению статуса задания в зависимости от переменной isDoneTaskShown
   */
  if (!isDoneTasksShown) {
    tasks = tasks.filter((item) => {
      return item.done === false
    })
  }

  /**
   * сортировка заданий по дате
   */
  tasks.sort(compareTaskDate);

  return (
    <List className='taskList'>
      {
        tasks.map((item, idx) => {
          return (
            <ListItem key={idx}>
              <TaskListItem task={item}/>
            </ListItem>
          )
        })
      }
    </List>
  )
}
