import {  Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { blue } from '@mui/material/colors';

import './AddButton.scss';

export default function AddButton() {

  const handler = () => console.log('added');

  return (
    <Button onClick={handler}>
      <AddCircleIcon sx={{ color: blue[700], fontSize: 70 }} />
    </Button>
  )
}


