import {List, ListItem} from "@mui/material";
import TaskItem from "./TaskItem";


export default function TaskList({list}) {
  return (
    <List sx={{
      overflow: 'auto',
      height: '1000px',
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'start'
    }}>
      {
        list.map((item, idx) => {
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
