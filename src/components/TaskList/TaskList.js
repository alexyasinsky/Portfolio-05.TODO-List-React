import {List, ListItem} from "@mui/material";
import TaskListItem from "../TaskListItem/TaskListItem";
import {useSelector} from "react-redux";
import {selectTasks} from "../../store/tasks/selectors";


function compareTaskDate(a, b) {
  if (a.date > b.date) return -1;
  if (a.date === b.date) return 0;
  if (a.date < b.date) return 1;
}


export default function TaskList({isDoneTasksShown}) {
  let tasks = useSelector(selectTasks);

  if (!isDoneTasksShown) {
    tasks = tasks.filter((item) => {
      return item.done === false
    })
  }

  tasks.sort(compareTaskDate);

  return (
    <List sx={{
      overflow: 'auto',
      height: '1000px',
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'start'
    }}>
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
