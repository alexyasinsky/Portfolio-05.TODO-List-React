import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import './MyButton.scss';

const buttonPurposes = {
  add: {
    icon: <AddIcon/>,
    title: 'Add',
    color: 'primary'
  },
  cancel: {
    icon: <CloseIcon/>,
    title: 'Cancel',
    color: 'error'
  },
  delete: {
    icon: <DeleteIcon/>,
    title: 'Delete',
    color: 'secondary'
  },
  edit: {
    icon: <EditIcon/>,
    title: 'Edit',
    color: 'primary'
  },
  done: {
    icon: <CheckIcon />,
    title: 'Done!',
    color: 'success'
  }
}

export default function MyButton({purpose, type, handler, title}) {

  const button = buttonPurposes[purpose];

  return (
    <Button
      className='myButton'
      variant="contained"
      color={button.color}
      startIcon={button.icon}
      onClick={handler}
      size='large'
      type={type}
    >
      {title || button.title}
    </Button>
  )
}