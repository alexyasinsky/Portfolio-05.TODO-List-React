import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {toggleShowTaskForm} from "../store/showCompsVars/actions";

export default function ShowTaskFormButton() {
  const dispatch = useDispatch();

  const handler = useCallback(()=> {
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


