import {Fab} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteButton({type, handler}) {
  return (
    <Fab aria-label="delete" type={type} onClick={handler}>
      <DeleteIcon/>
    </Fab>
  )
}