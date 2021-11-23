import './App.css';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Providers from 'navigation';

const theme = createTheme();

const App = () => {
  return <Providers />;
}

export default App;
