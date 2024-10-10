import React from 'react';
import TodoList from './components/TodoList';
import { CssBaseline } from '@mui/material';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <TodoList />
    </>
  );
};

export default App;