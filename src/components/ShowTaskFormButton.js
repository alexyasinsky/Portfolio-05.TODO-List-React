import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function ShowTaskFormButton({handler}) {

  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={handler}
      size='large'
      sx={{position: 'absolute', bottom: '50px', right: '50px'}}
    >
      <AddIcon />
    </Fab>
  )
}


