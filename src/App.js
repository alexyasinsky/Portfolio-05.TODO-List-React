import {AppBar, Container, Grid, Paper, Toolbar, Typography} from '@mui/material';

import './App.scss';

import TaskList from "./components/TaskList";
import ShowTaskFormButton from "./components/ShowTaskFormButton";
import NewTaskForm from "./components/NewTaskForm";
import {useState} from "react";


function App() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  function toggleTaskForm(){
    return setShowTaskForm(!showTaskForm);
  }


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
                { showTaskForm ?
                  <NewTaskForm
                    close={toggleTaskForm}
                  />
                  :
                  <ShowTaskFormButton handler={toggleTaskForm}/>}
              </main>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
