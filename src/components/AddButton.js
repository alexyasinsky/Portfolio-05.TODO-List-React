import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function AddButton({type, handler}) {

  return (
      <Fab color='primary'
           aria-label="add"
           onClick={handler}
           type={type}
      >
        <AddIcon />
      </Fab>
  )
}


