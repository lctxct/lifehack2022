import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Buddying from './pages/Buddying';
import FoundProfile from './pages/FoundUserProfile';
import CustomizedTimeline from './components/pastVolunteerEvents';
import BuddyProfile from './components/BuddyProfile';
import Login from './pages/Login'
import OrganisationPage from './pages/organisationPage';
import { CircularProgress, Fade } from '@mui/material';

import NotFound from './pages/NotFound';
import { useState, useEffect, Fragment } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [token, setToken] = useState(false)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("John Doe")

  useEffect(() => {
    const localStorageToken = localStorage.getItem("auth-token")
    if (localStorageToken !== null) {
      window.token = localStorageToken
      setToken(localStorageToken)
    }
    setLoading(false)
  })

  const handleNewLogin = (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("auth-token", token)
    }
    setToken(token)
    setUsername(token.split(".")[0])
  }

  const setPage = page => {
    setCurrentPage(page);
  }

  return (
    <Fragment>
      {loading ? (<div style={{ overflow: "hidden", height: "97vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress size="10ch" />
      </div>) : (
        <Fragment>
          {token ? (
            <Fade in={true}>
              <div>
                <NavBar setPage={setPage} />

                {currentPage === 0 && <Home />}
                {currentPage === 1 && <Buddying />}
                {currentPage == 2 && <OrganisationPage />}
                {currentPage > 2 && <NotFound />}
              </div>
            </Fade>
          ) :
            (
              <Fade in={true}>
                <div>
                  <Login handleNewLogin={handleNewLogin} />
                </div>
              </Fade>
            )}
        </Fragment>
      )}
    </Fragment>
  );

}

export default App;
