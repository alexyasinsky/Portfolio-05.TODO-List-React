import {AppBar, Box, Checkbox, Toolbar, Typography} from "@mui/material";
import './MyHeader.scss'

export default function MyHeader({isDoneTasksShown, setDoneTasksShown}) {

  const handleCheckbox = (event) => {
    setDoneTasksShown(event.target.checked);
  };

  return (
    <AppBar position="static">
      <Toolbar className='myHeader__toolbar'>
        <Typography
          variant="h5"
          noWrap
          component="h5"
        >
          TODO List
        </Typography>
        <Box className='myHeader__divider'/>
        <Typography
          variant="h6"
          noWrap
          component="h6"
        >
          show done tasks
        </Typography>
        <Checkbox
          color="secondary"
          checked={isDoneTasksShown}
          onChange={handleCheckbox}
        />
      </Toolbar>
    </AppBar>
  )
}