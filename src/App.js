import {AppBar, Container, Grid, Paper, Toolbar, Typography} from '@mui/material';

import './App.scss';

import TaskList from "./components/TaskList";
import ShowTaskFormButton from "./components/ShowTaskFormButton";
import TaskForm from "./components/TaskForm/TaskForm";
import {useSelector} from "react-redux";
import {selectShowTaskForm} from "./store/taskForm/selectors";


function App() {

  const showTaskForm = useSelector(selectShowTaskForm);

  return (
    <Container maxWidth="md">
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
                { showTaskForm && <TaskForm/> } 
                <ShowTaskFormButton/>
              </main>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
