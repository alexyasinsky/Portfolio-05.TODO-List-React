import { Typography } from '@mui/material';

import './App.scss';

import AddButton from './components/AddButton/AddButton';
import Area from './components/Area/Area';

function App() {
  return (
    <div className="app">
      <header>
       <Typography variant='h4'>
          TODO List
       </Typography>
      </header>
      <main>
        <Area msg='hello'/>
      </main>
      
      <AddButton/>
      {/* <footer>  
      </footer>   */}
    </div>
  );
}

export default App;
