import {Fab} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export default function EditButton({type, handler}) {
  return (
    <Fab color="primary" aria-label="edit" type={type} onClick={handler}>
      <EditIcon/>
    </Fab>
  )
}