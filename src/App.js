import {Container, Grid, Paper} from '@mui/material';

import './App.less';

import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import {useDispatch, useSelector} from "react-redux";
import {clearCurrentTask} from "./store/currentTask/actions";
import {useCallback, useEffect} from "react";
import MyHeader from "./components/MyHeader/MyHeader";
import {initTasksTrack, stopTasksTrack} from "./store/tasks/actions";
import MyButton from "./components/MyButton/MyButton";
import {selectShowTaskForm} from "./store/interfaceVars/selectors";
import {setTaskFormCase, toggleShowTaskForm} from "./store/interfaceVars/actions";

function App() {

  const showTaskForm = useSelector(selectShowTaskForm);

  const dispatch = useDispatch();

  const showTaskFormButtonHandler = useCallback(()=> {
    dispatch(clearCurrentTask());
    dispatch(setTaskFormCase('add'));
    dispatch(toggleShowTaskForm());
  }, [dispatch]);

  useEffect(()=> {
    dispatch(initTasksTrack());
    return () => {
      dispatch(stopTasksTrack());
    }
  }, [dispatch]);

  return (
    <Container maxWidth="md" className='app'>
      <Paper elevation={5}>
        <Grid container direction='column'>
          <Grid item>
            <MyHeader/>
          </Grid>
          <Grid item position='relative'>
              <main>
                <TaskList/>
                { showTaskForm && <TaskForm/> }
                <div className='showFormButton'>
                  <MyButton purpose='add' handler={showTaskFormButtonHandler}/>
                </div>
              </main>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
