import {Fab} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function CancelButton({type, handler}) {
  return (
    <Fab color="error" aria-label="cancel" type={type} onClick={handler}>
      <CloseIcon/>
    </Fab>
  )
}