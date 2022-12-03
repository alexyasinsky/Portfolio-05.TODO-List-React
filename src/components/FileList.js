import {Link, List, ListItem} from "@mui/material";

export default function ({files}) {
  return (
    <List>
      {
        files.map((item, idx) => {
          return (
            <ListItem key={idx}>
              <Link href="#">{item}</Link>
            </ListItem>
          )
        })
      }
    </List>
  )
}