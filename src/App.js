import {AppBar, Container, Grid, Paper, Toolbar, Typography} from '@mui/material';

import './App.scss';

import TaskList from "./components/TaskList";
import AddButton from "./components/AddButton";
import TaskForm from "./components/TaskForm/TaskForm";
import {useDispatch, useSelector} from "react-redux";
import {selectShowTaskForm} from "./store/taskForm/selectors";
import {clearCurrentTask, setFormCase, toggleShowTaskForm} from "./store/taskForm/actions";
import {useCallback} from "react";


function App() {

  const showTaskForm = useSelector(selectShowTaskForm);

  const dispatch = useDispatch();
  const showTaskFormButtonHandler = useCallback(()=> {
    dispatch(clearCurrentTask());
    dispatch(setFormCase('add'));
    dispatch(toggleShowTaskForm());
  }, [dispatch]);

  return (
    <Container maxWidth="md" className='app'>
      <Paper elevation={5}>
        <Grid container direction='column'>
          <Grid item>
            <header>
              <AppBar position="static">
                <Toolbar>
                  <Typography
                    variant="h5"
                    noWrap
                    component="h5"
                  >
                    TODO List
                  </Typography>
                </Toolbar>
              </AppBar>
            </header>
          </Grid>
          <Grid item position='relative'>
              <main>
                <TaskList/>
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
