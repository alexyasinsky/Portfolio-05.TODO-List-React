import {Link, List, ListItem} from "@mui/material";

export default function ({fileLinks}) {
  return (
    <List>
      {
        fileLinks.map((item, idx) => {
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