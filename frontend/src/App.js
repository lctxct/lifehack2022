import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Buddying from './pages/Buddying';
import FoundProfile from './pages/FoundUserProfile';
import CustomizedTimeline from './components/pastVolunteerEvents';
import BuddyProfile from './components/BuddyProfile';
import Login from './pages/Login'
import OrganisationPage from './pages/organisationPage';

import NotFound from './pages/NotFound';
import { useState, useEffect, Fragment } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [token, setToken] = useState(false)
  const [username, setUsername] = useState("John Doe")

  useEffect(() => {
    const localStorageToken = localStorage.getItem("auth-token")
    if (localStorageToken !== null) {
      window.token = localStorageToken
      setToken(localStorageToken)
    }
  })

  const handleNewLogin = (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("auth-token", token)
    }
    setToken(token)
    setUsername(token.split(".")[0])
  }

  const setPage = page => {
    console.log(page);
    setCurrentPage(page);
  }

  return (
    <Fragment>
      {token ? (
        <Fragment>
          <NavBar setPage={setPage} />

          {/* {currentPage === 0 && <Home />} */}
          {currentPage == 0 && <OrganisationPage />}
          {currentPage === 1 && <Buddying />}
          {currentPage === 2 && <NotFound />}
          {currentPage > 2 && <NotFound />}
        </Fragment>
      ) :
        (
          <Login handleNewLogin={handleNewLogin} />
        )}
    </Fragment>
  );

}

export default App;
