import {List, ListItem} from "@mui/material";
import TaskListItem from "../TaskListItem/TaskListItem";
import {useSelector} from "react-redux";
import {selectTasks} from "../../store/tasks/selectors";
import './TaskList.less';
import {selectShowDoneTasks} from "../../store/interfaceVars/selectors";


function compareTaskDate(a, b) {
  if (a.date > b.date) return 1;
  if (a.date === b.date) return 0;
  if (a.date < b.date) return -1;
}


export default function TaskList() {

  let tasks = useSelector(selectTasks);
  const isDoneTasksShown = useSelector(selectShowDoneTasks);

  if (!isDoneTasksShown) {
    tasks = tasks.filter((item) => {
      return item.done === false
    })
  }

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
