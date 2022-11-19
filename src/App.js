import {AppBar, Container, Grid, Paper, Toolbar, Typography} from '@mui/material';

import './App.scss';

import TaskList from "./components/TaskList";
import ShowTaskFormButton from "./components/ShowTaskFormButton";
import NewTaskForm from "./components/NewTaskForm";
import {useState} from "react";

const tasks = [
  {
    task: 'do smth 1',
    date: '19-11-2022',
    done: false
  },
  {
    task: 'do smth 2',
    date: '20-11-2022',
    done: true
  },
  {
    task: 'do smth 3',
    date: '21-11-2022',
    done: false
  }
]

function App() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  function toggleTaskForm(){
    return setShowTaskForm(!showTaskForm);
  }

  function addTask(task, date) {
    tasks.push({task, date, done: false});
    console.log(tasks)
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
                <TaskList list={tasks}/>
                { showTaskForm ?
                  <NewTaskForm
                    addTask={addTask}
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
