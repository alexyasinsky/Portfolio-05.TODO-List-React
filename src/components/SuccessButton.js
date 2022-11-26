import {Fab} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export default function SuccessButton({type, handler}) {
  return (
    <Fab color="success" aria-label="agree" type={type} onClick={handler}>
      <CheckIcon />
    </Fab>
  )
}