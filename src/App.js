import {Container, Grid, Paper} from '@mui/material';

import './App.less';

import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import {useDispatch, useSelector} from "react-redux";
import {setEmptyCurrentTask} from "./store/currentTask/actions";
import {useCallback, useEffect} from "react";
import MyHeader from "./components/MyHeader/MyHeader";
import {initTasksTrack, stopTasksTrack} from "./store/tasks/actions";
import MyButton from "./components/MyButton/MyButton";
import {selectShowTaskForm} from "./store/interfaceVars/selectors";
import {setTaskFormCase, toggleShowTaskForm} from "./store/interfaceVars/actions";


function App() {

  /**
   * переменная, определяющая видимость компонента TaskForm
   * @type {boolean}
   */
  const showTaskForm = useSelector(selectShowTaskForm);

  const dispatch = useDispatch();

  /**
   * обработчик кнопки по добавлению нового задания:
   * - отчищает стор текущего задания
   * - устанавливает режим "add" компоненту TaskForm
   * - меняет переменную showTaskForm на противоположную
   * @type {(function(): void)}
   */
  const addNewTaskButtonHandler = useCallback(()=> {
    dispatch(setEmptyCurrentTask());
    dispatch(setTaskFormCase('add'));
    dispatch(toggleShowTaskForm());
  }, [dispatch]);

  /**
   * хук, который при монтировании компонента устанавливает связь с БД и хранящимися там заданиями
   * и при размонтировании разрывающий эту связь
   */
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
                <div className='AddNewTaskButtonWrapper'>
                  <MyButton purpose='add' handler={addNewTaskButtonHandler}/>
                </div>
              </main>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
