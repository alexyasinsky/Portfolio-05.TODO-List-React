import {Container, Grid, Paper} from '@mui/material';

import './App.scss';

import TaskList from "./components/TaskList";
import AddButton from "./components/AddButton";
import TaskForm from "./components/TaskForm/TaskForm";
import {useDispatch, useSelector} from "react-redux";
import {selectShowTaskForm} from "./store/taskForm/selectors";
import {clearCurrentTask, setFormCase, toggleShowTaskForm} from "./store/taskForm/actions";
import {useCallback, useState} from "react";
import MyHeader from "./components/MyHeader/MyHeader";


function App() {

  const showTaskForm = useSelector(selectShowTaskForm);

  const dispatch = useDispatch();

  const showTaskFormButtonHandler = useCallback(()=> {
    dispatch(clearCurrentTask());
    dispatch(setFormCase('add'));
    dispatch(toggleShowTaskForm());
  }, [dispatch]);

  const [isDoneTasksShown, setDoneTasksShown] = useState(false);

  return (
    <Container maxWidth="md" className='app'>
      <Paper elevation={5}>
        <Grid container direction='column'>
          <Grid item>
            <MyHeader isDoneTasksShown={isDoneTasksShown} setDoneTasksShown={setDoneTasksShown}/>
          </Grid>
          <Grid item position='relative'>
              <main>
                <TaskList isDoneTasksShown={isDoneTasksShown}/>
                {showTaskForm ?
                  <TaskForm/>
                  :
                  <div className='showFormButton'>
                    <AddButton handler={showTaskFormButtonHandler} />
                  </div>
                }
              </main>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
