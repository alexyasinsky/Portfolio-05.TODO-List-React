import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {clearCurrentTask, setFormCase, toggleShowTaskForm} from "../store/taskForm/actions";

export default function ShowTaskFormButton() {
  const dispatch = useDispatch();
  const handler = useCallback(()=> {
    dispatch(clearCurrentTask());
    dispatch(setFormCase('add'));
    dispatch(toggleShowTaskForm());
  }, [dispatch]);

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


