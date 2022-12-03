import {List, ListItem} from "@mui/material";
import TaskListItem from "./TaskListItem/TaskListItem";
import {useSelector} from "react-redux";
import {selectTasks} from "../store/tasks/selectors";


export default function TaskList({isDoneTasksShown}) {
  let tasks = useSelector(selectTasks);

  if (!isDoneTasksShown) {
    tasks = tasks.filter((item) => {
      return item.done === false
    })
  }

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
