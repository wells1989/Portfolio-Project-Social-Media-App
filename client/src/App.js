import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import SearchPage from './scenes/searchPage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {

  const mode = useSelector((state) => state.mode); // selects state.mode from state/index.js (i.e. starts as "light")
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // creates a new theme using the theme.js settings, + using the mode state defined above
  
  const isAuth = Boolean(useSelector((state) => state.token));
  // if token exists, means you are authorised 

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/*resets Css to baseline*/}
          <Routes> 
            <Route path = "/" element={<LoginPage />} />
            <Route path = "/home" element={isAuth ? <HomePage /> : <Navigate to="/"/> } />
            <Route path = "/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/"/> } /> {/* these two protected routes will only show is isAuth = True*/}
            <Route path = "/home/search" element={isAuth ? <SearchPage /> : <Navigate to="/"/> } />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
