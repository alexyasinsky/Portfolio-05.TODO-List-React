import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import './MyButton.less';

/**
 * объект, содержащий назначения кнопок и соответсвующие этому назначению варианты иконки, надписи на кнопке и цвета кнопки

 */
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

/**
 * компонент универсальной кнопки
 * @param purpose - назначение кнопки
 * @param type - тип (стандартный параметр кнопки)
 * @param handler - обработчик нажатия на кнопку
 * @param customTitle - нестандартная по отношению к назначению кнопки надпись на кнопке
 * @returns {JSX.Element}
 * @constructor
 */
export default function MyButton({purpose, type, handler, customTitle}) {

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
      {customTitle || button.title}
    </Button>
  )
}