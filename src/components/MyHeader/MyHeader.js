import {AppBar, Box, Checkbox, Toolbar, Typography} from "@mui/material";
import './MyHeader.less'
import {useDispatch, useSelector} from "react-redux";
import {selectShowDoneTasks} from "../../store/interfaceVars/selectors";
import {toggleShowDoneTasks} from "../../store/interfaceVars/actions";

export default function MyHeader() {

  const isDoneTasksShown = useSelector(selectShowDoneTasks);
  console.log(isDoneTasksShown)
  const dispatch = useDispatch();

  const handleCheckbox = () => {
    dispatch(toggleShowDoneTasks());
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