import {List, ListItem} from "@mui/material";
import TaskItem from "./TaskItem";
import {useDispatch, useSelector} from "react-redux";
import {selectTasks} from "../store/tasks/selectors";


export default function TaskList() {
  const tasks = useSelector(selectTasks);

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
          if (!item.done) return (
            <ListItem key={idx}>
              <TaskItem task={item}/>
            </ListItem>
          )
        })
      }
    </List>
  )
}
