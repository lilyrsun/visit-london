import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Attractions from './components/Attractions';
import Accommodations from './components/Accommodations';
import WelcomePage from './components/WelcomePage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

const theme = createTheme();

function AppContent() {
  const location = useLocation();
  const hideNavBar = location.pathname === '/' /*|| location.pathname === '/home'*/;

  return (
    <div>
      {/* Conditionally render the navigation bar */}
      {!hideNavBar && (
        <nav className="navbar">
          <div className="logo-container">
            <Link to="/home">
              <img src="london-logo.png" alt="London Logo" className="logo"/>
            </Link>
          </div>
          <div className="nav-links">
            <ul>
              <li><Link to="/attractions">Attractions</Link></li>
              <li><Link to="/accommodations">Accommodations</Link></li>
            </ul>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/accommodations" element={<Accommodations />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent /> {/* Now the useLocation hook is properly used inside the Router */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
