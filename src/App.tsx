import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';
import { useState, createContext, useContext, useMemo } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
import { createTheme, ThemeProvider, useTheme, Box, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const App = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path='/'  element={<HomePage />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
};

const ToggleColorMode = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;